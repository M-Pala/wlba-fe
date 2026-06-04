export const isValidEmail = (value) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

export const isOnlyLetters = (value) =>
  /^[A-Za-z]+(?:[ '-][A-Za-z]+)*$/.test(value);

export const isStrongPassword = (value) =>
  /^(?=.*[A-Z])(?=.*\d).{8,}$/.test(value);

export const isValidPhone = (value) =>
  /^\+?[0-9]{7,15}$/.test(value.replace(/\s+/g, ""));
