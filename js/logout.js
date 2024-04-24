


const myLogout=()=>{
    const token = localStorage.getItem('token');
    console.log(token);
    if(token){
        console.log(`Token ${token}`);
        const info={
            "Authorization":`Token ${token}`
        }
        console.log(JSON.stringify(info));
    fetch('https://bloodbank-30u0.onrender.com/donor/logouta/',{
        method: 'GET',
    })
    .then(response => {
         if (!response.ok) {
             alert('Logout failed. Please try again.');
            //  window.location.href = '/login/';
            console.log(response);
            console.log(JSON.stringify(response));
            console.log(response.messages);
            console.log('Logout failed. Please try again');
         }
         return response.json();
     })
     .then(data=>{
        localStorage.removeItem('token')
        localStorage.removeItem('user_id')
         alert('Logout successfully');
         window.location.href = '../pages/login.html';
        console.log(data);
         console.log('Logout successfully...');
     })
    }
    else{
        alert('No token found in localStorage.');
        console.log('No token found in localStorage.');
    }
    
}