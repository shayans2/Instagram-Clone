export const loginValidation = (formValues) => {
  const errors = {};
  if (!formValues.email) {
    errors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (!formValues.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(formValues.password)
  ) {
    errors.password = "Invalid password";
  }
  return errors;
};

export const signupValidation = (formValues) => {
  const errors = {};
  if (!formValues.fullname) {
    errors.fullname = "Full name is required";
  }
  if (!formValues.username) {
    errors.username = "Username is required";
  } else if (!/^[a-z0-9_-]{3,15}$/.test(formValues.username)) {
    errors.username = "Invalid username";
  }
  if (!formValues.email) {
    errors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = "Invalid email address";
  }
  if (!formValues.password) {
    errors.password = "Password is required";
  } else if (
    !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(formValues.password)
  ) {
    errors.password =
      "Minimum eight characters, at least one letter and one number";
  }
  return errors;
};

export const settingsValidation = (formValues) => {
  const errors = {};
  if (!formValues.fullname) {
    errors.fullname = "Full name is required";
  }
  if (!formValues.username) {
    errors.username = "Username is required";
  } else if (!/^[a-z0-9_-]{3,15}$/.test(formValues.username)) {
    errors.username = "Invalid username";
  }
  if (!formValues.email) {
    errors.email = "Email is required";
  } else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formValues.email)
  ) {
    errors.email = "Invalid email address";
  }
  return errors;
};
