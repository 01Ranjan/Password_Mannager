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
    appdata: [],
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

// --------------------------------------------------removing item in the array--------------------------------------------






function fechtheData(finder){
  const UserDB = JSON.parse(localStorage.getItem("UserDB"))
  const databox = document.getElementById('databox');
  databox.innerHTML=``;
  if(UserDB[finder].appdata.length==0){
    let temp = '☹'
    databox.innerHTML=`<h1>No Data Found ${temp}</h1>`;
    return;
  }
  let i =0;
  UserDB[finder].appdata.forEach(element => {
    let div = document.createElement('div');
      div.innerHTML =`
    <img src=${`https://img.logo.dev/${element.appname}.com?token=pk_Z0RzmGkIT_mBASPKZFYsBg`} alt="">
     <p >${element.appname}</p>
            <br>
            <p>${element.appusername}</p>
            <br>
            <p>${element.apppassword}</p>
            <br>
            <button onclick="removeItem(${finder},${i})">remove</button>
            `
            databox.appendChild(div)
            i++;
  });
}




function removeItem(userindex,appindex) {
  const UserDB = JSON.parse(localStorage.getItem("UserDB"))
  console.log(UserDB[userindex].appdata)
  console.log(appindex)
  if (appindex !== -1) {
    UserDB[userindex].appdata.splice(appindex, 1);
  }
console.log("Updated Array: ", UserDB[userindex].appdata);
localStorage.setItem("UserDB", JSON.stringify(UserDB));
fechtheData(userindex)
}
function add(index){
const appname = document.getElementById('appname').value.trim();
const appusername = document.getElementById('appusername').value.trim();
const apppassword = document.getElementById('apppassword').value.trim();
if(appname==''||appusername==''||apppassword==''){
  alert("enter the data");
  return;
}
const UserDB = JSON.parse(localStorage.getItem("UserDB")) || [];
console.log(UserDB[index].appdata);
let disk = {
  appname:appname,
  appusername:appusername,
  apppassword:apppassword
}
UserDB[index].appdata.push(disk)
localStorage.setItem("UserDB", JSON.stringify(UserDB));
fechtheData(index);
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
  storeData(username, email, pass);
  alert("signup sucessful")

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
    const btn = document.getElementById('btn');
    const databox = document.getElementById('databox');
    const UserDB = JSON.parse(localStorage.getItem("UserDB")) || [];
    btn.innerHTML=` <button id="finalsubbmit"  onclick="add(${finder})">Submit</button>`

    UserDB[finder].appdata
    console.log( UserDB[finder].appdata.length);
    if(UserDB[finder].appdata.length==0){
      databox.innerHTML=" <h1>No Data Found</h1>"
    }else{
      fechtheData(finder);
    }
    
 }

//   F ? alert("wrong username or password") : alert("userlogin");

  document.getElementById("Lname").value = "";
  document.getElementById("Lpassword").value = "";
});

