import { useRef } from "react";

function OtpInput({ value, onChange }) {
  const refs = useRef([]);

  const handleChange = (index, event) => {
    const digits = event.target.value.replace(/\D/g, "");
    if (digits.length > 1) {
      const pasted = digits.slice(0, 6);
      onChange(pasted);
      refs.current[Math.min(pasted.length, 5)]?.focus();
      return;
    }

    const nextValue = digits.slice(-1);
    const chars = [...value];
    while (chars.length < index) chars.push("");
    chars[index] = nextValue;
    onChange(chars.join("").slice(0, 6));

    if (nextValue && index < 5) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, event) => {
    if (event.key === "Backspace") {
      if (value[index]) {
        const chars = value.split("");
        chars[index] = "";
        onChange(chars.join(""));
        return;
      }
      if (index > 0) {
        refs.current[index - 1]?.focus();
      }
    }
  };

  const handlePaste = (event) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, 6);
    if (!pasted) return;
    onChange(pasted);
    refs.current[Math.min(pasted.length, 5)]?.focus();
  };

  return (
    <div className="otp-grid" onPaste={handlePaste}>
      {new Array(6).fill(0).map((_, index) => (
        <input
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          className="otp-input"
          value={value[index] || ""}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          maxLength={6}
          inputMode="numeric"
          autoComplete={index === 0 ? "one-time-code" : "off"}
          aria-label={`OTP digit ${index + 1}`}
        />
      ))}
    </div>
  );
}

export default OtpInput;
