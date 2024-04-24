
const handleContact=()=>{
    const name=document.getElementById("contact_name").value;
    const phone=document.getElementById("contact_phone").value
    const email=document.getElementById("contact_email").value
    const message=document.getElementById("contact_message").value
    const info={
      name:name,
      email:email,
      phone:phone,
      message:message, 
    }
    console.log(info);
    if (name=="" || email=="" || phone=="" ||message==""){
      console.log("found")
      const alertMessage = document.createElement('div');
      alertMessage.textContent = 'Message don"t send. All fields are required!';
      alertMessage.style.backgroundColor = '#Ff0000';
      alertMessage.style.color = 'white';
      alertMessage.style.padding = '10px';
      alertMessage.style.position = 'fixed';
      alertMessage.style.top = '10px';
      alertMessage.style.left = '50%';
      alertMessage.style.transform = 'translateX(-50%)';
      alertMessage.style.zIndex = '9999';
      document.body.appendChild(alertMessage);
      
      setTimeout(function() {
          alertMessage.style.display = 'none';
      }, 1500);
      return;
    }
  
    fetch("https://bloodbank-30u0.onrender.com/contact/", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(info),
    })
      .then((res) => {
        if (res.ok) {
            const alertMessage = document.createElement('div');
                alertMessage.textContent = 'Message sent successfully!';
                alertMessage.style.backgroundColor = '#4CAF50';
                alertMessage.style.color = 'white';
                alertMessage.style.padding = '10px';
                alertMessage.style.position = 'fixed';
                alertMessage.style.top = '10px';
                alertMessage.style.left = '50%';
                alertMessage.style.transform = 'translateX(-50%)';
                alertMessage.style.zIndex = '9999';
                document.body.appendChild(alertMessage);
                
                setTimeout(function() {
                    alertMessage.style.display = 'none';
                }, 1500);
            
        }
        return res.json();
    })
      .then((data) => {
      });
  }