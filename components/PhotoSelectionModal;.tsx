// PhotoSelectionModal.js
import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Modal,
  TouchableOpacity,
  Pressable
} from 'react-native';
import Feather from '@expo/vector-icons/Feather';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';

const PhotoSelectionModal = ({ 
  visible, 
  onClose, 
  onCameraPress, 
  onGalleryPress, 
  onRemovePress,
  title = "Profile Photo"
}) => {
  
  const handleCameraPress = () => {
    onClose();
    onCameraPress && onCameraPress();
  };
  
  const handleGalleryPress = () => {
    onClose();
    onGalleryPress && onGalleryPress();
  };
  
  const handleRemovePress = () => {
    onClose();
    onRemovePress && onRemovePress();
  };
  
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <Pressable 
        style={styles.modalOverlay} 
        onPress={onClose}
      >
        <View style={styles.modalContainer}>
          <Pressable style={styles.modalContent}>
            <Text style={styles.modalTitle}>{title}</Text>
            
            <View style={styles.optionsContainer}>
              {/* Camera Option */}
              <TouchableOpacity 
                style={styles.option}
                onPress={handleCameraPress}
              >
                <View style={styles.iconContainer}>
                <Feather name="camera" size={24} color="#FF9933" />
                </View>
                <Text style={styles.optionText}>Camera</Text>
              </TouchableOpacity>
              
              {/* Gallery Option */}
              <TouchableOpacity 
                style={styles.option}
                onPress={handleGalleryPress}
              >
                <View style={styles.iconContainer}>
                <FontAwesome name="image" size={24} color="#FF9933" />
                </View>
                <Text style={styles.optionText}>Gallery</Text>
              </TouchableOpacity>
              
              {/* Remove Option */}
              <TouchableOpacity 
                style={styles.option}
                onPress={handleRemovePress}
              >
                <View style={styles.iconContainer}>
                <AntDesign name="delete" size={24} color="black" />
                </View>
                <Text style={styles.optionText}>Remove</Text>
              </TouchableOpacity>
            </View>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 10,
    overflow: 'hidden',
  },
  modalContent: {
    padding: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  optionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  option: {
    alignItems: 'center',
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  optionText: {
    fontSize: 14,
    color: '#666',
  }
});

export default PhotoSelectionModal;