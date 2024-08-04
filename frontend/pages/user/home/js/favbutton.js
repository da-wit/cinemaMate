import { notifiction } from "./notification.js";

export async function addToFavorties(movieId, token) {
  const response = await fetch(
    `http://127.0.0.1:3000/watchlist/favorites/create/${movieId}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  if (!response.ok) {
    if (response.status === 409) {
      const dataerror = await response.json();
      notifiction(dataerror.message);
    } else {
      const error = await response.json();
      notifiction(error);
    }
  } else {
    notifiction("Movie successfuly added to favorite watchlist");
  }
}

// try {
//   const response = await fetch(
//     `http://127.0.0.1:3000/watchlist/favorites/create/${movieId}`,
//     {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     }
//   );

// //  if (!response.ok) {
// //   if (response.status === 409) {
// //     const dataerror = await response.json();
// //     // console.error(dataerror.message);
// //     // You can add UI feedback here, for example:
// //     // alert(dataerror.message);
// //     notifiction(dataerror.message);
// //     return;
// //   }
// //    else{
// //      const error = await response.json();
// //     notifiction("Failed to add movie to favorites."); // Notify user without logging
// //     return;
// //    }
//   // }
//   const data = await response.json();
//   notifiction("Movie successfuly added to favorite watchlist");
//   console.log("watchList successfuly created", data);
// } catch (error) {
//   // console.log(error);
//   // console.error("An error occurred:", error);
//   notifiction("An error occurred while adding the movie to favorites.");
// }
