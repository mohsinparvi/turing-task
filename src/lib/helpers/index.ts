import { LoginFormData } from "../types";

const validateForm = (data: LoginFormData) => {
  const errors: Partial<LoginFormData> = {};

  // Email validation
  if (!data.email) {
    errors.email = "Email is required.";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Email is not valid.";
  }

  // Password validation
  if (!data.password) {
    errors.password = "Password is required.";
  } else if (data.password.length < 6) {
    errors.password = "Password must be at least 6 characters.";
  }

  return errors;
};

export { validateForm };
