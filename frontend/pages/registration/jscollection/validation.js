export function validateUserName(element, errorElement) {
  const value = element.value.trim();
  if (value.length < 3) {
    errorElement.textContent = "UserName must be at least 3 characters";
    return false;
  }
  errorElement.textContent = "";
  return true;
}
export function validateCinemaName(element, errorElement) {
  const value = element.value.trim();
  if (value.length < 3) {
    errorElement.textContent = "CinemaName must be at least 3 characters";
    return false;
  }
  errorElement.textContent = "";
  return true;
}
export function validateEmailAddress(element, errorElement) {
  const value = element.value.trim();
  const emailRegex = /\S+@\S+\.\S+/;
  if (emailRegex.test(value)) {
    errorElement.textContent = "Please enter a valid email address";
    return false;
  }
  errorElement.textContent = "";
  return true;
}
export function validatePassword(element, errorElement) {
  const value = element.value.trim();
  if (value.length < 6) {
    errorElement.textContent = "Password must be at least 6 characters ";
    return false;
  }
  errorElement.textContent = "";
  return true;
}
export function validateConfirmPassword(element, errorElement) {
  const value = element.value.trim();
  if (value.length !== document.getElementById("password")) {
    errorElement.textContent = "Password does not match";
    return false;
  }
  errorElement.textContent = "";
  return true;
}
export function validateCinemaDescription(element, errorElement) {
  const value = element.value.trim();
  if (value.length < 6) {
    errorElement.textContent = "Description must be at least 6 characters";
    return false;
  }
  errorElement.textContent = "";
  return true;
}

export function validateForm(
  selectedRole,
  inputUserName,
  inputCinemaName,
  inputPassword,
  inputConfirmPassword,
  inputEmail,
  inputCinemaDescription,
  inputUserNameError,
  inputCinemaNameError,
  inputEmailError,
  inputPasswordError,
  inputConfirmPasswordError,
  inputCinemaDescriptionError
) {
  let isValid = true;
  if (selectedRole === "user") {
    isValid = isValid && validateUserName(inputUserName, inputUserNameError);
  } else if (selectedRole === "cinema") {
    isValid =
      isValid && validateCinemaName(inputCinemaName, inputCinemaNameError);
    isValid =
      isValid &&
      validateCinemaDescription(
        inputCinemaDescription,
        inputCinemaDescriptionError
      );
  }
  isValid = isValid && validateEmailAddress(inputEmail, inputEmailError);
  isValid = isValid && validatePassword(inputPassword, inputPasswordError);
  isValid =
    isValid &&
    validateConfirmPassword(inputConfirmPassword, inputConfirmPasswordError);
}
