import PhotoSelectionModal from "@/components/PhotoSelectionModal;";
import { fileUploadForm } from "@/services/auth";
import { openCamera, openImagePicker } from "@/utils/imageUtils";
import { imagePickerResponseType } from "@/utils/types/typeUtils";
import { validateVehicleNUmber } from "@/utils/validationUtils";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Dimensions,
  Image,
  Alert,
  ActivityIndicator,
} from "react-native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

type OwnershipType = "Self Owned" | "Company Owned" | "Rented";

const VehicleRCForm = () => {
  const [ownership, setOwnership] = useState<OwnershipType>("Self Owned");
  const [ownerName, setOwnerName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [frontImageUploaded, setFrontImageUploaded] = useState(false);
  const [backImageUploaded, setBackImageUploaded] = useState(false);
  const [backImage, setBackImage] = useState<imagePickerResponseType>();
  const [frontImage, setFrontImage] = useState<imagePickerResponseType>();
  const [frontmodalVisible, setFrontModalVisible] = useState(false);
  const [backmodalVisible, setBackModalVisible] = useState(false);
  const [vehicleNumberError, setVehicleNumberError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmitRc = async () => {
    setLoading(true);

    if (!validateVehicleNUmber(vehicleNumber)) {
      setLoading(false);
      setVehicleNumberError("Invalid license number.");
      return;
    }

    try {
      const response = await fileUploadForm(
        "RC",
        ownerName,
        vehicleNumber,
        frontImage,
        backImage
      );
      if (response.status === 200) {
        setLoading(false);
        router.navigate("/VerificationScreen");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Failed to submit form");
    }
  };
  const handleUploadFrontPhotoFromGallery = async () => {
    const responseImage = await openImagePicker({
      aspect: [1, 1],
      allowsEditing: true,
    });
    if (responseImage) {
      setFrontImage(responseImage);
    }
    setFrontModalVisible(false);
  };
  const handleUploadBackPhotoFromGallery = async () => {
    const responseImage = await openImagePicker({
      aspect: [1, 1],
      allowsEditing: true,
    });
    if (responseImage) {
      setBackImage(responseImage);
    }
    setBackModalVisible(false);
  };
  const handleTakeFrontPhotoPhoto = async () => {
    const responseImage = await openCamera({
      quality: 1,
    });
    if (responseImage) {
      setFrontImage(responseImage);
    }
    setFrontModalVisible(false);
  };
  const handleTakeBackPhotoPhoto = async () => {
    const responseImage = await openCamera({
      quality: 1,
    });
    if (responseImage) {
      setBackImage(responseImage);
    }
    setBackModalVisible(false);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
    >
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.form}>
            {/* Header */}
            {/* <View style={styles.header}>
              <Text style={styles.headerTitle}>Vehicle RC Details</Text>
            </View> */}

            {/* Owner Name Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Vehicle Owner Name</Text>
              <TextInput
                style={styles.input}
                value={ownerName}
                onChangeText={setOwnerName}
                placeholder="Enter vehicle owner name"
                placeholderTextColor="#9CA3AF"
                returnKeyType="next"
              />
            </View>

            {/* Vehicle Number Input */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Enter vehicle number</Text>
              <TextInput
                style={styles.input}
                value={vehicleNumber}
                onChangeText={setVehicleNumber}
                placeholder="Eg: KA01AB1234"
                placeholderTextColor="#9CA3AF"
                returnKeyType="done"
                onSubmitEditing={Keyboard.dismiss}
              />
              {vehicleNumberError && (
                <Text style={{ color: "red" }}>{vehicleNumberError}</Text>
              )}
            </View>

            {/* RC Images Upload Section */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Upload RC Images</Text>
              <View style={styles.uploadContainer}>
                <View
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                >
                  {" "}
                  <TouchableOpacity
                    style={[
                      styles.uploadButton,
                      frontImage && styles.uploadedButton,
                    ]}
                    onPress={() => {
                      setFrontModalVisible(true);
                    }}
                  >
                    {frontImage ? (
                      <View
                        style={[
                          styles.imageContainer,
                          backImage && styles.uploadedButton,
                        ]}
                      >
                        <Image
                          source={{ uri: frontImage.uri }}
                          style={styles.uploadedImage}
                        />

                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => setFrontImage(null)}
                        >
                          <Ionicons
                            name="close-circle"
                            size={24}
                            color="#EF4444"
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <>
                        <Ionicons
                          name="image-outline"
                          size={32}
                          color="#4F46E5"
                        />
                        <Text style={styles.uploadButtonText}>
                          UPLOAD FRONT SIDE
                        </Text>
                      </>
                    )}
                  </TouchableOpacity>{" "}
                </View>

                <View
                  style={{ display: "flex", flexDirection: "column", flex: 1 }}
                >
                  <TouchableOpacity
                    style={[
                      styles.uploadButton,
                      // backImage && styles.uploadedButton,
                    ]}
                    onPress={() => {
                      setBackModalVisible(true);
                    }}
                  >
                    {backImage ? (
                      <View
                        style={[
                          styles.imageContainer,
                          backImage && styles.uploadedButton,
                        ]}
                      >
                        <Image
                          source={{ uri: backImage.uri }}
                          style={styles.uploadedImage}
                        />

                        <TouchableOpacity
                          style={styles.removeButton}
                          onPress={() => setBackImage(null)}
                        >
                          <Ionicons
                            name="close-circle"
                            size={24}
                            color="#EF4444"
                          />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <>
                        <Ionicons
                          name="image-outline"
                          size={32}
                          color="#4F46E5"
                        />
                        <Text style={styles.uploadButtonText}>BACK SIDE</Text>
                      </>
                    )}
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <PhotoSelectionModal
              visible={frontmodalVisible}
              onClose={() => setFrontModalVisible(false)}
              onCameraPress={handleTakeFrontPhotoPhoto}
              onGalleryPress={handleUploadFrontPhotoFromGallery}
              onRemovePress={() => {
                setFrontImage(null);
                setFrontModalVisible(false);
              }}
              title="Update Profile Photo"
            />
            <PhotoSelectionModal
              visible={backmodalVisible}
              onClose={() => setBackModalVisible(false)}
              onCameraPress={handleTakeBackPhotoPhoto}
              onGalleryPress={handleUploadBackPhotoFromGallery}
              onRemovePress={() => {
                setBackImage(null);
                setBackModalVisible(false);
              }}
              title="Update Profile Photo"
            />
            {/* Submit Button */}
            <TouchableOpacity
              style={[
                styles.submitButton,
                (!ownerName || !vehicleNumber || !frontImage || !backImage) &&
                  styles.disabledButton,
              ]}
              onPress={handleSubmitRc}
              disabled={
                !ownerName || !vehicleNumber || !frontImage || !backImage
              }
            >
              {loading ? (
                <ActivityIndicator color="white" />
              ) : (
                <Text style={styles.submitButtonText}>Submit</Text>
              )}
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
    textAlign: "center",
  },
  form: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  imageContainer: {
    width: "100%",
    height: 140,
    borderRadius: 12,
    position: "relative",
  },
  removeButton: {
    position: "absolute",
    top: -20,
    right: -10,
    backgroundColor: "white",
    borderRadius: "50%",
    padding: 2,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  dropdown: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdownText: {
    fontSize: 16,
    color: "#111827",
  },
  input: {
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "white",
  },
  section: {
    marginTop: 16,
    marginBottom: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  uploadContainer: {
    width: "100%",
    gap: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  uploadButton: {
    width: "100%",
    height: 140,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F3F4F6",
  },
  uploadBottomButton: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    borderRadius: 12,
    marginTop: 5,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#aaa6f2",
  },
  uploadedButton: {
    borderStyle: "solid",
    borderColor: "#10B981",
    backgroundColor: "#ECFDF5",
  },
  uploadedImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  uploadButtonText: {
    marginTop: 8,
    fontSize: 14,
    fontWeight: "500",
    color: "#4F46E5",
  },
  submitButton: {
    height: 56,
    backgroundColor: "#F08200",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 24,
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
  submitButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
});

export default VehicleRCForm;
