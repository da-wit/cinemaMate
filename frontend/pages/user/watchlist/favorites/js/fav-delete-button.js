import { notifiction } from "../../../home/js/notification.js";

export function deleteMovieFromTheFavWatchist(token) {
  const renderedArticle = document.querySelectorAll(".display-movie");
  renderedArticle.forEach((eachArticle) => {
    const movieID = eachArticle.getAttribute("data-movie-id");
    const deleteButton = eachArticle.querySelector(".delete");
    deleteButton.addEventListener("click", function () {
      deleteWatchlist(movieID, token, eachArticle);
    });
  });
}

export async function deleteWatchlist(movieID, token, articleElement) {
  const response = await fetch(
    `http://127.0.0.1:3000/watchlist/delete/favorites/${movieID}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    const errorMessage = response.message;
  }
  const res = await response.json();
  articleElement.remove();
  notifiction("deleted successfuly");
}
