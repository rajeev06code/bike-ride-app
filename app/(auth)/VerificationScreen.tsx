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
import React, { useEffect, useState } from "react";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { useBackHandler } from "@/hooks/custom/useBackHandler";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { router } from "expo-router";
import PaymentMethodDrawer from "@/components/PaymentMethodModal";
import { getVerificationSteps } from "@/services/auth";
import Octicons from "@expo/vector-icons/Octicons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const VerificationScreen = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState("");
  const [driverVerificationSteps, setDriverVerificationSteps] = useState([]);
  const [driverProfileVerification, setDriverProfileVerification] = useState(
    []
  );
  const [isLoadingList, setIsLoadingList] = useState(false);
  // console.log(driverProfileVerification);
  const navigation = useNavigation();
  const { handleBackPress } = useBackHandler({
    exitMessage: "Are you sure you want to exit?",
  });
  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };
  const handlex = (method) => {
    router.navigate({
      pathname: "/PaymentInfo",
      params: { paymentMethod: method },
    });
    handleCloseDrawer();
  };
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
  const handleStepPress = (stepId: string) => {
    if (stepId === "USER_PROFILE") router.navigate("/ProfileInfo");
    if (stepId === "DL") router.navigate("/DrivingLicense");
    if (stepId === "AADHAAR") router.navigate("/AadhaarPan");
    if (stepId === "RC") router.navigate("/RcInfo");
  };

  const handleOpenDrawer = () => {
    setDrawerVisible(true);
  };

  const handleSelectMethod = (method) => {
    setSelectedMethod(method);
  };
  const priorityOrder = {
    DL: 1,
    RC: 3,
    AADHAAR: 4,
    USER_PROFILE: 2,
  };
  const verificationStepsData = async () => {
    setIsLoadingList(true);
    try {
      const response = await getVerificationSteps();
      if (response?.status === 200) {
        setIsLoadingList(false);
        const dataWithoutPanProfile = response?.data
          .filter(
            (item) =>
              item.file_type !== "PAN" && item.file_type !== "USER_PROFILE"
          )
          .sort(
            (a: any, b: any) =>
              priorityOrder[a.file_type] - priorityOrder[b.file_type]
          );

        setDriverVerificationSteps(dataWithoutPanProfile);
        const dataWithProfile = response?.data.filter(
          (data) => data.file_type === "USER_PROFILE"
        );
        setDriverProfileVerification(dataWithProfile);
      }
    } catch (error) {
      setIsLoadingList(false);
    }
  };

  useEffect(() => {
    verificationStepsData();
  }, []);
  const allIdsExist = driverVerificationSteps.every((item) => item.id !== null);

  const clearToken = async () => {
    await AsyncStorage.multiRemove(["access_token", "user_info"]);
  
    router.replace("/");
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
        {isLoadingList ? (
          <View style={styles.loadingContainer}>
            {/* Modern animated loader */}
            {/* <LottieView
            source={require('../assets/animations/loading.json')}
            autoPlay
            loop
            style={styles.loader}
          /> */}
            <Text style={styles.loadingText}>Preparing your documents...</Text>
          </View>
        ) : (
          <>
            {driverProfileVerification?.map((step) => (
              <TouchableOpacity
                key={step.file_type}
                style={[
                  styles.stepCard,
                  step.user.first_name && styles.lockedCard,
                ]}
                style={styles.stepCard}
                onPress={() => handleStepPress(step.file_type)}
                disabled={step.user.first_name ? true : false}
              >
                <View style={styles.stepIconContainer}>
                  <Ionicons
                    name={
                      step.file_type === "USER_PROFILE"
                        ? "person-outline"
                        : null
                    }
                    size={24}
                    color={step.user.first_name ? "#9CA3AF" : "#F08200"}
                  />
                </View>
                <View style={styles.stepInfo}>
                  <Text
                    style={[
                      styles.stepTitle,
                      step.user.first_name && styles.lockedText,
                    ]}
                    // style={[styles.stepTitle]}
                  >
                    {step.file_type === "DL"
                      ? "Driving License"
                      : step.file_type === "RC"
                      ? "Vehicle RC"
                      : step.file_type === "AADHAAR"
                      ? "AADHAAR"
                      : step.file_type === "USER_PROFILE"
                      ? "Profile Info"
                      : null}
                  </Text>
                  {step.user.first_name ? (
                    <View style={styles.statusContainer}>
                      {/* <View style={styles.statusIndicator} /> */}
                      <Text style={styles.statusText}>Under verification.</Text>
                    </View>
                  ) : null}
                </View>
                <AntDesign
                  name={
                    step.user.first_name ? "exclamationcircle" : "arrowright"
                  }
                  // name={"chevron-forward"}
                  size={28}
                  color={step.user.first_name ? "#FFB332" : "#6B7280"}
                  // color={"#6B7280"}
                />
                {/* <AntDesign name="exclamationcircle" size={24} color="black" /> */}
                {/* <SimpleLineIcons name="exclamation" size={24} color="black" /> */}
                {/* <AntDesign name= size={24} color="black" /> */}
              </TouchableOpacity>
            ))}
            {driverVerificationSteps?.map((step) => (
              <TouchableOpacity
                key={step.file_type}
                style={[styles.stepCard, step.id && styles.lockedCard]}
                style={styles.stepCard}
                onPress={() => handleStepPress(step.file_type)}
                disabled={step.id ? true : false}
              >
                <View style={styles.stepIconContainer}>
                  <Ionicons
                    name={
                      step.file_type === "DL"
                        ? "card-outline"
                        : step.file_type === "RC"
                        ? "car-outline"
                        : step.file_type === "AADHAAR"
                        ? "document-outline"
                        : step.file_type === "USER_PROFILE"
                        ? "person-outline"
                        : null
                    }
                    size={24}
                    color={step.id ? "#9CA3AF" : "#F08200"}
                  />
                </View>
                <View style={styles.stepInfo}>
                  <Text
                    style={[styles.stepTitle, step.id && styles.lockedText]}
                    // style={[styles.stepTitle]}
                  >
                    {step.file_type === "DL"
                      ? "Driving License"
                      : step.file_type === "RC"
                      ? "Vehicle RC"
                      : step.file_type === "AADHAAR"
                      ? "AADHAAR"
                      : step.file_type === "USER_PROFILE"
                      ? "Profile Info"
                      : null}
                  </Text>
                  {step.id ? (
                    <View style={styles.statusContainer}>
                      {/* <View style={styles.statusIndicator} /> */}
                      <Text style={styles.statusText}>Under verification.</Text>
                    </View>
                  ) : null}
                </View>
                <AntDesign
                  name={step.id ? "exclamationcircle" : "arrowright"}
                  // name={"chevron-forward"}
                  size={28}
                  color={step.id ? "#FFB332" : "#6B7280"}
                  // color={"#6B7280"}
                />
                {/* <AntDesign name="exclamationcircle" size={24} color="black" /> */}
                {/* <SimpleLineIcons name="exclamation" size={24} color="black" /> */}
                {/* <AntDesign name= size={24} color="black" /> */}
              </TouchableOpacity>
            ))}
          </>
        )}
        {allIdsExist &&
        !isLoadingList &&
        driverProfileVerification[0]?.user.first_name ? (
          <TouchableOpacity
            style={[styles.stepCard]}
            onPress={handleOpenDrawer}
          >
            <View style={styles.stepIconContainer}>
              <MaterialCommunityIcons
                name="bank-outline"
                size={24}
                color={"#F08200"}
              />
            </View>
            <View style={styles.stepInfo}>
              <Text style={[styles.stepTitle]}>Bank Account Info</Text>
            </View>
            <AntDesign name="arrowright" size={28} />
          </TouchableOpacity>
        ) : null}
      </View>
      <PaymentMethodDrawer
        visible={isDrawerVisible}
        onClose={handleCloseDrawer}
        onSelect={handleSelectMethod}
        handleNavigate={handlex}
      />

      <TouchableOpacity style={styles.devButton} onPress={clearToken}>
        <Text style={styles.devButtonText}>Logout</Text>
      </TouchableOpacity>

      {allIdsExist &&
      !isLoadingList &&
      driverProfileVerification[0]?.user.first_name ? (
        <View style={styles.bottomButtonContainer}>
          <Text style={styles.bottomButtonText}>
           NOTE: You will be able to take rides once all documents get verified. It
            will take up to 24 working hours.
          </Text>
          <TouchableOpacity
            style={[styles.bottomButton, styles.disabledButton]}
            disabled={true}
          >
            <Text style={styles.bottomButtonTextDisabled}>Ride Now</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.helpSection}>
          <Ionicons name="help-circle-outline" size={24} color="black" />
          <Text style={styles.helpText}>Need help with verification?</Text>
        </View>
      )}

      {/* Help Section */}
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
    paddingBottom: 10,
  },
  bannerContent: {
    marginBottom: 10,
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
    // marginTop: 1,
  },
  stepCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 15,
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
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginTop: "auto",
    flexWrap: "wrap",
  },
  helpText: {
    fontSize: 16,
    color: "black",
    marginLeft: 8,
    fontWeight: "500",
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
  },
  statusIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#FFC107",
    marginRight: 8,
  },
  statusText: {
    color: "#FFA000",
    fontSize: 14,
    fontWeight: "500",
    width: "100%",
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: "#6B7280",
    fontFamily: "Inter-Medium",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  bottomButtonContainer: {
    padding: 20,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
    marginTop: "auto",
  },
  bottomButtonText: {
    fontSize: 14,
    color: "#F08200",
    textAlign: "center",
    marginBottom: 16,
    lineHeight: 20,
  },
  bottomButton: {
    backgroundColor: "#F08200",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  disabledButton: {
    backgroundColor: "#E5E7EB",
  },
  bottomButtonTextDisabled: {
    color: "#9CA3AF",
    fontSize: 16,
    fontWeight: "600",
  },
  devButton: {
    marginTop: 16,
    padding: 12,
    alignItems: "center",
  },
  devButtonText: {
    color: "#EF4444",
    fontSize: 14,
  },
});

export default VerificationScreen;
