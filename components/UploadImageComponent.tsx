import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { launchCamera } from "react-native-image-picker";

const ImageUploader = ({ label, onImageSelected }) => {
  const [image, setImage] = useState(null);

  const handleUpload = () => {
    launchCamera({ mediaType: "photo", quality: 1 }, (response) => {
      if (response.didCancel) {
        console.log("User cancelled image picker");
      } else if (response.errorMessage) {
        console.log("ImagePicker Error: ", response.errorMessage);
      } else {
        const selectedImage = response?.assets[0];
        setImage(selectedImage);
        onImageSelected(selectedImage);
      }
    });
  };

  return (
    <TouchableOpacity
      style={[styles.uploadButton, image && styles.uploadedButton]}
      onPress={handleUpload}
    >
      {image ? (
        <Image
          source={{ uri: image.uri }}
          style={styles.previewImage}
          resizeMode="contain"
        />
      ) : (
        <View style={styles.uploadContent}>
          <Ionicons name="image-outline" size={20} color="#5c8df5" />
          <Text style={styles.uploadButtonText}>{label}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  uploadButton: {
    width: "100%",
    height: 120,
    borderWidth: 1.5,
    borderStyle: "dashed",
    borderColor: "#707070",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadedButton: {
    borderColor: "#5c8df5",
    borderStyle: "solid",
  },
  uploadContent: {
    alignItems: "center",
  },
  uploadButtonText: {
    marginTop: 8,
    fontSize: 14,
    color: "#5c8df5",
    fontWeight: "500",
  },
  previewImage: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
});

export default ImageUploader;