// src/services/api.js
import axios from 'axios';
import Config from 'react-native-config';

const apiClient = axios.create({
  // baseURL: Config.API_BASE_URL,
  baseURL: 'http://34.45.31.217:8000',
  // timeout: parseInt(Config.API_TIMEOUT, 10),
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor
apiClient.interceptors.request.use(
  config => {
    // You can modify requests here (e.g., add auth tokens)
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// Add response interceptor
apiClient.interceptors.response.use(
  response => {
    // Handle successful responses
    return response;
  },
  error => {
    // Handle errors globally
    if (error.response) {
      // Server responded with a status code outside 2xx
      console.error('API Error:', error.response.data);
    } else if (error.request) {
      // Request was made but no response received
      console.error('API Request Error:', error.request);
    } else {
      // Something happened in setting up the request
      console.error('API Setup Error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default apiClient;