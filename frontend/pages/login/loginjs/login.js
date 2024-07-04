document.addEventListener("DOMContentLoaded", function (event) {
  const inputemail = document.getElementById("email");
  const inputpassword = document.getElementById("password");
  const showError = document.getElementById("login-error");
  const loginButton = document.getElementById("loginButton");
  const showMessage = document.getElementById("incorrect-error");
  const icon = document.getElementById("delete");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  const selectedRole = localStorage.getItem("selectedRole");

  function validateEmail(element) {
    const value = element.value.trim();
    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(value)) {
      emailError.innerText = "Please Enter valid emial";
      return false;
    }
    emailError.innerText = "";
    return true;
  }

  function validatePassword(element) {
    const value = element.value.trim();
    if (value.length < 6) {
      passwordError.innerText = "Password must have at least 6 characters";
      return false;
    }
    passwordError.innerText = "";
    return true;
  }

  function validateForm() {
    let isValid = true;
    isValid = isValid && validateEmail(inputemail);
    isValid = isValid && validatePassword(inputpassword);
    return isValid;
  }

  //   alert(selectedRole);
  async function login(loginDto) {
    const response = await fetch(
      `http://127.0.0.1:3000/auth/${selectedRole}/login`,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginDto),
      }
    );
    if (!response.ok) {
      const errorData = await response.json();
      showError.style.display = "flex";
      showMessage.textContent = errorData.message;
      return;
    }
    const date = await response.json();
    console.log(date, `Login as ${selectedRole} was a successes`);
    localStorage.setItem("token", date.token);
    if (selectedRole === "user") {
      window.location.href = "../user/home/userhome.html";
    } else if (selectedRole === "cinema") {
      window.location.href = "../cinema/cinemahome.html";
    }
  }

  loginButton.addEventListener("click", async function (event) {
    event.preventDefault();
    const loginDto = {
      email: inputemail.value,
      password: inputpassword.value,
    };
    if (!validateForm()) {
      inputemail.addEventListener("input", function () {
        validateEmail(inputemail);
      });
      inputpassword.addEventListener("input", function () {
        validatePassword(inputpassword);
      });
      return;
    }

    await login(loginDto);
  });

  icon.addEventListener("click", function () {
    showError.style.display = "none";
  });
});
