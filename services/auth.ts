import { imagePickerResponseType } from "@/utils/types/typeUtils";
import apiClient from "./api";

export const requestOTP = async (phoneNumber: string, role = "driver") => {
  const formatedPhoneNumber = `+91${phoneNumber}`;

  try {
    const response = await apiClient.post("/api/request-otp/", {
      phone: formatedPhoneNumber,
      role: role,
    });
    return response;
  } catch (error: any) {
    throw error?.response?.data || { message: "Failed to request OTP" };
  }
};

export const verifyOTP = async (email: string, otp: string) => {
  const formatedPhoneNumber = `+91${email}`;
  try {
    const response = await apiClient.post("/api/verify-otp/", {
      phone: email,
      otp: otp,
    });
    return response;
  } catch (error: any) {
    throw error?.response?.data || { message: "Failed to request OTP" };
  }
};

export const profileForm = async (
  firstName: string,
  lastName: string,
  gender: string,
  dateOfBirth: string,
  image: imagePickerResponseType
) => {
  const formData = new FormData();

  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("gender", gender);
  formData.append("date_of_birth", dateOfBirth);
  formData.append("profile_image", {
    uri: image.uri,
    type: image.mimeType,
    name: image.fileName,
  });

  try {
    const response = await apiClient.post("/api/registration/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    throw error;
  }
};

export const getVerificationSteps = async () => {
  try {
    const response = await apiClient.post("/api/file/list/", {});

    return response;
  } catch (error: any) {
    throw error?.response?.data || { message: "Failed to request OTP" };
  }
};

export const fileUploadForm = async (
  fileType: string,
  vehicleOwner: string,
  fileNumber: string,
  frontImage: imagePickerResponseType,
  backImage: imagePickerResponseType
) => {
  const formData = new FormData();

  formData.append("file_type", fileType);
  if (vehicleOwner.length > 0) {
    formData.append("v_owner_name", vehicleOwner);
  }
  formData.append("file_number", fileNumber);
  formData.append("f_file", {
    uri: frontImage.uri,
    type: frontImage.mimeType,
    name: frontImage.fileName,
  });
  formData.append("b_file", {
    uri: backImage.uri,
    type: backImage.mimeType,
    name: backImage.fileName,
  });
  try {
    const response = await apiClient.post("/api/upload/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response;
  } catch (error) {
    // throw error;
  }
};

export const addBankDetails = async (
  paymentMethod: string,
  accountName: string,
  accountNumber: string,
  ifscCode: string,
  bankName: string,
  upiId: string
) => {
  const payload: Record<string, string> = {
    payment_method: paymentMethod,
  };
  if (accountName) payload.account_name = accountName;
  if (accountNumber) payload.account_number = accountNumber;
  if (ifscCode) payload.ifsc_code = ifscCode;
  if (bankName) payload.bank_Id = bankName;
  if (upiId) payload.upi_number = upiId;

  try {
    const response = await apiClient.post("/api/add_bank_details/", payload);
    return response;
  } catch (error: any) {
    throw error?.response?.data || { message: "Failed" };
  }
};
export const getBankList = async () => {
  try {
    const response = await apiClient.get("/api/bank/list/");
    return response;
  } catch (error: any) {
    throw error?.response?.data || { message: "Failed to request OTP" };
  }
};

// ================================main services========================================

export const markDriverAvailable = async (
  lat: number,
  lng: number,
  isAvailable: boolean
) => {
  try {
    const response = await apiClient.post("/api/driver/availability/", {
      current_lat: lat,
      current_lng: lng,
      is_available: isAvailable,
    });
    return response;
  } catch (error: any) {
    throw error?.response?.data || { message: "Failed to request OTP" };
  }
};
