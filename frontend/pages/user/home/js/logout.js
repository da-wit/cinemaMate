const logoutIcon = document.getElementById("logout");
logoutIcon.addEventListener("click", function () {
  localStorage.removeItem("token");
  window.location.href = "../../login/login.html";
  console.log("logout");
});
