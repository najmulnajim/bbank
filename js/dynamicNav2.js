function navigation(){
    const div=document.getElementById("dynamicNav2");
    const nav=document.createElement("nav");
    nav.classList.add("navbar");
    nav.classList.add("navbar-light");
    nav.classList.add("navbar-expand-lg");
    nav.innerHTML=`
    <button
                      class="navbar-toggler"
                      type="button"
                      data-toggle="collapse"
                      data-target="#navbarNav"
                      aria-controls="navbarNav"
                      aria-expanded="false"
                      aria-label="Toggle navigation"
                    >
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNav">
                      <ul class="navbar-nav">
                        <li class="nav-item active">
                          <a class="nav-link" href="../index.html">Home </a>
                        </li>
                        <li class="nav-item ">
                          <a class="nav-link" href="../index.html#donor">Donor </a>
                        </li>
                        <li class="nav-item" >
                          <a class="nav-link" href="../Pages/blog.html">Blog</a>
                        </li>
  
                        <li class="nav-item">
                          <a class="nav-link" href="../index.html#gallery">Gallery</a>
                        </li>
                        <li class="nav-item" id="loginLogout">
                        </li>
                        <li class="nav-item" id="profile">
                        </li>
                        
                        <li class="nav-item">
                          <a class="nav-link" href="../index.html#contact">Contact US</a>
                        </li>
                      </ul>
                    </div>
                  </nav>
                </div>
              </div>
            </div>
          </div>
    `
  
    const userId = localStorage.getItem('user_id');
    const loginLogoutElement = nav.querySelector("#loginLogout");
    const profileRegister = nav.querySelector("#profile");
    if (userId) {
      loginLogoutElement.innerHTML = `
        <a class="nav-link" href="#" onclick="myLogout()">Logout</a>
      `;
      profileRegister.innerHTML = `
        <a class="nav-link" href="../pages/profile.html">Profile</a>
      `;
    } else {
      loginLogoutElement.innerHTML = `
        <a class="nav-link" href="../pages/login.html">Login</a>
      `;
      profileRegister.innerHTML = `
        <a class="nav-link" href="../pages/registration.html">Sign Up</a>
      `;
    }
  
    div.appendChild(nav);
  
    
}
navigation();