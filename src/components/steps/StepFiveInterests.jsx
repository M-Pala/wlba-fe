import { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  nextStep,
  setError,
  setSelectedInterests,
} from "../../redux/registrationSlice";
import {
  groupInterestsByType,
  loadInterestOptions,
} from "../../utils/registrationOptions";
import BackButton from "../ui/BackButton";
import PrimaryButton from "../ui/PrimaryButton";
import StepHeader from "../ui/StepHeader";

function StepFiveInterests() {
  const dispatch = useDispatch();
  const { options, interests } = useSelector((state) => state.registration);
  const [openSections, setOpenSections] = useState(() => new Set());
  const [isLoadingOptions, setIsLoadingOptions] = useState(
    () => !options.interests.length,
  );

  const groupedInterests = useMemo(
    () => groupInterestsByType(options.interests),
    [options.interests],
  );

  useEffect(() => {
    if (options.interests.length) {
      setIsLoadingOptions(false);
      return;
    }

    setIsLoadingOptions(true);
    loadInterestOptions(dispatch, { notify: true }).finally(() =>
      setIsLoadingOptions(false),
    );
  }, [dispatch, options.interests.length]);

  const toggleSection = (type) => {
    setOpenSections((prev) => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const toggle = (id) => {
    if (interests.includes(id)) {
      dispatch(setSelectedInterests(interests.filter((item) => item !== id)));
      return;
    }
    dispatch(setSelectedInterests([...interests, id]));
  };

  const onNext = () => {
    if (!interests.length) {
      const message = "Please select at least one interest.";
      dispatch(setError(message));
      toast.error(message);
      return;
    }
    dispatch(setError(""));
    toast.success("Interests saved.");
    dispatch(nextStep());
  };

  return (
    <div className="form-card step-form step-form--interests">
      <StepHeader title="Select all wellness interests that apply — at least one is required." />
      <div className="interest-accordion">
        {groupedInterests.map(([type, items]) => {
          const selectedCount = items.filter((item) =>
            interests.includes(item.id),
          ).length;
          const isOpen = openSections.has(type);

          return (
            <div
              key={type}
              className={`interest-accordion__item ${isOpen ? "interest-accordion__item--open" : ""}`}
            >
              <button
                type="button"
                className="interest-accordion__trigger"
                aria-expanded={isOpen}
                onClick={() => toggleSection(type)}
              >
                <span className="interest-accordion__title">{type}</span>
                <span className="interest-accordion__meta">
                  {selectedCount > 0 && (
                    <span className="interest-accordion__selected">
                      {selectedCount} selected
                    </span>
                  )}
                  <span
                    className={`interest-accordion__chevron ${isOpen ? "interest-accordion__chevron--open" : ""}`}
                    aria-hidden="true"
                  />
                </span>
              </button>
              <div className="interest-accordion__panel">
                <div className="interest-accordion__panel-inner">
                  <div className="chip-grid">
                    {items.map((item) => {
                      const isSelected = interests.includes(item.id);

                      return (
                        <button
                          key={item.id}
                          type="button"
                          className={`chip-button ${isSelected ? "chip-button--active" : ""}`}
                          onClick={() => toggle(item.id)}
                        >
                          {(item.colorIcon || item.whiteIcon) && (
                            <span
                              className="chip-button__icon-wrap"
                              aria-hidden="true"
                            >
                              {item.colorIcon ? (
                                <img
                                  src={item.colorIcon}
                                  alt=""
                                  className={`chip-button__icon chip-button__icon--color ${isSelected ? "chip-button__icon--hidden" : ""}`}
                                />
                              ) : null}
                              {item.whiteIcon ? (
                                <img
                                  src={item.whiteIcon}
                                  alt=""
                                  className={`chip-button__icon chip-button__icon--white ${isSelected ? "" : "chip-button__icon--hidden"}`}
                                />
                              ) : null}
                            </span>
                          )}
                          {item.label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="button-container button-container--split">
        <BackButton step={4} disabled={isLoadingOptions} />
        <PrimaryButton
          onClick={onNext}
          loading={isLoadingOptions}
          disabled={!interests.length}
        >
          Next
        </PrimaryButton>
      </div>
    </div>
  );
}

export default StepFiveInterests;
