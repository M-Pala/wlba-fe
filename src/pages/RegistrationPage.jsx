import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import RegistrationSteps from "../components/RegistrationSteps";
import LoaderVideo from "../components/LoaderVideo";
import { prefetchRegistrationOptions } from "../utils/registrationOptions";
import { ensureLoaderVideoReady, preloadImage } from "../utils/preloadMedia";
import logo from "../assets/woliba Logo.webp";
import completeGif from "../assets/complete.gif";
import loaderVideo from "../assets/loader.mp4";

function RegistrationPage() {
  const dispatch = useDispatch();
  const currentStep = useSelector((state) => state.registration.currentStep);
  const options = useSelector((state) => state.registration.options);
  const isSubmitting = currentStep === 7;

  useEffect(() => {
    prefetchRegistrationOptions(dispatch, options);
    ensureLoaderVideoReady(loaderVideo);
    preloadImage(completeGif);
  }, [dispatch]);

  return (
    <main
      className={`page-shell ${isSubmitting ? "page-shell--submitting" : "hero-bg"}`}
    >
      <LoaderVideo visible={isSubmitting} />
      {!isSubmitting ? (
        <section className="logo-wrap">
          <img src={logo} alt="Woliba logo" className="logo-image" />
        </section>
      ) : null}
      <section
        className={`content-wrap ${isSubmitting ? "content-wrap--submitting" : ""}`}
      >
        <RegistrationSteps />
      </section>
    </main>
  );
}

export default RegistrationPage;
