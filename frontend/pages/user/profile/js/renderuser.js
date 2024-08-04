document.addEventListener("DOMContentLoaded", async function () {
  const token = localStorage.getItem("token");
  const response = await fetch("http://127.0.0.1:3000/user/info", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    console.error("USER info loading faild");
  }
  const userData = await response.json();
  console.log(userData);
  console.log(userData.profileImagePath);
  // let userprofile = '';
  // if(userData.profileImagePath){
  //   userprofile = `http://127.0.0.1:3000/${userData.profileImagePath}`;
  // }

  const view = document.getElementById("main");
  view.innerHTML = `
    <div class="user" id="user-info">
              <section class="section-1">
                 <div class="img-clip">
                   <img class='img' id='img' src="../../../images/solo1.jpg"}" alt=${userData.userName}>
                   <span class="edit-icon" id="edit"><i class="fa-solid fa-pen-to-square"></i></span>
                 </div>
              </section>
              <section class="section-2">
                 <div>
                   <h1>User Name</h1>
                   <h2>Emial addres</h2>
                  </div>
                  <div>
                     <h1>${userData.userName}</h1>
                  <h2>${userData.email}</h2>
                 </div>
              </section>
              <section class="section-3">
                  <button>
                      Change User Name
                  </button>
                  <button>
                      Change Password
                  </button>
                  <button>Delete account</button>
              </section>
          </div>`;


    const event = new Event('renderComplete');
    document.dispatchEvent(event);
   

});