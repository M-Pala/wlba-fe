import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  nextStep,
  setError,
  setSelectedPillars,
} from "../../redux/registrationSlice";
import {
  loadPillarOptions,
  resetPillarOptionsCache,
} from "../../utils/registrationOptions";
import BackButton from "../ui/BackButton";
import PrimaryButton from "../ui/PrimaryButton";
import StepHeader from "../ui/StepHeader";

function StepSixPillars() {
  const dispatch = useDispatch();
  const { options, pillars } = useSelector((state) => state.registration);
  const [isLoadingOptions, setIsLoadingOptions] = useState(
    () => !options.pillars.length,
  );
  const [loadFailed, setLoadFailed] = useState(false);

  useEffect(() => {
    if (options.pillars.length) {
      setIsLoadingOptions(false);
      return;
    }

    setIsLoadingOptions(true);
    loadPillarOptions(dispatch, { notify: true })
      .then((items) => setLoadFailed(!items.length))
      .finally(() => setIsLoadingOptions(false));
  }, [dispatch, options.pillars.length]);

  const retryLoad = () => {
    resetPillarOptionsCache();
    setLoadFailed(false);
    setIsLoadingOptions(true);
    loadPillarOptions(dispatch, { notify: true })
      .then((items) => setLoadFailed(!items.length))
      .finally(() => setIsLoadingOptions(false));
  };

  const toggle = (id) => {
    if (pillars.includes(id)) {
      dispatch(setSelectedPillars(pillars.filter((item) => item !== id)));
      dispatch(setError(""));
      return;
    }
    if (pillars.length >= 3) {
      const message = "You can select exactly 3 wellbeing pillars.";
      dispatch(setError(message));
      toast.error(message);
      return;
    }
    dispatch(setSelectedPillars([...pillars, id]));
    dispatch(setError(""));
  };

  const onNext = () => {
    if (pillars.length !== 3) {
      const message = "Please select exactly 3 wellbeing pillars.";
      dispatch(setError(message));
      toast.error(message);
      return;
    }
    dispatch(setError(""));
    dispatch(nextStep());
  };

  return (
    <div className="form-card step-form step-form--interests">
      <StepHeader title="Select any 3 well-being pillars goal you want to achieve" />
      {loadFailed && !options.pillars.length ? (
        <div className="empty-state">
          <p>Could not load wellbeing pillars.</p>
          <button type="button" className="link-button" onClick={retryLoad}>
            Try again
          </button>
        </div>
      ) : null}
      <div className="pillar-list">
        {options.pillars.map((item) => {
          const selectionOrder = pillars.indexOf(item.id);
          const isSelected = selectionOrder !== -1;

          return (
            <button
              key={item.id}
              type="button"
              className={`pillar-card`}
              onClick={() => toggle(item.id)}
              aria-pressed={isSelected}
            >
              <span
                className={`pillar-card__checkbox ${isSelected ? "pillar-card__checkbox--selected" : ""}`}
                aria-hidden="true"
              >
                {isSelected ? selectionOrder + 1 : null}
              </span>
              <span className="pillar-card__content">
                <span className="pillar-card__title">{item.title}</span>
                {item.description ? (
                  <span className="pillar-card__description">
                    {item.description}
                  </span>
                ) : null}
              </span>
            </button>
          );
        })}
      </div>
      <div className="button-container button-container--split">
        <BackButton step={5} disabled={isLoadingOptions} />
        <PrimaryButton
          onClick={onNext}
          loading={isLoadingOptions}
          disabled={pillars.length !== 3}
        >
          Done
        </PrimaryButton>
      </div>
    </div>
  );
}

export default StepSixPillars;
