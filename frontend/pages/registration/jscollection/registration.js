// document.addEventListener("DOMContentLoaded", function () {
const user = document.getElementById("user");
const cinema = document.getElementById("cinema");
const userName = document.getElementById("userNameGroup");
const cinemaName = document.getElementById("cinemaNameGroup");
const cinemaDiscription = document.getElementById("cinemaDescription");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmpassword");
const inputUserName = document.getElementById("username");
const inputCinemaName = document.getElementById("cinemaname");
const inputCinemaDiscription = document.getElementById("description");
const submitButton = document.getElementById("registerButton");

const userNameError = document.getElementById("username-error");
const emailError = document.getElementById("email-error");
const passwordError = document.getElementById("password-error");
const confirmPasswordError = document.getElementById("confirmpassword-error");
const inputCinemaNameError = document.getElementById("cinemaname-error");
const inputCinemaDiscriptionError =
  document.getElementById("description-error");
const goToLogIn = document.getElementById("gotologin");

// disableHoverEffect function
function disAbleHoverEffect(element) {
  element.classList.add("disable-hover");
}
function enableHoverEffect(element) {
  element.classList.remove("disable-hover");
}

// clear input value
function clearInputValue() {
  (inputUserName.value = ""),
    (inputCinemaName.value = ""),
    (inputCinemaDiscription.value = ""),
    (password.value = ""),
    (email.value = ""),
    (confirmPassword.value = "");
}

// validate user input
function validateUserName() {
  const value = inputUserName.value.trim();
  if (value.length < 3) {
    userNameError.textContent = `UserName must be at least 3 characters`;
    return false;
  }
  userNameError.textContent = "";
  return true;
}

function validateCinemaName() {
  const value = inputCinemaName.value.trim();
  if (value.length < 3) {
    inputCinemaNameError.textContent = `CinemaName must be at least 3 characters`;
    return false;
  }
  inputCinemaNameError.textContent = "";
  return true;
}

function validateCinemaDescription() {
  const value = inputCinemaDiscription.value.trim();
  if (value.length < 3) {
    inputCinemaDiscriptionError.textContent = `Description must be at least 6 characters long.`;
    return false;
  }
  inputCinemaDiscriptionError.textContent = "";
  return true;
}

function validatePassword() {
  const value = password.value.trim();
  if (value.length < 6) {
    passwordError.textContent = `Password must be at least 6 characters long.`;
    return false;
  }
  passwordError.textContent = "";
  return true;
}

function validateConfirmPassword() {
  const value = confirmPassword.value.trim();
  if (value !== password.value) {
    confirmPasswordError.textContent = "Passwords do not match.";
    return false;
  }
  confirmPasswordError.textContent = "";
  return true;
}

function validateEmail() {
  const value = email.value.trim();
  const emailRegex = /\S+@\S+\.\S+/;
  if (!emailRegex.test(value)) {
    emailError.textContent = "Please enter a valid email address.";
    return false;
  }
  emailError.textContent = "";
  return true;
}

function validateForm() {
  let isValid = true;
  if (selectedRole === "user") {
    isValid = isValid && validateUserName();
  } else if (selectedRole === "cinema") {
    isValid == isValid && validateCinemaName();
    isValid = isValid && validateCinemaDescription();
  }
  isValid = isValid && validateEmail();
  isValid = isValid && validatePassword();
  isValid = isValid && validateConfirmPassword();

  return isValid;
}

let selectedRole = "user";
disAbleHoverEffect(user);
enableHoverEffect(cinema);
user.style.backgroundColor = "greenyellow";
submitButton.innerText = "Register as a User";
goToLogIn.innerText = `Already have a User account? LogIn`;
localStorage.setItem("selectedRole", selectedRole);

user.addEventListener("click", function () {
  disAbleHoverEffect(user);
  enableHoverEffect(cinema);
  clearInputValue();
  selectedRole = "user";
  localStorage.setItem("selectedRole", selectedRole);

  this.style.backgroundColor = "greenyellow";
  cinema.style.backgroundColor = "";
  userName.style.display = "block";
  cinemaName.style.display = "none";
  cinemaDiscription.style.display = "none";
  submitButton.innerText = "Register as a User";
});

cinema.addEventListener("click", function () {
  disAbleHoverEffect(cinema);
  enableHoverEffect(user);
  clearInputValue();
  selectedRole = "cinema";
  localStorage.setItem("selectedRole", selectedRole);
  goToLogIn.innerText = `Already have a Cinema account? LogIn`;
  user.style.backgroundColor = "";
  this.style.backgroundColor = "greenyellow";

  userName.style.display = "none";
  cinemaName.style.display = "block";
  cinemaDiscription.style.display = "block";
  submitButton.innerText = "Register as a Cinema";
});

goToLogIn.addEventListener("click", function () {
  window.location.href = "../login/login.html";
});

async function register(userData, cinemaData) {
  const bodyData = selectedRole === "user" ? userData : cinemaData;
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/auth/${selectedRole}/signUp${selectedRole}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(bodyData),
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.log(errorData);
      alert(errorData.message);
      throw new Error(errorData.message);
    }
    const data = await response.json();
    console.log(data, `Registration as ${selectedRole} was a success`);
    window.location.href = "../login/login.html";
  } catch (error) {
    console.error("Error", error.message);
    // alert(error.message);
  }
}

submitButton.addEventListener("click", async function (event) {
  event.preventDefault();
  localStorage.setItem("selectedRole", selectedRole);
  console.log("button clicked");

  const userFormData = {
    userName: document.getElementById("username").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirmpassword").value,
  };

  const cinemaFormData = {
    cinemaName: document.getElementById("cinemaname").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
    confirmPassword: document.getElementById("confirmpassword").value,
    description: document.getElementById("description").value,
  };

  if (!validateForm()) {
    inputUserName.addEventListener("input", validateUserName);
    inputCinemaName.addEventListener("input", validateCinemaName);
    inputCinemaDiscription.addEventListener("input", validateCinemaDescription);
    email.addEventListener("input", validateEmail);
    password.addEventListener("input", validatePassword);
    confirmPassword.addEventListener("input", validateConfirmPassword);
    // inputUserName.addEventListener("input", validateUserName);
    // inputCinemaName.addEventListener("input", validateCinemaName);
    // inputCinemaDiscription.addEventListener(
    //   "input",
    //   validateCinemaDescription
    // );
    // email.addEventListener("input", validateEmail);
    // password.addEventListener("input", validatePassword);
    // confirmPassword.addEventListener("input", validateConfirmPassword);
    return;
  }

  await register(userFormData, cinemaFormData);
});

// import { attachValidationListener } from "./evenListeners";
// import { validateForm } from "./validation";
// export async function register(userData, cinemaData, selectedRole) {
//   const bodyData = selectedRole === "user" ? userData : cinemaData;
//   try {
//     const response = await fetch(
//       `http://127.0.0.1:3000/auth/${selectedRole}/signUp${selectedRole}`,
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(bodyData),
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       alert(errorData.message);
//       throw new Error(errorData.message);
//     }
//     const data = await response.json();
//     console.log(data, `Registration as ${selectedRole} was a successs`);
//     window.location.href = "../login/login.html";
//   } catch (error) {
//     console.log("Error", error.message);
//   }
// }
// const registerButton = document.getElementById("registerButton");
// export function handleRegistrationButtonClick(
//   element,
//   selectedRole,
//   inputUserName,
//   inputCinemaName,
//   inputEmail,
//   inputPassword,
//   inputConfirmPassword,
//   inputCinemaDescription,
//   inputUserNameError,
//   inputCinemaNameError,
//   inputEmailError,
//   inputPasswordError,
//   inputConfirmPasswordError,
//   inputCinemaDescriptionError
// ) {
//   element.addEventListener("click", async function (event) {
//     event.preventDefault();

//     localStorage.setItem("SelectedRole", selectedRole);
//     console.log("button clicked");

//     const userFormData = {
//       userName: inputUserName.value,
//       email: inputEmail.value,
//       password: inputPassword.value,
//       confirmPassword: inputConfirmPassword.value,
//     };

//     const cinemaFormData = {
//       cinemaName: inputCinemaName.value,
//       email: inputEmail.value,
//       password: inputPassword.value,
//       confirmPassword: inputConfirmPassword.value,
//       description: inputCinemaDescription.value,
//     };

//     if (
//       !validateForm(
//         selectedRole,
//         inputUserName,
//         inputCinemaName,
//         inputPassword,
//         inputConfirmPassword,
//         inputEmail,
//         inputCinemaDescription,
//         inputUserNameError,
//         inputCinemaNameError,
//         inputEmailError,
//         inputPasswordError,
//         inputConfirmPasswordError,
//         inputCinemaDescriptionError
//       )
//     ) {
//       attachValidationListener(
//         inputUserName,
//         inputCinemaName,
//         inputEmail,
//         inputPassword,
//         inputConfirmPassword,
//         inputCinemaDescription,
//         inputUserNameError,
//         inputCinemaNameError,
//         inputEmailError,
//         inputPasswordError,
//         inputConfirmPasswordError,
//         inputCinemaDescriptionError
//       );
//     }
//     await register(userFormData, cinemaFormData, selectedRole);
//   });
// }
