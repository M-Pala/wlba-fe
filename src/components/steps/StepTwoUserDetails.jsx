import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { saveUserDetailsAndSendOtp } from "../../api/registrationApi";
import {
  nextStep,
  resetFeedback,
  setError,
  setLoading,
  setOtpToken,
  setUserDetails,
} from "../../redux/registrationSlice";
import { getApiErrorMessage } from "../../utils/apiError";
import { isOnlyLetters, isValidEmail } from "../../utils/validation";
import PrimaryButton from "../ui/PrimaryButton";
import StepHeader from "../ui/StepHeader";
import TextField from "../ui/TextField";

function StepTwoUserDetails() {
  const dispatch = useDispatch();
  const { loading, company, user } = useSelector((state) => state.registration);
  const [form, setForm] = useState({
    email: user.email || "",
    firstName: user.firstName || "",
    lastName: user.lastName || "",
  });
  const [errors, setErrors] = useState({});

  const onChange = (event) => {
    dispatch(resetFeedback());
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onEmailBlur = () => {
    const email = form.email.trim();
    if (!email) {
      setErrors((prev) => ({ ...prev, email: "" }));
      return;
    }
    if (!isValidEmail(email)) {
      setErrors((prev) => ({
        ...prev,
        email: "Enter a valid email address.",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, email: "" }));
  };

  const isFormValid =
    Boolean(company.name) &&
    isValidEmail(form.email.trim()) &&
    isOnlyLetters(form.firstName.trim()) &&
    isOnlyLetters(form.lastName.trim());

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!isValidEmail(form.email))
      nextErrors.email = "Enter a valid email address.";
    if (!isOnlyLetters(form.firstName))
      nextErrors.firstName = "Only letters are allowed.";
    if (!isOnlyLetters(form.lastName))
      nextErrors.lastName = "Only letters are allowed.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      toast.error("Please fix validation errors.");
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(""));

    try {
      const result = await saveUserDetailsAndSendOtp({
        company_id: company.id,
        mail: form.email.trim(),
        fname: form.firstName.trim(),
        lname: form.lastName.trim(),
      });

      const token = result?.data?.token;
      if (!token) throw new Error("Could not start OTP verification.");

      dispatch(setOtpToken(token));
      dispatch(setUserDetails(form));
      toast.success(result?.data?.message || "OTP sent successfully.");
      dispatch(nextStep());
    } catch (apiError) {
      const message = getApiErrorMessage(apiError, "Failed to send OTP.");
      dispatch(setError(message));
      toast.error(message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <form className="form-card step-form" onSubmit={onSubmit}>
      <StepHeader title="Registration" />
      <div className="form-fields-container">
        <TextField
          label="Email"
          name="email"
          type="email"
          value={form.email}
          onChange={onChange}
          onBlur={onEmailBlur}
          placeholder="name@company.com"
          error={errors.email}
        />
        <TextField
          label="First Name"
          name="firstName"
          value={form.firstName}
          onChange={onChange}
          error={errors.firstName}
        />
        <TextField
          label="Last Name"
          name="lastName"
          value={form.lastName}
          onChange={onChange}
          error={errors.lastName}
        />
        <TextField
          label="Company Name"
          name="companyName"
          value={company.name}
          disabled
          onChange={() => {}}
        />
      </div>
      <div className="button-container">
        <PrimaryButton type="submit" loading={loading} disabled={!isFormValid}>
          Verify email
        </PrimaryButton>
      </div>
    </form>
  );
}

export default StepTwoUserDetails;
