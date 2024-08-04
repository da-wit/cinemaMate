// import { notifiction } from "../../home/js/notification.js";

document.addEventListener("DOMContentLoaded", function() {
    document.addEventListener('renderComplete',function(){
    const token = localStorage.getItem('token');

    const addButton = document.getElementById('edit');
  const imageForm = document.getElementById('add-image');
  const cancelBtn = document.getElementById('cancle-image');
   const overlay = document.getElementById('overlay');

  addButton.addEventListener("click", function() {
    imageForm.style.display="flex"
     overlay.style.display = "block";
  });
  cancelBtn.addEventListener('click',function(){
    imageForm.style.display="none"
     overlay.style.display = "none";
  })

   overlay.addEventListener("click", function() {
            imageForm.style.display = "none";
            overlay.style.display = "none";
        });
    });


    const inputImage = document.getElementById('input-image');
    
        const AddImage = document.getElementById('submit-image');

        AddImage.addEventListener('click',function(e){
            e.preventDefault();
            const token = localStorage.getItem('token');
            const file = inputImage.files[0]
            if(!file){
                console.error('No file selected.');
                return;
            }
           

        const profileImageFormData = new FormData();
        profileImageFormData.append("profileImage",file);

            addProfileImage(profileImageFormData,token);
        })


});

async function addProfileImage(imageFile,userToken){
     const imageForm = document.getElementById('add-image');
     const overlay = document.getElementById('overlay');
     const userImage = document.querySelector('.img');
    const response = await fetch("http://127.0.0.1:3000/user/uploadprofile",{
        method:"POST",
        headers:{
            Authorization: `Bearer ${userToken}`,
        },
        body:imageFile
    })

    if(!response.ok){
        const errorMessage= response.message
    }

    const responseData = await response.json();
    const imageUrl = responseData.profileImagePath;

    if (userImage) {
            userImage.src = `http://127.0.0.1:3000/${imageUrl}`;
        }

    const message = 'profile uploaded successfully'
    // notifiction(message)
    console.log(message)
    imageForm.style.display = "none";
    overlay.style.display = "none";
}