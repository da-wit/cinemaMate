document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("Credential error");
  }

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
    console.error("Response is not Ok");
  }

  const favMovies = await response.json();

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
                   
                   
                </div>`;
    view.appendChild(article);
  }
});
