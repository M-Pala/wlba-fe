import { useState } from "react";
import eyeIcon from "../../assets/eye.svg";
import eyeSlashIcon from "../../assets/eyeslash.svg";

function TextField({
  label,
  name,
  value,
  onChange,
  onBlur,
  type = "text",
  placeholder = "",
  error = "",
  disabled = false,
}) {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;

  const input = (
    <input
      className={`field-input ${error ? "field-input--error" : ""} ${isPasswordField ? "field-input--with-toggle" : ""}`}
      name={name}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={inputType}
      placeholder={placeholder}
      disabled={disabled}
    />
  );

  return (
    <label className="block">
      <span className="field-label">{label}</span>
      {isPasswordField ? (
        <div className="field-input-wrapper">
          {input}
          {!disabled ? (
            <button
              type="button"
              className="field-input-toggle"
              onClick={() => setShowPassword((prev) => !prev)}
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              <img
                src={showPassword ? eyeSlashIcon : eyeIcon}
                alt=""
              />
            </button>
          ) : null}
        </div>
      ) : (
        input
      )}
      {error ? <small className="field-error">{error}</small> : null}
    </label>
  );
}

export default TextField;
