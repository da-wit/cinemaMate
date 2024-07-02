import { attachRoleSwitchListeners } from "./evenListeners";
import { handleRegistrationButtonClick } from "./registration";
import {
  clearInputValue,
  disAbleHoverEffect,
  enableHoverEffect,
} from "./uiHelper";

document.addEventListener("DOMContentLoaded", function () {
  const user = document.getElementById("user");
  const cinema = document.getElementById("cinema");
  const userNameDiv = document.getElementById("userNameGroup");
  const cinemaNameDiv = document.getElementById("cinemaNameGroup");
  const cinemaDescriptionGroup = document.getElementById("cinemaDescription");
  const inputUserName = document.getElementById("username");
  const inputCinemaName = document.getElementById("cinemaname");
  const inputEmail = document.getElementById("email");
  const inputPassword = document.getElementById("password");
  const inputConfirmPassword = document.getElementById("confirmpassword");
  const inputCinemaDescription = document.getElementById("description");

  const userNameError = document.getElementById("username-error");
  const cinemaNameError = document.getElementById("cinemaname-error");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");
  const confirmPasswordError = document.getElementById("confirmpassword-error");
  const descriptionError = document.getElementById("description-error");

  const registerButton = document.getElementById("registerButton");

  let selectedRole = "user";
  disAbleHoverEffect(user);
  enableHoverEffect(cinema);
  user.style.backgroundColor = "greenyellow";
  registerButton.innerText = " Register as a User";

  attachRoleSwitchListeners(
    user,
    cinema,
    clearInputValue,
    disAbleHoverEffect,
    enableHoverEffect
  );

  handleRegistrationButtonClick(
    registerButton,
    selectedRole,
    inputUserName,
    inputCinemaName,
    inputEmail,
    inputPassword,
    inputConfirmPassword,
    inputCinemaDescription,
    userNameError,
    cinemaNameError,
    emailError,
    passwordError,
    confirmPasswordError,
    descriptionError
  );
});
