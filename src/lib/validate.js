export function LoginValidate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = "Password must be between 6 and 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Password must not contain spaces";
  }

  return errors;
}
export function RegisterValidate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 6 || values.password.length > 20) {
    errors.password = "Password must be between 6 and 20 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Password must not contain spaces";
  } else if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match";
  }

  return errors;
}
