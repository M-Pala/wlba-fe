import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentStep: 1,
  loading: false,
  error: "",
  company: {
    id: null,
    name: "",
  },
  user: {
    email: "",
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    dob: "",
    phoneNumber: "",
    workAnniversary: "",
    acceptedPolicy: false,
  },
  otp: {
    token: "",
    verified: false,
  },
  interests: [],
  pillars: [],
  options: {
    interests: [],
    pillars: [],
  },
  registrationResult: null,
};

const registrationSlice = createSlice({
  name: "registration",
  initialState,
  reducers: {
    setCurrentStep(state, action) {
      state.currentStep = action.payload;
    },
    nextStep(state) {
      state.currentStep += 1;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    setCompanyDetails(state, action) {
      state.company = { ...state.company, ...action.payload };
    },
    setUserDetails(state, action) {
      state.user = { ...state.user, ...action.payload };
    },
    setOtpToken(state, action) {
      state.otp.token = action.payload;
    },
    setOtpVerified(state, action) {
      state.otp.verified = action.payload;
    },
    setInterestOptions(state, action) {
      state.options.interests = action.payload;
    },
    setPillarOptions(state, action) {
      state.options.pillars = action.payload;
    },
    setSelectedInterests(state, action) {
      state.interests = action.payload;
    },
    setSelectedPillars(state, action) {
      state.pillars = action.payload;
    },
    setRegistrationResult(state, action) {
      state.registrationResult = action.payload;
    },
    resetFeedback(state) {
      state.error = "";
    },
  },
});

export const {
  setCurrentStep,
  nextStep,
  setLoading,
  setError,
  setCompanyDetails,
  setUserDetails,
  setOtpToken,
  setOtpVerified,
  setInterestOptions,
  setPillarOptions,
  setSelectedInterests,
  setSelectedPillars,
  setRegistrationResult,
  resetFeedback,
} = registrationSlice.actions;

export default registrationSlice.reducer;
