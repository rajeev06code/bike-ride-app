import { useLocation } from "@/context/UserLocationContext";
import { useBackHandler } from "@/hooks/custom/useBackHandler";
import { getAddressFromCoordinates } from "@/utils/locationUtils";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useFocusEffect } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Switch,
  Image,
  StyleSheet,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { markDriverAvailable } from "@/services/auth";

const HomeScreen = () => {
  const [isOnDuty, setIsOnDuty] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const { location, errorMsg, refreshLocation, address } = useLocation();

  const clearToken = async () => {
    await AsyncStorage.multiRemove(["access_token", "user_info"]);
    router.replace("/(auth)");
  };
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
  const handleOnDuty = (isOnDuty) => {
    setIsOnDuty(!isOnDuty);
    handleDriverAvailability(!isOnDuty);
    // refreshLocation()
  };

  const handleDriverAvailability = async (dutyStatus) => {
    const response = await markDriverAvailable(
      location.latitude,
      location.longitude,
      dutyStatus
    );
  };

  const getUserInfo = async () => {
    const stored = await AsyncStorage.getItem("user_info");

    if (stored) {
      setUserInfo(JSON.parse(stored));
      // setAuthState(stored)
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.location}>
          <Icon name="location-on" size={20} color="#000" />
          <Text style={styles.address}>{address}</Text>
        </View>

        <View style={styles.dutyButtonContainer}>
          <Text
            style={[
              styles.dutyButtonText,
              isOnDuty ? styles.onDuty : styles.offDuty,
            ]}
          >
            {isOnDuty ? "ON DUTY" : "OFF DUTY"}
          </Text>
          <Switch
            value={isOnDuty}
            onValueChange={() => {
              handleOnDuty(isOnDuty);
            }}
            thumbColor={isOnDuty ? "#4CAF50" : "#ccc"}
          />
        </View>
      </View>

      {/* Earnings Section */}
      <View style={styles.earningsBox}>
        <Text style={styles.earningsText}>Today's Earnings</Text>
        <Text style={styles.earningsAmount}>₹1737.94</Text>
      </View>

      {!isOnDuty ? (
        <>
          <View style={styles.dutyContainer}>
            <Image
              source={require("../../assets/images/bike.png")}
              style={styles.image}
            />
            <Text style={styles.greeting}>
              Good Morning,
              <Text style={{ fontWeight: "bold", fontSize: 20 }}>
                {" "}
                {userInfo?.user_info.first_name}
              </Text>{" "}
            </Text>
            <Text style={styles.dutyText}>
              Go <Text style={styles.boldText}>ON DUTY</Text> to start earning
            </Text>
          </View>

          <TouchableOpacity style={styles.devButton} onPress={clearToken}>
            <Text style={styles.devButtonText}>Logout</Text>
          </TouchableOpacity>
        </>
      ) : (
        <View style={styles.containermap}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: location.latitude,
              longitude: location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            showsMyLocationButton={true}
            showsCompass={true}
            zoomEnabled={true}
            scrollEnabled={true}
            loadingEnabled={true}
          >
            {" "}
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              title="My Location"
            />
          </MapView>
        </View>
      )}
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  location: {
    flexDirection: "row",
    alignItems: "center",
  },
  address: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: "500",
  },
  earningsBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    marginTop: 10,
    backgroundColor: "#f8f8f8",
    borderRadius: 8,
  },
  earningsText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  earningsAmount: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  performanceCard: {
    backgroundColor: "#4CAF50",
    padding: 12,
    borderRadius: 8,
    marginTop: 12,
  },
  performanceTitle: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  completedOrders: {
    color: "#fff",
    fontSize: 16,
    marginTop: 4,
  },
  knowMoreButton: {
    marginTop: 6,
  },
  knowMoreText: {
    color: "#fff",
    fontSize: 12,
    textDecorationLine: "underline",
  },
  dutyContainer: {
    alignItems: "center",
    marginTop: 20,
    flex: 1,
  },
  image: {
    width: 100,
    height: 100,
  },
  greeting: {
    fontSize: 16,
    fontWeight: "500",
    marginTop: 10,
  },
  dutyText: {
    fontSize: 18,
    marginTop: 5,
  },
  boldText: {
    fontWeight: "bold",
    color: "#000",
  },
  dutyButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 8,
    borderRadius: 20,
  },
  dutyButtonText: { fontSize: 14, fontWeight: "bold", marginRight: 5 },
  onDuty: { color: "#4CAF50" },
  offDuty: { color: "#757575" },
  devButton: {
    marginTop: 16,
    padding: 12,
    alignItems: "center",
  },
  devButtonText: {
    color: "#EF4444",
    fontSize: 14,
  },
  containermap: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});

export default HomeScreen;
