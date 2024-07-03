document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("token");
  if (!token) {
    console.error("No token found in localStorage");
  }

  const response = await fetch(`http://127.0.0.1:3000/movie/all`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  //   async function getCinemaName(cinemaId) {
  //     const response = await fetch(`http://127.0.0.1:3000/cinema/${cinemaId}`, {
  //       method: "GET",
  //       headers: {
  //         Authorization: `Bearer ${token}`,
  //       },
  //     });
  //     if (!response.ok) {
  //       throw new Error("Network response was not ok");
  //     }
  //     const cinema = await response.json();
  //     return cinema.cinemaName;
  //   }
  async function getCinemaName(cinemaId) {
    const response = await fetch(`http://127.0.0.1:3000/cinema/${cinemaId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch cinema details");
    }

    const cinemaData = await response.text();
    console.log(cinemaData);
    return cinemaData;
  }

  let movies = await response.json();
  movies = movies.reverse();

  const view = document.getElementById("view");

  for (const movie of movies) {
    console.log(movie.imagePath);
    const getcinemaName = await getCinemaName(movie.cinema_id);
    const article = document.createElement("article");
    article.className = "display-movie";
    article.innerHTML = `
    <h1>${getcinemaName}</h1>
    <div class="img-clip">
                    <img class="img" src="http://127.0.0.1:3000/${
                      movie.imagePath
                    }" alt=${movie.title}>
                </div>
                <div class="property">
                    <h1 class="title">${movie.title}</h1>
                    <div class="property-movie">
                        <section class="pfirst">

                            <div class="genre common">
                                <span class="gspan">Genre:</span>
                                <ul class="genre-grid">
                                     ${movie.genre
                                       .map((genre) => `<li>${genre}</li>`)
                                       .join("")}

                                </ul>
                            </div>
                            <span class="show-time common">Show time:${
                              movie.watchTime
                            }</span>

                            <span class="show-date common">show date: ${
                              movie.watchDate
                            }</span>
                            <span class="seats common">number of seats:${
                              movie.numberOfSeats
                            }</span>

                        </section>

                    </div>
                    <div class="watchlist">
                        <i class="fa-solid fa-heart fav"></i>
                        <i class="fa-solid fa-bookmark watchlater"></i>
                        <i class="fa-solid fa-eye-slash watched"></i>
                    </div>
                </div>
    `;
    view.appendChild(article);
  }
});

// document.addEventListener("DOMContentLoaded", async function () {
//   const token = localStorage.getItem("token");
//   if (!token) {
//     console.error("No token found in localStorage");
//     return;
//   }

//   const response = await fetch("http://127.0.0.1:3000/movie/all", {
//     method: "GET",
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   if (!response.ok) {
//     throw new Error("Network response was not ok");
//   }

//   const movies = await response.json();

//   const view = document.getElementById("view");

//   movies.forEach((movie) => {
//     const { title, genre, numberOfSeats, watchDate, watchTime, imagePath } =
//       movie;

//     const article = document.createElement("article");
//     article.className = "display-movie";
//     article.innerHTML = `
//                     <div class="img-clip">
//                         <img class="img" src="http://127.0.0.1:3000/${imagePath}" alt="${title}">
//                     </div>
//                     <div class="property">
//                         <h1 class="title">${title}</h1>
//                         <div class="property-movie">
//                             <section class="pfirst">
//                                 <div class="genre common">
//                                     <span class="gspan">Genre:</span>
//                                     <ul class="genre-grid">
//                                         ${genre
//                                           .map((g) => `<li>${g}</li>`)
//                                           .join("")}
//                                     </ul>
//                                 </div>
//                                 <span class="show-time common">Show time: ${watchTime}</span>
//                                 <span class="show-date common">Show date: ${watchDate}</span>
//                                 <span class="seats common">Number of seats: ${numberOfSeats}</span>
//                             </section>
//                         </div>
//                         <div class="watchlist">
//                             <i class="fa-solid fa-heart fav"></i>
//                             <i class="fa-solid fa-bookmark watchlater"></i>
//                             <i class="fa-solid fa-eye-slash watched"></i>
//                         </div>
//                     </div>
//                 `;
//     view.appendChild(article);
//   });
// });
