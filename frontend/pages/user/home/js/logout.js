const currentPort = window.location.port;
const logoutIcon = document.getElementById("logout");

logoutIcon.addEventListener("click", function () {
  localStorage.removeItem("token");

  window.location.href = `http://127.0.0.1:${currentPort}/pages/login/login.html`;
  console.log("logout");
});
