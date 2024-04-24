const divisionSelect = document.getElementById('divisions');
const districtSelect = document.getElementById('districts');
async function fetchDivisions() {
    try {
      const response = await fetch('https://bloodbank-30u0.onrender.com/donor/divisions/');
      const data = await response.json();

      // Populate division select with options
      data.forEach(division => {
        const option = document.createElement('option');
        option.value = division.id;
        option.text = division.name;
        divisionSelect.appendChild(option);
      });

      // Trigger change event on division select to populate districts initially
      divisionSelect.dispatchEvent(new Event('change'));
    } catch (error) {
      console.error('Error fetching divisions:', error);
    }
  }

  // Function to fetch districts based on selected division
  async function fetchDistricts(divisionId) {
    try {
      const response = await fetch(`https://bloodbank-30u0.onrender.com/donor/district/?division=${divisionId}`);
      const data = await response.json();

      // Clear previous options
      districtSelect.innerHTML = '';

      // Add new options based on API response
      data.forEach(district => {
        const option = document.createElement('option');
        option.value = district.id;
        option.text = district.name;
        districtSelect.appendChild(option);
      });
    } catch (error) {
      console.error('Error fetching districts:', error);
    }
  }

  // Event listener for division select change
  divisionSelect.addEventListener('change', function() {
    const divisionId = divisionSelect.value;
    fetchDistricts(divisionId);
  });

  // Fetch divisions when the page loads
  fetchDivisions();


function registerUser() {
  const form = document.getElementById('registrationForm');
  const formData = new FormData(form);

  console.log([ ...formData ]);

  // Validate password match
  const password = formData.get('password');
  const confirmPassword = formData.get('confirm_password');
  if(password.length<6){
    alert('Password must be at least 6 characters!');
    return;
  }
  if (password !== confirmPassword) {
    console.log(password,confirmPassword)
      alert('Passwords do not match');
      return;
  }

  let requiredData=true;
  formData.forEach((value, key) => {
    if (value==null || value==""){
      requiredData=false;
      return ;
    }  
  });
  if (!requiredData){
    alert('Please fill all the fields');
    return;
  }
  var object = {};
  formData.forEach((value, key) => object[key] = value);
  var json = JSON.stringify(object);
  console.log(json);

  fetch('https://bloodbank-30u0.onrender.com/donor/list/', {
      method: 'POST',
      body: formData
  })
  .then(response => {
      if (!response.ok) {
        alert('এই ইমেইল দিয়ে একটি একাউন্ট রেজিস্টার করা আছে। অনুগ্রহ করে আপনার একাউন্ট এ লগইন করুন।');
        window.location.href = '../pages/login.html';
        throw new Error('Failed to register user');
      }
      return response.json();
  })
  .then(data => {
      alert('একাউন্ট একটিভ করতে অনুগ্রহ করে আপনার ইমেইল চেক করুন। ধন্যবাদ ');
      window.location.href = '../index.html';
      console.log('User registered successfully:', data);
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


