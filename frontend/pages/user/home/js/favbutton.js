export async function addToFavorties(movieId, token) {
  try {
    const response = await fetch(
      `http://127.0.0.1:3000/watchlist/favorites/create/${movieId}`,
      {
        method: "POST",

        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 409) {
      const dataerror = await response.json();
      console.error(dataerror.message);
      // You can add UI feedback here, for example:
      alert(dataerror.message);
      return;
    }
    if (!response.ok) {
      console.error("Could not create the Favorite watchlist");
    }
    const data = await response.json();
    console.log("watchList successfuly created", data);
  } catch (error) {
    console.log(error);
  }
}
