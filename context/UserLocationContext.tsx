import { createContext, useContext, useState, useEffect } from "react";
import { AppState, Alert, Linking, Platform } from "react-native";
import * as Location from "expo-location";
import { getAddressFromCoordinates } from "@/utils/locationUtils";

const LocationContext = createContext(null);

export function LocationProvider({ children }) {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const [permissionStatus, setPermissionStatus] = useState(null);
  const [isFetching, setIsFetching] = useState(true); // New state to track fetching
  const [address, setAddress] = useState(null);

  const getLocation = async () => {
    setIsFetching(true); // Indicate that fetching has started
    try {
      const { status } = await Location.getForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status === "granted") {
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation(currentLocation.coords);
        fetchAddress(
            currentLocation.coords.latitude,
            currentLocation.coords.longitude
          );
      }
    } catch (error) {
      setErrorMsg(error.message);
    } finally {
      setIsFetching(false); // Ensure we set fetching to false after the attempt
    }
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      setPermissionStatus(status);

      if (status === "granted") {
        await getLocation();
      } else if (status === "denied") {
        showPermissionDeniedAlert();
      }
    })();
  }, []);

  useEffect(() => {
    const subscription = AppState.addEventListener("change", (nextAppState) => {
      if (nextAppState === "active") {
        getLocation();
      }
    });

    return () => subscription.remove();
  }, []);

  const refreshLocation = async () => {
    if (permissionStatus === "granted") {
      try {
        setIsFetching(true);
        const currentLocation = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });
        setLocation(currentLocation.coords);
        fetchAddress(
          currentLocation.coords.latitude,
          currentLocation.coords.longitude
        );
        return currentLocation;
      } catch (error) {
        setErrorMsg(error.message);
        return null;
      } finally {
        setIsFetching(false);
      }
    }
    return null;
  };

  const showPermissionDeniedAlert = () => {
    Alert.alert(
      "Location Permission Required",
      "This app needs location permission to work properly. Would you like to open settings to enable it?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Open Settings", onPress: () => openAppSettings() },
      ]
    );
  };

  const openAppSettings = async () => {
    if (Platform.OS === "ios") {
      await Linking.openURL("app-settings:");
    } else {
      await Linking.openSettings();
    }
  };
  const fetchAddress = async (latitude, longitude) => {
    try {
      const response = await getAddressFromCoordinates(latitude, longitude);
    
      setAddress(response);
    } catch (err) {
      console.error("Failed to fetch address", err);
      setAddress(null);
    }
  };
  return (
    <LocationContext.Provider
      value={{
        location,
        errorMsg,
        permissionStatus,
        refreshLocation,
        isFetching,
        address,
      }}
    >
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  return useContext(LocationContext);
}
