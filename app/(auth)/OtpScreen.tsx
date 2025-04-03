import { verifyOTP } from "@/services/auth";
import { router } from "expo-router";
import React, { useState, useEffect } from "react";
import { useLocalSearchParams } from "expo-router";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import OTPTextInput from "react-native-otp-textinput";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Ionicons } from "@expo/vector-icons";

type OTPScreenParams = {
  phoneNumber?: string;
};

const OTPScreen = () => {
  const params = useLocalSearchParams<OTPScreenParams>();
  const phoneNumber = params?.phoneNumber;
  const [otp, setOtp] = useState<string>("");
  const [timer, setTimer] = useState<number>(30);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter the 6-digit code");
      return;
    }

    if (!phoneNumber) {
      Alert.alert("Error", "Phone number not found");
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOTP(phoneNumber, otp);
   

      if (response.status === 200) {
        await AsyncStorage.setItem(
          "access_token",
          JSON.stringify({
            access_token: response.data.access_token,
          })
        );
        if (response.data.document_status) {
          router.navigate("/(main)");
          await AsyncStorage.setItem(
            "user_info",
            JSON.stringify({
              user_info: response.data,
            })
          );
        } else {
          router.navigate("/LanguageSelectionScreen");
        }
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
    Alert.alert("OTP Resent", "A new OTP has been sent to your number");
  };

  const isVerifyDisabled = otp.length !== 6 || isLoading;

  return (
    <View style={styles.container}>
      {/* Content */}
      <View style={styles.content}>
        <Ionicons
          name="lock-closed-outline"
          size={48}
          color="#FF9933"
          style={styles.icon}
        />
        <Text style={styles.title}>Enter Verification Code</Text>
        <Text style={styles.subtitle}>
          We've sent a 6-digit code to{"\n"}
          <Text style={styles.phoneNumber}>+91{phoneNumber}</Text>
        </Text>

        <OTPTextInput
          handleTextChange={setOtp}
          inputCount={6}
          keyboardType="number-pad"
          tintColor="#F08200"
          offTintColor="#E5E7EB"
          containerStyle={styles.otpContainer}
          textInputStyle={styles.otpInput}
        />

        <TouchableOpacity
          style={[
            styles.verifyButton,
            isVerifyDisabled && styles.verifyButtonDisabled,
          ]}
          onPress={handleVerify}
          disabled={isVerifyDisabled}
        >
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.verifyButtonText}>Verify</Text>
          )}
        </TouchableOpacity>

        <View style={styles.resendContainer}>
          {timer > 0 ? (
            <Text style={styles.timerText}>
              Resend code in <Text style={styles.timerHighlight}>{timer}s</Text>
            </Text>
          ) : (
            <TouchableOpacity onPress={handleResend}>
              <Text style={styles.resendText}>Resend OTP</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  header: {
    padding: 20,
    paddingTop: 50,
  },
  backButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    flex: 1,
    paddingHorizontal: 32,
    alignItems: "center",
    justifyContent: "center",
    marginTop: -50,
  },
  icon: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 24,
  },
  phoneNumber: {
    fontWeight: "500",
    color: "#111827",
  },
  otpContainer: {
    marginBottom: 40,
  },
  otpInput: {
    borderWidth: 1,
    borderColor: "#F08200",
    borderRadius: 12,
    backgroundColor: "white",
    color: "#111827",
    fontSize: 20,
    fontWeight: "600",
    width: 52,
    height: 64,
  },
  verifyButton: {
    width: "100%",
    backgroundColor: "#FF9933",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  verifyButtonDisabled: {
    backgroundColor: "#9CA3AF",
    shadowColor: "transparent",
  },
  verifyButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  resendContainer: {
    marginTop: 24,
  },
  timerText: {
    color: "#6B7280",
    textAlign: "center",
    fontSize: 14,
  },
  timerHighlight: {
    color: "#111827",
    fontWeight: "600",
  },
  resendText: {
    color: "#4F46E5",
    textAlign: "center",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default OTPScreen;
