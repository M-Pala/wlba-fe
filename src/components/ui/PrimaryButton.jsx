function PrimaryButton({ children, onClick, type = "button", loading = false, disabled = false }) {
  return (
    <button
      className="primary-button"
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
    >
      {loading ? "Please wait..." : children}
    </button>
  );
}

export default PrimaryButton;
