import { useSelector } from "react-redux";
import StepOneCompany from "./steps/StepOneCompany";
import StepTwoUserDetails from "./steps/StepTwoUserDetails";
import StepThreeOtp from "./steps/StepThreeOtp";
import StepFourProfile from "./steps/StepFourProfile";
import StepFiveInterests from "./steps/StepFiveInterests";
import StepSixPillars from "./steps/StepSixPillars";
import StepSevenSubmitting from "./steps/StepSevenSubmitting";
import StepEightWelcome from "./steps/StepEightWelcome";

function RegistrationSteps() {
  const currentStep = useSelector((state) => state.registration.currentStep);

  const steps = {
    1: <StepOneCompany />,
    2: <StepTwoUserDetails />,
    3: <StepThreeOtp />,
    4: <StepFourProfile />,
    5: <StepFiveInterests />,
    6: <StepSixPillars />,
    7: <StepSevenSubmitting />,
    8: <StepEightWelcome />,
  };

  return steps[currentStep];
}

export default RegistrationSteps;
