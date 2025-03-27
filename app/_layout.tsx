import { Stack } from "expo-router";
import {
  StatusBar,
  TouchableOpacity,
  Platform,
  Linking,
  Image,
  StyleSheet,
  View,
  Text,
} from "react-native";


export default function RootLayout() {
  const handleCallPress = () => {
    const phoneNumber = "7461824651";

 
    if (Platform.OS === "android") {
      Linking.openURL(`tel:${phoneNumber}`);
    } else {
      Linking.openURL(`telprompt:${phoneNumber}`);
    }
  };
  return (
    <Stack >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen
        name="OnboardForm"
        options={{
          headerTitle: "",
          // headerStyle:{backgroundColor:"grey"},

          headerRight: () => (
            <TouchableOpacity
              onPress={handleCallPress}
              style={styles.buttonContainer}
            >
              <Image
                source={require("../../bike-ride-app/assets/images/support.png")}
                style={styles.icon}
                resizeMode="contain"
              />{" "}
              <Text style={styles.buttonText}>Help</Text>
            </TouchableOpacity>
          ),
        }}
      />
        <Stack.Screen
        name="OtpScreen"
        options={{
          headerTitle: "",
          // headerStyle:{backgroundColor:"grey"},

          headerRight: () => (
            <TouchableOpacity
              onPress={handleCallPress}
              style={styles.buttonContainer}
            >
              <Image
                source={require("../../bike-ride-app/assets/images/support.png")}
                style={styles.icon}
                resizeMode="contain"
              />{" "}
              <Text style={styles.buttonText}>Help</Text>
            </TouchableOpacity>
          ),
        }}
      />
         <Stack.Screen
        name="VerificationScreen"
        options={{
          headerTitle: "",
          // headerStyle:{backgroundColor:"grey"},

          headerRight: () => (
            <TouchableOpacity
              onPress={handleCallPress}
              style={styles.buttonContainer}
            >
              <Image
                source={require("../../bike-ride-app/assets/images/support.png")}
                style={styles.icon}
                resizeMode="contain"
              />{" "}
              <Text style={styles.buttonText}>Help</Text>
            </TouchableOpacity>
          ),
        }}
      />
    </Stack>
    
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    paddingVertical: 6,
    backgroundColor: "#f0f0f0", // Light gray background
    borderRadius: 20, // Rounded corners
    marginRight: 15,
  },
  icon: {
    width: 23,
    height: 23,
    tintColor: "#333",
    marginRight: 6, // Space between icon and text
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333", // Dark gray text
  },
});
