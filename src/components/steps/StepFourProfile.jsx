import { useState } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import calendarIcon from "../../assets/calender.svg";
import {
  nextStep,
  resetFeedback,
  setError,
  setUserDetails,
} from "../../redux/registrationSlice";
import { isStrongPassword, isValidPhone } from "../../utils/validation";
import PrimaryButton from "../ui/PrimaryButton";
import StepHeader from "../ui/StepHeader";
import TextField from "../ui/TextField";

const datePickerIcon = <img src={calendarIcon} alt="" />;

function StepFourProfile() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.registration);
  const today = new Date();
  const minBirthYear = 1900;
  const minDobDate = new Date(minBirthYear, 0, 1);
  const maxAnniversaryDate = new Date(today.getFullYear() + 10, 11, 31);
  const yearDropdownItemNumber =
    maxAnniversaryDate.getFullYear() - minBirthYear + 1;
  const [form, setForm] = useState({
    password: user.password || "",
    confirmPassword: user.confirmPassword || "",
    dob: user.dob || "",
    phoneNumber: user.phoneNumber || "",
    workAnniversary: user.workAnniversary || "",
    acceptedPolicy: user.acceptedPolicy || false,
  });
  const [errors, setErrors] = useState({});

  const onChange = (event) => {
    dispatch(resetFeedback());
    const { name, value, type, checked } = event.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const onPasswordBlur = () => {
    if (!form.password) {
      setErrors((prev) => ({ ...prev, password: "" }));
      return;
    }
    if (!isStrongPassword(form.password)) {
      setErrors((prev) => ({
        ...prev,
        password: "Use 8+ chars, one uppercase and one number.",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, password: "" }));
  };

  const onConfirmPasswordBlur = () => {
    if (!form.confirmPassword) {
      setErrors((prev) => ({ ...prev, confirmPassword: "" }));
      return;
    }
    if (form.password !== form.confirmPassword) {
      setErrors((prev) => ({
        ...prev,
        confirmPassword: "Passwords do not match.",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, confirmPassword: "" }));
  };

  const onPhoneNumberBlur = () => {
    if (!form.phoneNumber) {
      setErrors((prev) => ({ ...prev, phoneNumber: "" }));
      return;
    }
    if (!isValidPhone(form.phoneNumber)) {
      setErrors((prev) => ({
        ...prev,
        phoneNumber: "Enter a valid phone number.",
      }));
      return;
    }
    setErrors((prev) => ({ ...prev, phoneNumber: "" }));
  };

  const onDateChange = (field, date) => {
    const value = date ? date.toISOString().slice(0, 10) : "";
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!isStrongPassword(form.password))
      nextErrors.password = "Use 8+ chars, one uppercase and one number.";
    if (form.password !== form.confirmPassword)
      nextErrors.confirmPassword = "Passwords do not match.";
    if (!form.dob) nextErrors.dob = "Date of birth is required.";
    if (!isValidPhone(form.phoneNumber))
      nextErrors.phoneNumber = "Enter a valid phone number.";
    if (!form.acceptedPolicy)
      nextErrors.acceptedPolicy = "You must accept terms and policy.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      const message = "Please fix validation errors before continuing.";
      dispatch(setError(message));
      toast.error(message);
      return;
    }

    dispatch(setError(""));
    dispatch(setUserDetails(form));
    toast.success("Profile details saved.");
    dispatch(nextStep());
  };

  const isFormValid =
    isStrongPassword(form.password) &&
    form.password === form.confirmPassword &&
    Boolean(form.dob) &&
    isValidPhone(form.phoneNumber) &&
    form.acceptedPolicy;

  return (
    <form className="form-card step-form" onSubmit={onSubmit}>
      <StepHeader title="Login Credentials" />
      <div className="form-fields-container">
        <TextField
          label="Password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          onBlur={onPasswordBlur}
          error={errors.password}
        />
        <TextField
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={onChange}
          onBlur={onConfirmPasswordBlur}
          error={errors.confirmPassword}
        />
        <div>
          <label className="field-label">Date of Birth</label>
          <DatePicker
            selected={form.dob ? new Date(form.dob) : null}
            onChange={(date) => onDateChange("dob", date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select date of birth"
            className={`datepicker-input ${errors.dob ? "field-input--error" : ""}`}
            showIcon
            icon={datePickerIcon}
            toggleCalendarOnIconClick
            showMonthDropdown
            showYearDropdown
            dropdownMode="scroll"
            scrollableYearDropdown
            yearDropdownItemNumber={yearDropdownItemNumber}
            minDate={minDobDate}
            maxDate={today}
          />
          {errors.dob ? (
            <small className="field-error">{errors.dob}</small>
          ) : null}
        </div>
        <TextField
          label="Phone Number"
          name="phoneNumber"
          value={form.phoneNumber}
          onChange={onChange}
          onBlur={onPhoneNumberBlur}
          placeholder="+1234567890"
          error={errors.phoneNumber}
        />
        <div>
          <label className="field-label">Work Anniversary (Optional)</label>
          <DatePicker
            selected={
              form.workAnniversary ? new Date(form.workAnniversary) : null
            }
            onChange={(date) => onDateChange("workAnniversary", date)}
            dateFormat="yyyy-MM-dd"
            placeholderText="Select work anniversary"
            className="datepicker-input"
            showIcon
            icon={datePickerIcon}
            toggleCalendarOnIconClick
            showMonthDropdown
            showYearDropdown
            dropdownMode="scroll"
            scrollableYearDropdown
            yearDropdownItemNumber={yearDropdownItemNumber}
            minDate={minDobDate}
            maxDate={maxAnniversaryDate}
          />
        </div>
        <label className="policy-row">
          <input
            type="checkbox"
            name="acceptedPolicy"
            checked={form.acceptedPolicy}
            onChange={onChange}
          />
          <span>I agree to Woliba's Terms of Service and Privacy Policy.</span>
        </label>
        {errors.acceptedPolicy ? (
          <small className="field-error">{errors.acceptedPolicy}</small>
        ) : null}
      </div>
      <div className="button-container">
        <PrimaryButton type="submit" disabled={!isFormValid}>
          Next
        </PrimaryButton>
      </div>
    </form>
  );
}

export default StepFourProfile;
