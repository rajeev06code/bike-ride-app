import * as Location from "expo-location";

export const getAddressFromCoordinates = async (latitude, longitude) => {
 
  try {
    const addressArray = await Location.reverseGeocodeAsync({ latitude, longitude });

    if (addressArray.length > 0) {
      const address = addressArray[0];
      return `${address.city || ""}, ${address.region || ""}`;
    } else {
      return "Address not found";
    }
  } catch (error) {
    console.error("Error fetching address:", error);
    return "Error retrieving address";
  }
};
