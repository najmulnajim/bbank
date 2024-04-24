const loadLatestBlog=()=>{
    fetch("https://bloodbank-30u0.onrender.com/blog/latest/")
    .then((res) =>res.json())
    .then((data) =>displayLatestBlogsCard(data))
    .catch((err) =>console.log(err));
};

async function totalComments(blogId) {
  try {
    const response = await fetch(`https://bloodbank-30u0.onrender.com/blog/list/${blogId}/comments`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.length; 
  } catch (error) {
    console.error('Error fetching comments:', error);
    return 0;
  }
}


const displayLatestBlogsCard = (data) => {
  console.log(data)
  data.forEach(async (data) => {
    const parent = document.getElementById("blog-container");
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


loadLatestBlog();