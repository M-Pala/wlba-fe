import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { verifyCompanyCredentials } from "../../api/registrationApi";
import {
  nextStep,
  resetFeedback,
  setCompanyDetails,
  setError,
  setLoading,
} from "../../redux/registrationSlice";
import { getApiErrorMessage } from "../../utils/apiError";
import { isStrongPassword } from "../../utils/validation";
import PrimaryButton from "../ui/PrimaryButton";
import StepHeader from "../ui/StepHeader";
import TextField from "../ui/TextField";

function StepOneCompany() {
  const dispatch = useDispatch();
  const { loading, company } = useSelector((state) => state.registration);
  const [form, setForm] = useState({
    companyName: company.name || "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const onChange = (event) => {
    dispatch(resetFeedback());
    setForm((prev) => ({ ...prev, [event.target.name]: event.target.value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const nextErrors = {};

    if (!form.companyName.trim())
      nextErrors.companyName = "Company name is required.";
    if (!isStrongPassword(form.password)) {
      nextErrors.password = "Use 8+ chars, at least 1 uppercase and 1 number.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      toast.error("Please fix validation errors.");
      return;
    }

    dispatch(setLoading(true));
    dispatch(setError(""));

    try {
      const result = await verifyCompanyCredentials({
        company_name: form.companyName.trim(),
        password: form.password,
      });

      const companyPayload = Array.isArray(result?.data)
        ? result.data[0]
        : null;
      if (!companyPayload?.id)
        throw new Error("Could not verify company details.");

      dispatch(
        setCompanyDetails({
          id: companyPayload.id,
          name: companyPayload.company_name || form.companyName.trim(),
        }),
      );
      toast.success("Company verified successfully.");
      dispatch(nextStep());
    } catch (apiError) {
      const message = getApiErrorMessage(apiError, "Verification failed.");
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
          label="Company Name"
          name="companyName"
          value={form.companyName}
          onChange={onChange}
          placeholder="Woliba"
          error={errors.companyName}
        />
        <TextField
          label="Company Password"
          name="password"
          type="password"
          value={form.password}
          onChange={onChange}
          placeholder="Enter company password"
          error={errors.password}
        />
      </div>
      <div className="button-container">
        <PrimaryButton type="submit" loading={loading}>
          Verify & Continue
        </PrimaryButton>
      </div>
    </form>
  );
}

export default StepOneCompany;
