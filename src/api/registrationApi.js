import { coreApi, interestApi } from "./httpClient";

export const verifyCompanyCredentials = async (payload) => {
  const response = await coreApi.post(
    "/verify-by-company-name-and-password",
    payload,
  );
  return response.data;
};

export const saveUserDetailsAndSendOtp = async (payload) => {
  const response = await coreApi.post(
    "/save-user-details-and-send-otp",
    payload,
  );
  return response.data;
};

export const verifyOtpForRegistration = async (payload) => {
  const response = await coreApi.post(
    "/verify-otp-for-user-registration",
    payload,
  );
  return response.data;
};

export const resendOtpForRegistration = async (payload) => {
  const response = await coreApi.post(
    "/send-otp-for-user-registration",
    payload,
  );
  return response.data;
};

export const getWellnessInterests = async () => {
  const response = await interestApi.get("/viewWellnessInterest");
  return response.data;
};

export const getWellbeingPillars = async (languageId = 1) => {
  const response = await coreApi.get(`/get-wellbeing-pillars/${languageId}`);
  return response.data;
};

export const completeUserRegistration = async (payload) => {
  const response = await coreApi.post("/user-registration", payload);
  return response.data;
};
