import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  TextInput,
  Keyboard,
  Dimensions,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

const BankSelectInput = ({ banks, onSelect, placeholder = 'Select a bank' }) => {
  const [visible, setVisible] = useState(false);
  const [selectedBank, setSelectedBank] = useState(null);
  const [searchText, setSearchText] = useState('');

  const filteredBanks = banks.filter(bank =>
    bank.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleSelect = (bank) => {
    setSelectedBank(bank);
    onSelect(bank.id);
    setVisible(false);
    setSearchText('');
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      {/* Modern Input Field */}
      <TouchableOpacity 
        style={styles.inputContainer}
        onPress={() => setVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.inputContent}>
          <MaterialIcons 
            name="account-balance" 
            size={20} 
            color="#666" 
            style={styles.inputIcon}
          />
          <Text 
            style={selectedBank ? styles.selectedText : styles.placeholderText}
            numberOfLines={1}
          >
            {selectedBank ? selectedBank.name : placeholder}
          </Text>
        </View>
        <MaterialIcons 
          name="keyboard-arrow-down" 
          size={24} 
          color="#666" 
        />
      </TouchableOpacity>

      <Modal
        visible={visible}
        transparent={true}
        animationType="fade"
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {/* Search Input */}
            <View style={styles.searchContainer}>
              <MaterialIcons 
                name="search" 
                size={20} 
                color="#999" 
                style={styles.searchIcon}
              />
              <TextInput
                style={styles.searchInput}
                placeholder="Search banks..."
                placeholderTextColor="#999"
                value={searchText}
                onChangeText={setSearchText}
                autoFocus={true}
                autoCorrect={false}
              />
            </View>
            
            {/* Bank List - Fixed Height with Scroll */}
            <FlatList
              data={filteredBanks}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[
                    styles.itemContainer,
                    selectedBank?.id === item.id && styles.selectedItem
                  ]}
                  onPress={() => handleSelect(item)}
                >
                  <Text style={styles.itemText}>{item.name}</Text>
                  {selectedBank?.id === item.id && (
                    <MaterialIcons name="check" size={20} color="#4CAF50" />
                  )}
                </TouchableOpacity>
              )}
              ListEmptyComponent={
                <View style={styles.emptyContainer}>
                  <MaterialIcons name="error-outline" size={24} color="#999" />
                  <Text style={styles.emptyText}>No banks found</Text>
                </View>
              }
              contentContainerStyle={styles.listContent}
              style={styles.list}
            />
            
            {/* Close Button */}
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 2,
  },
  inputContainer: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 16,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1,
  },
  inputContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  inputIcon: {
    marginRight: 12,
  },
  selectedText: {
    fontSize: 16,
    color: '#333',
    flex: 1,
  },
  placeholderText: {
    fontSize: 16,
    color: '#9E9E9E',
    flex: 1,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    height: height * 0.5, // Fixed height (70% of screen)
    overflow: 'hidden',
    paddingVertical: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    paddingVertical: 8,
  },
  list: {
    flexGrow: 1, // Makes the list take available space
    maxHeight: height * 0.55, // Prevents shrinking when filtering
  },
  listContent: {
    paddingBottom: 16,
  },
  itemContainer: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectedItem: {
    backgroundColor: '#F5F9FF',
  },
  itemText: {
    fontSize: 16,
    color: '#333',
  },
  emptyContainer: {
    padding: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
    marginTop: 8,
  },
  closeButton: {
    padding: 16,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2196F3',
  },
});

export default BankSelectInput;
