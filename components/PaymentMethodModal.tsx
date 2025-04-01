import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PaymentMethodDrawer = ({ visible, onClose, onSelect,handleNavigate }) => {
  const [selectedOption, setSelectedOption] = useState('bank');

  const handleSelect = () => {
    onSelect(selectedOption);
    onClose();
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.overlayTouchable}
          activeOpacity={1}
          onPress={onClose}
        />
        <View style={styles.drawerContainer}>
       

          <View style={styles.content}>
            <View style={styles.drawerheader}><Text style={styles.sectionTitle}>Add BANK</Text>
            <Text style={styles.description}>
              To transfer money, Add Bank Account or UPI ID
            </Text></View>
            

            <View style={styles.optionsContainer}>
              <TouchableOpacity
                style={styles.option}
                onPress={() => setSelectedOption('bank')}
              >
                <View style={styles.optionRadio}>
                  {selectedOption === 'bank' ? (
                    <Ionicons name="radio-button-on" size={24} color="#F08200" />
                  ) : (
                    <Ionicons name="radio-button-off" size={24} color="#9CA3AF" />
                  )}
                </View>
                <Text style={styles.optionText}>Bank Account</Text>
                <Ionicons name="chatbubble-outline" size={20} color="#9CA3AF" />
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.option}
                onPress={() => setSelectedOption('upi')}
              >
                <View style={styles.optionRadio}>
                  {selectedOption === 'upi' ? (
                    <Ionicons name="radio-button-on" size={24} color="#F08200" />
                  ) : (
                    <Ionicons name="radio-button-off" size={24} color="#9CA3AF" />
                  )}
                </View>
                <Text style={styles.optionText}>UPI Id</Text>
                <Ionicons name="chatbubble-outline" size={20} color="#9CA3AF" />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.addButton}
            onPress={()=>{handleNavigate(selectedOption)}}
          >
            <Text style={styles.addButtonText}>Add Now</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const { height } = Dimensions.get('window');
const drawerHeight = height * 0.5;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  overlayTouchable: {
    flex: 1,
  },
  drawerContainer: {
    height: drawerHeight,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 24,
    paddingBottom: 32,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 20,
    color: '#6B7280',
  },
  divider: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 16,
  },
  content: {
    flex: 1,

  },
  drawerheader:{
    width:"100%",
   flex: 1,
    alignItems:"center",
    height:30,
    justifyContent:"center"
    // backgroundColor:"red"
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 18,
    color: '#6B7280',
    // marginBottom: 24,
  },
  optionsContainer: {
    marginBottom: 24,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  optionRadio: {
    width: 24,
    marginRight: 16,
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  addButton: {
    backgroundColor: "#F08200",
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#4F46E5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default PaymentMethodDrawer;