import { Redirect, Stack } from "expo-router";
import { useState } from "react";
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import LottieView from "lottie-react-native";
import animationData from "../assets/animations/Online Delivery Service.json";
import { StyleSheet, Text, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [isLoggedIn,setIsLoggedIn]=useState(false)
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
   
    const getFromStorage = async () => {
      const stored = await AsyncStorage.getItem("access_token");
     
      // if (stored) setIsLoggedIn(JSON.parse(stored));
    };
    
    getFromStorage();
  }, []);
  useEffect(() => {
    const timer = setTimeout(()=>{
      SplashScreen.hideAsync();
    },2000)
    return () => clearTimeout(timer);
  }, [])
  //   useEffect(() => {
  //   // Simulate loading process
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 3000);

  //   return () => clearTimeout(timer);
  // }, []);
  // if (isLoading) {
  //   return (
  //     <View style={styles.splashContainer}>
  //       <LottieView
  //         source={animationData}
  //         autoPlay
  //         loop
  //         style={styles.splashImage}
  //       />
  //         <Text style={styles.madeInIndiaText}> Made in India 🇮🇳 </Text>
  //         <Text style={styles.versiontext} >Version 1.0.0</Text>
  //     </View>
  //   );
  // }


  // const checkAuthStatus = useCallback(async () => {
  //   try {
  //     const token = await AsyncStorage.getItem("access_token");
  //     const userData = await AsyncStorage.getItem("user_data");
      
  //     // Validate token existence and optionally its format/expiry
  //     setIsLoggedIn(!!token);
  //   } catch (error) {
  //     console.error("Error checking auth status:", error);
  //     setIsLoggedIn(false);
  //   } finally {
  //     setIsLoading(false);
  //     await SplashScreen.hideAsync();
  //   }
  // }, []);

  // useEffect(() => {
  //   checkAuthStatus();
  // }, [checkAuthStatus]);
  return (
   <>
   <Stack screenOptions={{ headerShown: false }}/>
   {isLoggedIn ? <Redirect href={"/(main)"}/>:<Redirect href={"/(auth)"}/>}
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
    position: 'absolute',
    bottom: 70,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF9933', // Saffron color
  },
  versiontext: {
    position: 'absolute',
    bottom: 40,
    fontSize: 16,
   
  },
});