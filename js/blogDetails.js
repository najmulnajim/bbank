const loadBlog=()=>{
    const param = new URLSearchParams(window.location.search).get("blogId");
    fetch(`https://bloodbank-30u0.onrender.com/blog/list/${param}`)
    .then((res) =>res.json())
    .then((data) =>displayBlog(data))
    .catch((err) =>console.log(err));
};

function dateConverter(date){
    const year=date.slice(0,10)
    return year;
}

const displayBlog=(data)=>{
    console.log(data);
    const parent=document.getElementById("blogDetails")
    const div=document.createElement("div")
    // div.classList.add("container")
    div.innerHTML=`
        <div class="row ">
            <h1>${data.title}</h1>
        </div>
        <div class="row author-name">
            <h4>${data.author} <span>| ${dateConverter(data.created_date)}</span></h4> 
        </div>
        <div class="row blog">
            <img src="${data.image}" style="width:100%;height:100%" alt="blog image">
            <p style="margin-top:50px;margin-bottom:50px">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry's standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
                <br/>
                <br/>
                ${data.blog}
            </p>
        </div>
    
    `;
    parent.appendChild(div);
}

const loadComments=() => {
    const param = new URLSearchParams(window.location.search).get("blogId");
    fetch(`https://bloodbank-30u0.onrender.com/blog/list/${param}/comments`)
    .then((res) =>res.json())
    .then((data) =>displayComments(data))
    .catch((err) =>console.log(err));
}

const displayComments=(data)=>{
    console.log(data);
    const parent=document.getElementById("blogComments")
    data.forEach((data) =>{
        const div=document.createElement("div")
        div.innerHTML=`
        <div class="card" style="margin-bottom:10px">
            <div class="card-header">
            ${data.commenter_name}
            </div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item"><p>${data.comment_text}</p></li>
            </ul>
        </div>
        `
        parent.appendChild(div);
    })
}

const handleComment=()=>{
    const param = new URLSearchParams(window.location.search).get("blogId");
    const form = document.getElementById('postComment');
    const formData = new FormData(form);
    formData.append('blog', param);
    console.log([ ...formData ]);

    fetch('https://bloodbank-30u0.onrender.com/blog/comment/', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if(response.ok){
            console.log("works fine");
        }
        else{
            console.log("not working");
        }
    })
}

const loadLatestBlog = ()=>{
    fetch("https://bloodbank-30u0.onrender.com/blog/latest")
    .then((res) =>res.json())
    .then((data) =>displayLatestBlog(data))
}

const displayLatestBlog=(data)=>{
    console.log(data);
    const parent=document.getElementById("latestBlog")
    data.forEach((data) =>{
        const div=document.createElement("div")
        div.classList.add("card");
        div.innerHTML=`
            <div style="padding:5px">
                <h4>${data.title}</h4>
                <h6>Author: ${data.author} <span>| ${dateConverter(data.created_date)}</span> <br/>  <a href="../pages/blogDetails.html?blogId=${data.id}"><span style="color:blue;"> Read Now </span></a></h6>
            </div>
        `
        parent.appendChild(div)
    })
}

loadBlog();
loadComments();
loadLatestBlog();