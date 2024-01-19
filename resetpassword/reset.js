
const password1= document.querySelector("#password");
const password2= document.querySelector("#password2");
const passwordInput=document.querySelectorAll(".inneremailinput");
const constraint=document.querySelector(".guidelance");
const passwordDntMatch=document.querySelector(".warnmessage");
const form=document.querySelector(".form");
const loader=document.querySelector(".loader")


function checkpassConstraint(){
    checkPassword(password1.value.trim());

}
function checkPassword(password) {
    // Password must contain at least one number, one uppercase and lowercase letter, and be at least 8 characters long
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    if (passwordRegex.test(password)) {
        constraint.style.color="green";
        password2.disabled=false;
    } else {
        constraint.style.color="red";
        password2.disabled=true;
    }
}


let checkv=sessionStorage.getItem("codesent");
if(checkv===null){
  console.log("kkkd")
  window.open("/forgotpassword/verifyemail.html","_blank")
  window.close();

}else{
  console.log("something to show")
}
function checkPasswords() {
 
    // Check if password1 is empty
    if (password1.value.trim() === "") {
        passwordInput[0].style.border="1px solid red";
    } else if (password1.value.trim() !== password2.value.trim()) {
      
        passwordInput[0].style.border="1px solid red";
        passwordInput[1].style.border="1px solid red";
        passwordDntMatch.innerHTML="Passwords do not match!"
    } else {
        const password=password1.value.trim()
       


        //add this loader after you have sent the request to the server 
        //and remove after the response

        const dbtype= sessionStorage.getItem("dbtype");
        const userid=sessionStorage.getItem("codesent");



        const formdata = new FormData();

    formdata.append("password", password);
   
    formdata.append("userid", userid); // this would come from the session
    formdata.append("databaseType", dbtype); // this would aslo come from session

    //formdata.append("dbvalues", dbvalues);
   

    const options = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "127.0.0.1:3890",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, authorization",
        "Access-Control-Allow-Methods": "POST",
        withCredentials: true,
      },

      body: formdata,
    };

    let fetchResetPassword = fetch(
      "https://yielding-dented-amusement.glitch.me/forgetpassword",
      options
    ).catch((err) => {
      console.log("There is an error fetching data: ", err);
    });

    loader.classList.add("addedloader");

    fetchResetPassword
      .then((res) => res.json())
      .then((d) => {

       
        //#Danties
        // Here is where you respond with the data that ypou think that will

        const {message, affectedrows} = d;
        //   console.log(codeSent, emailDoesntExist);

        if (affectedrows == 1) {

          loader.classList.remove("addedloader");
          form.reset()

          sessionStorage.removeItem("codesent");
          sessionStorage.removeItem("dbtype")

          window.open("/login.html","_blank")
          window.close();

          
        } else {
          //alert the user user doesn't exist
          // message = "No user found";
          alert.innerHTML = "No user found";
          console.log(message);
        }
      })
      .catch((err) => {
        console.log("There is an error changing user password: ", err);
      });
    //Once the password change is succes respond with success , close the current page and open login.htmlpage
  }



        

  //#Danities send the password to the backend here 

  //Once the password change is succes respond with success , close the current page and open login.htmlpage

        
    }


form.addEventListener("submit",(e)=>{

    e.preventDefault()
    console.log("Yessssss")
    checkPasswords();
})

function getrid(){
    passwordInput[0].style.border="1px solid hsla(0,0%,0%,0.3)";
        passwordInput[1].style.border="1px solid hsla(0,0%,0%,0.3)";
        passwordDntMatch.innerHTML=""
}

const togglePassword1 = document.querySelector('#togglePassword');
const togglePassword2 = document.querySelector('#togglePassword1');
  

  togglePassword1.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password1.getAttribute('type') === 'password' ? 'text' : 'password';
    password1.setAttribute('type', type);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});
togglePassword2.addEventListener('click', function (e) {
    // toggle the type attribute

    const type2 = password2.getAttribute('type') === 'password' ? 'text' : 'password';
    password2.setAttribute('type', type2);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});