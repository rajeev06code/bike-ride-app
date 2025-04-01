export const validateDL = (dlNumber: string) => {
  const dlRegex = /^[A-Z]{2}[0-9]{13}$/;
  return dlRegex.test(dlNumber);
};

// Example usage
const dlNumber = "MH12 2020 123456";

export const validateVehicleNUmber = (vehicleNumber: string) => {
  const vehicleNumberRegex =
    /^[A-Z]{2}[ -]?[0-9]{2}[ -]?[A-Z]{1,2}[ -]?[0-9]{4}$/;
  return vehicleNumberRegex.test(vehicleNumber);
};

export const validateAadhaar = (aadhaarNumber: string) => {
  const aadhaarRegex = /^[2-9]{1}\d{11}$/;
  return aadhaarRegex.test(aadhaarNumber);
};

export const validatePan = (panNumber: string) => {
  const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
  return panRegex.test(panNumber);
};
