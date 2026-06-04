import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  resendOtpForRegistration,
  verifyOtpForRegistration,
} from "../../api/registrationApi";
import {
  nextStep,
  resetFeedback,
  setError,
  setLoading,
  setOtpToken,
  setOtpVerified,
} from "../../redux/registrationSlice";
import { getApiErrorMessage, getOtpErrorMessage } from "../../utils/apiError";
import BackButton from "../ui/BackButton";
import OtpInput from "../ui/OtpInput";
import PrimaryButton from "../ui/PrimaryButton";
import StepHeader from "../ui/StepHeader";

const OTP_RESEND_COUNTDOWN_SECONDS = 3 * 60;

const formatCountdown = (totalSeconds) => {
  const minutes = Math.floor(totalSeconds / 60);
  const secs = totalSeconds % 60;
  return `${minutes}:${String(secs).padStart(2, "0")}`;
};

function StepThreeOtp() {
  const dispatch = useDispatch();
  const { loading, otp, user } = useSelector((state) => state.registration);
  const [value, setValue] = useState("");
  const [seconds, setSeconds] = useState(OTP_RESEND_COUNTDOWN_SECONDS);
  const isOtpComplete = value.length === 6;

  useEffect(() => {
    if (seconds <= 0) return undefined;
    const timer = setTimeout(() => setSeconds((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [seconds]);

  const onOtpChange = (nextValue) => {
    dispatch(resetFeedback());
    setValue(nextValue);
  };

  const verifyOtp = async (event) => {
    event.preventDefault();
    if (value.length !== 6) {
      const message = "Please enter the 6-digit OTP.";
      dispatch(setError(message));
      toast.error(message);
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(""));

    try {
      await verifyOtpForRegistration({ otp: value, token: otp.token });
      dispatch(setOtpVerified(true));
      toast.success("OTP verified successfully.");
      dispatch(nextStep());
    } catch (apiError) {
      const message = getOtpErrorMessage(apiError, "OTP verification failed.");
      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const resendOtp = async () => {
    dispatch(setLoading(true));
    dispatch(setError(""));

    try {
      const result = await resendOtpForRegistration({ email: user.email });
      dispatch(setOtpToken(result?.data?.token || otp.token));
      toast.success(result?.data?.message || "OTP resent.");
      setSeconds(OTP_RESEND_COUNTDOWN_SECONDS);
    } catch (apiError) {
      const message = getApiErrorMessage(apiError, "Unable to resend OTP.");
      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form className="form-card step-form" onSubmit={verifyOtp}>
      <StepHeader
        title="Input verification code"
        description={`We’ve sent a 6-digit OTP to your work email Please enter it below to continue.`}
      />
      <OtpInput value={value} onChange={onOtpChange} />
      <p className="helper-text">
        {seconds > 0 ? (
          `Resend OTP in ${formatCountdown(seconds)}`
        ) : (
          <button type="button" className="link-button" onClick={resendOtp}>
            Resend OTP
          </button>
        )}
      </p>
      <div className="button-container button-container--split">
        <BackButton step={2} disabled={loading} />
        <PrimaryButton
          type="submit"
          loading={loading}
          disabled={!isOtpComplete}
        >
          Submit
        </PrimaryButton>
      </div>
    </form>
  );
}

export default StepThreeOtp;
