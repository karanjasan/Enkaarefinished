let loader = document.getElementsByClassName("loader");

const formdata = new FormData();

const options = {
  method: "POST",

  headers: {
    "Access-Control-Allow-Credentials": true,
<<<<<<< HEAD
    "Access-Control-Allow-Origin": "https://enkaare.onrender.com",
=======
    "Access-Control-Allow-Origin": "https://www.enkaare.com",
>>>>>>> origin/dev
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, authorization",
    "Access-Control-Allow-Methods": "POST",
    withCredentials: true,
  },
  credentials: "include",
};
// https://1ed2-105-231-144-76.ngrok.io/api'

//https://half-geode-roundworm.glitch.me/api

<<<<<<< HEAD
let f = fetch("https://enkaare.onrender.com/get", options).catch((err) => {
=======
let f = fetch("https://yielding-dented-amusement.glitch.me/get", options).catch((err) => {
>>>>>>> origin/dev
  console.log("There is error fetching data: ", err);
});

// loader[0].classList.add("addedloader");

f.then((res) => res.json())
  .then((d) => {
    // loader[0].classList.remove("addedloader");
    const {auth, dashboard} = d;

    if (auth === "yes") {
      if (dashboard === "candidate") {
        window.location.href = "/workerdashboard.html";
        
      } else {
        window.location.href = "/employerdashboard.html";
      }
    }
  })
  .catch((err) => {
    console.log(err);
    if (err) {
      // yes();
      //  alert("Not sent.........the server is down!");
    } else {
    }
  });

let form = document.getElementById("loginform");
let email = document.getElementById("username");
let password = document.getElementById("password");
let check = document.getElementById("check");

let alert = document.getElementsByClassName("invalidnot");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const formdata = new FormData();

  formdata.append("email", email.value);

  formdata.append("password", password.value);
  formdata.append("check", check.checked);

  const options = {
    method: "POST",

    headers: {
      "Access-Control-Allow-Credentials": true,
<<<<<<< HEAD
      "Access-Control-Allow-Origin": "https://enkaare.onrender.com",
=======
      "Access-Control-Allow-Origin": "https://www.enkaare.com",
>>>>>>> origin/dev
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, authorization",
      "Access-Control-Allow-Methods": "POST",
      withCredentials: true,
    },
    credentials: "include",

    body: formdata,
  };
  // https://1ed2-105-231-144-76.ngrok.io/api'

  //https://half-geode-roundworm.glitch.me/api
  //https://yielding-dented-amusement.glitch.me

<<<<<<< HEAD
  let f = fetch("https://enkaare.onrender.com/login", options).catch(
    (err) => {}
  );
  // loader[0].classList.add("addedloader");
=======
  let f = fetch("https://yielding-dented-amusement.glitch.me/login", options).catch((err) => {});
  loader[0].classList.add("addedloader");
>>>>>>> origin/dev

  f.then((res) => res.json())
    .then((d) => {
     

      const {verytype, usertype, userid, firstname, secondname} = d;

      if (verytype === "valid") {
        function setCookie(cname, cvalue, exdays = null) {
<<<<<<< HEAD
          // const domain = "127.0.0.1:5500";
          let expires = exdays
            ? `expires=${new Date(
                new Date().getTime() + exdays * 1000 * 60 * 30
              ).toUTCString()}`
            : "";
          console.log("expires: ", expires);
          document.cookie = `${cname}=${encodeURIComponent(
            cvalue
          )}; expires=${expires}; path=/`;
          console.log(document.cookie);
        }
=======
          // const domain = ".127.0.0.1:5500";
           let expires = exdays
             ? `expires=${new Date(
                 new Date().getTime() + exdays * 1000 * 60 * 30
               ).toUTCString()}`
             : "";
          // console.log("expires: ", expires);
           document.cookie = `${cname}=${encodeURIComponent(
             cvalue
           )}; expires=${expires}; path=/ `;
          // console.log(document.cookie);
         }
>>>>>>> origin/dev

        // Set Cookies
        setCookie("pfname", firstname);
        setCookie("psname", secondname);
        setCookie("userloged", userid);
        setCookie("usertype", usertype);

        // localStorage.setItem("pfname", firstname);
        // localStorage.setItem("psname", secondname);
        // localStorage.setItem("userloged", userid);
        // localStorage.setItem("usertype", usertype);
        if (usertype === "client") {
<<<<<<< HEAD
          console.log("Yessssss client");
          /* loader[0].classList.remove("addedloader");
=======
          
         loader[0].classList.remove("addedloader");
>>>>>>> origin/dev
          form.reset();
          window.location.href = "././employerdashboard.html";
        } else if (usertype === "candidate") {
<<<<<<< HEAD
          console.log("YESS employer");
          /* loader[0].classList.remove("addedloader");
=======
          
          loader[0].classList.remove("addedloader");
>>>>>>> origin/dev
          form.reset();
          window.location.href = "././workerdashboard.html";
        }
      } else {
        alert[0].style.display = "block";
        loader[0].classList.remove("addedloader");
      }
    })
    .catch((err) => {
      console.log(err);
      if (err) {
        // yes();
        //  alert("Not sent.........the server is down!");
      } else {
      }
    });
});
let removealert = () => {
  alert[0].style.display = "none";
};
