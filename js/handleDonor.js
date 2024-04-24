const divisionSelect = document.getElementById('divisions');
const districtSelect = document.getElementById('districts');
let totalDonors;

function callButton(num){
  alert(`Phone Number: ${num}`);
}

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

fetchDivisions();

let selectedDivision = '';
let selectedDistrict = '';

divisionSelect.addEventListener('change', async function() {
    const divisionId = divisionSelect.value;
    selectedDivision = divisionId;

    if (divisionId) {
        await fetchDistricts(divisionId);
        updateSelectedDistrict();
        getSelectedValues();
    }
    else{
      districtSelect.innerHTML = '';
      const option = document.createElement('option');
      option.value = '';
      option.text = "Please select a division first...";
      districtSelect.appendChild(option);
      getSelectedValues();
    }
});

districtSelect.addEventListener('change', function() {
    selectedDistrict = districtSelect.value;
    getSelectedValues();
});

async function fetchDistricts(divisionId) {
  if (!divisionId){
    districtSelect.innerHTML = '';
    const option = document.createElement('option');
    // option.value = district.id;
    option.text = "Please select a division first.";
    districtSelect.appendChild(option);
    
  }
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
};

function updateSelectedDistrict() {
    // Automatically select the first district if available
    if (districtSelect.options.length > 0) {
        selectedDistrict = districtSelect.value;
        // console.log(selectedDistrict, selectedDivision);
    }
}

const bloodGroupSelect = document.getElementById('bloodGroupDropdown');
let BloodGroup='';
// Event listener to track changes in the blood group dropdown
bloodGroupSelect.addEventListener('change', function() {
    const selectedBloodGroup = bloodGroupSelect.value;
    BloodGroup=selectedBloodGroup;
    // console.log("Selected Blood Group:", selectedBloodGroup);
    getSelectedValues();
});

function getSelectedValues() {
  const selectedValues = {
      division: selectedDivision,
      district: selectedDistrict,
      bloodGroup: BloodGroup
  };
  if (!selectedValues.division){
    selectedValues.district="";
  }

  // console.log("Selected Values:", selectedValues);
  handleDonorView(selectedValues.division, selectedValues.district, selectedValues.bloodGroup);

  // Perform any further actions with the selected values here
}

let nextPageIsNull=false;
let currentPage = 1;

const handleDonorView=(division,district,bloodGroup,page = 1, pageSize = 6) => {
  fetch(`https://bloodbank-30u0.onrender.com/donor/list/?division=${division}&District=${district}&blood_group=${bloodGroup}&page=${page}&page_size=${pageSize}`)
  .then(res=>res.json())
  .then(data=>{
    nextPageIsNull=data.next?false:true;
    updatePaginationControls(data.next,data.previous,data.count);
    displayDonor(data.results);
  })
  .catch(err=>console.log(err))
}

function bloodGroupConverter(id){
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

const displayDonor=(data)=>{
  console.log(data);
  
  UID=localStorage.getItem("user_id");
  const parent=document.getElementById("donorview")
  parent.innerHTML = '';
  data.forEach((data) =>{
  const div=document.createElement("div")
  div.classList.add("col-md-4")
  div.classList.add("col-sm-7")
  div.classList.add("vd")
  const bgid=parseInt(data.blood_group);
  const bgname=bloodGroupConverter(bgid);
  const phone=data.phone;
  console.log(phone);
  div.innerHTML=`
    <div class="bkjiu" style="margin-bottom:50px">
      <img src=${data.image} alt="Donor Image" class="my-image" style="border-radius:20px;"/>
      <h4 style="margin-top:5px">${data.first_name}  ${data.last_name}  <span style="text-transform: uppercase;color:#de1f26;margin-left:15px">${bgname}</span></h4>
      
      <h4>Last Donation: ${data.last_donate} ${data.availabilities ? '&#x2705;' : '&#x274C;'}</h4>
      
      <button class="btn btn-sm btn-danger callingButton"><a  onclick="callButton('${phone}')" style="color: #fff;">Call Now</a> 
      </button>
      <button class="btn btn-sm btn-danger" ><a  href="../pages/request.html?donorId=${data.id}" style="color: #fff;">Request to Donate</a>

      </div>
    `;
    const callButtons = div.querySelectorAll('.callingButton');
    callButtons.forEach(callButton => {
      if (UID) {
        callButton.classList.remove('disabled');
      }else {
        callButton.classList.add('disabled');
      }
    });
  parent.appendChild(div);
  })
  
}
function nextPage() {
  if (!nextPageIsNull) {
    currentPage++;
    handleDonorView(selectedDivision, selectedDistrict, BloodGroup, currentPage);
  }
}

function previousPage() {
  if (currentPage > 1) {
    currentPage--;
    handleDonorView(selectedDivision, selectedDistrict, BloodGroup, currentPage);
  }
}

function updatePaginationControls(next, previous,count){
  const previousButton = document.getElementById('previousButton');
  const nextButton = document.getElementById('nextButton');
  const nodonor = document.getElementById('nodonor');
  if(!count){
    previousButton.style.display="none";
    nextButton.style.display="none";
    nodonor.style.display="inline-block";
  }
  else{
    previousButton.style.display="inline-block";
    nextButton.style.display="inline-block";
    nodonor.style.display="none";
  }
  if (previous){
    previousButton.classList.remove('disabled');
  }else{
    previousButton.classList.add('disabled');
  }

  if (next){
    nextButton.classList.remove('disabled');
  }else{
    nextButton.classList.add('disabled');
  }
}



