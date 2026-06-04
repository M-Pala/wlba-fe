import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import completeGif from "../../assets/complete.gif";
import PrimaryButton from "../ui/PrimaryButton";

function StepEightWelcome() {
  const { user, registrationResult } = useSelector(
    (state) => state.registration,
  );
  const apiUser = registrationResult?.user;
  const displayName =
    [apiUser?.fname, apiUser?.lname].filter(Boolean).join(" ") ||
    [user.firstName, user.lastName].filter(Boolean).join(" ") ||
    "there";

  const onGetStarted = () => {
    toast.success("Assessment completed.");
  };

  return (
    <div className="welcome-page">
      <div className="welcome-page__gif-wrap">
        <img
          src={completeGif}
          alt=""
          className="welcome-page__gif"
          width={192}
          height={192}
          decoding="sync"
          fetchPriority="high"
        />
      </div>
      <h1 className="welcome-page__title">Welcome {displayName}</h1>
      <p className="welcome-page__description">
        Welcome to Woliba! You&apos;ll find wellness challenges, fitness and
        recipe videos, and daily tips to support your health goals. Download our
        iOS or Android app and start your wellbeing journey today.
      </p>
      <div className="button-container">
        <PrimaryButton onClick={onGetStarted}>
          Let&apos;s get started
        </PrimaryButton>
      </div>
    </div>
  );
}

export default StepEightWelcome;
