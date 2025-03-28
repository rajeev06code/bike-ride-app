// src/services/auth.js
import { Userdata } from '@/app/(auth)/OtpScreen';
import apiClient from './api';

export const requestOTP = async (email:Userdata, role = 'driver') => {
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

export const verifyOTP = async (email:Userdata, otp:string) => {
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