
import apiClient from './api';

export const requestOTP = async (email:string, role = 'driver') => {
  try {
    const response = await apiClient.post('/api/request-otp/', {
      email,
      role,
    });
    return response;
  } catch (error:any) {
    throw error?.response?.data || { message: 'Failed to request OTP' };
  }
};

export const verifyOTP = async (email:string, otp:string) => {
  try {
    const response = await apiClient.post('/api/verify-otp/', {
      email,
      otp,
    });
    return response;
  } catch (error:any) {
    throw error?.response?.data || { message: 'Failed to request OTP' };
  }
};