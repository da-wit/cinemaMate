// const user = document.getElementById("user");
// const cinema = document.getElementById("cinema");

import {
  validateCinemaDescription,
  validateCinemaName,
  validateConfirmPassword,
  validateEmailAddress,
  validatePassword,
  validateUserName,
} from "./validation";

export function attachRoleSwitchListeners(
  user,
  cinema,
  clearInputValue,
  disableHoverEffect,
  enableHoverEffect
) {
  user.addEventListener("click", function () {
    disableHoverEffect(user);
    enableHoverEffect(cinema);
    clearInputValue();
    selectedRole = "user";

    this.style.backgroundColor = "greenyellow";
    cinema.style.backgroundColor = "";
    document.getElementById("userNameGroup").style.display = "block";
    document.getElementById("cinemaNameGroup").style.display = "none";
    document.getElementById("cinemaDescription").style.display = "none";
  });
  cinema.addEventListener("click", function () {
    disableHoverEffect(cinema);
    enableHoverEffect(user);
    clearInputValue();
    selectedRole = "cinema";

    this.style.backgroundColor = "greenyellow";
    user.style.backgroundColor = "";
    document.getElementById("userNameGroup").style.display = "none";
    document.getElementById("cinemaNameGroup").style.display = "block";
    document.getElementById("cinemaDescription").style.display = "block";
  });
}

export function attachValidationListener(
  userName,
  cinemaName,
  email,
  password,
  confirmPassword,
  description,
  userNameError,
  cinemaNameError,
  emailError,
  passwordError,
  confirmPasswordError,
  descriptionError
) {
  userName.addEventListener("input", validateUserName(this, userNameError));
  cinemaName.addEventListener(
    "input",
    validateCinemaName(this, cinemaNameError)
  );
  email.addEventListener("input", validateEmailAddress(this, emailError));
  password.addEventListener("input", validatePassword(this, passwordError));
  confirmPassword.addEventListener(
    "input",
    validateConfirmPassword(this, confirmPasswordError)
  );
  description.addEventListener(
    "input",
    validateCinemaDescription(this, descriptionError)
  );
}
