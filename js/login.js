
// function navigation(){
//   const div=document.getElementById("dynamicNav2");
//   const nav=document.createElement("nav");
//   nav.classList.add("navbar");
//   nav.classList.add("navbar-light");
//   nav.classList.add("navbar-expand-lg");
//   nav.innerHTML=`
//   <button
//                     class="navbar-toggler"
//                     type="button"
//                     data-toggle="collapse"
//                     data-target="#navbarNav"
//                     aria-controls="navbarNav"
//                     aria-expanded="false"
//                     aria-label="Toggle navigation"
//                   >
//                     <span class="navbar-toggler-icon"></span>
//                   </button>
//                   <div class="collapse navbar-collapse" id="navbarNav">
//                     <ul class="navbar-nav">
//                       <li class="nav-item active">
//                         <a class="nav-link" href="#">Home </a>
//                       </li>
//                       <li class="nav-item ">
//                         <a class="nav-link" href="#donor">Donor </a>
//                       </li>
//                       <li class="nav-item">
//                         <a class="nav-link" href="#about">About Us</a>
//                       </li>

//                       <li class="nav-item">
//                         <a class="nav-link" href="#gallery">Gallery</a>
//                       </li>
//                       <li class="nav-item">
//                         <a class="nav-link" onclick=handleLogout()>Logout</a>
//                       </li>
//                       <li class="nav-item">
//                         <a class="nav-link" href="#blog">Blog</a>
//                       </li>
//                       <li class="nav-item">
//                         <a class="nav-link" href="#contact">Contact US</a>
//                       </li>
//                     </ul>
//                   </div>
//                 </nav>
//               </div>
//             </div>
//           </div>
//         </div>
//   `

//   div.appendChild(nav);

  
// }
// navigation();

function loggedIn(){
  const userId = localStorage.getItem('user_id');
  if (userId) {
    alert("You have already logged in...");
    window.location.href = '../index.html';
  }
}
loggedIn();
function loginUser(){
    const form = document.getElementById('loginForm');
    const formData = new FormData(form);
    console.log(...formData)

    fetch('https://bloodbank-30u0.onrender.com/donor/login/', {
      method: 'POST',
      body: formData
    })
    .then(response => {
      if (!response.ok) {
        alert('ইমেইল অথবা পাসওয়ার্ড সঠিক নয়!')
        window.location.href = '../pages/login.html';
        throw new Error('Failed to register user');
      }
      return response.json();
  })
  .then(data => {
    localStorage.setItem("token",data.token);
    localStorage.setItem("user_id",data.user_id);
    console.log('User Login successfully:', data);
    window.location.href = '../index.html';
      // Handle success
  })
  .catch(error => {
        error.response.json().then(errorData => {
            const errorMessage = errorData.error;
            console.log(errorMessage);
            // Display error message to the user, for example:
            // const errorElement = document.getElementById('error-message');
            // errorElement.textContent = errorMessage;
          })
  });
}
