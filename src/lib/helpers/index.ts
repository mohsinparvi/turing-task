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

function formatDuration(seconds: number): string {
  const totalMinutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${totalMinutes} minute${
    totalMinutes !== 1 ? "s" : ""
  } ${remainingSeconds} second${remainingSeconds !== 1 ? "s" : ""}`;
}

export { validateForm, formatDuration };


