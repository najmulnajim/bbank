const handleDonate=()=>{
  const param = new URLSearchParams(window.location.search).get("donorId");
  const name=document.getElementById("name").value;
  const email=document.getElementById("email").value
  const location=document.getElementById("location").value
  const phone=document.getElementById("phone").value
  const disease=document.getElementById("disease").value

  const info={
    name:name,
    email:email,
    location:location,
    phone:phone,
    disease:disease,
    donor:param,
    
  }

   console.log(info)

  fetch("https://bloodbank-30u0.onrender.com/donor/donation-request/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      alert('send request successfully!');
        window.location.href = '../index.html';
       console.log(data);
    });

}