import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export const openImagePicker = async (options = {}) => {
  try {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images", "videos"],
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
     
      return {
        uri: result.assets[0].uri,
        mimeType: result.assets[0].mimeType,
        fileName: result.assets[0].fileName,
      };
    }
    return null;
  } catch (error) {
    console.error("Image picker error:", error);
    Alert.alert("Error", "Failed to pick image");
    return null;
  }
};

export const openCamera = async (options = {}) => {
  try {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();

    if (!permissionResult.granted) {
      Alert.alert(
        "Permission required",
        "Camera permission is needed to take photos"
      );
      return null;
    }

    const result = await ImagePicker.launchCameraAsync({
      cameraType: ImagePicker.CameraType.back,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      ...options, // Allows overriding default options
    });

    if (!result.canceled) {
      return {
        uri: result.assets[0].uri,
        mimeType: result.assets[0].mimeType,
        fileName: result.assets[0].fileName,
      }; // Return the captured image
    }
    return null;
  } catch (error) {
    console.error("Camera error:", error);
    Alert.alert("Error", "Failed to capture image");
    return null;
  }
};

// Optional: Combined function that lets user choose source
export const selectImageSource = async () => {
  const action = await new Promise((resolve) => {
    Alert.alert("Select Image", "Choose image source", [
      { text: "Camera", onPress: () => resolve("camera") },
      { text: "Gallery", onPress: () => resolve("gallery") },
      { text: "Cancel", onPress: () => resolve(null), style: "cancel" },
    ]);
  });

  if (action === "camera") {
    return await openCamera();
  } else if (action === "gallery") {
    return await openImagePicker();
  }
  return null;
};
