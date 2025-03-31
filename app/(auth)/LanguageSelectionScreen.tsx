import { useBackHandler } from "@/hooks/custom/useBackHandler";
import { router, useFocusEffect } from "expo-router";
import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  BackHandler,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface Language {
  id: number;
  lan: string;
  flag: string;
  code: string;
}

interface Vehicle {
  id: number;
  vehicle: string;
  image: any; // Use proper image type
}

const LanguageSelectionScreen = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string | null>(null);
  const [selectedVehicle, setSelectedVehicle] = useState<string | null>(null);

  const languages: Language[] = [
    { id: 1, lan: "English", flag: "🇬🇧", code: "en" },
    { id: 2, lan: "हिन्दी", flag: "🇮🇳", code: "hi" },
 
  ];

  const vehicles: Vehicle[] = [
    { id: 1, vehicle: "Bike", image: require("../../assets/images/bike.png") },
    { id: 2, vehicle: "Auto", image: require("../../assets/images/auto.png") },
  ];

  const { handleBackPress } = useBackHandler({
    exitMessage: 'Are you sure you want to exit?',
  });

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener('hardwareBackPress', handleBackPress);
      return () => {
        BackHandler.removeEventListener('hardwareBackPress', handleBackPress);
      };
    }, [handleBackPress])
  );

  const handleContinue = () => {
    if (selectedLanguage && selectedVehicle) {
      router.navigate("/VerificationScreen");
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Welcome Captain!</Text>
          <Text style={styles.subtitle}>Let's get you started</Text>
        </View>

        {/* Language Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Your Language</Text>
          <View style={styles.optionsContainer}>
            {languages.map((language) => (
              <TouchableOpacity
                key={language.id}
                style={[
                  styles.optionCard,
                  selectedLanguage === language.code && styles.selectedOptionCard,
                ]}
                onPress={() => setSelectedLanguage(language.code)}
              >
                <Text style={styles.optionText}>
                  {language.flag} {language.lan}
                </Text>
                {selectedLanguage === language.code && (
                  <Ionicons name="checkmark-circle" size={24} color="green" />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Vehicle Selection */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Select Your Vehicle</Text>
          <View style={styles.vehicleOptionsContainer}>
            {vehicles.map((vehicle) => (
              <TouchableOpacity
                key={vehicle.id}
                style={[
                  styles.vehicleCard,
                  selectedVehicle === vehicle.vehicle && styles.selectedVehicleCard,
                ]}
                onPress={() => setSelectedVehicle(vehicle.vehicle)}
              >
                <Image
                  source={vehicle.image}
                  style={styles.vehicleImage}
                  resizeMode="contain"
                />
                <Text style={styles.vehicleText}>{vehicle.vehicle}</Text>
                {selectedVehicle === vehicle.vehicle && (
                  <View style={styles.selectedIndicator} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <TouchableOpacity
        style={[
          styles.continueButton,
          (!selectedLanguage || !selectedVehicle) && styles.disabledButton,
        ]}
        onPress={handleContinue}
        disabled={!selectedLanguage || !selectedVehicle}
      >
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  scrollContainer: {
    padding: 24,
    paddingBottom: 100,
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
    marginBottom: 16,
  },
  optionsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  optionCard: {
    flex: 1,
    minWidth: "45%",
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  selectedOptionCard: {
    borderColor: "green",
    backgroundColor: "#EEF2FF",
  },
  optionText: {
    fontSize: 16,
    color: "#111827",
  },
  vehicleOptionsContainer: {
    flexDirection: "row",
    gap: 16,
  },
  vehicleCard: {
    flex: 1,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  selectedVehicleCard: {
    borderColor: "green",
    backgroundColor: "#EEF2FF",
  },
  vehicleImage: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  vehicleText: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
  },
  selectedIndicator: {
    position: "absolute",
    top: 12,
    right: 12,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor:"green",
  },
  continueButton: {
    position: "absolute",
    bottom: 24,
    left: 24,
    right: 24,
    backgroundColor: "#FF9933",
    borderRadius: 12,
    padding: 18,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#4F46E5",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  disabledButton: {
    backgroundColor: "#9CA3AF",
    shadowColor: "transparent",
  },
  continueButtonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default LanguageSelectionScreen;