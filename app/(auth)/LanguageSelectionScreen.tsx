import { useBackHandler } from "@/hooks/custom/useBackHandler";
import { router, useFocusEffect } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
  BackHandler,
  ImageSourcePropType,
  StyleProp,
  ViewStyle,
  TextStyle,
} from "react-native";

interface Language {
  id: number;
  lan: string;
  flag: string;
}

interface Vehicle {
  id: number;
  vehicle: string;
  image: ImageSourcePropType;
}

const LanguageSelectionScreen = () => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const languages: Language[] = [
    { id: 1, lan: "ENGLISH", flag: "🇬🇧" },
    { id: 2, lan: "हिन्दी", flag: "🇮🇳" },
  ];

  const vehicles: Vehicle[] = [
    { id: 1, vehicle: "Bike", image: require("../../assets/images/bike.png") },
    { id: 2, vehicle: "Auto", image: require("../../assets/images/auto.png") },
  ];

  const { handleBackPress } = useBackHandler({
    exitMessage: 'Are you sure you want to exit?',
    // other custom options
  });

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [handleBackPress])
  );

  return (
    <ScrollView style={styles.container}>
      {/* Language Selection */}
      <Text style={styles.sectionTitle}>Please Select Language</Text>

      <View style={styles.vehicleOptionsContainer}>
        {languages.map((language) => (
          <TouchableOpacity
            key={language.id}
            style={[
              styles.vehicleOption,
              selectedLanguage === language.lan && styles.selectedVehicleOption,
            ]}
            onPress={() => setSelectedLanguage(language.lan)}
          >
            <Text style={styles.optionText}>
              {language.flag} {language.lan}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Vehicle Selection */}
      <Text style={[styles.sectionTitle, { marginTop: 30 }]}>
        Select Vehicle Type
      </Text>

      <View style={styles.vehicleOptionsContainer}>
        {vehicles.map((vehicle) => (
          <TouchableOpacity
            key={vehicle.id}
            style={[
              styles.vehicleOption,
              selectedVehicle === vehicle.vehicle && styles.selectedVehicleOption,
            ]}
            onPress={() => setSelectedVehicle(vehicle.vehicle)}
          >
            <View>
              <Image
                source={vehicle.image}
                style={styles.icon}
                resizeMode="contain"
              />
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Submit Button */}
      <TouchableOpacity
        style={[
          styles.submitButton,
          (!selectedLanguage || !selectedVehicle) && styles.buttonDisabled
        ]}
        disabled={!selectedLanguage || !selectedVehicle}
        onPress={() => router.navigate("/VerificationScreen")}
      >
        <Text style={styles.submitButtonText}>Continue</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 80,
    height: 80,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    marginBottom: 15,
  },
  headerName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  headerSubtitle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  availableText: {
    fontSize: 14,
    color: "#666",
    marginRight: 15,
  },
  followButton: {
    backgroundColor: "#000",
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 15,
  },
  followButtonText: {
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    color: "#000",
  },
  searchContainer: {
    marginBottom: 15,
  },
  searchInput: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  option: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#FFD6AD",
  },
  optionText: {
    fontSize: 20,
    color: "#333",
  },
  selectedIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#007AFF",
  },
  vehicleOptionsContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  vehicleOption: {
    flex: 1,
    padding: 15,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    marginRight: 10,
    alignItems: "center",
  },
  selectedVehicleOption: {
    borderColor: "#007AFF",
    backgroundColor: "#f0f7ff",
  },
  vehicleOptionText: {
    fontSize: 16,
    color: "#333",
  },
  selectedVehicleIndicator: {
    position: "absolute",
    top: 5,
    right: 5,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#007AFF",
  },
  submitButton: {
    backgroundColor: "#FF9933",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 20,
  },
  submitButtonActive: {
    opacity: 1,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  buttonDisabled: {
    backgroundColor: "#dadada",
    opacity: 0.8,
  },
});

export default LanguageSelectionScreen;