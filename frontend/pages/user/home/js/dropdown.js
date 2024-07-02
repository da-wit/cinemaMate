document.addEventListener("DOMContentLoaded", function () {
  const watchlist = document.getElementById("dropdown-watchlist");
  const dropdown = document.getElementById("watchlistDropdown");

  watchlist.addEventListener("mouseenter", function () {
    dropdown.classList.toggle("active");
  });
  watchlist.addEventListener("mouseleave", function () {
    dropdown.classList.toggle("active");
  });

  //   window.addEventListener("click", function (event) {
  //     if (!event.target.matches("#dropdown-watchlist")) {
  //       dropdown.classList.remove("active");
  //     }
  //   });
});
