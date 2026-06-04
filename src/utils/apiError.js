const GENERIC_AXIOS_MESSAGE = /^Request failed with status code \d+$/;

const OTP_ERROR_MESSAGES = {
  "-419": "Invalid OTP. Please check the code and try again.",
  "-420": "OTP has expired. Please request a new code.",
  "-431": "Session expired. Please verify your OTP again.",
  "-430": "Failed to send OTP. Please try again.",
};

const SESSION_EXPIRED_PATTERNS = [
  /session expired/i,
  /otp expired/i,
  /verify.*otp/i,
  /otp verification/i,
];

export const getApiErrorCode = (error) => {
  const data = error?.response?.data;
  const code = data?.error_code ?? data?.code ?? data?.errorCode;
  if (code != null) return String(code);
  return null;
};

export const getOtpErrorMessage = (error, fallback = "OTP verification failed.") => {
  const code = getApiErrorCode(error);
  if (code && OTP_ERROR_MESSAGES[code]) {
    return OTP_ERROR_MESSAGES[code];
  }
  return getApiErrorMessage(error, fallback);
};

export const isOtpSessionError = (error) => {
  const code = getApiErrorCode(error);
  if (code === "-420" || code === "-431") return true;
  const message = getApiErrorMessage(error, "");
  return SESSION_EXPIRED_PATTERNS.some((pattern) => pattern.test(message));
};

export const getApiErrorMessage = (error, fallback = "Something went wrong.") => {
  const data = error?.response?.data;
  const code = getApiErrorCode(error);
  if (code && OTP_ERROR_MESSAGES[code]) {
    return OTP_ERROR_MESSAGES[code];
  }

  if (typeof data?.data?.message === "string" && data.data.message.trim()) {
    return data.data.message;
  }

  if (typeof data?.message === "string" && data.message.trim()) {
    return data.message;
  }

  if (typeof data?.error === "string" && data.error.trim()) {
    return data.error;
  }

  if (typeof error?.message === "string" && error.message.trim() && !GENERIC_AXIOS_MESSAGE.test(error.message)) {
    return error.message;
  }

  return fallback;
};
