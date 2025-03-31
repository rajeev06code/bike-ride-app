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
  const [frontImage, setFrontImage] = useState<string | null>(null);
  const [backImage, setBackImage] = useState<string | null>(null);

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
              <ImageUploader
                label="FRONT SIDE"
                onImageSelected={setFrontImage}
                image={frontImage}
              />
              <ImageUploader
                label="BACK SIDE"
                onImageSelected={setBackImage}
                image={backImage}
              />
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
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onCameraPress={() => console.log("Camera pressed")}
            onGalleryPress={() => console.log("Gallery pressed")}
            onRemovePress={() => console.log("Remove pressed")}
            title="Choose Image"
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!documentNumber || !frontImage || !backImage) && styles.disabledButton,
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
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 16,
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
    backgroundColor: "#4F46E5",
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