// src/services/api.js
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import Config from "react-native-config";

const apiClient = axios.create({
  // baseURL: Config.API_BASE_URL,
  baseURL: "http://34.45.31.217:8000",
 
});

// Add request interceptor
apiClient.interceptors.request.use(
  async (config) => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      // console.log("auth token is reaq----", token);

      if (token) {
        const parsedToken = JSON.parse(token).access_token;
        if (parsedToken) {
          config.headers.Authorization = `Bearer ${parsedToken}`;
        }
      }
      if (!config.headers['Content-Type'] && !(config.data instanceof FormData)) {
        config.headers['Content-Type'] = 'application/json';
      }
    } catch (error) {}
 
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor
apiClient.interceptors.response.use(
  (response) => {
    // Handle successful responses
    return response;
  },
  (error) => {
    // Handle errors globally
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error("API Error:", error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error("API Request Error:", error.request);
    } else {
      // Something happened in setting up the request
      console.error("API Setup Error:", error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;
