let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");
let F = true;

signup.addEventListener("click", () => {
  slider.classList.add("moveslider");
  formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
  slider.classList.remove("moveslider");
  formSection.classList.remove("form-section-move");
});

// -------------------------------------------------It Is the real Work------------------------------------------------------

// -----------------------------------------------------It is UserData store fution in localStorage--------------------------------
function storeData(username, email, password) {
  // -----------------------------------------Get localStorage data or create a empty array --------------------------------------
  const UserDB = JSON.parse(localStorage.getItem("UserDB")) || [];

  const userdata = {
    username: username,
    email: email,
    password: password,
    appdata: ["null"],
  };
  //   -----------------------------------------------set the data push ---------------------------
  UserDB.push(userdata);
  localStorage.setItem("UserDB", JSON.stringify(UserDB));
}

//--------------------------------------The funtion  find the User in the db ---------------------------------
function findUser(inputusername, inputpassword) {
  let index = -1
  const UserDB = JSON.parse(localStorage.getItem("UserDB")) || [];
  console.log(inputusername);


for(let i=0;i<UserDB.length;i++){
    if(UserDB[i].username==inputusername&& UserDB[i].password==inputpassword)
    {
        index = i;
    }
}
return index;
}

document.getElementById("Signup").addEventListener("click", () => {
  let username = document.getElementById("Sname").value.trim();
  let email = document.getElementById("Semail").value.trim();
  let pass = document.getElementById("Spassword").value.trim();
  let cpass = document.getElementById("Scpassword").value.trim();

  if ((username && email && pass && cpass) == "") {
    alert("Enter the detail");
    return;
  }
  let k =findUser(username, username);
  console.log(k)
  if(k>0){
     alert("user Alardy Exsist");
     return;
  }
//   F ? (storeData(username, email, pass),alert("signup sucessful")) : alert("User Exist");

  //-------------------------------------------empting the input box-----------------------------------
  document.getElementById("Sname").value = "";
  document.getElementById("Semail").value = "";
  document.getElementById("Spassword").value = "";
  document.getElementById("Scpassword").value = "";
});

//------------------------------------------The function is used to login user----------------------------

document.getElementById("login").addEventListener("click", () => {
  console.log("login btn click");
  let username = document.getElementById("Lname").value.trim();
  let password = document.getElementById("Lpassword").value.trim();

  if (username && password == "") {
    alert("Enter the detail");
    return;
  }

 let finder = findUser(username, password);
 if(finder<0){
    alert("Username and Password invalid")
 }else{
  const  athentication = document.getElementById('athentication');
  const  main = document.getElementById('main');
    athentication.style.display='none';
    main.style.display='';
 }

//   F ? alert("wrong username or password") : alert("userlogin");

  document.getElementById("Lname").value = "";
  document.getElementById("Lpassword").value = "";
});

document.getElementById("finalsubbmit").addEventListener("click",()=>{
    // let aapname = document.getElementById("aapname").value.trim();
    // let appusername= document.getElementById("appusername").value.trim();
    console.log("btn click")
})
