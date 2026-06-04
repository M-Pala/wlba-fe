function SecondaryButton({ children, onClick, type = "button", disabled = false }) {
  return (
    <button
      className="secondary-button"
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

export default SecondaryButton;
