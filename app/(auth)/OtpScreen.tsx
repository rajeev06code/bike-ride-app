import { verifyOTP } from "@/services/auth";
import { Link, router } from "expo-router";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from 'expo-router';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  Alert,
} from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface UserData {
  email: string;
}
type OTPScreenParams = {
  email?: string;
};
const OTPScreen = () => {
  const params = useLocalSearchParams<OTPScreenParams>();
  const email = params?.email;
  console.log(email)
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(30);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  console.log(userData)



  // Timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter 6-digit code");
      return;
    }

    if (!email) {
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOTP(email, otp);
      console.log(response);
      if (response.status === 200) {
        await AsyncStorage.multiRemove(["email"]);
        router.navigate("/LanguageSelectionScreen");
      }
    } catch (err: any) {
      Alert.alert("Verification Failed", err?.message || "Invalid OTP code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = () => {
    setTimer(30);
    // Add resend OTP logic here
    // You might want to call requestOTP again here
  };

  const isVerifyDisabled = otp.length !== 6 || isLoading;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>Sent to {userData?.email || "your email"}</Text>

      <OTPTextInput
        handleTextChange={setOtp}
        inputCount={6}
        keyboardType="numeric"
        tintColor="#F08200"
        offTintColor="#ccc"
        containerStyle={styles.otpContainer}
        textInputStyle={styles.otpInput}
      />

      <TouchableOpacity
        style={[
          styles.button,
          isVerifyDisabled && styles.buttonDisabled,
        ]}
        onPress={handleVerify}
        disabled={isVerifyDisabled}
      >
        <Text style={styles.buttonText}>
          {isLoading ? "Verifying..." : "Verify"}
        </Text>
      </TouchableOpacity>

      {timer > 0 ? (
        <Text style={styles.timerText}>Resend code in {timer}s</Text>
      ) : (
        <TouchableOpacity onPress={handleResend}>
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 40,
  },
  otpContainer: {
    marginBottom: 40,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    backgroundColor: "#f9f9f9",
    color: "#333",
    fontSize: 20,
    fontWeight: "bold",
    width: 50,
    height: 60,
  },
  button: {
    backgroundColor: "#F08200",
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 25,
  },
  buttonDisabled: {
    backgroundColor: "#dadada",
    opacity: 0.8,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  timerText: {
    color: "#999",
    textAlign: "center",
    fontSize: 14,
    marginTop: 10,
  },
  resendText: {
    color: "#007AFF",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "600",
    marginTop: 10,
  },
});

export default OTPScreen;