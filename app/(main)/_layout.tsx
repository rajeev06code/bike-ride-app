import { LocationProvider } from "@/context/UserLocationContext";
import { Stack } from "expo-router";

export default function MainStack() {
  return (
    <LocationProvider>
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false}} />
    </Stack>
    </LocationProvider>
  );
}

// const styles = StyleSheet.create({
//   buttonContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "center",
//     paddingHorizontal: 14,
//     paddingVertical: 6,
//     backgroundColor: "#f0f0f0", // Light gray background
//     borderRadius: 20, // Rounded corners
//     marginRight: 15,
//   },
//   icon: {
//     width: 23,
//     height: 23,
//     tintColor: "#333",
//     marginRight: 6, // Space between icon and text
//   },
//   buttonText: {
//     fontSize: 16,
//     fontWeight: "bold",
//     color: "#333", // Dark gray text
//   },
// });
