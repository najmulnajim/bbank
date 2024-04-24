function bgConverter(id){
    switch (id) {
      case 1:
        return "A+";
        break;
      case 2:
        return "A-";
        break;
      case 3:
        return "B+";
        break;
      case 4:
        return "B-";
        break;
      case 5:
        return "AB+";
        break;
      case 6:
        return "AB-";
        break;
      case 7:
        return "O+";
        break;
      case 8:
        return "O-";
        break;
      default:
        return "";
        break;
    }
  }

const loadUser=()=>{
    const userId = localStorage.getItem('user_id');
    console.log(userId);
    fetch(`https://bloodbank-30u0.onrender.com/donor/list/${userId}/`)
   .then((res) =>res.json())
   .then((data) =>displayUser(data))
   .catch((err) =>console.log(err));
}

const displayUser=(data)=>{
    console.log(data);
    const parent = document.getElementById('userProfile');
    const bgGroup=bgConverter(parseInt(data.blood_group));
    parent.innerHTML=`
    <div class="card-block" style="margin:auto">
        <div class="user-image" >
            <img src="${data.image}" class="img-radius" alt="User-Profile-Image" style="margin-left:25%">
        </div>
        <div class="mt-2 " style="margin-left:25%" >
            <h5 class="p-2">${data.first_name.charAt(0).toUpperCase() + data.first_name.slice(1)}  ${data.last_name}</h5>
            <h5 class="p-2">Blood Group: ${bgGroup}</h5>
            <p class="text-active p-2">Active | ${data.gender} | Born ${data.birth_date}</p>
        </div>
        <hr>
        
        <hr>
        <div class="row justify-content-center user-social-link">
            <div class="col-auto"><a href="#!"><i class="fa fa-facebook text-facebook"></i></a></div>
            <div class="col-auto"><a href="#!"><i class="fa fa-twitter text-twitter"></i></a></div>
            <div class="col-auto"><a href="#!"><i class="fa fa-dribbble text-dribbble"></i></a></div>
        </div>
    </div>
    `
}

loadUser();