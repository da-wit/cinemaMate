import { notifiction } from "../../../home/js/notification.js";
import { hover } from "./delete-hover.js";
import {
  deleteMovieFromTheFavWatchist,
  deleteWatchlist,
} from "./fav-delete-button.js";

document.addEventListener("DOMContentLoaded", function () {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Credential error");
    notifiction("Authentication required. Please log in.");
    return;
  }

  async function getMovies(token) {
    const response = await fetch(
      "http://127.0.0.1:3000/watchlist/favorites/movie",
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json();
      notifiction(errorData.message || "Failed to fetch watchlist data");
      console.error(
        `Error fetching watchlist: ${response.status} - ${errorData.message}`
      );
      return [];
    }

    const data = await response.json();
    return data;
  }

  async function displayFavMovies() {
    try {
      let favMovies = await getMovies(token);
      // console.log(favMovies);
      if (favMovies.length !== 0) {
        favMovies.reverse();

        const view = document.getElementById("view");

        for (const favMovie of favMovies) {
          const article = document.createElement("article");
          article.className = "display-movie";
          article.dataset.movieId = favMovie._id;
          article.innerHTML = `<section class="img-clip">
                    <img src="http://127.0.0.1:3000/${
                      favMovie.imagePath
                    }" alt=${favMovie.title}>
                </section>
                <div class="movie-property">
                    <div class="property">
                        <h1 class="title">Title</h1>
                        <h1 class="value">${favMovie.title}</h1>
                    </div>
                    <div class="property">
                        <span class="genre-title">Genre</span>
                        <ul class="genre">
                        ${favMovie.genre
                          .map((g) => `<li class="genre-items">${g}</li>`)
                          .join("")}
                        </ul>

                    </div>
                    <div class="property"><span class="show-time">Show Time</span>
                    <span class="value">${favMovie.watchTime}</span></div>
                    <div class="property"><span class="show-date">Show Date</span>
                    <span class="value">${favMovie.watchDate}</span></div>
                    <div class="property"><span class="seats">Number of Seats</span>
                    <span class="value">${favMovie.numberOfSeats}</span></div>

                </div>
                <div>  <span class="delete"><i class="fa-solid fa-trash"></i></span></div>`;
          view.appendChild(article);
        }
        deleteMovieFromTheFavWatchist(token);
        hover();
      }
    } catch (error) {
      console.error("error while try to load watchlist");
    }
  }
  displayFavMovies();
});
