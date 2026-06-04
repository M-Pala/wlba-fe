function StepHeader({ title, description }) {
  return (
    <div className="step-header">
      <h1 className="step-title">{title}</h1>
      {description ? <p className="step-description">{description}</p> : null}
    </div>
  );
}

export default StepHeader;
