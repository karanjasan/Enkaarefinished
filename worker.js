const baseUrl = "https://yielding-dented-amusement.glitch.me";
// let formdata = new FormData();

let token = localStorage.getItem("token");
const options = {
  method: "POST",

  headers: {
    "Authorization": `Bearer ${token}`,
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Allow-Origin": "https://enkaare.co",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, authorization",
    "Access-Control-Allow-Methods": "POST",
    withCredentials: true,
  },
  credentials: "include",
};

// const optionWithFormData = {
//   method: "POST",
//   headers: {
//     "Access-Control-Allow-Credentials": true,
//     "Access-Control-Allow-Origin": "https://enkaare.co",
//     "Access-Control-Allow-Headers":
//       "Origin, X-Requested-With, Content-Type, Accept, authorization",
//     "Access-Control-Allow-Methods": "POST",
//     withCredentials: true,
//   },
//   credentials: "include",

//   body: formdata,
// };

// Function to set a subdomain cookie
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie =
    cname + "=" + encodeURIComponent(cvalue) + ";" + expires + ";path=/";
}

// Function to retrieve a cookie value
const getCookie = (name) => {
  const cookieName = `${name}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const cookieArray = decodedCookie.split(";");
  for (let i = 0; i < cookieArray.length; i++) {
    let cookie = cookieArray[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(cookieName) === 0) {
      return cookie.substring(cookieName.length, cookie.length);
    }
  }
  return "";
};


// Function to delete a cookie



function deleteCookie(name) {
  const domain = ".127.0.0.1:5500"; // Replace with your actual domain
  const pastDate = new Date(0).toUTCString();
  try {
    document.cookie = `${name}=; expires=${pastDate}; path=/; domain=${domain}`;
    console.log(`Deleted cookie: ${name}`);
  } catch (error) {
    console.error(`Error deleting cookie: ${name}`, error);
  }
}






//here it code to update candidate everytime they are online 
let updateonlinestatus=(status)=>{

  let user_id=getCookie("userloged");
  let formdata=new FormData()
  formdata.append("user_id",user_id);
  formdata.append("status",status)

  const options = {
    method: "POST",
  
    headers: {
      "Authorization": `Bearer ${token}`,
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "https://enkaare.co",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, authorization",
      "Access-Control-Allow-Methods": "POST",
      withCredentials: true,
    },
    credentials: "include",
    body:formdata
  };

  let f = fetch(`${baseUrl}/cstatus`, options).catch((err) => {
    console.log("There is an error fetching data: ", err);
  });
  
  setTimeout(()=>{
    updateonlinestatus("none")
  },600000)
  
  
}
updateonlinestatus("none");




//session
let f = fetch(`${baseUrl}/session`, options).catch((err) => {
  console.log("There is an error fetching data: ", err);
});

f.then((res) => res.json())
  .then((d) => {
    const {auth} = d;
    if (auth === "no") {
      //   localStorage.removeItem("userloged");
      //   localStorage.removeItem("pfname");
      //   localStorage.removeItem("psname");
      deleteCookie("userloged");
      deleteCookie("pfname");
      deleteCookie("psname");
      window.location.href = "/login.html";
    } else {
      //
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



  
  function getTokenExpiration(token2) {
    try {
      const payload = JSON.parse(atob(token2.split('.')[1]));
      if (payload && payload.exp) {
        const expirationTimestamp = payload.exp * 1000;
        return new Date(expirationTimestamp);
      }
    } catch (error) {
      console.error('Error parsing token payload:', error);
    }
    return null;
  }
  
  
  const expirationDate = getTokenExpiration(token);

  
  
  if (expirationDate) {
    const now = new Date();
   

    const timeRemaining = (expirationDate - now) / 1000;

   
  
    if (now >= expirationDate) {
  
      deleteCookie("pfname");
      deleteCookie("psname");
      deleteCookie("usertype");
      localStorage.removeItem('token')
      window.location.href = "././login.html";
    } else if (timeRemaining <= 900) {
      
      let f= fetch(`${baseUrl}/refeshtoken`, options).catch((err) => {
        console.log("There is an error fetching sessions", err);
      });

      f.then(res=>res.json()).then(d=>{
        const{newt}=d;
        localStorage.setItem("token", newt);

      })


      
  
      
    } else {
  
      console.log("Token is still valid");
    }
  } else {
    console.log('Token does not have a valid expiration claim.');
  }
  


let logout = () => {
  updateonlinestatus("logout");
  deleteCookie("userloged");
      deleteCookie("pfname");
      deleteCookie("psname");
      deleteCookie("usertype");
      localStorage.removeItem('token')
      window.location.href = "././login.html";

/*
  //   const options = {
  //     method: "POST",

  //     headers: {
  //       "Access-Control-Allow-Credentials": true,
  //       "Access-Control-Allow-Origin": "https://www.enkaare.com",
  //       "Access-Control-Allow-Headers":
  //         "Origin, X-Requested-With, Content-Type, Accept, authorization",
  //       "Access-Control-Allow-Methods": "POST",
  //       withCredentials: true,
  //     },
  //     credentials: "include",
  //   };
  // https://1ed2-105-231-144-76.ngrok.io/api'

  //https://half-geode-roundworm.glitch.me/api

  let f = fetch(`${baseUrl}/logout`, options).catch((err) => {});
  f.then((res) => res.json()).then((d) => {
    const {okay} = d;
    if (okay) {
      //  localStorage.removeItem("userloged");
      //  localStorage.removeItem("pfname");
      //  localStorage.removeItem("psname");
      deleteCookie("userloged");
      deleteCookie("pfname");
      deleteCookie("psname");
      deleteCookie("usertype");
      window.location.href = "././login.html";
    }
  });*/
};

let setprofile = () => {
  candinddateaccountstatus();
  let phoneProfilePicture=document.querySelector("#logo");
  let namediv = document.getElementById("ppname");
  //   let firstnmae = localStorage.getItem("pfname");
  //   let secname = localStorage.getItem("psname");
  let firstnmae = getCookie("pfname");
  let secname = getCookie("psname");

  namediv.innerHTML = firstnmae + "  " + secname.slice(0, 1);

  /*infomation for profile picture notificaations and messanges*/

  //   let userd = localStorage.getItem("userloged");
  let userd = getCookie("userloged");

  let formdata = new FormData();
  formdata.append("userid", userd);

  const options = {
    method: "POST",
    body: formdata,
  };

  let f = fetch(`${baseUrl}/cnotimessprofile`, options).catch((err) => {
    console.log(err);
  });
  f.then((res) => res.json())
    .then((d) => {
      
      if (d[0].file === "noprofile") {
      } else {
        const imageex = "data:image/png;base64,";
        let ppimage = document.getElementsByClassName("img");
        ppimage[0].style.backgroundImage = `url('${imageex + d[0].file}')`;

        phoneProfilePicture.src=`${imageex + d[0].file}`
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

let candinddateaccountstatus = () => {
  sessionStorage.getItem("accountstatus");
  document.getElementById("statusbuton").innerHTML =
    sessionStorage.getItem("accountstatus");
};

let setvalue;
let setid = (vr) => {
  setvalue = vr;

 
};

//AVAILABLE ORDERS START HERE

let src;
/*
   let orderlist = document.getElementsByClassName("orderslist")[0];
var order = document.createElement('div');
var orderitems=` <div class="order orderhover">
<section class="orderp1">
   <h3>Web design/developer</h3>
   <div class="cname">
      <h4 class="ch31">Munene</h4> 
      <p class="ch32"> Nairobi,</p>
      <p class="ch32">Kenya</p>
   </div>

</section>
<section class="orderp2">
   <div class="aobids">
       <p class="aop1">19</p>
  <p class="aop2">Active bids</p>
  

   </div>
   <div class="jtype">
       <img src="/images/self-employed.png" alt="">
       <h4 class="jtypeh4">Freelancer</h4>
   </div>
   
</section>
<section class="orderp3">
   <p class="ordp3p">$600</p>
   <button>See Job</button>
   

</section>


</div>`;
order.innerHTML=orderitems;
orderlist.append(order);
*/

/************************/
let availableorders = () => {
  invitedcount();
  suminter();

  let thelist = document.querySelector(".orderslist");

  while (thelist.hasChildNodes()) {
    thelist.firstChild.remove();
  }
  let all = document.querySelector("#h3all");
  let invite = document.querySelector("#h3invite");
  invite.style.borderBottom = "3px solid transparent";
  all.style.borderBottom = "3px solid hsl(188,47%,20%)";

  let loader = document.getElementsByClassName("loader");

  //   let firstnmae = localStorage.getItem("pfname");
  //   let logedid = localStorage.getItem("userloged");
  let firstnmae = getCookie("pfname");
  let logedid = getCookie("userloged");

  const formdata = new FormData();

  formdata.append("firstname", firstnmae);
  formdata.append("logedid", logedid);

  const optionWithFormData = {
    method: "POST",

    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "https://enkaare.co",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, authorization",
      "Access-Control-Allow-Methods": "POST",
      withCredentials: true,
    },

    body: formdata,
  };
  // https://1ed2-105-231-144-76.ngrok.io/api'

  //https://half-geode-roundworm.glitch.me/api

  let f = fetch(`${baseUrl}/allorders`, optionWithFormData).catch((err) => {});
 loader[0].classList.add("addedloader");

  f.then((res) => res.json()).then((d) => {
    const {pnotcomplte} = d;

    if (pnotcomplte) {
      let orderlist = document.getElementsByClassName("orderslist")[0];
      var order = document.createElement("div");
      var orderitems = `<div class="empty-message">
      <img id="empty-icon" src="/images/empty-folder.png" alt="empty-folder">
    <div class="empty-text">Oops! No Results Found</div>
    `;
      order.innerHTML = orderitems;
      orderlist.append(order);

      sessionStorage.setItem("accountstatus", "Inactive");
      document.getElementById("statusbuton").innerHTML = "Inactive";

      setTimeout(() => {
        document
          .getElementsByClassName("incompleteprofile")[0]
          .classList.add("adddincompleteprofile");
      }, 700);
      loader[0].classList.remove("addedloader");
    } else {
      let orderarray = d;
      sessionStorage.setItem("accountstatus", "Active");
      document.getElementById("statusbuton").innerHTML = "Active";

      for (let i = 0; i < orderarray.length; i++) {
        let title = orderarray[i].job_title;
        let name = orderarray[i].company_name;
        let city = orderarray[i].city;
        let country = orderarray[i].country;
        let bids = orderarray[i].submits;
        let type = orderarray[i].job_type;
        let pays = orderarray[i].pay.split(",");

        let order_id = orderarray[i].job_id;

        if (type === "Remote contract") {
          src = "/images/self-employed.png";
        } else if (type === "On-site Contract") {
          src = "/images/parttime.png";
        } else if (type === "On-site Permanent") {
          src = "/images/fulltime.png";
        } else if (type === "Remote Temporary") {
          src = "/images/temporary.png";
        } else if (type === "Hybrid Permanent") {
          src = "/images/hybridpermanent.png";
        } else if (type === "Hybrid Contract") {
          src = "/images/hybridtemporary.png";
        }

        let orderlist = document.getElementsByClassName("orderslist")[0];
        var order = document.createElement("div");
        var orderitems = ` <div class="order orderhover">
       <div class="orderinid">${order_id}</div>
       <section class="orderp1">
          
           <h3>${title}</h3>
           <div class="cname">
              <h4 class="ch31"><!-${name}-></h4> 
              <p class="ch32"> ${city},</p>
              <p class="ch32">${country}</p>
           </div>
       
       </section>
       <section class="orderp2">
           <div class="aobids">
               <p class="aop1">${bids}</p>
          <p class="aop2">Submited profiles</p>
          
       
           </div>
           <div class="jtype">
               <img src="${src}" alt="">
               <h4 class="jtypeh4">${type}</h4>
           </div>
           
       </section>
       <section class="orderp3">
           <p class="ordp3p">${pays[0] + pays[1] + pays[2]}</p>
           <button class="orderbutton" id="orderbutton">See Job</button>
           
       
       </section>
       
       
       </div>`;
        order.innerHTML = orderitems;
        orderlist.append(order);
      }
      loader[0].classList.remove("addedloader");
      //here is the code for seeorder
      let buttonclicked = document.getElementsByClassName("orderbutton");
      for (let i = 0; i < buttonclicked.length; i++) {
        let button = buttonclicked[i];
        button.addEventListener("click", (e) => {
          let varbutton = e.target;
          let value =
            varbutton.parentElement.parentElement.firstElementChild.innerHTML;

             sessionStorage.setItem("clickedorderid", value);
            sessionStorage.setItem("seeorderbuttonvalue", "Apply");
          

          window.location.href = "/orderdetails.html";
        });
      }
    }
  });
};

let invitedcount = () => {
  //   let logedid = localStorage.getItem("userloged");
  let logedid = getCookie("userloged");
  let formdata = new FormData();
  formdata.append("logedid", logedid);

  const options = {
    method: "POST",

    body: formdata,
  };
  // https://1ed2-105-231-144-76.ngrok.io/api'

  //https://half-geode-roundworm.glitch.me/api

  let f = fetch(`${baseUrl}/councadinvites`, options).catch((err) => {
    console.log(err);
  });
  f.then((res) => res.json()).then((d) => {
    const {sum} = d;
    let sumdiv = document.querySelector(".invitecount");
    if (sum === 0) {
    } else {
      sumdiv.style.display = "flex";
      sumdiv.innerHTML = sum;
    }
  });
};

let suminter = () => {
  //let logedid = localStorage.getItem("userloged");
  let logedid = getCookie("userloged");
  let formdata = new FormData();
  formdata.append("logedid", logedid);

  const optionWithFormData = {
    method: "POST",

    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "https://enkaare.co",
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

  let f = fetch(`${baseUrl}/suminterr`, optionWithFormData).catch((err) => {
    console.log(err);
  });
  f.then((res) => res.json()).then((d) => {
    const {sum} = d;
    let sumdiv = document.querySelector(".suminter");
    if (sum === 0) {
    } else {
      sumdiv.style.display = "flex";
      sumdiv.innerHTML = sum;
    }
  });
};

let displainterviewslots = () => {
  document
    .getElementsByClassName("intergreter")[0]
    .classList.toggle("addedinter");
  document
    .getElementsByClassName("interview-container")[0]
    .classList.toggle("addedintervconta");

  //   let logedid = localStorage.getItem("userloged");
  let logedid = getCookie("userloged");
  let formdata = new FormData();
  formdata.append("logedid", logedid);

  const optionWithFormData = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "https://enkaare.co",
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

  let f = fetch(`${baseUrl}/callinterviews`, optionWithFormData).catch(
    (err) => {
      console.log(err);
    }
  );

   document.querySelector(".interloader").style.display="flex";

  f.then((res) => res.json()).then((d) => {
    const {nointer} = d;
    
     document.querySelector(".interloader").style.display="none";

    if (nointer) {
      let interviewcontainer = document.getElementsByClassName(
        "interview-container"
      )[0];

      while (interviewcontainer.hasChildNodes()) {
        interviewcontainer.firstChild.remove();
      }

      let content = `<div class="result-container">
        Oops! No result found
    </div>`;
      let div = document.createElement("div");
      div.innerHTML = content;
      interviewcontainer.append(div);
    } else {
      let interviewcontainer = document.getElementsByClassName(
        "interview-container"
      )[0];

      while (interviewcontainer.hasChildNodes()) {
        interviewcontainer.firstChild.remove();
      }

      for (let i = 0; i < d.length; i++) {
        function removeTimezone(dateString) {
          const date = new Date(dateString);
          const options = {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
          };

          // Format the date without timezone information
          const formattedDate = date.toLocaleDateString("en-US", options);

          return formattedDate;
        }

        let div = document.createElement("div");

        let content = `
              <div class="rowscarrier">
                           
              <p class="slotid">${d[i].job_id}</p>
                            <div class="row">
                                
                                <div class="rqjb">
                                  <h3>Job Title</h3>
                                  <p class="rqjpp">
                                      ${d[i].job_title}
                                  </p>
                                </div>
                                <div class="rqjb1">
                                  <h3>Location</h3>
                                  <p class="rqjpp">
                                       ${d[i].city} 
                                  </p>
                                </div>
                              <button class="buttonS view-slots">See Interview Slots <img src="/images/gthanwhite.png" alt="" class="greaterthan"></button>
                          </div>




                          <div class="slots-container">
                            <!-- Pre-written Interview Slots -->
                        
                        </div>





                        </div>`;

        div.innerHTML = content;
        interviewcontainer.append(div);

        let slot_container =
          document.getElementsByClassName("slots-container")[i];

        for (let f = 0; f < d[i].slots.length; f++) {
          function removeTimezone(dateString) {
            const date = new Date(dateString);
            const options = {
              year: "numeric",
              month: "short",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
            };

            // Format the date without timezone information
            const formattedDate = date.toLocaleDateString("en-US", options);

            return formattedDate;
          }

          let div2 = document.createElement("div");
          let content2 = `<div class="slot">
                              <p class="slotid">${d[i].slots[f].slot_id}</p>
                              <span class="endtimest">Start Time: ${removeTimezone(
                                d[i].slots[f].start_time
                              )}</span>
                              <span class="endtimest">End Time:  ${removeTimezone(
                                d[i].slots[f].end_time
                              )}</span>
                              <button class="buttonS select-slot">Select Slot</button>
                          </div>`;

          div2.innerHTML = content2;
          slot_container.append(div2);
        }
      }

      //code to listean to events

      const slotsContainer = document.getElementsByClassName("slots-container");
      const viewSlotsButtons = document.querySelectorAll(".view-slots");
      let greterthan = document.getElementsByClassName("greaterthan");
      let slots = document.getElementsByClassName("slot");

      for (let i = 0; i < viewSlotsButtons.length; i++) {
        let clickedviewslotB = viewSlotsButtons[i];
        clickedviewslotB.addEventListener("click", () => {
          slotsContainer[i].classList.toggle("addedslots-container");
          greterthan[i].classList.toggle("addedgreaterthan");
        });
      }

      for (let i = 0; i < slots.length; i++) {
        let clickedslots = slots[i];

        clickedslots.addEventListener("click", () => {
          let slotid = clickedslots.firstElementChild.innerHTML;
          let jbId =
            clickedslots.parentElement.parentElement.parentElement
              .firstElementChild.innerHTML;

          let slotparent = clickedslots;
          const startTime = slotparent
            .querySelector("span:nth-child(2)")
            .textContent.trim();
          const endTime = slotparent
            .querySelector("span:nth-child(3)")
            .textContent.trim();
            
          //   let logedid = localStorage.getItem("userloged");
          let logedid = getCookie("userloged");
          let formdata = new FormData();
          formdata.append("logedid", logedid);
          formdata.append("slot_id", slotid);
          formdata.append("job_id", jbId);

          const optionWithFormData = {
            method: "POST",
            headers: {
              "Access-Control-Allow-Credentials": true,
              "Access-Control-Allow-Origin": "https://enkaare.co",
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

          let f = fetch(`${baseUrl}/selectslot`, optionWithFormData).catch(
            (err) => {
              console.log(err);
            }
          );
          document.querySelector(".interloader").style.display = "flex";
          f.then((res) => res.json())
            .then((d) => {
              document.querySelector(".interloader").style.display = "none";
              const {sent} = d;
              if (sent) {
                clickedslots.parentElement.parentElement.parentElement.remove();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        });
      }
    }
  });
};

function invitedorders() {
  let thelist = document.querySelector(".orderslist");

  while (thelist.hasChildNodes()) {
    thelist.firstChild.remove();
  }
  let all = document.querySelector("#h3all");
  let invite = document.querySelector("#h3invite");
  invite.style.borderBottom = "3px solid hsl(188,47%,20%)";
  all.style.borderBottom = "3px solid transparent";

  let loader = document.getElementsByClassName("loader");

  //   let firstnmae = localStorage.getItem("pfname");
  //   let logedid = localStorage.getItem("userloged");
  let firstnmae = getCookie("pfname");
  let logedid = getCookie("userloged");

  const formdata = new FormData();

  formdata.append("firstname", firstnmae);
  formdata.append("logedid", logedid);

     const options = {
       method: "POST",
      headers: {
         "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "https://enkaare.co",
       "Access-Control-Allow-Headers":
         "Origin, X-Requested-With, Content-Type, Accept, authorization",
       "Access-Control-Allow-Methods": "POST",
       withCredentials: true,
      },
      credentials: "include",

       body: formdata,
     };
  

  let f = fetch(`${baseUrl}/cinvites`, options).catch((err) => {});
  loader[0].classList.add("addedloader");

  f.then((res) => res.json()).then((d) => {
    let orderarray = d;
    


    if (d.length === 0) {
      let orderlist = document.getElementsByClassName("orderslist")[0];
      var order = document.createElement("div");
      var orderitems = `<div class="empty-message">
      <img id="empty-icon" src="/images/empty-folder.png" alt="empty-folder">
          <div class="empty-text">Oops! No Results Found</div>
          `;
      order.innerHTML = orderitems;
      orderlist.append(order);
    }

    for (let i = 0; i < orderarray.length; i++) {
      let title = orderarray[i].job_title;
      let name = orderarray[i].company_name;
      let city = orderarray[i].city;
      let country = orderarray[i].country;
      let bids = orderarray[i].submits;
      let type = orderarray[i].job_type;
      let pays = orderarray[i].pay.split(",");

      let order_id = orderarray[i].job_id;

      if (type === "Remote contract") {
        src = "/images/self-employed.png";
      } else if (type === "On-site Contract") {
        src = "/images/parttime.png";
      } else if (type === "On-site Permanent") {
        src = "/images/fulltime.png";
      } else if (type === "Remote Temporary") {
        src = "/images/temporary.png";
      } else if (type === "Hybrid Permanent") {
        src = "/images/hybridpermanent.png";
      } else if (type === "Hybrid Contract") {
        src = "/images/hybridtemporary.png";
      }

      let orderlist = document.getElementsByClassName("orderslist")[0];
      var order = document.createElement("div");
      var orderitems = ` <div class="order orderhover">
          <div class="orderinid">${order_id}</div>
          <section class="orderp1">
             
              <h3>${title}</h3>
              <div class="cname">
                 <h4 class="ch31"><!-${name}_></h4> 
                 <p class="ch32"> ${city},</p>
                 <p class="ch32">${country}</p>
              </div>
          
          </section>
          <section class="orderp2">
              <div class="aobids">
                  <p class="aop1">${bids}</p>
             <p class="aop2">Submited profiles</p>
             
          
              </div>
              <div class="jtype">
                  <img src="${src}" alt="">
                  <h4 class="jtypeh4">${type}</h4>
              </div>
              
          </section>
          <section class="orderp3">
              <p class="ordp3p">${pays[0] + pays[1] + pays[2]}</p>
              <button class="orderbutton" id="orderbutton">See Job</button>
              
          
          </section>
          
          
          </div>`;
      order.innerHTML = orderitems;
      orderlist.append(order);
    }
    loader[0].classList.remove("addedloader");
    //here is the code for seeorder
    let buttonclicked = document.getElementsByClassName("orderbutton");
    for (let i = 0; i < buttonclicked.length; i++) {
      let button = buttonclicked[i];
      button.addEventListener("click", (e) => {
        let varbutton = e.target;
        let value =
          varbutton.parentElement.parentElement.firstElementChild.innerHTML;

        sessionStorage.setItem("clickedorderid", value);
         sessionStorage.setItem("seeorderbuttonvalue", "Accept");
        
        window.location.href = "/orderdetails.html";
      });
    }
  });
}

let incompltepopmes = () => {
  document
    .getElementsByClassName("incompleteprofile")[0]
    .classList.remove("adddincompleteprofile");
};

/*PROFILE JS START HERE*/

let displaypoptions =()=>{
  try {
     document.getElementsByClassName("incompleteprofile")[0].classList.remove("adddincompleteprofile");
  } catch (error) {
     
  }
 
 let poptions = document.getElementsByClassName("poptions");
 poptions[0].classList.add("addpoptions");
 }
 let hidepoptions=()=>{
    let poptions = document.getElementsByClassName("poptions");
 poptions[0].classList.remove("addpoptions");
 }
 
 let experincesarray=[];


 
 let profload =()=>{
    let loader1 =document.getElementsByClassName("loader1");
    let loader =document.getElementsByClassName("loader");
   // let userid=localStorage.getItem("userloged");
   // let firstn=localStorage.getItem("pfname");
    let userid=getCookie("userloged");
    let firstn=getCookie("pfname");
 
    let formdata=new FormData();
 
    formdata.append("first_name",firstn);
    formdata.append("user_id",userid);
 
   const options={
       method: 'POST',
       headers:{
         "Acces-Control-Allow-Credentials":true,
         "Access-Control-Allow-Origin": "https://enkaare.co",
         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, authorization",
         "Access-Control-Allow-Methods": "POST",
            withCredentials:true
    
        },
       credentials: 'include',
    
                       
        body: formdata
   }
 
   let f=fetch("https://yielding-dented-amusement.glitch.me/candidateprofile",options).catch(err=>{
    console.log(err);
   });
   loader[0].classList.add("addedloader");
 
    
   f.then(res=>res.json()).then(d=>{
 
 
    
 
    
    
    const{first_name,last_name,country,no_complete,user_id}=d[1]
    if(no_complete){
 
     try {
         if(d[0].file==="noprofilepic"){
 
         }else{
          const imageex="data:image/png;base64,";
          let ppimage=document.getElementsByClassName("pp");
          ppimage[0].style.backgroundImage=`url('${imageex+d[0].file}')`
         }
         
         
     } catch (error) {
         console.log(err)
     }
 
     
        let firstname = document.getElementById("nh21");
    let secondname = document.getElementById("nh22");
    let location = document.getElementById("location");
    let id = document.getElementById("id");
 
    id.innerHTML=user_id;
 
    firstname.innerHTML=first_name;
    secondname.innerHTML=last_name;
    location.innerHTML=country;
 
 
    loader[0].classList.remove("addedloader");
 
    }  else if(d.length>2){
     try {
         if(d[0].file==="noprofilepic"){
 
         }else{
          const imageex="data:image/png;base64,";
          let ppimage=document.getElementsByClassName("pp");
          ppimage[0].style.backgroundImage=`url('${imageex+d[0].file}')`
         }
     } catch (error) {
         
     }
     let payr=d[1].pay_rate.split(',');
 
     let id = document.getElementById("id");
     let firstname = document.getElementById("nh21");
     let secondname = document.getElementById("nh22");
     let jobtitle = document.getElementById("jtitle");
     let payrate = document.getElementById("payrate");
     let payrate1 = document.getElementById("payrate1");
 
    
     let location = document.getElementById("location");
     let  experience = document.getElementById("experience");
     let aboutme = document.getElementById("abme");
     let workh = document.getElementById("workh");

     let locationp =document.getElementsByClassName("plocation");
     let experiencep =document.getElementsByClassName("experiencep");
     let workh2 = document.getElementsByClassName("workh");
    
     id.innerHTML=userid;
     firstname.innerHTML=d[1].first_name;
     secondname.innerHTML=d[1].last_name;
     jobtitle.innerHTML=d[1].professional_title;
     payrate.innerHTML=payr[0]+payr[1]+"/h";
     payrate1.innerHTML=payr[0]+payr[1]+"/hour";
 
     locationp[0].innerHTML=d[1].city + "," + d[1].country;
     experiencep[0].innerHTML= d[1].experience_in_years + " years";
     location.innerHTML=d[1].city+", "+d[1].country;
     experience.innerHTML=d[1].experience_in_years +" years";
     aboutme.innerHTML=d[1].about;
     workh.innerHTML=d[1].availability;
     workh2[0].innerHTML = d[1].availability;
 
 
 
 
     let jobexperience=document.getElementsByClassName("experience")[0];
     
     loader[0].classList.remove("addedloader");
   
     for(let i=0;i<d[2].length;i++){
       positiont=d[2][i].job_title;
       start=d[2][i].start_date;
       end=d[2][i].end_date;
       cname=d[2][i].company_name;
       summary=d[2][i].achievement;
   
   
   
       var expecarrier = document.createElement('div');
      var expeitems=`<div class="expecarrier">
      <h3 id="expech3">${positiont}</h3>
      <p id="expecp">${start}-${end}</p>
      <h3 id="expech31">${cname}</h3>
      <p class="expeplast">${summary}</p>
   
   
   </div>`
   
   expecarrier.innerHTML= expeitems;
   jobexperience.append(expecarrier);
     }
 
 
    }/*else{
        let payr=d[0].pay_rate.split(',');
 
    
       
        
      
         let id = document.getElementById("id");
         let firstname = document.getElementById("nh21");
         let secondname = document.getElementById("nh22");
         let jobtitle = document.getElementById("jtitle");
         let payrate = document.getElementById("payrate");
         let payrate1 = document.getElementById("payrate1");
     
        
         let location = document.getElementById("location");
         let  experience = document.getElementById("experience");
         let aboutme = document.getElementById("abme");
         let workh = document.getElementById("workh");
        
         id.innerHTML=userid;
         firstname.innerHTML=d[0].first_name;
         secondname.innerHTML=d[0].last_name;
         jobtitle.innerHTML=d[0].professional_title;
         payrate.innerHTML=payr[0]+payr[1]+"/h";
         payrate1.innerHTML=payr[0]+payr[1]+"/hour";
     
        
         location.innerHTML=d[0].city+","+d[0].country;
         experience.innerHTML=d[0].experience_in_years +" years";
         aboutme.innerHTML=d[0].about;
         workh.innerHTML=d[0].availability;
     
     
     
     
         let jobexperience=document.getElementsByClassName("experience")[0];
         
     
       
         for(let i=0;i<d[2].length;i++){
           positiont=d[2][i].job_title;
           start=d[2][i].start_date;
           end=d[2][i].end_date;
           cname=d[2][i].company_name;
           summary=d[2][i].achievement;
       
       
       
           var expecarrier = document.createElement('div');
          var expeitems=`<div class="expecarrier">
          <h3 id="expech3">${positiont}</h3>
          <p id="expecp">${start}-${end}</p>
          <h3 id="expech31">${cname}</h3>
          <p class="expeplast">${summary}</p>
       
       
       </div>`
       
       expecarrier.innerHTML= expeitems;
       jobexperience.append(expecarrier);
         }
    }
 
 
 
   
 */
 
   });
 
  
 
 const WIDTH=150;
 let input =document.getElementById("input");
 input.addEventListener('change',(e)=>{
    let image_file=e.target.files[0]
    let reader= new FileReader()
    reader.readAsDataURL(image_file);
 
   
    
    reader.onload=(e)=>{
        let image_url=e.target.result;
       
        let image=document.createElement("img");
        image.src=image_url;
 
        image.onload=(e)=>{
            let canvas=document.createElement("canvas");
            let ratio=WIDTH/e.target.width;
            canvas.width=WIDTH;
            canvas.height=e.target.height*ratio;
 
            const context=canvas.getContext("2d");
            context.drawImage(image,0,0,canvas.width,canvas.height);
 
            let new_url=context.canvas.toDataURL("image/jpg",100);
            let new_image=document.createElement("img");
            new_image.src=new_url;
 
            /*console.log(new_url);*/
           /* document.getElementsByClassName("wrapper")[0].style.backgroundImage=`url(${image_url})`*/
 
        urltoFile(new_url);
 
 
        }
 
       // document.getElementsByClassName("wrapper")[0].style.backgroundImage=`url(${image_url})`
    }
 });
 let urltoFile=(url)=>{
    let arr=url.split(",");
    let name=arr[0].match(/:(.*?);/)[1];
    let data=arr[1];
 
    let todString= atob(data);
    let n=todString.length;
    let dataarr= new Uint8Array(n);
    while(n--){
        dataarr[n]=todString.charCodeAt(n)
    }
    //let useid=localStorage.getItem("userloged");
    let useid=getCookie("userloged");
    let firstname=getCookie("pfname");
   // let firstname=localStorage.getItem("pfname");
   
    let file=new File([dataarr],firstname+useid+'.png',{type:name});
    
 
 
 
    let formdata=new FormData();
    formdata.append("file",file);
    formdata.append("user_id",useid);
 
 
    const options={
        method:"POST",
 
        headers:{
         "Acces-Control-Allow-Credentials":true,
         "Access-Control-Allow-Origin": "https://enkaare.co",
         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, authorization",
         "Access-Control-Allow-Methods": "POST",
            withCredentials:true
    
        },
       credentials: 'include',
    
        body:formdata
    }
 
    let f=fetch("https://yielding-dented-amusement.glitch.me/imageupload",options).catch(err=>{
        console.log(err);
    })
 
    f.then(res=>res.json()).then(d=>{
        const{file}=d;
 
    
 
 
       let datatype="data:image/png;base64,"
       let imageurl=datatype+file;
 
       document.getElementsByClassName("wrapper")[0].style.backgroundImage=`url(${imageurl})`
 
 
    })
    //here is where you will upload your profile picture
 
 
 }
 
 let form=document.getElementById("eeditform");
 
 form.addEventListener('submit',(e)=>{
    e.preventDefault();
    
    let scrolldiv=document.getElementById("profileedit");
 
    let fname=document.getElementById("efirstname");
    let lnamme=document.getElementById("esecondname");
    let ptitle =document.getElementById("etitle");
    let avail=document.getElementById("eavailability");
    let countr=document.getElementById("ecountry");
    let ecity=document.getElementById("ecity");
    let currency=document.getElementById("ecurrency");
    let pae=document.getElementById("epay");
    let achive=document.getElementById("eabout");
    let years_experience=document.getElementById("eexperinence")
 
    if(avail.value===""){
        avail.style.border="1px solid red";
        scrolldiv.scroll({
            top:0,
            behavior:"smooth"
        });
    }else if(countr.value===""){
        countr.style.border="1px solid red";
        scrolldiv.scroll({
            top:0,
            behavior:"smooth"
        });
    }else if(currency.value===""){
        currency.style.border="1px solid red";
        scrolldiv.scroll({
            top:0,
            behavior:"smooth"
        });
    }else{
        
        let formdata= new FormData();
        let id=getCookie("userloged");
        //let id=localStorage.getItem("userloged");
        formdata.append("user_id",id);
        formdata.append("firstname",fname.value);
        formdata.append("secondname",lnamme.value);
        formdata.append("professional_title",ptitle.value);
        formdata.append("country",countr.value);
        formdata.append("city",ecity.value);
        formdata.append("pay_rate",currency.value+","+pae.value);
        formdata.append("about",achive.value);
        formdata.append("avilability",avail.value);
        formdata.append("years_experience",years_experience.value)
 
        formdata.append("experience",JSON.stringify(experincesarray));

        
     
 
        const options={
            method:'POST',
            headers:{
             "Acces-Control-Allow-Credentials":true,
             "Access-Control-Allow-Origin": "https://enkaare.co",
             "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, authorization",
             "Access-Control-Allow-Methods": "POST",
                withCredentials:true
        
            },
           credentials: 'include',
        
            body:formdata
        }
 
        let f=fetch("https://yielding-dented-amusement.glitch.me/editcp",options).catch(err=>{
            console.log(err)
        })
        
        document.getElementsByClassName("editpload")[0].style.display="flex";
        
    f.then(res=>res.json()).then(d=>{
        const{sucess}=d;
        if(sucess){
         document.getElementsByClassName("editpload")[0].style.display="none";
            form.reset()
            location.reload()
        }
    }).catch(err=>{
        console.log(err);
    })
 
    }
 
    
    
 })
 
 
 }
 let profileeditbutton=()=>{
    let loader1 =document.getElementsByClassName("loader1");
    let editpage=document.getElementsByClassName("profileedit");
 
 
 editpage[0].classList.add("addedprofileedit");
 let theid =getCookie("userloged");
 //let theid =localStorage.getItem("userloged");
 let formdata = new FormData();
 
 formdata.append("user_id",theid)
 
 const options={
    method:"POST",
    headers:{
     "Acces-Control-Allow-Credentials":true,
     "Access-Control-Allow-Origin": "https://enkaare.co",
     "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, authorization",
     "Access-Control-Allow-Methods": "POST",
        withCredentials:true
 
    },
   credentials: 'include',
 
    
 
    body:formdata
 }
 
 let f=fetch("https://yielding-dented-amusement.glitch.me/geteditdata",options).catch(err=>{
    console.log(err);
 })
 
 document.getElementsByClassName("editpload")[0].style.display="flex";
 
 
 
 f.then(res=>res.json()).then(d=>{
    const{user_id,first_name,last_name,country,no_complete}=d[1];
   
 
 
 
 
   
    if(no_complete){
     try {
         if(d[0].file==="noprofilepic"){
     
         }else{
          const imageex="data:image/png;base64,";
          let ppimage=document.getElementsByClassName("wrapper");
          ppimage[0].style.backgroundImage=`url('${imageex+d[0].file}')`
         }
     } catch (error) {
         console.log(error)
     }
     
        let fname=document.getElementById("efirstname");
        let lnamme=document.getElementById("esecondname"); 
        let countr=document.getElementById("ecountry");
 
        fname.value=first_name;
        lnamme.value=last_name;
        countr.value=country;
 
        document.getElementsByClassName("editpload")[0].style.display="none";
        
 
    }else if(d.length>2){
      try {
        
 
     if(d[0].file==="noprofilepic"){
 
     }else{
      const imageex="data:image/png;base64,";
      let ppimage=document.getElementsByClassName("wrapper");
      ppimage[0].style.backgroundImage=`url('${imageex+d[0].file}')`
     } 
      } catch (error) {
         console.log(error)
      }
 
 
     let payr=d[1].pay_rate.split(',');
 
        let fname=document.getElementById("efirstname");
        let lnamme=document.getElementById("esecondname");
        let ptitle =document.getElementById("etitle");
        let avail=document.getElementById("eavailability");
        let countr=document.getElementById("ecountry");
        let ecity=document.getElementById("ecity");
        let currency=document.getElementById("ecurrency");
        let pae=document.getElementById("epay");
        let achive=document.getElementById("eabout");
        let years_experience=document.getElementById("eexperinence");
 
        fname.value=d[1].first_name;
        lnamme.value=d[1].last_name;
        ptitle.value=d[1].professional_title;
        avail.value=d[1].availability;
        countr.value=d[1].country;
        ecity.value=d[1].city;
        currency.value=payr[0];
        pae.value=payr[1];
        achive.value=d[1].about;
 
        years_experience.value=d[1].experience_in_years;
        experincesarray.length = 0;
 
 
        experincesarray=experincesarray.concat(d[2]);
 
        document.getElementsByClassName("editpload")[0].style.display="none";
 
        let carrier =document.getElementsByClassName("eexperiencedisplay")[0];
        let ex=document.getElementById("eexperiencedisplay")
        while(ex.hasChildNodes()){
            ex.firstChild.remove()
        }
        for(let i=0;i<experincesarray.length;i++){
           let id=experincesarray[i].experience_id;
           let compn=experincesarray[i].company_name;
           let jbt=experincesarray[i].job_title;
           let stdat=experincesarray[i].start_date;
           let eddate=experincesarray[i].end_date;
           let contry=experincesarray[i].country;
           let state=experincesarray[i].state;
           let city=experincesarray[i].city;
           let achive=experincesarray[i].achievement;
           
          
 
           let contediv=document.createElement('div');
           let conte=`<div class="eexpecarrier">
           <div class="eojectid">${id}</div>
           <span class="eecancelb">&#x2715;</span>
           <h3 id="eexpech3">${jbt}</h3>
           
           <p class="eexpecp">${contry+" "+state+" "+city}</p>
           <p class="eexpecp">${stdat+"-"+eddate}</p>
           <h3 id="eexpech31">${compn}</h3>
           <p class="expeplast">${achive}</p>
                 
 
 
       </div>`;
 
       contediv.innerHTML=conte;
       carrier.append(contediv);
        }
 
        listeancancelB()
 
 
 
    }
 
 })
 
 
 
 }
 
 let profileeditcancel=()=>{
    let editpage=document.getElementsByClassName("profileedit");
 editpage[0].classList.remove("addedprofileedit");
 }
 
 let adexperience=()=>{
    let wholecarrier=document.getElementById("expe1");
    let ejbtitle=document.getElementById("role");
    let ecompanyname=document.getElementById("ecompany");
    let startdate=document.getElementById("smonthYearInput");
    let enddate=document.getElementById("emonthYearInput");
    let country=document.getElementById("eecountry");
    let state=document.getElementById("eestate");
    let city=document.getElementById("eecity");
    let achivements=document.getElementById("eesumarry");
    let satartdinavalid=document.getElementsByClassName("dateivalid");
    let dcarrier=document.getElementsByClassName("sadindiv");
 
    
    var monthYearPattern = /^(0[1-9]|1[0-2])\/\d{4}$/;
    if(ecompanyname.value===""){
       
        ecompanyname.style.borderBottom="1px solid red"
        
        
    }else  if(ejbtitle.value===""){
        ejbtitle.style.borderBottom="1px solid red";
    }else 
 
        if (!monthYearPattern.test(startdate.value)) {
            satartdinavalid[0].style.display="block";
            dcarrier[0].style.borderBottom="1px solid red";
            
            
            wholecarrier.scroll({
                top:0,
                behavior:"smooth"
            });
          } else if (!monthYearPattern.test(enddate.value)) {
            satartdinavalid[1].style.display="block";
            dcarrier[1].style.borderBottom="1px solid red";
            
            wholecarrier.scroll({
                top:0,
                behavior:"smooth"
            });
 
          } else if(country.value===""){
            country.style.borderBottom="1px solid red";
        }else if(state.value===""){
            state.style.borderBottom="1px solid red";
        }else if(city.value===""){
            city.style.borderBottom="1px solid red";
        }else if(achivements.value===""){
            achivements.style.border="1px solid red";
            wholecarrier.scroll({
                top:wholecarrier.scrollHeight,
                behavior: "smooth"
            });
        }else{
 
            var randomstring =""
                randomstring+= Math.random();
 
            let expeobject={
                experience_id:randomstring,
                company_name:ecompanyname.value,
                job_title:ejbtitle.value,
                start_date:startdate.value,
                end_date:enddate.value,
                country:country.value,
                state:state.value,
                city:city.value,
                achievement:achivements.value
            }
 
            
 
        
            experincesarray.push(expeobject);


           ecompanyname.value="";
            ejbtitle.value="";
            startdate.value="";
            enddate.value="";
            country.value="";
            state.value="";
            city.value="";
            achivements.value="";
         let carrier =document.getElementsByClassName("eexperiencedisplay")[0];
         let ex=document.getElementById("eexperiencedisplay")
    while(ex.hasChildNodes()){
        ex.firstChild.remove()
    }
         for(let i=0;i<experincesarray.length;i++){
            let id=experincesarray[i].experience_id;
            let compn=experincesarray[i].company_name;
            let jbt=experincesarray[i].job_title;
            let stdat=experincesarray[i].start_date;
            let eddate=experincesarray[i].end_date;
            let contry=experincesarray[i].country;
            let state=experincesarray[i].state;
            let city=experincesarray[i].city;
            let achive=experincesarray[i].achievement;
            
 
            let contediv=document.createElement('div');
            let conte=`<div class="eexpecarrier">
            <div class="eojectid">${id}</div>
            <span class="eecancelb">&#x2715;</span>
            <h3 id="eexpech3">${jbt}</h3>
            
            <p class="eexpecp">${contry+" "+state+" "+city}</p>
            <p class="eexpecp">${stdat+"-"+eddate}</p>
            <h3 id="eexpech31">${compn}</h3>
            <p class="expeplast">${achive}</p>
                  
 
 
        </div>`;
 
        contediv.innerHTML=conte;
        carrier.append(contediv);
         }
        
         listeancancelB()
         
            
        }
   
    
       
 
    
 }

// Functionlisten to cancel button on the experience windows at the bottom of the edit page
 function listeancancelB(){
  let expecancel =document.getElementsByClassName("eecancelb");
        
 
  for(let i=0;i<expecancel.length;i++){
      let clickedelement=expecancel[i]
      clickedelement.addEventListener('click',()=>{

        
          let objectid=clickedelement.parentElement.children[0].innerHTML;

         
          
          const index = experincesarray.findIndex(object => {
              return String(object.experience_id)=== objectid;
            })
            
            
            experincesarray.splice(index,1);
            clickedelement.parentElement.remove();
            
      });
  }
 }
 
 let editpartinput_reset=()=>{
    let currency=document.getElementById("ecurrency");
    let avail=document.getElementById("eavailability");
    let countr=document.getElementById("ecountry");
    let ejbtitle=document.getElementById("role");
    let companyname=document.getElementById("ecompany");
    let startdate=document.getElementById("smonthYearInput");
    let enddate=document.getElementById("emonthYearInput");
    let country=document.getElementById("eecountry");
    let state=document.getElementById("eestate");
    let city=document.getElementById("eecity");
    let achivements=document.getElementById("eesumarry");
    let satartdinavalid=document.getElementsByClassName("dateivalid");
    let dcarrier=document.getElementsByClassName("sadindiv");
 
 
        satartdinavalid[0].style.display="none";
        dcarrier[0].style.borderBottom="1px solid hsla(4,0%,0%,0.5)";
        satartdinavalid[1].style.display="none";
        dcarrier[1].style.borderBottom="1px solid hsla(4,0%,0%,0.5)";
        companyname.style.borderBottom="1px solid hsla(4,0%,0%,0.5)";
        ejbtitle.style.borderBottom="1px solid hsla(4,0%,0%,0.5)";
        country.style.borderBottom="1px solid hsla(4,0%,0%,0.5)";
        state.style.borderBottom="1px solid hsla(4,0%,0%,0.5)";
        city.style.borderBottom="1px solid hsla(4,0%,0%,0.5)";
        achivements.style.border="1px solid hsla(4,0%,0%,0.5)";
        
        countr.style.border="1px solid hsla(4,0%,0%,0.5)";
        currency.style.border="1px solid hsla(4,0%,0%,0.5)";
        avail.style.border="1px solid hsla(4,0%,0%,0.5)";
 
 }
 
 
    
 
 /*MESSENGER START HERE*/
 let mainchats_count=document.getElementById("ac");
 let main_message_box= document.getElementsByClassName("message");
 let message_thread_container=document.getElementById("messagethreads");
 let messageh=document.getElementById("messageheeader");
 let thcontainer=document.getElementsByClassName("messagethreads");
 let real_thread=document.getElementsByClassName("thread");
 let wholechatscarrier=document.getElementById("wholemescontainer");
 
 
 let chats=()=>{
    
 message_thread_container.style.display="block";
 wholechatscarrier.style.display="none";
 
 messageh.innerHTML="Chats!"
 
 
 
  main_message_box[0].classList.add("addmessage");
  let message_p_icon=document.getElementById("mesimg");
  let threads=[
    {message_id:"0001",
     sender_name:"Karanja G",
     message_body:"Im a software developer and i Im a software developer and i love what i do i cant think of something else  that would make me",
     sender_prof:"url('/images/financial-manager-job-description-4000x2667-20201114.jpeg')",
     message_state:"new",
     thread_id:"karg",
     time_stamp:"8:40pm",
     count:2
     
    },
    {message_id:"0002",
    sender_name:"Samantha K",
    message_body:"This is a second thread a trial on threads functionality",
    sender_prof:"url('/images/model-g07596919e_1280.jpg')",
    message_state:"new",
    time_stamp:"9:30pm",
    thread_id:"samk",
    count:1
    
   },
   {message_id:"0003",
   sender_name:"Kato M",
   message_body:"This is a third thread a trial on threads functionality",
   sender_prof:"url('/images/mentor-ga06c0b8e3_1280.jpg')",
   message_state:"new",
   thread_id:"katm",
   time_stamp:"2:15am",
   count:4
   
  }
  ,
  {message_id:"0004",
  sender_name:"Support",
  message_body:"What is wrong with your order?",
  sender_prof:"url('/images/mentor-ga06c0b8e3_1280.jpg')",
  message_state:"new",
  thread_id:"support",
  time_stamp:"2:15am",
  count:4
  
 }
 ];
 
 if(real_thread.length>0){
   
 
    for(let i=0;i<threads.length;i++){
      
        real_thread[0].remove();
        
    }
   
 }
 
 
 
 for(let i=0; i<threads.length;i++){
 
    let name=threads[i].sender_name;
    let time=threads[i].time_stamp;
    let message=threads[i].message_body.slice(0,30);
    let count=threads[i].count;
    let thrid=threads[i].thread_id
    var threadc=document.createElement('div');
    var mesthreads=document.getElementsByClassName("messagethreads")[0];
  
  
    let thread_content=` <div class="thread">
    <section class="imgpart">
    <p class="messagethreadid">${thrid}</p>
 
        <section class="mesimg" id="mesimg">
   
        </section>
     </section>
     <section class="namemes">
        <p class="mesp" id="mesp">${name}</p>
        <p id="threadp2">${message+"...."}</p>
   
     </section>
     <section class="times">
         <div class="threadnoti">
         ${count}
   
         </div>
         <p class="thtimestamp">
         ${time}
         </p>
     </section>
   </div>`;
  
 threadc.innerHTML=thread_content;
 mesthreads.append(threadc);
 let sender_ppicture=document.getElementById("mesimg");
 sender_ppicture.style.backgroundImage= threads[i].sender_prof;
 
 
 
 }
 
 
 let threaddiv=document.getElementsByClassName("thread");
 
 for(var i=0; i<threaddiv.length;i++){
  let clickedthread=threaddiv[i];
  clickedthread.addEventListener('click',()=>{
    let clickedthread_id=clickedthread.firstElementChild.firstElementChild.innerHTML;
   let thread_name=clickedthread.children[1].children[0].innerHTML;
   
    chatbox(clickedthread_id,thread_name);
 
   message_thread_container.style.display="none";
 
  })
   
 }
 
 }
 
 
 let messageboxdis=()=>{
    main_message_box[0].classList.remove("addmessage");
 
 }
 
 let chatbox=(letcaht_id,name)=>{
   wholechatscarrier.style.display="block";
   
   let p_iname=document.getElementById("mesp1");
   p_iname.innerHTML=name; 
 
 
    let karg =[
        {
            message_id:1003,
            message_type:"send",
            time_stamp:"8:30pm",
            body:"I would be more than happy if i get the opportunity to work with you"
        },
        {
            message_id:1003,
            message_type:"receive",
            time_stamp:"5:40pm",
            body:"This sounds great what is your qulifications?"
        }
 
    ];
    let samk =[
        {
            message_id:103,
            message_type:"send",
            time_stamp:"1:30am",
            body:"Im a software developer and i Im a software developer and i love what i do i cant think of something else  that would make me "
        },
        {
            message_id:1003,
            message_type:"receive",
            time_stamp:"12:00pm",
            body:"it was great learning about you "
        } 
    ]
 
    let katm =[
        {
            message_id:1003,
            message_type:"send",
            time_stamp:"2:30am",
            body:"Im looking to be hired in a position of nurse administration"
        },
        {
            message_id:1003,
            message_type:"receive",
            time_stamp:"8:30pm",
            body:"wow wonderful to hear that for how long have you been a software developer "
        }
    ];
 
    let support=[
        {
            message_id:10001,
            message_type:"send",
            time_stamp:"2:30am",
            body:"I want help with order 4007"
        },
        {
            message_id:1003,
            message_type:"receive",
            time_stamp:"8:30pm",
            body:"What's wrong with the otrder?"
        }
    ]
 
    
    let messagesarray=[];
    if(letcaht_id==="karg"){
        messagesarray.length=0;
        messagesarray=messagesarray.concat(karg);
        
    }else if(letcaht_id==="katm"){
        messagesarray.length=0;
        messagesarray=messagesarray.concat(katm);
       
 
    }else if(letcaht_id==="samk"){
        messagesarray.length=0;
        messagesarray=messagesarray.concat(samk);
       
 
    }else if(letcaht_id==="support"){
        messagesarray.length=0;
        messagesarray=messagesarray.concat(support);
       
 
    }
   
 
  //extra removecodes
  let car=document.getElementById("messagecarrier");
  while(car.hasChildNodes()){
   car.firstChild.remove()
  }
 
 
 
    for(let i=0;i<messagesarray.length;i++){
       
        let type=messagesarray[i].message_type;
        let ts=messagesarray[i].time_stamp;
        let mbody=messagesarray[i].body;
 
 
        let chatscarrier= document.getElementsByClassName("messagecarrier")[0];
        let messdiv=document.createElement('div');
        let mess_content;
        if(type==="send"){
           
            mess_content=`<div class="sendmessage">
            <p class="sendmp">${mbody}</p>
            <p class="timefmp sendstyle">${ts}</p>
           
               </div>`;
        }else if(type==="receive"){
 
            mess_content=`<div class="receivemessage">
            <p class="receivmp">${mbody}</p>
            <p class="timefmp restyle">${ts}</p>
               </div>`;
    
        }
        
        messdiv.innerHTML=mess_content;
        chatscarrier.append(messdiv);
    }
 
   
       
 }
 
 
 
 let sendb=()=>{
    let form =document.getElementById("form");
    form.addEventListener('submit',(e)=>{
        e.preventDefault();
        let text=document.getElementById("text");
        const tstamp=new Date().toLocaleString('en-US',{hour:'numeric',minute:'numeric',hour12:true});
        let chatscarrier= document.getElementsByClassName("messagecarrier")[0];
        let messdiv=document.createElement('div');
    
        let  mess_content=`<div class="sendmessage">
        <p class="sendmp">${text.value}</p>
        <p class="timefmp sendstyle">${tstamp}</p>
       
           </div>`;
           messdiv.innerHTML=mess_content;
            chatscarrier.append(messdiv);
       
        form.reset()
    });
 }
 
 let support=(id,nam)=>{
  messageh.innerHTML="Hey!<br>How can we help you?";
    main_message_box[0].classList.add("addmessage");
    message_thread_container.style.display="none";
    chatbox(id,nam);
 }
 
 
 
 //NOTIFICATIONS JAVASCRIPT START HERE
 let notiload=()=>{
    let noticarrier= document.getElementsByClassName("noticarrier")[0];
    let notiarray=[
        {noti_id:1003,
        noti_title:"Job",
        order_id:98989,
        body:"application has been accepted.",
        time_stamp:"Feb 24, 2022, 4:11 PM",
        img_type:"/images/customer-service.png"
 
        },
        {noti_id:1003,
            noti_title:"Job",
            order_id:98989,
            body:"application has been accepted.",
            time_stamp:"Feb 24, 2022, 4:11 PM",
            img_type:"/images/customer-service.png"
    
            },
            {noti_id:1003,
                noti_title:"Job",
                order_id:98989,
                body:"application has been accepted.",
                time_stamp:"Feb 24, 2022, 4:11 PM",
                img_type:"/images/customer-service.png"
        
                }
    ];
    for(let i=0;i<notiarray.length;i++){
        let noti_t=notiarray[i].noti_title;
        let  order_id=notiarray[i].order_id;
        let body=notiarray[i].body;
        let tms=notiarray[i].time_stamp;
        let noti_icon=notiarray[i].img_type;
 
        let noticontent=`<div class="noti">
        <section class="notimage">
      <img src="${noti_icon}" alt="">
        </section>
        <section class="notip">
           <p>${noti_t} <span class="notiid">${order_id} </span>${body}</p>
        </section>
        <section class="timestamp">
            <p>${tms}
            </p>
        </section>
 
    </div>`
 
 
    let notidiv=document.createElement('div');
    notidiv.innerHTML=noticontent;
    noticarrier.append(notidiv)
    }
 
 
   
 
 }
 
 
 /*ORDERS DETAILS START HERE*/
 
 let orderdetails=(order_id)=>{
    let loader =document.getElementsByClassName("loader");
    ;
   
    let jbid= sessionStorage.getItem("clickedorderid");
  
 
    let jobtitle=document.getElementById("odh6");
    let name=document.getElementById("odp");
    let city=document.getElementById("citysta");
    let country=document.getElementById("countrysta");
    let time_posted=document.getElementById("postedt");
    let pay_rate=document.getElementById("payrate");
    let benefits=document.getElementById("benefits");
    let type=document.getElementById("ttype");
    let about=document.getElementById("aboutj");
    let responsibilities=document.getElementById("tasksres");
    let poster =document.getElementsByClassName("postername");
    let depart=document.getElementsByClassName("depart");
 
    const formdata= new FormData();
    formdata.append("job_id",jbid);
    formdata.append("type","or");
    const options ={
 
        method: 'POST',
        headers:{
         "Acces-Control-Allow-Credentials":true,
         "Access-Control-Allow-Origin": "https://enkaare.co",
         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, authorization",
         "Access-Control-Allow-Methods": "POST",
            withCredentials:true
    
        },
       credentials: 'include',
    
   
        body: formdata,
       
    };
   // https://1ed2-105-231-144-76.ngrok.io/api'
 
   //https://half-geode-roundworm.glitch.me/api
    
    let f= fetch('https://yielding-dented-amusement.glitch.me/sedetails',options).catch(err =>{
       
 
 });
 loader[0].classList.add("addedloader");
 
 f.then(res=>res.json()).then(d=>{
 
    
    let orderarray =d
   
    let time=orderarray[0].posted_date.split(',')[0]
  /*  if(parseInt(orderarray[0].time_posted) >60){
        time=Math.trunc(parseInt(orderarray[0].time_posted )/60)+" hours";
        
 
    }else if(Math.trunc(parseInt(orderarray[0].time_posted)/24)>0){
        time=Math.trunc(parseInt(orderarray[0].time_posted)/24)+" days"
       
    }else{
        time=orderarray[0].time_posted+" minutes";
        
    }*/
 
 
 
 
 
    let payy=orderarray[0].pay.split(",");
    jobtitle.innerHTML=orderarray[0].job_title;
   /* name.innerHTML=orderarray[0].company_name;*/
    city.innerHTML=" "+orderarray[0].state_province+", "+orderarray[0].city;
    time_posted.innerHTML=time;
    country.innerHTML=orderarray[0].country;
    pay_rate.innerHTML=payy[0]+payy[1]+payy[2];
    benefits.innerHTML=orderarray[0].benefit;
    type.innerHTML=orderarray[0].job_type;
    about.innerHTML=orderarray[0].summary;
    responsibilities.innerHTML=orderarray[0].responsibilities;
    poster[0].innerHTML=orderarray[0].first_name +",";
    depart[0].innerHTML=orderarray[0].department;
 
 }).catch(err=>{
    console.log(err);
 });
 
    
 const sformdata= new FormData();
    sformdata.append("job_id",jbid);
    sformdata.append("type","any");
    const soptions ={
 
        method: 'POST',
        headers:{
         "Acces-Control-Allow-Credentials":true,
         "Access-Control-Allow-Origin": "https://enkaare.co",
         "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, authorization",
         "Access-Control-Allow-Methods": "POST",
            withCredentials:true
    
        },
       credentials: 'include',
    
   
        body: sformdata,
       
    };
   // https://1ed2-105-231-144-76.ngrok.io/api'
 
   //https://half-geode-roundworm.glitch.me/api
    
    let sf= fetch('https://yielding-dented-amusement.glitch.me/sedetails',soptions).catch(err =>{
      
 
 });
 sf.then(res=>res.json()).then(d=>{
 
 
    let skillsarray=d
   
    for(values in skillsarray[0]){
        if(skillsarray[0][values]!=null){
            let skill=skillsarray[0][values];
            let skillcarier=document.getElementsByClassName("skillst")[0];
            let skilldiv=document.createElement('div');
            let skill_content=`<section class="skillcarrier">
              ${skill}        
            </section>`;
            skilldiv.innerHTML=skill_content;
            skillcarier.append(skilldiv)
        
    
        }
        
    }
    loader[0].classList.remove("addedloader");
 });
 
 let appbutton =document.getElementById('odbutton');
 
 appbutton.addEventListener('click',(e)=>{
     if(e.target.innerHTML==='Apply'){
         let logged=getCookie("userloged")
         //let logged=localStorage.getItem("userloged")
     let formdata=new FormData()
     formdata.append("job_id",jbid);
     formdata.append("user_id",logged);
     formdata.append("action","apply")
 
 
     const options={
         method:"POST",
         headers:{
             "Acces-Control-Allow-Credentials":true,
             "Access-Control-Allow-Origin": "https://enkaare.co",
             "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, authorization",
             "Access-Control-Allow-Methods": "POST",
                withCredentials:true
        
            },
           credentials: 'include',
        
         body:formdata
     }
 
     let f=fetch("https://yielding-dented-amusement.glitch.me/apply",options).catch(err=>{
         console.log(err)
     })
     loader[0].classList.add("addedloader");
     f.then(res=>res.json()).then(d=>{
       
       const{affectedrows}=d;
 
       if(affectedrows){
         
         window.location.href="/availableorders.html";
         loader[0].classList.remove("addedloader");
 
       }else{
         window.location.href="/availableorders.html";
         loader[0].classList.remove("addedloader");
       }
     })
 
     }else if(e.target.innerHTML==='Cancel'){
 
         //let logged=localStorage.getItem("userloged")
         let logged=getCookie("userloged")
         let formdata=new FormData()
         formdata.append("job_id",jbid);
         formdata.append("user_id",logged);
         formdata.append("action","cancel")
     
     
         const options={
             method:"POST",
             headers:{
                 "Acces-Control-Allow-Credentials":true,
                 "Access-Control-Allow-Origin": "https://enkaare.co",
                 "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, authorization",
                 "Access-Control-Allow-Methods": "POST",
                    withCredentials:true
            
                },
               credentials: 'include',
            
             body:formdata
         }
     
         let f=fetch("https://yielding-dented-amusement.glitch.me/apply",options).catch(err=>{
             console.log(err)
         })
         loader[0].classList.add("addedloader");
 
         f.then(res=>res.json()).then(d=>{
             const{affectedrows}=d;
             if(affectedrows){
         
                 window.location.href="/myorders.html";
                 loader[0].classList.remove("addedloader");
         
               }else{
                 window.location.href="/myorders.html";
                 loader[0].classList.remove("addedloader");
               }
         })
         
     }else if(e.target.innerHTML==='Accept'){
         //let logged=localStorage.getItem("userloged")
         let logged=getCookie("userloged")
         let formdata=new FormData()
         formdata.append("job_id",jbid);
         formdata.append("user_id",logged);
         
     
     
         const options={
             method:"POST",
             headers:{
                 "Acces-Control-Allow-Credentials":true,
                 "Access-Control-Allow-Origin": "https://enkaare.co",
                 "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, authorization",
                 "Access-Control-Allow-Methods": "POST",
                    withCredentials:true
            
                },
               credentials: 'include',
            
             body:formdata
         }
     
         let f=fetch("https://yielding-dented-amusement.glitch.me/acceptinvite",options).catch(err=>{
 
            console.log(err)
              
         })
         loader[0].classList.add("addedloader");
         f.then(res=>res.json()).then(d=>{
             const{done}=d
 
             if(done){
                 loader[0].classList.remove("addedloader");
                 window.location.href="/availableorders.html";
             }
         })
 
     }
 })
 
 }
 let orderdetailsvalue;
 let orderdetailsvalueupdate=(vr)=>{
    orderdetailsvalue=vr;
   /* console.log(orderdetailsvalue)*/
   
    
 
    
    
   
 
    
 }
 
 
 
 /*
 let ordervalue=()=>{
 orderdetails(2);
   
   
 }*/
 
 
 let seeorder=()=>{
    cbutton(sessionStorage.getItem('seeorderbuttonvalue'));
    
   let v=sessionStorage.getItem("clickedorderid");
   orderdetails(v);
 }
 
 
//MY APPLICATION START HERE
//*********************************************************************************** */

let myapporders = () => {
  let loader = document.getElementsByClassName("loader");

  //   let firstnmae = localStorage.getItem("pfname");
  //   let logedid = localStorage.getItem("userloged");
  let firstnmae = getCookie("pfnname");
  let logedid = getCookie("userloged");

  const formdata = new FormData();

  formdata.append("firstname", firstnmae);
  formdata.append("logedid", logedid);

  const optionWithFormData = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "https://www.enkaare.com",
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

  let f = fetch(`${baseUrl}/cmyjobs`, optionWithFormData).catch((err) => {});
  loader[0].classList.add("addedloader");
  f.then((res) => res.json()).then((d) => {
    loader[0].classList.remove("addedloader");
    if (d.length === 0) {

      let orderlist = document.getElementsByClassName("jobsappcarrier")[0];
      var order = document.createElement("div");
      var orderitems = `<div class="empty-message">
      <img id="empty-icon" src="/images/empty-folder.png" alt="empty-folder">
    <div class="empty-text">Oops! No Results Found</div>
    `;
      order.innerHTML = orderitems;
      orderlist.append(order);
    } else {
      let orderarray = d;

      for (let i = 0; i < orderarray.length; i++) {
        let title = orderarray[i].job_title;
       
        let city = orderarray[i].city;
        let country = orderarray[i].country;
        let bids = orderarray[i].submits;
        let type = orderarray[i].job_type;
        let pays = orderarray[i].pay.split(",");

        let order_id = orderarray[i].job_id;

        if (type === "Remote contract") {
          src = "/images/self-employed.png";
        } else if (type === "Temporary Contract") {
          src = "/images/parttime.png";
        } else if (type === "Parmanent Contract") {
          src = "/images/fulltime.png";
        } else if (type === "Remote Temporary") {
          src = "/images/temporary.png";
        }

        let orderlist = document.getElementsByClassName("jobsappcarrier")[0];
        var order = document.createElement("div");
        var orderitems = `<div class="order orderhover">
            <div class="orderinid">${order_id}</div>
            <section class="orderp1">
               
                <h3>${title}</h3>
                <div class="cname">
                   <h4 class="ch31"></h4> 
                   <p class="ch32"> ${city},</p>
                   <p class="ch32">${country}</p>
                </div>
            
            </section>
            <section class="orderp2">
                <div class="aobids">
                    <p class="aop1">${bids}</p>
               <p class="aop2">Submited profiles</p>
               
            
                </div>
                <div class="jtype">
                    <img src="${src}" alt="">
                    <h4 class="jtypeh4">${type}</h4>
                </div>
                
            </section>
            <section class="orderp3">
                <p class="ordp3p">${pays[0] + pays[1] + pays[2]}</p>
                <button class="orderbuttonp" id="orderbutton">See Job</button>
                
            
            </section>
            
            
            </div>`;
        order.innerHTML = orderitems;
        orderlist.append(order);
      }

      let buttonclicked = document.getElementsByClassName("orderbuttonp");
      for (let i = 0; i < buttonclicked.length; i++) {
        let button = buttonclicked[i];
        button.addEventListener("click", (e) => {
          let varbutton = e.target;
          let value =
            varbutton.parentElement.parentElement.firstElementChild.innerHTML;

            sessionStorage.setItem("clickedorderid", value);
            sessionStorage.setItem("seeorderbuttonvalue", "Cancel");
          

          window.location.href = "/orderdetails.html";
        });
      }
    }
  });

  //here is the code for seeorder
};

//accepted job start here
let acceptedjobs = () => {
  let appsarray = [
    {
      title: "Web design/developer",
      name: "Munene",
      city: "Nairobi",
      country: "Kenya",
      bids: "19",
      type: "Freelancer",
      pay: "600",
      order_id: 0,
    },
  ];

  for (let i = 0; i < appsarray.length; i++) {
    let title = appsarray[i].title;
    let name = appsarray[i].name;
    let city = appsarray[i].city;
    let country = appsarray[i].country;
    let bids = appsarray[i].bids;
    let type = appsarray[i].type;
    let pay = appsarray[i].pay;
    let order_id = appsarray[i].order_id;

    if (type === "Freelancer") {
      src = "/images/self-employed.png";
    } else if (type === "Part time") {
      src = "/images/parttime.png";
    } else if (type === "Full time") {
      src = "/images/fulltime.png";
    } else if (type === "Temporary") {
      src = "/images/temporary.png";
    }

    let orderlist = document.getElementsByClassName("jobsacceptedcarr")[0];
    var order = document.createElement("div");
    var orderitems = ` <div class="order orderhover">
       <div class="orderinid">${order_id}</div>
       <section class="orderp1">
          
           <h3>${title}</h3>
           <div class="cname">
              <h4 class="ch31">${name}</h4> 
              <p class="ch32"> ${city},</p>
              <p class="ch32">${country}</p>
           </div>
       
       </section>
       <section class="orderp2">
           <div class="aobids">
               <p class="aop1">${bids}</p>
          <p class="aop2">Submited profiles</p>
          
       
           </div>
           <div class="jtype">
               <img src="${src}" alt="">
               <h4 class="jtypeh4">${type}</h4>
           </div>
           
       </section>
       <section class="orderp3">
           <p class="ordp3p">$${pay}</p>
           <button class="orderbuttonpa" id="orderbutton">In progress</button>
           
       
       </section>
       
       
       </div>`;
    order.innerHTML = orderitems;
    orderlist.append(order);
  }

  /*There are  there types of see order my jobs,available and accepted jobs
   each update the see order button according to where its clicked from  */
  //here is the code for seeorder from my job
  let buttonclicked = document.getElementsByClassName("orderbuttonpa");
  for (let i = 0; i < buttonclicked.length; i++) {
    let button = buttonclicked[i];
    button.addEventListener("click", (e) => {
      let varbutton = e.target;
      let value =
        varbutton.parentElement.parentElement.firstElementChild.innerHTML;

         sessionStorage.setItem("clickedorderid", value);
        sessionStorage.setItem("seeorderbuttonvalue", "Terminate");
      

      window.location.href = "/orderdetails.html";
    });
  }
};

let cbutton = (vr) => {
  let cancelbutton = document.getElementById("odbutton");
  cancelbutton.innerHTML = vr;
};

//EPLOYER PROFILE START HERE

let eprofload = () => {
  let profarray = [
    {
      worker_id: "1789",
      first_name: "Karanjs",
      second_name: "Gacuca",
      job_title: "Head Of human Resource",
      city: "Ajax",
      country: "Ontario",
      numberof_jobs: 1,
      summary: `We give your business the opportunity to work with talented 
           professionals who can perfom work remotely either on a project-by-project
            basis or through onb- -oarding onto your corporate platforms and embedding 
            with internal teams for the duration of the project.`,
    },
  ];

  let firstname = document.getElementById("epfirstname");
  let secondname = document.getElementById("epsecondname");
  let jobtitle = document.getElementById("epp");

  let city = document.getElementById("ecity1");

  let country = document.getElementById("estate");
  let summary = document.getElementById("epsp");

  firstname.innerHTML = profarray[0].first_name;
  secondname.innerHTML = profarray[0].second_name;
  jobtitle.innerHTML = profarray[0].job_title;

  city.innerHTML = profarray[0].city;
  country.innerHTML = profarray[0].country;

  summary.innerHTML = profarray[0].summary;
  noofjobs.innerHTML = profarray[0].numberof_jobs;

  let lastjobs = [
    {
      order_id: 23232,
      date: "Feb 23, 2023, 05:15 PM",
      status: "In Progress",
      applications: 2,
    },
    {
      order_id: 23233,
      date: "Feb 24, 2023, 06:15 AM",
      status: "In Progress",
      applications: 10,
    },
  ];

  for (let i = 0; i < lastjobs.length; i++) {
    let order = lastjobs[i].order_id;
    let date = lastjobs[i].date;
    let status = lastjobs[i].status;
    let number = lastjobs[i].applications;

    let lastsj = document.getElementsByClassName("elsediv")[0];
    let lcdiv = document.createElement("div");
    var lastsitems = `<div class="ltmain">
  <p class="ltmorder">${order}</p>
  <p class="ltmdate">${date}</p>
  <button class="ltmbutton">${status}</button>
  <section class="appart">
      <div id="appsavailable">
      ${number}
      </div>
      <p id="aplp">Applications available</p>

  </section>

</div>`;
    lcdiv.innerHTML = lastsitems;
    lastsj.append(lcdiv);
  }
};

/**************************************/

/*SETTINGS*/
let semail;
let firstnameee;
let lastnameeee;
let generalsetting = () => {
  let setcarrier = document.getElementById("loginsecurityset");

  while (setcarrier.hasChildNodes()) {
    setcarrier.firstChild.remove();
  }

  let genset = document.getElementsByClassName("h31");
  genset[0].style.borderBottom = "3px solid hsl(188,47%,20%)";
  let loginse = document.getElementsByClassName("h32");
  loginse[0].style.borderBottom = "transparent";
  let generalset = document.getElementsByClassName("loginsecurityset")[0];
  let elem = document.createElement("div");
  let content = ` <div class="setting1">
    <h3>Email</h3>
     <div class="semail">
        <section>
         <p id="set1email">${semail}</p>

        </section>
        <section class="semsec2">

         <button>Verified</button>

        </section>
        <section class="semsec3">
         <button onclick="wemailchange();emailchange()">Change</button>

        </section>

     </div>

  </div>
  <div class="setting1">
     <h3>Name</h3>
      <div class="semail">
         <section>
        <div class="stinfirstname">

         <input type="text" id="sfirstname"  placeholder="First name" disabled>

        </div>
         
         </section>
         <section class="semsec2">
             <div class="stinfirstname1">
                 
                 <input type="text" id="slastname" placeholder="Last name" disabled>
         
             </div>
            

         </section>
         <section class="semsec3">
          <button onclick="wnamechange();namechange()">Change</button>

         </section>

      </div>

   </div>
  <div class="setting2">
    <div class="addnumber">
     <h3>Phone number</h3>
     <button>Add Number</button>
    </div>
    <div class="numberplaceholder">
     <div><img src="/images/empty-box.png" alt="">
         <p>You haven't added your number</p></div>
    </div>
   

  </div>`;

  elem.innerHTML = content;
  generalset.append(elem);
  let fname = document.querySelector("#sfirstname");
  let sname = document.querySelector("#slastname");
  fname.value = firstnameee;
  sname.value = lastnameeee;
};

let logigset = () => {
  let setcarrier = document.getElementById("loginsecurityset");

  while (setcarrier.hasChildNodes()) {
    setcarrier.firstChild.remove();
  }
  let loginse = document.getElementsByClassName("h32");
  loginse[0].style.borderBottom = "3px solid hsl(188,47%,20%)";

  let genset = document.getElementsByClassName("h31");
  genset[0].style.borderBottom = "transparent";

  let generalset = document.getElementsByClassName("loginsecurityset")[0];
  let elem = document.createElement("div");
  let content = `       <div class="settingloginset">
    <div class="diactive">
        <h3>Account</h3>
        <button>Deactivate account</button>
       </div>
       <div class="sdemain">
        <br>

        <div class="sdcarrier">
            <section>
                <p class="sfirstp">Login:</p>
            </section>
            <section>
                <p class="sfirstp1">${semail}</p>
            </section>
            <section></section>

        </div>
        

        <div class="sdcarrier">
            <section>
                <p class="sfirstp">Password</p>
            </section>
            <section>
                <p class="sfirstp1">*********</p>
            </section>
            <section>
                <button onclick="passwordchange();wpasschange()" id="passchange">Change</button>
            </section>

        </div>

       </div>

 </div>

 <div class="sessionsetting">
    <div class="diactive">
        <h3>Sessions</h3>
        <button id="logoutalldevice">Log out on all devices</button>
       </div>
       <div class="sessiontitles">
        <section>
         <p>Device</p>

        </section>
        <section>
         <p>IP</p>
        </section>
        <section>
          <p>Last activity</p>
        </section>
       </div>
       <div class="sessioncarrier">
        <section>
            <p>
                PC / Windows 10 / Chrome 114.0.0 (current)
            </p>

        </section>
        <section>
            <p>154.159.237.70</p>

        </section>
        <section>
            <p>Just now</p>

        </section>

       </div>
    
 </div>`;

  elem.innerHTML = content;
  generalset.append(elem);
};
//function to make setting disappear
let settingdisplycancelb = () => {
  let dis = document.querySelector(".sdynamicdiv1");
  let dis1 = document.querySelector(".sdynamicdiv2");
  let dis2 = document.querySelector(".sdynamicdiv3");
  let dis3 = document.querySelector(".sdynamicdiv4");
  let dis4 = document.querySelector(".sdynamicdiv5");

  dis.style.display = "none";
  dis1.style.display = "none";
  dis2.style.display = "none";
  dis3.style.display = "none";
  dis4.style.display = "none";
  let setdisplay = document.getElementsByClassName("passworinputdisplay");
  setdisplay[0].classList.remove("addedpasinput");
};

let whatsettingchange;
let wemailchange = () => {
  whatsettingchange = "email";
};
let wnamechange = () => {
  whatsettingchange = "name";
};
let wpasschange = () => {
  whatsettingchange = "password";
};

let emailchange = () => {
  let changetype = document.querySelector(".changetype");
  let setdisplay = document.getElementsByClassName("passworinputdisplay");
  let emaildis = document.querySelector(".sdynamicdiv1");

  setdisplay[0].classList.add("addedpasinput");
  emaildis.style.display = "block";
  changetype.innerHTML = "Change email";

  const togglePassword = document.querySelector("#togglePassword");
  const password = document.querySelector("#spass1");

  togglePassword.addEventListener("click", function (e) {
    // toggle the type attribute
    const type =
      password.getAttribute("type") === "password" ? "text" : "password";
    password.setAttribute("type", type);
    // toggle the eye slash icon
    this.classList.toggle("fa-eye-slash");
  });
};
let namechange = () => {
  let changetype = document.querySelector(".changetype");
  let setdisplay = document.getElementsByClassName("passworinputdisplay");
  let emaildis = document.querySelector(".sdynamicdiv1");

  setdisplay[0].classList.add("addedpasinput");
  emaildis.style.display = "block";
  changetype.innerHTML = "Change Name";
};
let passwordchange = () => {
  let changetype = document.querySelector(".changetype");
  let setdisplay = document.getElementsByClassName("passworinputdisplay");
  let emaildis = document.querySelector(".sdynamicdiv1");

  setdisplay[0].classList.add("addedpasinput");
  emaildis.style.display = "block";
  changetype.innerHTML = "Change Password";
};
let activatepassnext = () => {
  let passnextbutton = document.querySelector(".spassnext");
  passnextbutton.disabled = false;
  passnextbutton.style.color = "white";
  passnextbutton.style.backgroundColor = "hsl(207,52%,44%)";
  passnextbutton.style.border = "hsl(207,52%,44%)";
  passnextbutton.style.cursor = "pointer";
};
let ssavename = () => {
  let loader = document.querySelector(".loaderps");
  let firstname = document.querySelector("#sfname");
  let secondname = document.querySelector("#slname");

  let vfirsname = firstname.value;
  let vsecondname = secondname.value;
  if (vfirsname === "") {
    firstname.style.border = "1px solid red";
  } else if (vsecondname === "") {
    secondname.style.border = "1px solid red";
  } else {
    let formdata = new FormData();
    formdata.append("firstname", vfirsname);
    formdata.append("lastname", vsecondname);
    // formdata.append("userid", localStorage.getItem("userloged"));
    formdata.append("userid", getCookie("userloged"));

    const optionWithFormData = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "https://www.enkaare.com",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, authorization",
        "Access-Control-Allow-Methods": "POST",
        withCredentials: true,
      },
      credentials: "include",

      body: formdata,
    };

    let f = fetch(`${baseUrl}/changecname`, optionWithFormData).catch((err) => {
      console.log(err);
    });
    loader.style.display = "flex";
    firstname.value = "";
    secondname.value = "";

    f.then((res) => res.json())
      .then((d) => {
        const {affectedrows} = d;
        if (affectedrows) {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

function sverifyPassword() {
  let loader = document.querySelector(".loaderps");
  let pasdoest = document.querySelector(".smatch");
  let confirmpass = document.querySelector(".sconfirmpassword");
  var passwordi = document.querySelector(".sspassword");
  let warningerr = document.querySelector(".sprequirement");
  let password = passwordi.value;
  let confirmpassvalue = confirmpass.value;
  let passvalue = passwordi.value;

  // Define the regular expressions for the conditions
  const hasNumber = /\d/;
  const hasLowercase = /[a-z]/;
  const hasUppercase = /[A-Z]/;
  const hasSpecialChar = /[!@#$%^&*]/;

  // Verify the conditions
  if (
    password.length >= 8 &&
    hasNumber.test(password) &&
    hasLowercase.test(password) &&
    hasUppercase.test(password) &&
    hasSpecialChar.test(password)
  ) {
    warningerr.style.color = "green";
    if (confirmpassvalue === "") {
      confirmpass.style.border = "1px solid red";
    } else if (passvalue != confirmpassvalue) {
      passwordi.style.border = "1px solid red";
      confirmpass.style.border = "1px solid red";
      pasdoest.innerHTML = "Passwords doesn't match!";
    } else {
      // submit pasword for update
      let formdata = new FormData();
      //   formdata.append("userid", localStorage.getItem("userloged"));
      formdata.append("userid", getCookie("userloged"));
      formdata.append("password", password);

      const options = {
        method: "POST",
        body: formdata,
      };

      let f = fetch(`${baseUrl}/changecpassword`, options).catch((err) => {
        console.log(err);
      });
      passvalue = "";
      confirmpassvalue = "";
      loader.style.display = "flex";

      f.then((res) => res.json())
        .then((d) => {
          loader.style.display = "none";
          const {affectedrows} = d;
          if (affectedrows) {
            window.location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } else {
    // Password does not meet all the conditions
    warningerr.style.color = "red";
    // Prevent form submission
  }
}
let ssavepassword = () => {
  let password = document.querySelector(".sspassword");
  let confirmpass = document.querySelector(".sconfirmpassword");

  let passvalue = password.value;
  let confirmpassvalue = confirmpass.value;

  if (passvalue === "") {
    password.style.border = "1px solid red";
  } else {
    sverifyPassword();
  }
};

let sverifypass = () => {
  let passdis = document.querySelector(".sdynamicdiv5");
  let namec = document.querySelector(".sdynamicdiv4");
  let passarea = document.querySelector(".sinputc");
  let erro = document.querySelector("#spasserr");
  let loader = document.querySelector(".loaderps");
  let password = document.querySelector("#spass1");
  let emaildis = document.querySelector(".sdynamicdiv1");
  let emaildis2 = document.querySelector(".sdynamicdiv2");
  if (password.value === "") {
    let passarea = document.querySelector(".sinputc");
    passarea.style.border = "1px solid red";
  } else {
    let formdata = new FormData();
    formdata.append("requesttype", "verifypass");
    // formdata.append("userid", localStorage.getItem("userloged"));
    formdata.append("userid", getCookie("userloged"));
    formdata.append("userpassword", password.value);
    // formdata.append("lastname", localStorage.getItem("psname"));
    formdata.append("lastname", getCookie("psname"));

    const optionWithFormData = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "https://www.enkaare.com",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, authorization",
        "Access-Control-Allow-Methods": "POST",
        withCredentials: true,
      },
      credentials: "include",

      body: formdata,
    };

    let f = fetch(`${baseUrl}/changecandidateemail`, optionWithFormData).catch(
      (err) => {
        console.log(err);
      }
    );
    loader.style.display = "flex";
    f.then((res) => res.json())
      .then((d) => {
        loader.style.display = "none";
        const {verytype} = d;
        if (verytype === "valid") {
          password.value = "";
          emaildis.style.display = "none";
          if (whatsettingchange === "email") {
            emaildis2.style.display = "block";
          } else if (whatsettingchange === "name") {
            namec.style.display = "block";
          } else if ((whatsettingchange = "password")) {
            passdis.style.display = "block";
          }
        } else {
          password.value = "";
          erro.innerHTML = "Invalid password!";
          passarea.style.border = "1px solid red";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

let undo = () => {
  let pasdoest = document.querySelector(".smatch");
  let confirmpass = document.querySelector(".sconfirmpassword");
  var passwordi = document.querySelector(".sspassword");
  let err3 = document.querySelector("#spasserr3");
  let firstname = document.querySelector("#sfname");
  let secondname = document.querySelector("#slname");

  let passarea = document.querySelector(".sinputc");
  let erro = document.querySelector("#spasserr");
  let codeinput = document.querySelectorAll(".verification-input");

  codeinput[0].style.border = "1px solid hsla(4,0%,0%,0.3)";
  codeinput[1].style.border = "1px solid hsla(4,0%,0%,0.3)";
  codeinput[2].style.border = "1px solid hsla(4,0%,0%,0.3)";
  codeinput[3].style.border = "1px solid hsla(4,0%,0%,0.3)";

  pasdoest.innerHTML = "";
  erro.innerHTML = "";
  err3.innerHTML = "";
  passarea.style.border = "1px solid hsla(4,0%,0%,0.3)";
  secondname.style.border = "1px solid hsla(4,0%,0%,0.3)";
  firstname.style.border = "1px solid hsla(4,0%,0%,0.3)";
  confirmpass.style.border = "1px solid hsla(4,0%,0%,0.3)";
  passwordi.style.border = "1px solid hsla(4,0%,0%,0.3)";
};

function validateEmail() {
  let emailnextbut = document.querySelector(".sbdiv2b2");
  var email = document.getElementById("emailInput").value;
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (emailRegex.test(email)) {
    document.querySelector(".sinputc2").style.border =
      "1px solid hsla(4,0%,0%,0.3)";
    document.querySelector(".spasserr2").innerHTML = "";

    emailnextbut.disabled = false;
    emailnextbut.style.color = "white";
    emailnextbut.style.backgroundColor = "hsl(207,52%,44%)";
    emailnextbut.style.border = "1px solid hsl(207,52%,44%)";
    emailnextbut.style.cursor = "pointer";
  } else {
    document.querySelector(".spasserr2").innerHTML = "Invalid email address";
    document.querySelector(".sinputc2").style.border = "1px solid red";
    emailnextbut.disabled = true;
    emailnextbut.style.cursor = "default";
    emailnextbut.style.color = "hsla(4,0%,0%,0.3)";
    emailnextbut.style.backgroundColor = "hsla(207,52%,44%,0.1)";
    emailnextbut.style.border = "1px solid hsla(207,52%,44%,0.1)";
  }
}
let emailcode = () => {
  let emaildis2 = document.querySelector(".sdynamicdiv2");
  let emaildis3 = document.querySelector(".sdynamicdiv3");
  let loader = document.querySelector(".loaderps");
  let email = document.querySelector("#emailInput");
  let random = (min = 1000, max = 9999) => {
    let dif = max - min;
    let rad = Math.random();
    rad = Math.floor(rad * dif);
    rad = rad + min;
    return rad;
  };

  let formdata = new FormData();
  let code = random();
  let emaili = email.value.trim();

  formdata.append("email", email.value.trim());
  formdata.append("requesttype", "emailcode");
  formdata.append("code", code);

  const optionWithFormData = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "https://www.enkaare.com",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, authorization",
      "Access-Control-Allow-Methods": "POST",
      withCredentials: true,
    },
    credentials: "include",

    body: formdata,
  };

  let f = fetch(`${baseUrl}/changecandidateemail`, optionWithFormData).catch(
    (err) => {
      console.log(err);
    }
  );
  loader.style.display = "flex";
  f.then((res) => res.json()).then((d) => {
    loader.style.display = "none";
    email.value = "";
    const {sent} = d;
    
    if (sent) {
      emaildis2.style.display = "none";
      emaildis3.style.display = "block";

      /******************************** */
      const verificationInputs = document.querySelectorAll(
        ".verification-input"
      );
      const maxLength = 1;

      verificationInputs.forEach((input, index) => {
        input.addEventListener("input", (event) => {
          const value = event.target.value;

          if (value.length >= maxLength) {
            if (index < verificationInputs.length - 1) {
              verificationInputs[index + 1].focus();
            } else {
              // Last input reached, you can perform any action here (e.g., submit the form)

              if (code != getVerificationCode()) {
                let err3 = document.querySelector("#spasserr3");
                let codeinput = document.querySelectorAll(
                  ".verification-input"
                );

                codeinput[0].style.border = "1px solid red";
                codeinput[1].style.border = "1px solid red";
                codeinput[2].style.border = "1px solid red";
                codeinput[3].style.border = "1px solid red";

                err3.innerHTML = "Invalid code!";
              } else {
                loader.style.display = "flex";
                let formdata = new FormData();
                formdata.append("email", emaili);
                formdata.append("requesttype", "update");
                // formdata.append("userid", localStorage.getItem("userloged"));
                formdata.append("userid", getCookie("userloged"));

                const optionWithFormData = {
                  method: "POST",
                  headers: {
                    "Access-Control-Allow-Credentials": true,
                    "Access-Control-Allow-Origin": "https://www.enkaare.com",
                    "Access-Control-Allow-Headers":
                      "Origin, X-Requested-With, Content-Type, Accept, authorization",
                    "Access-Control-Allow-Methods": "POST",
                    withCredentials: true,
                  },
                  credentials: "include",

                  body: formdata,
                };

                let f = fetch(
                  `${baseUrl}/changecandidateemail`,
                  optionWithFormData
                ).catch((err) => {
                  console.log(err);
                });
                f.then((res) => res.json()).then((d) => {
                  const {affectedrows} = d;

                  if (affectedrows) {
                    loader.style.display = "none";
                    window.location.reload();
                  }
                });
              }
            }
          }
        });

        input.addEventListener("keydown", (event) => {
          const BACKSPACE_KEY_CODE = 8;

          if (
            event.keyCode === BACKSPACE_KEY_CODE &&
            index > 0 &&
            input.value.length === 0
          ) {
            verificationInputs[index - 1].focus();
          }
        });
      });

      function getVerificationCode() {
        let code = "";
        verificationInputs.forEach((input) => {
          code += input.value;
        });
        return code;
      }
    }
  });
};

let cancelemailc = () => {
  window.location.reload();
};

let settingdata = () => {
  let formdata = new FormData();
  //   formdata.append("userid", localStorage.getItem("userloged"));
  formdata.append("userid", getCookie("userloged"));

  const optionWithFormData = {
    method: "POST",
    headers: {
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Origin": "https://www.enkaare.com",
      "Access-Control-Allow-Headers":
        "Origin, X-Requested-With, Content-Type, Accept, authorization",
      "Access-Control-Allow-Methods": "POST",
      withCredentials: true,
    },
    credentials: "include",

    body: formdata,
  };
  let f = fetch(`${baseUrl}/csettingdata`, optionWithFormData).catch((err) => {
    console.log(err);
  });

  f.then((res) => res.json()).then((d) => {
    const {first_name, last_name, email} = d;
    let emailsec = document.querySelector("#set1email");

    let fname = document.querySelector("#sfirstname");
    let sname = document.querySelector("#slastname");
    fname.value = first_name;
    sname.value = last_name;
    let logsecurityeamil = document.querySelector(".sfirstp1");
    emailsec.innerHTML = email;
    semail = email;
    firstnameee = first_name;
    lastnameeee = last_name;
    // localStorage.setItem("pfname", first_name);
    // localStorage.setItem("psname", last_name);
    setCookie("pfname", first_name, 7);
    setCookie("psname", last_name, 7);
    setprofile();
  });
};
let setting = () => {
  generalsetting();
  settingdata();
};

//CODE FOR SUUPORT

let whatprofile;

let suuemployer = (profile) => {
  whatprofile = profile;
};

let tsupport = () => {
  let loader1 = document.getElementsByClassName("loader1");

  var audio = new Audio("/images/shooting-sound-fx-159024.mp3");
  audio.play();

  document.querySelector(".contactsupport").classList.add("addedhove");
  let form = document.querySelector(".suuform");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    // let userid = localStorage.getItem("userloged");
    let userid = getCookie("userloged");
    let subject = document.querySelector("#subject");
    let message = document.querySelector("#sumessage");

    let formdata = new FormData();
    formdata.append("user_id", userid);
    formdata.append("subject", subject.value);
    formdata.append("message", message.value);
    formdata.append("profile", whatprofile);

    const optionWithFormData = {
      method: "POST",
      headers: {
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Origin": "https://www.enkaare.com",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, authorization",
        "Access-Control-Allow-Methods": "POST",
        withCredentials: true,
      },
      credentials: "include",

      body: formdata,
    };

    let f = fetch(`${baseUrl}/supporttalk`, optionWithFormData).catch((err) => {
      console.log(err);
    });
    loader1[0].classList.add("addedloader1");

    f.then((res) => res.json()).then((d) => {
      const {sent} = d;

      if (sent) {
        form.reset();
        loader1[0].classList.remove("addedloader1");
        tsupportcancel();
      }
    });
  });
};
let tsupportcancel = () => {
  document.querySelector(".contactsupport").classList.remove("addedhove");
};


//CODES TO RUN MOBILE VERSION
let huberger =document.getElementsByClassName("navbutton");
let phonenav=document.getElementsByClassName("phonenavmenu");
let pop=()=>{
    huberger[0].classList.toggle("active");
   phonenav[0].classList.toggle("addedphonemenu");

   let poptions = document.getElementsByClassName("poptions");
   poptions[0].classList.remove("addpoptionsp");
    
}

let displaypoptionsp = () => {

  console.log("yessss");
  let poptions = document.getElementsByClassName("poptions");
  poptions[0].classList.toggle("addpoptionsp");

  huberger[0].classList.remove("active");
   phonenav[0].classList.remove("addedphonemenu");

};

function getRidOfOverlayWindows(){
  huberger[0].classList.remove("active");
  phonenav[0].classList.remove("addedphonemenu");
  let poptions = document.getElementsByClassName("poptions");
  poptions[0].classList.remove("addpoptionsp");

}

const jobQuickLinks =()=>{
  
  const jQuickLinks= document.getElementsByClassName("jbquicklinks");
 

  jQuickLinks[0].classList.toggle("addedjblinks");

}

