export const validate = (formData) => {
  const error = {};

  const userNamePattern = /^[a-zA-Z0-9_]{3,15}$/;
  const emailPattern = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
  const mobilePattern = /^\d{10}$/;

  if (formData.firstName === "") {
    error.firstName = "Firstname is required";
  }

  if (formData.lastName === "") {
    error.lastName = "Lastname is required";
  }

  if (formData.username === "") {
    error.userName = "Username is required";
  } else if (!userNamePattern.test(formData.userName)) {
    error.userName = "Username didn't match";
  }

  if (formData.email === "") {
    error.email = "Email is required";
  } else if (!emailPattern.test(formData.email)) {
    error.email = "Email address is invalid";
  }

  if (!formData.phone) {
    error.phone = "Phone number is required";
  } else if (!mobilePattern.test(formData.phone)) {
    error.phone = "Phone number must be 10 digits long";
  }

  if (!formData.password) {
    error.password = "Password is required";
  } else if (formData.password.length < 8) {
    error.password = "Password must be at least 8 characters long";
  } else if (
    !/[A-Za-z]/.test(formData.password) ||
    !/[0-9]/.test(formData.password)
  ) {
    error.password = "Password must contain both letters and numbers";
  }

  return error;
};
