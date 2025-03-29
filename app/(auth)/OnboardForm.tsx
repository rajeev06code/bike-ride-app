import { requestOTP } from "@/services/auth";
import { Link, router } from "expo-router";
import React, { useState } from "react";
import { Alert } from "react-native";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Config from "react-native-config";
import Icon from "react-native-vector-icons/FontAwesome";
import AsyncStorage from "@react-native-async-storage/async-storage";

const PhoneNumberScreen = () => {
  const [email, setEmail] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [useFormData, setUseFormData] = useState<boolean>(false);

  const handleRequestOTP = async () => {
    if (!email) {
      setError("Email is required");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await requestOTP(email, "driver");
      if (response.status === 200) {
        router.navigate({
          pathname: "/OtpScreen",
          params: { email: email }
        });
        // router.navigate("/OtpScreen");
      }
      console.log(response);
    } catch (err: any) {
      Alert.alert(err.message || "An error occurred");
      setError(err?.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <View style={styles.headerContainer}>
          <Icon name="mobile-phone" size={50} />
          <Text style={styles.title}>Enter your Email to Drive</Text>
        </View>
        
        <View style={styles.emailInputContainer}>
          <TextInput
            style={styles.emailInput}
            placeholder="xyz@email.com"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
            autoCorrect={false}
          />
        </View>
      </View>
      
      <View>
        <Link href="/OtpScreen" asChild>
          <TouchableOpacity
            style={styles.primaryButton}
            onPress={handleRequestOTP}
            disabled={loading}
          >
            <Text style={styles.primaryButtonText}>
              {loading ? "Processing..." : "Proceed"}
            </Text>
          </TouchableOpacity>
        </Link>
        
        <View style={styles.termsContainer}>
          <Text>
            Please read our
            <Text style={styles.termsLink}> terms and conditions </Text>before
            proceeding.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
    height: "100%",
    padding: 20,
    justifyContent: "space-between",
    backgroundColor: "white",
  },
  headerContainer: {
    display: "flex",
    width: "100%",
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
    height: 60,
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
  },
  emailInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  emailInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
  },
  termsContainer: {
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  termsLink: {
    color: "blue",
  },
  primaryButton: {
    backgroundColor: "#F08200",
    padding: 15,
    alignItems: "center",
    marginBottom: 15,
    borderRadius: 25,
  },
  primaryButtonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PhoneNumberScreen;