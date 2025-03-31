import apiClient from "./api";

export const requestOTP = async (phoneNumber: string, role = "driver") => {
  const formatedPhoneNumber = `+91${phoneNumber}`;
  console.log("the phone is", formatedPhoneNumber);
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
  firstName:string,
  lastName:string,
  gender:string,
  dateOfBirth:string,
  image:string
) => {
  const formData = new FormData();

  formData.append("first_name", firstName);
  formData.append("last_name", lastName);
  formData.append("gender", gender);
  formData.append("date_of_birth", dateOfBirth);
  formData.append("profile_image", {
    uri: image,
    type: "image/jpeg", 
    name: "profile.jpg", 
  });
  
  try {
    const response = await apiClient.post("/api/registration/", formData,{ headers: {
      'Content-Type': 'multipart/form-data',
    }});

    console.log("Success:", response.data);
    return response;
  } catch (error) {
   
    throw error;
  }
};
