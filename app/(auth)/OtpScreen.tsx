import { verifyOTP } from "@/services/auth";
import { Link, router } from "expo-router";
import React, { useState, useEffect } from "react";
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

export type Userdata= {
  email:string
}

const OTPScreen = () => {
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(30);
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  console.log(otp)
  useEffect(() => {
    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem("email");
        if (value !== null) {
          setUserData(JSON.parse(value));
        }
      } catch (e) {
        // error reading value
      }
    };

    getData();
  }, []);
  // Timer effect
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  // Auto-read OTP (Android)
  //   useEffect(() => {
  //     if (Platform.OS === 'android') {
  //       const setupSMSListener = async () => {
  //         try {
  //           await SMSRetriever.startSmsRetriever();
  //           const message = await SMSRetriever.getSms();
  //           const otpMatch = message.match(/\b\d{6}\b/);
  //           if (otpMatch) setOtp(otpMatch[0]);
  //         } catch (error) {
  //           console.log('SMS retrieval error:', error);
  //         }
  //       };

  //       setupSMSListener();
  //     }
  //   }, []);

  const handleVerify = async () => {
    if (otp.length !== 6) {
      Alert.alert("Invalid OTP", "Please enter 6-digit code");
      return;
    }

    setIsLoading(true);
    try {
      const response = await verifyOTP(userData?.email, otp);
      console.log(response)
      if (response.status === 200) {
        router.navigate("/VerificationScreen");
        await AsyncStorage.multiRemove(['email']);
      }
      console.log(response);
      // Alert.alert("Success", "OTP has been sent to your email");
      // Navigate to OTP verification screen
    } catch (err) {
      // Alert.alert(JSON.stringify(error));
      // setError(err?.message || "Failed to send OTP");
    } finally {
      // setLoading(false);
    }
  };

  const handleResend = () => {
    setTimer(30);
    // Add resend OTP logic
  };
  const isVerifyDisabled = otp.length !== 6;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Verification Code</Text>
      <Text style={styles.subtitle}>Sent to +917461824651</Text>

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
          (isVerifyDisabled || isLoading) && styles.buttonDisabled,
        ]}
        onPress={handleVerify}
        disabled={isVerifyDisabled || isLoading}
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
    //   justifyContent: 'center',
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
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 20,
    fontSize: 14,
  },
});

export default OTPScreen;
