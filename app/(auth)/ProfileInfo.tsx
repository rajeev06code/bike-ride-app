import React, { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
  Button,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Picker } from "@react-native-picker/picker";
import { openCamera, openImagePicker } from "@/utils/imageUtils";
import { profileForm } from "@/services/auth";
import { router } from "expo-router";

import DateTimePicker from "@react-native-community/datetimepicker";
import DatePicker from "react-native-date-picker";
import PhotoSelectionModal from "@/components/PhotoSelectionModal;";
import { imagePickerResponseType } from "@/utils/types/typeUtils";

type GenderType = "Male" | "Female" | "Other" | null;

const ProfileInfo = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [loading, setLoading] = useState(false);
  const [lastName, setLastName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [image, setImage] = useState<imagePickerResponseType>();
  const [gender, setGender] = useState<GenderType>(null);

  const handleProfilePictureUpdate = async () => {
    const responseImage = await openImagePicker({
      aspect: [1, 1],
      allowsEditing: true,
    });
    if (responseImage) {
      setImage(responseImage);
    }
    setModalVisible(false);
  };

  const handleTakePhoto = async () => {
    const responseImage = await openCamera({
      quality: 1,
    });
    if (responseImage) {
      setImage(responseImage);
    }
    setModalVisible(false);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false);
    if (selectedDate) {
      const day = selectedDate.getDate().toString().padStart(2, "0");
      const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
      const year = selectedDate.getFullYear();
      setDateOfBirth(`${day}/${month}/${year}`);
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    if (!firstName || !lastName || !gender || !dateOfBirth) {
      Alert.alert("Error", "Please fill all fields");
      setLoading(false);
      return;
    }

    try {
      const response = await profileForm(
        firstName,
        lastName,
        gender,
        dateOfBirth,
        image
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
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
          {/* Profile Picture Section */}
          <View style={styles.profilePictureContainer}>
            <TouchableOpacity
              style={styles.profilePictureWrapper}
              onPress={() => setModalVisible(true)}
            >
              <View style={styles.profilePicture}>
                {image ? (
                  <Image
                    source={{ uri: image.uri }}
                    style={styles.profileImage}
                    resizeMode="cover"
                  />
                ) : (
                  <Ionicons name="person-outline" size={50} color="#6B7280" />
                )}
                <View style={styles.editIcon}>
                  <Ionicons name="camera" size={20} color="white" />
                </View>
              </View>
            </TouchableOpacity>
            <Text style={styles.profileText}>Profile Photo</Text>
          </View>

          {/* Form Fields */}
          <View style={styles.formContainer}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>First name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter first name"
                placeholderTextColor="#9CA3AF"
                value={firstName}
                onChangeText={setFirstName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Last name</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Enter last name"
                placeholderTextColor="#9CA3AF"
                value={lastName}
                onChangeText={setLastName}
              />
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Select Gender</Text>
              <View style={[styles.textInput, styles.pickerContainer]}>
                <Picker
                  selectedValue={gender}
                  onValueChange={(itemValue: GenderType) =>
                    setGender(itemValue)
                  }
                  dropdownIconColor="#6B7280"
                  style={styles.picker}
                >
                  <Picker.Item
                    label="Select gender"
                    value={null}
                    enabled={false}
                  />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Date of Birth</Text>
              <TouchableOpacity
                style={styles.textInput}
                onPress={() => setShowDatePicker(true)}
              >
                <Text
                  style={dateOfBirth ? styles.dateText : styles.placeholderText}
                >
                  {dateOfBirth || "DD/MM/YYYY"}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={new Date()}
                  mode="date"
                  display="spinner"
                  onChange={handleDateChange}
                  maximumDate={new Date()}
                  positiveButton={{label: 'OK', textColor: 'white'}}
                  negativeButton={{label: 'Cancel', textColor: 'white'}}
                  themeVariant="light"
                />
              )}
              
            </View>
          </View>

          {/* Photo Selection Modal */}
          <PhotoSelectionModal
            visible={modalVisible}
            onClose={() => setModalVisible(false)}
            onCameraPress={handleTakePhoto}
            onGalleryPress={handleProfilePictureUpdate}
            onRemovePress={() => {
              setImage(null);
              setModalVisible(false);
            }}
            title="Update Profile Photo"
          />

          {/* Submit Button */}
          <TouchableOpacity
            style={[
              styles.submitButton,
              (!firstName || !lastName || !gender || !dateOfBirth) &&
                styles.disabledButton,
            ]}
            onPress={handleSubmit}
            disabled={!firstName || !lastName || !gender || !dateOfBirth}
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
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  header: {
    padding: 20,
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#E5E7EB",
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: "600",
    color: "#111827",
  },
  profilePictureContainer: {
    alignItems: "center",
    paddingVertical: 30,
  },
  profilePictureWrapper: {
    position: "relative",
    marginBottom: 10,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: "#E5E7EB",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#D1D5DB",
  },
  profileImage: {
    width: "100%",
    height: "100%",
    borderRadius: 60,
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#FF9933",
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "white",
  },
  profileText: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "500",
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    color: "#374151",
    marginBottom: 8,
    fontWeight: "500",
  },
  textInput: {
    height: 56,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#111827",
    backgroundColor: "white",
    justifyContent: "center",
  },
  pickerContainer: {
    paddingHorizontal: 0,
  },
  picker: {
    color: "#111827",
  },
  dateText: {
    color: "#111827",
    fontSize: 16,
  },
  placeholderText: {
    color: "#9CA3AF",
    fontSize: 16,
  },
  submitButton: {
    height: 56,
    backgroundColor: "#FF9933",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 20,
    marginTop: 20,
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

export default ProfileInfo;
