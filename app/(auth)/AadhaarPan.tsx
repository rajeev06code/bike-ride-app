import React, { useState } from "react";
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
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";

import ImageUploader from "@/components/UploadImageComponent";
import PhotoSelectionModal from "@/components/PhotoSelectionModal;";
import { openCamera, openImagePicker } from "@/utils/imageUtils";

type IDType = "AADHAAR" | "PAN";

interface AadhaarScreenProps {
  onClose: () => void;
  onSubmit: (data: {
    idType: IDType;
    documentNumber: string;
    frontImage: string | null;
    backImage: string | null;
  }) => void;
}

const AadhaarScreen: React.FC<AadhaarScreenProps> = ({ onClose, onSubmit }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [documentNumber, setDocumentNumber] = useState("");
  const [selectedID, setSelectedID] = useState<IDType>("AADHAAR");
  const [backImage, setBackImage] = useState<string | null>(null);
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [frontmodalVisible, setFrontModalVisible] = useState(false);
  const [backmodalVisible, setBackModalVisible] = useState(false);

  const handleSubmit = () => {
    if (!documentNumber || !frontImage || !backImage) {
      Alert.alert("Error", "Please fill all fields and upload both images");
      return;
    }

    onSubmit({
      idType: selectedID,
      documentNumber,
      frontImage,
      backImage,
    });
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
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Select ID Type */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Select ID Type</Text>
            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={selectedID}
                onValueChange={(itemValue: IDType) => setSelectedID(itemValue)}
                dropdownIconColor="#6B7280"
                style={styles.picker}
              >
                <Picker.Item label="Aadhaar Card" value="AADHAAR" />
                <Picker.Item label="PAN Card" value="PAN" />
              </Picker>
            </View>
          </View>

          {/* Upload Images Section */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Upload {selectedID === "AADHAAR" ? "Aadhaar" : "PAN"} Images
            </Text>
            <View style={styles.uploadContainer}>
              <TouchableOpacity
                style={[
                  styles.uploadButton,
                  // frontImage && styles.uploadedButton,
                ]}
                onPress={() => {
                  setFrontModalVisible(true);
                }}
              >
                {frontImage ? (
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: frontImage }}
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
                  <>
                    <Ionicons name="image-outline" size={32} color="#4F46E5" />
                    <Text style={styles.uploadButtonText}>FRONT SIDE</Text>
                  </>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.uploadButton,
                  frontImage && styles.uploadedButton,
                ]}
                onPress={() => {
                  setBackModalVisible(true);
                }}
              >
                {backImage ? (
                  <View style={styles.imageContainer}>
                    <Image
                      source={{ uri: backImage }}
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
                  <>
                    <Ionicons name="image-outline" size={32} color="#4F46E5" />
                    <Text style={styles.uploadButtonText}>BACK SIDE</Text>
                  </>
                )}
              </TouchableOpacity>
            </View>
          </View>

          {/* Document Number Input */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>
              Enter {selectedID === "AADHAAR" ? "Aadhaar" : "PAN"} Number
            </Text>
            <TextInput
              style={styles.input}
              placeholder={
                selectedID === "AADHAAR"
                  ? "Eg: 1234 5678 9012"
                  : "Eg: ABCDE1234F"
              }
              placeholderTextColor="#9CA3AF"
              value={documentNumber}
              onChangeText={setDocumentNumber}
              keyboardType={selectedID === "AADHAAR" ? "number-pad" : "default"}
              maxLength={selectedID === "AADHAAR" ? 14 : 10}
            />
            <Text style={styles.helperText}>
              {selectedID === "AADHAAR"
                ? "Enter 12-digit Aadhaar number without spaces"
                : "Enter 10-character PAN number"}
            </Text>
          </View>

          {/* Photo Selection Modal */}
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
              (!documentNumber || !frontImage || !backImage) &&
                styles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={!documentNumber || !frontImage || !backImage}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
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
  uploadButton: {
    width: "100%",
    height: 140,
    borderWidth: 2,
    borderStyle: "dashed",
    borderColor: "#D1D5DB",

    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    // backgroundColor: "#F3F4F6",
  },
  aadhaarImage: {
    width: "100%",
    height: 140,

    borderRadius: 12,
    objectFit: "cover",
    // backgroundColor: "#F3F4F6",
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
  section: {
    marginHorizontal: 20,
    marginTop: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#374151",
    marginBottom: 12,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    overflow: "hidden",
    backgroundColor: "white",
  },
  picker: {
    height: 56,
    color: "#111827",
  },
  uploadContainer: {
    flexDirection: "column",
    justifyContent: "space-between",
    gap: 16,
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
  input: {
    height: 56,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "white",
  },
  helperText: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 8,
  },
  submitButton: {
    height: 56,
    backgroundColor:"#F08200",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
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

export default AadhaarScreen;
