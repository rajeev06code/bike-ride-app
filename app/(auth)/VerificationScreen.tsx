import {
  View,
  Text,
  BackHandler,
  Alert,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Modal,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useBackHandler } from "@/hooks/custom/useBackHandler";
import { Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";

const VerificationScreen = () => {
  const navigation = useNavigation();
  const { handleBackPress } = useBackHandler({
    exitMessage: "Are you sure you want to exit?",
  });

  useFocusEffect(
    React.useCallback(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    }, [handleBackPress])
  );

  const showExitAlert = (action: any) => {
    Alert.alert("Are you sure you want to exit?", "", [
      { text: "Cancel", style: "cancel", onPress: () => {} },
      {
        text: "Exit Anyway",
        style: "destructive",
        onPress: () => {
          if (action) {
            navigation.dispatch(action);
          } else {
            BackHandler.exitApp();
          }
        },
      },
    ]);
  };

  const verificationSteps = [
    {
      id: "profile_info",
      title: "Profile Info",
      isCompleted: false,
      isLocked: false,
      icon: "person-outline",
      status: "Pending",
    },
    {
      id: "driving_license",
      title: "Driving License",
      isCompleted: false,
      isLocked: false,
      icon: "card-outline",
      status: "Pending",
    },
    {
      id: "vehicle_rc",
      title: "Vehicle RC",
      isCompleted: false,
      isLocked: false,
      icon: "car-outline",
      status: "Pending",
    },
    {
      id: "aadhaar_pan",
      title: "Aadhaar/PAN Card",
      isCompleted: false,
      isLocked: false,
      icon: "document-outline",
      status: "Pending",
    },
  ];

  const handleStepPress = (stepId: string) => {
    if (stepId === "profile_info") router.navigate("/ProfileInfo");
    if (stepId === "driving_license") router.navigate("/DrivingLicense");
    if (stepId === "aadhaar_pan") router.navigate("/AadhaarPan");
    if (stepId === "vehicle_rc") router.navigate("/RcInfo");
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Banner */}
      <View style={styles.banner}>
        <View style={styles.bannerContent}>
          <Text style={styles.bannerTitle}>Account Verification</Text>
          <Text style={styles.bannerText}>
            Complete all steps to activate your account
          </Text>
        </View>
      </View>

      {/* Verification Steps List */}
      <View style={styles.stepsContainer}>
        {verificationSteps.map((step) => (
          <TouchableOpacity
            key={step.id}
            style={[styles.stepCard, step.isLocked && styles.lockedCard]}
            onPress={() => handleStepPress(step.id)}
            disabled={step.isLocked}
          >
            <View style={styles.stepIconContainer}>
              <Ionicons
                name={step.icon}
                size={24}
                color={step.isLocked ? "#9CA3AF" : "#F08200"}
              />
            </View>
            <View style={styles.stepInfo}>
              <Text
                style={[styles.stepTitle, step.isLocked && styles.lockedText]}
              >
                {step.title}
              </Text>
              <Text style={styles.stepStatus}>{step.status}</Text>
            </View>
            <Ionicons
              name={step.isLocked ? "lock-closed" : "chevron-forward"}
              size={20}
              color={step.isLocked ? "#9CA3AF" : "#6B7280"}
            />
          </TouchableOpacity>
        ))}
      </View>

      {/* Help Section */}
      <View style={styles.helpSection}>
        <Ionicons name="help-circle-outline" size={24} color="black" />
        <Text style={styles.helpText}>Need help with verification?</Text>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  banner: {
    backgroundColor: "#F08200",
    padding: 24,
    paddingBottom: 32,
  },
  bannerContent: {
    marginBottom: 20,
  },
  bannerTitle: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 8,
  },
  bannerText: {
    color: "#E0E7FF",
    fontSize: 16,
  },
  progressIndicator: {
    marginTop: 16,
  },
  progressText: {
    color: "#E0E7FF",
    fontSize: 14,
    marginBottom: 8,
  },
  progressBar: {
    height: 6,
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#fff",
    borderRadius: 3,
  },
  stepsContainer: {
    padding: 20,
    marginTop: 15,
  },
  stepCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  lockedCard: {
    backgroundColor: "#F3F4F6",
  },
  stepIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "#EEF2FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  stepInfo: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#111827",
    marginBottom: 4,
  },
  stepStatus: {
    fontSize: 14,
    color: "#6B7280",
  },
  lockedText: {
    color: "#9CA3AF",
  },
  helpSection: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: "auto",
  },
  helpText: {
    fontSize: 16,
    color: "black",
    marginLeft: 8,
    fontWeight: "500",
  },
});

export default VerificationScreen;
