import { useState, useEffect } from "react";
import * as Location from "expo-location";

const useAddress = (latitude, longitude) => {
  const [address, setAddress] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAddress = async () => {
      if (!latitude || !longitude) return;

      setLoading(true);
      try {
        const addressArray = await Location.reverseGeocodeAsync({ latitude, longitude });

        if (addressArray.length > 0) {
          const addr = addressArray[0];
          setAddress(`${addr.name || ""}, ${addr.street || ""}, ${addr.city || ""}, ${addr.region || ""}, ${addr.country || ""}`);
        } else {
          setAddress("Address not found");
        }
      } catch (err) {
        setError("Error fetching address");
      }
      setLoading(false);
    };

    fetchAddress();
  }, [latitude, longitude]);

  return { address, loading, error };
};

export default useAddress;
