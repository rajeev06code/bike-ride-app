import { LocationProvider } from "@/context/UserLocationContext";
import { Redirect, router, Stack } from "expo-router";
import {
  StatusBar,
  TouchableOpacity,
  Platform,
  Linking,
  Image,
  StyleSheet,
  View,
  Text,
  ActivityIndicator,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

export default function AuthStack() {
  const handleCallPress = () => {
    const phoneNumber = "7461824651";

    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Linking.openURL(`telprompt:${phoneNumber}`);
    }
  };

  const [authState, setAuthState] = useState(false);
  const getFromStorage = async () => {
    const stored = await AsyncStorage.getItem("access_token");
    const values = await AsyncStorage.multiGet([
      'access_token',
      "user_info"
    ]);

  const result = values.reduce((acc, [key, value]) => {
    return { ...acc, [key]: value };
  }, {});

  const userParsedValue = JSON.parse(result.user_info).user_info
  const parsedToken = JSON.parse(result.access_token)
  console.log("the mutiple value---",JSON.parse(result.access_token))
    // if (parsedToken.access_token && !userParsedValue.document_status) {
    //   setAuthState(parsedToken.access_token)
    //   router.navigate("/(auth)/VerificationScreen");
    // }
  };

  // getFromStorage();
  // useEffect(() => {
  //   getFromStorage();
  // }, []);

  // useEffect(() => {
  //   if (authState === null) {
  //     router.replace("/"); // Redirect when token is missing
  //   }
  // }, [authState]);

  return (
    <LocationProvider>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen
          name="OnboardForm"
          options={{
            headerTitle: "",
            headerShown: true,

            headerRight: () => (
              <TouchableOpacity
                onPress={handleCallPress}
                style={styles.buttonContainer}
              >
                <Image
                  source={require("../../assets/images/support.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText}>Help</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="OtpScreen"
          options={{
            headerTitle: "",
            headerShown: true,

            headerRight: () => (
              <TouchableOpacity
                onPress={handleCallPress}
                style={styles.buttonContainer}
              >
                <Image
                  source={require("../../assets/images/support.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText}>Help</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="LanguageSelectionScreen"
          options={{
            headerTitle: "",
            headerShown: true,
            headerBackVisible: false,

            headerRight: () => (
              <TouchableOpacity
                onPress={handleCallPress}
                style={styles.buttonContainer}
              >
                <Image
                  source={require("../../assets/images/support.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText}>Help</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="VerificationScreen"
          options={{
            headerTitle: "",
            headerShown: true,
            headerBackVisible: false,

            headerRight: () => (
              <TouchableOpacity
                onPress={handleCallPress}
                style={styles.buttonContainer}
              >
                <Image
                  source={require("../../assets/images/support.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText}>Help</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="ProfileInfo"
          options={{
            headerTitle: "Profile Info",
            headerShown: true,

            headerRight: () => (
              <TouchableOpacity
                onPress={handleCallPress}
                style={styles.buttonContainer}
              >
                <Image
                  source={require("../../assets/images/support.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText}>Help</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="DrivingLicense"
          options={{
            headerTitle: "Driving License",
            headerShown: true,

            headerRight: () => (
              <TouchableOpacity
                onPress={handleCallPress}
                style={styles.buttonContainer}
              >
                <Image
                  source={require("../../assets/images/support.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText}>Help</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="AadhaarPan"
          options={{
            headerTitle: "Aadhaar/PAN",
            headerShown: true,

            headerRight: () => (
              <TouchableOpacity
                onPress={handleCallPress}
                style={styles.buttonContainer}
              >
                <Image
                  source={require("../../assets/images/support.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText}>Help</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="RcInfo"
          options={{
            headerTitle: "Vehicle RC",
            headerShown: true,
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "600", // or 'bold' for thicker text
              color: "#1F2937", // dark gray color
              fontFamily: "Inter-SemiBold", // if using custom font (make sure it's loaded)
            },

            headerRight: () => (
              <TouchableOpacity
                onPress={handleCallPress}
                style={styles.buttonContainer}
              >
                <Image
                  source={require("../../assets/images/support.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText}>Help</Text>
              </TouchableOpacity>
            ),
          }}
        />
        <Stack.Screen
          name="PaymentInfo"
          options={{
            headerTitle: "Add Bank Details",
            headerShown: true,
            headerTitleStyle: {
              fontSize: 20,
              fontWeight: "600", // or 'bold' for thicker text
              color: "#1F2937", // dark gray color
              fontFamily: "Inter-SemiBold", // if using custom font (make sure it's loaded)
            },

            headerRight: () => (
              <TouchableOpacity
                onPress={handleCallPress}
                style={styles.buttonContainer}
              >
                <Image
                  source={require("../../assets/images/support.png")}
                  style={styles.icon}
                  resizeMode="contain"
                />
                <Text style={styles.buttonText}>Help</Text>
              </TouchableOpacity>
            ),
          }}
        />
      </Stack>
    </LocationProvider>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    marginRight: 15,
  },
  icon: {
    width: 23,
    height: 23,
    tintColor: "#333",
    marginRight: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
});
