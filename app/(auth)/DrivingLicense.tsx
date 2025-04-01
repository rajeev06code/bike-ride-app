import React, { useRef, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PhotoSelectionModal from "@/components/PhotoSelectionModal;";
import { openCamera, openImagePicker } from "@/utils/imageUtils";
import { imagePickerResponseType } from "@/utils/types/typeUtils";
import { validateDL, validateVehicleNUmber } from "@/utils/validationUtils";
import { fileUploadForm } from "@/services/auth";
import { router } from "expo-router";

type DrivingLicenseScreenProps = {
  onClose: () => void;
  onSubmit: (data: {
    licenseNumber: string;
    frontImageUploaded: boolean;
    backImageUploaded: boolean;
  }) => void;
};

const DrivingLicenseScreen: React.FC<DrivingLicenseScreenProps> = ({
  onClose,
  onSubmit,
}) => {
  const [frontmodalVisible, setFrontModalVisible] = useState(false);
  const [backmodalVisible, setBackModalVisible] = useState(false);
  const [licenseNumber, setLicenseNumber] = useState("");
  const [frontImageUploaded, setFrontImageUploaded] = useState(false);
  const [backImageUploaded, setBackImageUploaded] = useState(false);
  const [backImage, setBackImage] = useState<imagePickerResponseType>();
  const [frontImage, setFrontImage] = useState<imagePickerResponseType>();
  const [licenseError, setLicenseError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFrontUpload = () => {
    setFrontImageUploaded(true);
  };

  const handleBackUpload = () => {
    setBackImageUploaded(true);
  };

  // const handleSubmit = () => {
  //   if (!licenseNumber) {
  //     setLicenseError("Please enter your driving license number.");
  //     return;
  //   } else if (!/^[A-Z]{2}[0-9]{13}$/i.test(licenseNumber)) {
  //     setLicenseError("Invalid license number format.");
  //     return;
  //   }

  //   setLicenseError(null);
  //   onSubmit({
  //     licenseNumber,
  //     frontImageUploaded,
  //     backImageUploaded,
  //   });
  // };
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
  const scrollViewRef = useRef<ScrollView>(null);

  const handleInputFocus = () => {
    // Scroll to the input field when focused
    setTimeout(() => {
      scrollViewRef.current?.scrollToEnd({ animated: true });
    }, 100);
  };

  const handleSubmitDl = async () => {
    setLoading(true);
 
    if (!validateDL(licenseNumber)) {
     
      setLoading(false);
      setLicenseError("Invalid license number.");
      return;
    }

    try {
      const response = await fileUploadForm(
        "DL",
        "",
        licenseNumber,
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
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="interactive"
          contentInsetAdjustmentBehavior="automatic"
          automaticallyAdjustContentInsets={true}
          showsVerticalScrollIndicator={false}
        >
          {/* Front Side Upload Section */}

          {frontImage ? (
            <View style={styles.uploadSectionImage}>
              <Image
                source={{ uri: frontImage.uri }}
                style={styles.aadhaarImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => setFrontImage(null)}
              >
                <Ionicons name="close-circle" size={24} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.uploadSection}>
              <View style={styles.uploadIconContainer}>
                <Ionicons
                  name="document-outline"
                  size={32}
                  color={backImageUploaded ? "#4F46E5" : "#9CA3AF"}
                />
              </View>
              <Text style={styles.uploadTitle}>Back side of your DL</Text>

              <TouchableOpacity
                style={[styles.uploadButton, styles.uploadButtonPrimary]}
                onPress={() => setFrontModalVisible(true)}
              >
                <Ionicons name={"cloud-upload"} size={18} color={"white"} />
                <Text
                  style={[
                    styles.uploadButtonText,
                    // frontImage && styles.uploadButtonTextSuccess,
                  ]}
                >
                  {frontImage ? "Change Photo" : "Upload Photo"}
                </Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Back Side Upload Section */}
          {/* <View style={styles.uploadSection}> */}
          {backImage ? (
            <View style={styles.uploadSectionImage}>
              <Image
                source={{ uri: backImage.uri }}
                style={styles.aadhaarImage}
                resizeMode="cover"
              />
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => setBackImage(null)}
              >
                <Ionicons name="close-circle" size={24} color="#EF4444" />
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.uploadSection}>
              <View style={styles.uploadIconContainer}>
                <Ionicons
                  name="document-outline"
                  size={32}
                  color={backImageUploaded ? "#4F46E5" : "#9CA3AF"}
                />
              </View>
              <Text style={styles.uploadTitle}>Back side of your DL</Text>
              <TouchableOpacity
                style={[
                  styles.uploadButton,
                  backImageUploaded
                    ? styles.uploadButtonSuccess
                    : styles.uploadButtonPrimary,
                ]}
                onPress={() => setBackModalVisible(true)}
              >
                <Ionicons
                  name={backImageUploaded ? "checkmark-circle" : "cloud-upload"}
                  size={18}
                  color={backImageUploaded ? "#10B981" : "white"}
                />
                <Text
                  style={[
                    styles.uploadButtonText,
                    backImageUploaded && styles.uploadButtonTextSuccess,
                  ]}
                >
                  {backImageUploaded ? "Uploaded" : "Upload Photo"}
                </Text>
              </TouchableOpacity>
            </View>
          )}
          {/* </View> */}

          {/* License Number Input */}
          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Enter Driving License number</Text>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="KA123456778990Z9"
                placeholderTextColor="#9CA3AF"
                value={licenseNumber}
                onChangeText={setLicenseNumber}
                onFocus={handleInputFocus}
              />
              <TouchableOpacity style={styles.infoButton}>
                <Ionicons
                  name="information-circle-outline"
                  size={24}
                  color="#4F46E5"
                />
              </TouchableOpacity>
            </View>
            <Text style={styles.inputExample}>Example: KA123456778990Z9</Text>
            {licenseError && (
              <Text style={{ color: "red" }}>{licenseError}</Text>
            )}
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
              (!licenseNumber || !frontImage || !backImage) &&
                styles.disabledButton,
            ]}
            onPress={handleSubmitDl}
            disabled={!licenseNumber || !frontImage || !backImage}
          >
            {loading ? (
              <ActivityIndicator color="white" />
            ) : (
              <Text style={styles.submitButtonText}>Submit</Text>
            )}
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  keyboardAvoidView: {
    flex: 1,
  },
  dlfront: {
    width: "100%",
    height: 100,
    borderRadius: 5,
    objectFit: "cover",
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },
  headerRightPlaceholder: {
    width: 24,
  },
  uploadSection: {
    margin: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",
    borderRadius: 12,
    padding: 20,
    backgroundColor: "white",
    alignItems: "center",
  },
  uploadSectionImage: {
    margin: 16,
    marginBottom: 12,
    borderRadius: 12,
    padding: 0,
    height: 200,
    backgroundColor: "white",
    alignItems: "center",
  },
  uploadIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 4,
    textAlign: "center",
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
  },
  aadhaarImage: {
    width: "100%",
    height: "100%",

    borderRadius: 12,
    objectFit: "cover",
    // backgroundColor: "#F3F4F6",
  },
  uploadSubtitle: {
    fontSize: 14,
    color: "#6B7280",
    marginBottom: 16,
    textAlign: "center",
  },
  uploadButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: "100%",
    marginTop: 10,
  },
  uploadButtonPrimary: {
    backgroundColor: "grey",
  },
  uploadButtonSuccess: {
    backgroundColor: "#ECFDF5",
    borderWidth: 1,
    borderColor: "#10B981",
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: "500",
    color: "white",
    marginLeft: 8,
  },
  uploadButtonTextSuccess: {
    color: "#10B981",
  },
  inputSection: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "white",
    height: 56,
    paddingRight: 8,
  },
  input: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 18,
    fontSize: 16,
    fontWeight: "bold",
    color: "#111827",
  },
  infoButton: {
    padding: 8,
  },
  inputExample: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 8,
  },
  submitButton: {
    height: 56,
    backgroundColor: "#F08200",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 16,
    marginTop: 8,
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

export default DrivingLicenseScreen;
