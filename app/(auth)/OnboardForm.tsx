import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { requestOTP } from "@/services/auth";

const PhoneNumberScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestOTP = async () => {
    if (!phoneNumber) {
      setError("Phone number is required");
      return;
    }

    if (phoneNumber.length !== 10) {
      setError("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await requestOTP(phoneNumber, "driver");
      if (response.status === 200) {
        router.navigate({
          pathname: "/OtpScreen",
          params: { phoneNumber: `+91${phoneNumber}` },
        });
      }
    } catch (err: any) {
      Alert.alert("Error", err.message || "Failed to send OTP");
      setError(err?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const clearToken = async () => {
    await AsyncStorage.removeItem("access_token");
    Alert.alert("Success", "Access token cleared");
  };

  return (
    <View style={styles.container}>
      {/* Header Section */}
      <View style={styles.header}>
        <Ionicons name="phone-portrait-outline" size={48} color="#FF9933" />
        <Text style={styles.title}>Enter Your Phone Number</Text>
        <Text style={styles.subtitle}>
          We'll send you a verification code to get started
        </Text>
      </View>

      {/* Phone Input Section */}
      <View style={styles.inputContainer}>
        <View style={styles.phoneInputWrapper}>
          <View style={styles.countryCode}>
            <Text style={styles.countryCodeText}>+91</Text>
          </View>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter 10-digit number"
            placeholderTextColor="#9CA3AF"
            keyboardType="phone-pad"
            value={phoneNumber}
            onChangeText={(text) => {
              setPhoneNumber(text.replace(/[^0-9]/g, ""));
              setError(null);
            }}
            maxLength={10}
          />
        </View>
        {error && <Text style={styles.errorText}>{error}</Text>}
      </View>

      {/* Action Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.primaryButton, loading && styles.disabledButton]}
          onPress={handleRequestOTP}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="white" />
          ) : (
            <Text style={styles.primaryButtonText}>Continue</Text>
          )}
        </TouchableOpacity>

        {/* Developer Button - Hidden in production */}
        {__DEV__ && (
          <TouchableOpacity
            style={styles.devButton}
            onPress={clearToken}
          >
            <Text style={styles.devButtonText}>Clear Token (Dev)</Text>
          </TouchableOpacity>
        )}
      </View>

      {/* Terms and Conditions */}
      <View style={styles.termsContainer}>
        <Text style={styles.termsText}>
          By continuing, you agree to our{" "}
          <Text style={styles.termsLink}>Terms of Service</Text> and{" "}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
    paddingHorizontal: 24,
    paddingTop: 48,
    paddingBottom: 32,
  },
  header: {
    alignItems: "center",
    marginBottom: 48,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#111827",
    marginTop: 16,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    textAlign: "center",
    maxWidth: 300,
  },
  inputContainer: {
    marginBottom: 32,
  },
  phoneInputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 56,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  countryCode: {
    paddingRight: 12,
    borderRightWidth: 1,
    borderRightColor: "#E5E7EB",
    marginRight: 12,
  },
  countryCodeText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  phoneInput: {
    flex: 1,
    fontSize: 16,
    color: "#111827",
    height: "100%",
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
    marginTop: 8,
    marginLeft: 4,
  },
  buttonContainer: {
    marginBottom: 24,
  },
  primaryButton: {
    backgroundColor:"#FF9933",
    borderRadius: 12,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#4F46E5",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#9CA3AF",
    shadowColor: "transparent",
  },
  primaryButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
  devButton: {
    marginTop: 16,
    padding: 12,
    alignItems: "center",
  },
  devButtonText: {
    color: "#EF4444",
    fontSize: 14,
  },
  termsContainer: {
    marginTop: "auto",
    paddingHorizontal: 16,
  },
  termsText: {
    color: "#6B7280",
    fontSize: 14,
    textAlign: "center",
  },
  termsLink: {
    color: "#4F46E5",
    fontWeight: "500",
  },
});

export default PhoneNumberScreen;