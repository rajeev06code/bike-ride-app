import React, { useState } from 'react';
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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type DrivingLicenseScreenProps = {
  onClose: () => void;
  onSubmit: (data: {
    licenseNumber: string;
    frontImageUploaded: boolean;
    backImageUploaded: boolean;
  }) => void;
};

const DrivingLicenseScreen: React.FC<DrivingLicenseScreenProps> = ({ onClose, onSubmit }) => {
  const [licenseNumber, setLicenseNumber] = useState('');
  const [frontImageUploaded, setFrontImageUploaded] = useState(false);
  const [backImageUploaded, setBackImageUploaded] = useState(false);

  const handleFrontUpload = () => {
    setFrontImageUploaded(true);
  };

  const handleBackUpload = () => {
    setBackImageUploaded(true);
  };

  const handleSubmit = () => {
    onSubmit({ 
      licenseNumber, 
      frontImageUploaded, 
      backImageUploaded 
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidView}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContainer}
          keyboardShouldPersistTaps="handled"
        >
         

          {/* Front Side Upload Section */}
          <View style={styles.uploadSection}>
            <View style={styles.uploadIconContainer}>
              <Ionicons 
                name="document-outline" 
                size={32} 
                color={frontImageUploaded ? "#4F46E5" : "#9CA3AF"} 
              />
            </View>
            <Text style={styles.uploadTitle}>Front side of your DL</Text>
            <TouchableOpacity 
              style={[
                styles.uploadButton, 
                frontImageUploaded ? styles.uploadButtonSuccess : styles.uploadButtonPrimary
              ]} 
              onPress={handleFrontUpload}
            >
              <Ionicons 
                name={frontImageUploaded ? "checkmark-circle" : "cloud-upload"} 
                size={18} 
                color={frontImageUploaded ? "#10B981" : "white"} 
              />
              <Text style={[
                styles.uploadButtonText,
                frontImageUploaded && styles.uploadButtonTextSuccess
              ]}>
                {frontImageUploaded ? 'Uploaded' : 'Upload Photo'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Back Side Upload Section */}
          <View style={styles.uploadSection}>
            <View style={styles.uploadIconContainer}>
              <Ionicons 
                name="document-outline" 
                size={32} 
                color={backImageUploaded ? "#4F46E5" : "#9CA3AF"} 
              />
            </View>
            <Text style={styles.uploadTitle}>Back side of your DL</Text>
            <Text style={styles.uploadSubtitle}>Upload the back side even if it is blank</Text>
            <TouchableOpacity 
              style={[
                styles.uploadButton, 
                backImageUploaded ? styles.uploadButtonSuccess : styles.uploadButtonPrimary
              ]} 
              onPress={handleBackUpload}
            >
              <Ionicons 
                name={backImageUploaded ? "checkmark-circle" : "cloud-upload"} 
                size={18} 
                color={backImageUploaded ? "#10B981" : "white"} 
              />
              <Text style={[
                styles.uploadButtonText,
                backImageUploaded && styles.uploadButtonTextSuccess
              ]}>
                {backImageUploaded ? 'Uploaded' : 'Upload Photo'}
              </Text>
            </TouchableOpacity>
          </View>

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
              />
              <TouchableOpacity style={styles.infoButton}>
                <Ionicons name="information-circle-outline" size={24} color="#4F46E5" />
              </TouchableOpacity>
            </View>
            <Text style={styles.inputExample}>Example: KA123456778990Z9</Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[
              styles.submitButton, 
              (!licenseNumber || !frontImageUploaded || !backImageUploaded) && styles.disabledButton
            ]} 
            onPress={handleSubmit}
            disabled={!licenseNumber || !frontImageUploaded || !backImageUploaded}
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
    backgroundColor: '#F9FAFB',
  },
  keyboardAvoidView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
  },
  headerRightPlaceholder: {
    width: 24,
  },
  uploadSection: {
    margin: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#D1D5DB',
    borderRadius: 12,
    padding: 20,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  uploadIconContainer: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  uploadTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  uploadSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    textAlign: 'center',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    width: '100%',
  },
  uploadButtonPrimary: {
    backgroundColor: '#4F46E5',
  },
  uploadButtonSuccess: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#10B981',
  },
  uploadButtonText: {
    fontSize: 16,
    fontWeight: '500',
    color: 'white',
    marginLeft: 8,
  },
  uploadButtonTextSuccess: {
    color: '#10B981',
  },
  inputSection: {
    marginHorizontal: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    backgroundColor: 'white',
    height: 56,
    paddingRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    paddingHorizontal: 16,
    fontSize: 16,
    color: '#111827',
  },
  infoButton: {
    padding: 8,
  },
  inputExample: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 8,
  },
  submitButton: {
    height: 56,
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 8,
    shadowColor: '#4F46E5',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: '#9CA3AF',
    shadowColor: 'transparent',
  },
  submitButtonText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
});

export default DrivingLicenseScreen;