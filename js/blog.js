const loadBlog=()=>{
    fetch("https://bloodbank-30u0.onrender.com/blog/list/")
    .then((res) =>res.json())
    .then((data) =>displayBlogs(data))
    .catch((err) =>console.log(err));
  };
  
  const displayBlogs = (data) => {
    console.log(data)
    data.forEach(async (data) => {
      const parent = document.getElementById("blog-container-all");
      const div = document.createElement("div");
      div.classList.add("col-md-6");
      const commentCount = await totalComments(data.id);
      const blog=data.blog.slice(0,150)
  
      div.innerHTML = `
        <div class="news-card">
          <div class="image">
            <img src="${data.image}" alt="blog-image">
          </div>
          <div class="detail">
            <h2 style="color: #de1f26">${data.title}</h2>
            <p style="font-size: 13px">${blog}...</p>
            <p class="footp">
              <a href="../pages/blogDetails.html?blogId=${data.id}"><span>
                ${commentCount} Comments</span>|<span style="color:blue">Read More...</span>
              </a>
            </p>
          </div>
        </div>
      `;
      parent.appendChild(div);
    });
  };
  loadBlog();