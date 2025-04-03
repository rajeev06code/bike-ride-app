import { Redirect, Stack } from "expo-router";
import { useState } from "react";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import LottieView from "lottie-react-native";
import animationData from "../assets/animations/Online Delivery Service.json";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { LocationProvider } from "@/context/UserLocationContext";

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showMain, setShowMain] = useState(false);
  const [showVerification, setShowVerification] = useState(false);
  const [onboarding, setOnboarding] = useState(false);
  console.log("is logged", showMain, showVerification, onboarding);

  const getFromStorage = async () => {
    try {
      const values = await AsyncStorage.multiGet(["access_token", "user_info"]);
      const result = values.reduce((acc, [key, value]) => {
        return { ...acc, [key]: value };
      }, {});

      console.log("Raw storage values:", result);

      let accessToken = null;
      if (result.access_token) {
        try {
          const firstParse = JSON.parse(result.access_token);
          accessToken =
            typeof firstParse === "string"
              ? firstParse
              : firstParse.access_token;
        } catch (e) {
          console.error("Failed to parse access_token:", e);
        }
      }

      let userInfo = null;
      if (result.user_info) {
        try {
          userInfo = JSON.parse(result.user_info);
        } catch (e) {
          console.error("Failed to parse user_info:", e);
        }
      }

      console.log("Parsed values:", {
        accessToken,
        userInfo,
      });

      if (accessToken && userInfo?.user_info?.document_status) {
        setShowMain(true);
      } else if (accessToken) {
        setShowVerification(true);
      } else {
        setOnboarding(true);
      }
    } catch (error) {
      console.error("Error in getFromStorage:", error);
    }
  };

  useEffect(() => {
    getFromStorage();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      SplashScreen.hideAsync();
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <LocationProvider>
        <Stack screenOptions={{ headerShown: false }} />
        {showMain ? (
          <Redirect href={"/(main)"} />
        ) : onboarding ? (
          <Redirect href={"/(auth)"} />
        ) : showVerification ? (
          <Redirect href={"/(auth)/VerificationScreen"} />
        ) : null}
      </LocationProvider>
    </>
  );
}

const styles = StyleSheet.create({
  splashImage: {
    width: "50%",
    height: "50%",
    resizeMode: "contain",
  },
  splashContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  madeInIndiaText: {
    position: "absolute",
    bottom: 70,
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF9933", // Saffron color
  },
  versiontext: {
    position: "absolute",
    bottom: 40,
    fontSize: 16,
  },
});
