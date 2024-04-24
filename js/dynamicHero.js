function dynamicHero(){
    let div=document.getElementById("hero1");
    const userId = localStorage.getItem('user_id');
    if (!userId) {
    div.innerHTML=`
        <a href="./pages/registration.html" style="color: #fff">Donor Registration</a>
       
    `}
    else{
        div.innerHTML=`<a href="#donor" style="color: #fff">Find a Donor</a>`  
    }
}
dynamicHero();

function dynamicHero2(){
    let div=document.getElementById("hero2");
    const userId = localStorage.getItem('user_id');
    if (!userId) {
    div.innerHTML=`
        <a href="./pages/registration.html" style="color: #fff">Donor Registration</a>
       
    `}
    else{
        div.innerHTML=`<a href="#donor" style="color: #fff">Find a Donor</a>`  
    }
}
dynamicHero2();
