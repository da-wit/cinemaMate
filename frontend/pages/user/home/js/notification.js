const notify = document.getElementById("notification");
export function notifiction(message) {
  notify.textContent = message;
  notify.style.display = "block";

  setTimeout(() => {
    notify.style.display = "none";
  }, 1500);
}
