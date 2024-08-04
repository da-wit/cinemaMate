export function hover() {
  const articles = document.querySelectorAll(".display-movie");
  articles.forEach((eachArticle) => {
    const deleteBtn = eachArticle.querySelector(".delete");
    const imageClip = eachArticle.querySelector(".img-clip");
    deleteBtn.addEventListener("mouseenter", function () {
      deleteBtn.classList.toggle("delete-hover");
      imageClip.classList.toggle("img-clip-delete-hover-image-border");
    });
    deleteBtn.addEventListener("mouseleave", function () {
      deleteBtn.classList.toggle("delete-hover");
      imageClip.classList.toggle("img-clip-delete-hover-image-border");
    });
  });
}
