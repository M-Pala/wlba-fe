import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  completeUserRegistration,
  resendOtpForRegistration,
} from "../../api/registrationApi";
import {
  nextStep,
  setCurrentStep,
  setError,
  setOtpToken,
  setOtpVerified,
  setRegistrationResult,
} from "../../redux/registrationSlice";
import { getApiErrorMessage, isOtpSessionError } from "../../utils/apiError";

function StepSevenSubmitting() {
  const dispatch = useDispatch();
  const submittedRef = useRef(false);
  const { user, otp, interests, pillars } = useSelector(
    (state) => state.registration,
  );

  useEffect(() => {
    if (submittedRef.current) return;

    const register = async () => {
      if (!otp.verified) {
        dispatch(setCurrentStep(3));
        toast.warning("Please verify your OTP before continuing.");
        return;
      }

      submittedRef.current = true;

      dispatch(setError(""));

      try {
        const result = await completeUserRegistration({
          fname: user.firstName,
          lname: user.lastName,
          email: user.email,
          password: user.password,
          time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
          token: otp.token,
          areas_of_interest: interests,
          wellbeing_pillars: pillars,
          accepted_privacy_policy: user.acceptedPolicy,
          birthday: user.dob,
          phone_number: user.phoneNumber,
          work_anniversary: user.workAnniversary || null,
          user_type: 0,
        });

        dispatch(setRegistrationResult(result?.data || result));
        dispatch(nextStep());
      } catch (apiError) {
        const message = getApiErrorMessage(apiError, "Registration failed.");
        dispatch(setError(message));
        toast.error(message);

        if (isOtpSessionError(apiError)) {
          dispatch(setOtpVerified(false));
          try {
            const resend = await resendOtpForRegistration({
              email: user.email,
            });
            dispatch(setOtpToken(resend?.data?.token || otp.token));
            toast.info("Your session expired. A new OTP has been sent.");
          } catch {
            toast.warning("Please go back and verify your OTP again.");
          }
          dispatch(setCurrentStep(3));
          return;
        }

        dispatch(setCurrentStep(6));
      }
    };

    register();
  }, [
    dispatch,
    interests,
    otp.token,
    otp.verified,
    pillars,
    user.acceptedPolicy,
    user.dob,
    user.email,
    user.firstName,
    user.lastName,
    user.password,
    user.phoneNumber,
    user.workAnniversary,
  ]);

  return null;
}

export default StepSevenSubmitting;
