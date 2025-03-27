import { Link } from "expo-router";
import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

const PhoneNumberScreen = () => {
  return (
    <View style={styles.container}>
      <View>
        <View
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            gap: "10",
            alignItems: "center",
            height: 60,
            marginBottom: 20,
          }}
        >
          <Icon name="mobile-phone" size={50} />
          <Text style={styles.title}>Enter your Phone Number to Drive</Text>
        </View>
        <View style={styles.phoneInputContainer}>
          <Text style={styles.countryCode}>+91</Text>
          <TextInput
            style={styles.phoneInput}
            placeholder="Enter your Phone Number"
            keyboardType="phone-pad"
            maxLength={10}
          />
        </View>
      </View>
      <View>
        <Link
          href="/OtpScreen"
          asChild
          // style={[
          //   styles.registerButtonText,
          //   { color: colors.background },
          // ]}
        >
          <TouchableOpacity style={styles.primaryButton}>
            <Text style={styles.primaryButtonText}>Proceed</Text>
          </TouchableOpacity>
        </Link>
        <View style={{ marginBottom: 10, paddingHorizontal: 5 }}>
          <Text>
            {/* <Icons name="info" size={15} color="#F08200" />  */}
            Please read our
            <Text style={{ color: "blue" }}> terms and conditions </Text>before
            procedding.
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
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    // marginBottom: 30,
  },
  phoneInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    marginBottom: 30,
    paddingBottom: 10,
  },
  countryCode: {
    fontSize: 18,
    marginRight: 10,
    fontWeight: "bold",
  },
  phoneInput: {
    flex: 1,
    fontSize: 18,
    paddingVertical: 5,
  },
  termsText: {
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
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
  secondaryButton: {
    padding: 15,
    alignItems: "center",
    marginBottom: 20,
  },
  secondaryButtonText: {
    color: "#25D366",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default PhoneNumberScreen;
