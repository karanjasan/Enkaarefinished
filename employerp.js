const baseUrl = "https://yielding-dented-amusement.glitch.me";
// let formdata = new FormData();
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
};


// Function to set a subdomain cookie
function setCookie(cname, cvalue, exdays = null) {
  let expires = exdays
    ? `expires=${new Date(
        new Date().getTime() + exdays * 24 * 60 * 60 * 1000
      ).toUTCString()}`
    : "";
  document.cookie = `${cname}=${encodeURIComponent(
    cvalue
  )}; ${expires}; path=/`;
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
  const domain = ".enkaare.co"; // Replace with your actual domain
  const pastDate = new Date(0).toUTCString();
  try {
    document.cookie = `${name}=; expires=${pastDate}; path=/; domain=${domain}`;
    console.log(`Deleted cookie: ${name}`);
  } catch (error) {
    console.error(`Error deleting cookie: ${name}`, error);
  }
}
// https://1ed2-105-231-144-76.ngrok.io/api'

//https://half-geode-roundworm.glitch.me/api

let fetchSessions = fetch(`${baseUrl}/session`, options).catch((err) => {
  console.log("There is an error fetching sessions", err);
});

fetchSessions
  .then((res) => res.json())
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

let logout = () => {
  // https://1ed2-105-231-144-76.ngrok.io/api'

  //https://half-geode-roundworm.glitch.me/api

  let f = fetch(`${baseUrl}/logout`, options).catch((err) => {});
  f.then((res) => res.json()).then((d) => {
    const {okay} = d;
    if (okay) {
      //   localStorage.removeItem("userloged");
      //   localStorage.removeItem("pfname");
      //   localStorage.removeItem("psname");
      deleteCookie("userloged");
      deleteCookie("pfname");
      deleteCookie("psname");
      window.location.href = "/login.html";
    }
  });
};

let navmenu = () => {
  /*
    let body=document.getElementsByClassName("navbar")[0];
    let tamplet=document.getElementById("mynavbar");
    let tamplet_content=tamplet.content;
    body.append(tamplet_content);
    */
};

let setprofile = () => {
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

  let fetchProfile = fetch(
    `${baseUrl}/enotimessprofile`,
    optionWithFormData
  ).catch((err) => {
    console.log(err);
  });
  fetchProfile
    .then((res) => res.json())
    .then((d) => {
      if (d[0].file === "noprofile") {
      } else {
        const imageex = "data:image/png;base64,";
        let ppimage = document.getElementsByClassName("img");
        ppimage[0].style.backgroundImage = `url('${imageex + d[0].file}')`;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//Candidates START HERE

let darray;
let inviteclickedpid;

let candidates = () => {
  //   let userid = localStorage.getItem("userloged");
  let userid = getCookie("userloged");

  let formdata = new FormData();

  formdata.append("user_id", userid);

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

  let fetchAllCandidates = fetch(`${baseUrl}/allcandidates`, options).catch(
    (err) => {
      console.log(err);
    }
  );

  fetchAllCandidates
    .then((res) => res.json())
    .then((d) => {
      for (let i = 0; i < d.length; i++) {
        if ((profileimage = d[i].profile_picture === "default")) {
          let title = d[i].professional_title;
          let first_name = d[i].first_name;
          let second_name = d[i].last_name;
          let rate = d[i].rate;
          let isonline = d[i].is_online;
          let profid = d[i].user_id;

          let candidates = document.getElementsByClassName("candidatelist")[0];
          var candidate = document.createElement("div");
          var carditems = ` <div class="candidatecarrier">
            <div id="profileid">${profid}</div>
            <section class="cadpsec">
    
              <div class="cadprfmain">
                
                <div class="divprfshow">
                <div id="profileid">${profid}</div>
                
                    <div class="cadprofile">
                        <img src="/images/user.png" alt="">
                        <section id="online" class="online">
                         
                        </section>
    
                      </div>
    
                      <div class="js">
                        <h3 id="cadph3">${
                          first_name + " " + second_name.slice(0, 1)
                        }</h3>
                      <p id="cadp">${isonline}</p>
                      </div>
    
                </div>
    
           
    
                  <div class="approvalr">
                    <h3 id="aprateh3">${rate}%</h3>
                    <p>Aprroval Rate</p>
                  </div>
              </div>
              
    
            </section>
            <section class="cadabout">
                   <div class="cadaboutag">
                    <h3>About Candidate:</h3>
                    <p id="cadaboutp">${title}</p>
    
                   </div>
               
                <button class="invitetohjob">Invite to Job</button>
    
            </section>
    
        </div>`;

          candidate.innerHTML = carditems;
          candidates.append(candidate);
        } else {
          let title = d[i].professional_title;
          let first_name = d[i].first_name;
          let second_name = d[i].last_name;
          let rate = d[i].rate;
          let isonline = d[i].is_online;
          let profid = d[i].user_id;

          let profileimage = d[i].profile_picture;
          const imageex = "data:image/png;base64,";

          let pimage = imageex + profileimage;

          let candidates = document.getElementsByClassName("candidatelist")[0];
          var candidate = document.createElement("div");
          var carditems = ` <div class="candidatecarrier">
            <div id="profileid">${profid}</div>
            <section class="cadpsec">
    
              <div class="cadprfmain">
                
                <div class="divprfshow">
                <div id="profileid">${profid}</div>
                
                    <div class="cadprofile">
                        <img src="${pimage}" alt="">
                        <section id="online" class="online">
                         
                        </section>
    
                      </div>
    
                      <div class="js">
                        <h3 id="cadph3">${
                          first_name + " " + second_name.slice(0, 1)
                        }</h3>
                      <p id="cadp">${isonline}</p>
                      </div>
    
                </div>
    
           
    
                  <div class="approvalr">
                    <h3 id="aprateh3">${rate}%</h3>
                    <p>Aprroval Rate</p>
                  </div>
              </div>
              
    
            </section>
            <section class="cadabout">
                   <div class="cadaboutag">
                    <h3>About Candidate:</h3>
                    <p id="cadaboutp">${title}</p>
    
                   </div>
               
                <button class="invitetohjob" >Invite to Job</button>
    
            </section>
    
        </div>`;

          candidate.innerHTML = carditems;
          candidates.append(candidate);
        }
      }
      //code to ditermine whether the profile is online or not
      let ondiv = document.getElementsByClassName("online");
      for (let i = 0; i < ondiv.length; i++) {
        let styled = ondiv[i];
        let inerl =
          styled.parentElement.parentElement.children[2].children[1].innerHTML;

        if (inerl === "online") {
          styled.style.display = "block";
        }
      }

      //here is the code for view  profile clicked by from candidates side
      let profileclicked = document.getElementsByClassName("divprfshow");
      for (let i = 0; i < profileclicked.length; i++) {
        let profile = profileclicked[i];
        profile.addEventListener("click", (e) => {
          let vr =
            profile.parentElement.firstElementChild.children[0].innerHTML;

           sessionStorage.setItem("profileid", vr);
         
          window.location.href = "/candidateprofile.html";
        });
      }

      //here will be code to check invite

      let invitebutton = document.getElementsByClassName("invitetohjob");
      for (let i = 0; i < invitebutton.length; i++) {
        let jobinvitbtclicked = invitebutton[i];

        jobinvitbtclicked.addEventListener("click", (e) => {
          let invitesec = document.getElementsByClassName("invitesec");
          invitesec[0].classList.add("addedinvitesec");
          //   let userdi = localStorage.getItem("userloged");
          let userdi = getCookie("userloged");

          let clickedprofileid =
            jobinvitbtclicked.parentElement.parentElement.firstElementChild
              .innerHTML;

          inviteclickedpid = clickedprofileid;

          let getformdata = new FormData();
          getformdata.append("user_id", userdi);
          getformdata.append("candindate_id", clickedprofileid);
          const inloader = document.querySelector(".invitesecloader");

          const questionElement = document.getElementById("question");
          const answerOptionsElement =
            document.getElementById("answer-options");

          const answerForm = document.getElementById("answer-form");
          const submitBtn = document.getElementById("submit-btn");
          const resultElement = document.getElementById("result");

          const question = "Select Jobs to invite candindate to apply";
          const options1 = {
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

            body: getformdata,
          };
          inloader.style.display = "flex";
          let fetchInviteJobs = fetch(
            `${baseUrl}/getinvitejobs`,
            options1
          ).catch((err) => {
            console.log(err);
          });

          fetchInviteJobs
            .then((res) => res.json())
            .then((d) => {
              inloader.style.display = "none";
              const {already, noposted} = d;

              darray = d;

              if (noposted) {
                const label = document.createElement("div");
                label.innerHTML = `
                    <div class="oops-container">
                    <div class="oops-icon">&#128543;</div>
                    <div class="oops-message">Oops! Something Went Wrong</div>
                    <div class="oops-description">"It seems you haven't posted any jobs yet, or this candidate has already applied to all of your job posts."</div>
                </div>`;

                answerOptionsElement.appendChild(label);
                submitBtn.style.display = "none";
                questionElement.textContent = "";
              } else if (already) {
                const label = document.createElement("div");
                label.innerHTML = `  <div class="oops-container">
                    <div class="oops-icon">&#128543;</div>
                    <div class="oops-message">Oops! Something Went Wrong</div>
                    <div class="oops-description">It seems this candidate has been invited in all your posted jobs!</div>
                </div>`;

                answerOptionsElement.appendChild(label);
                submitBtn.style.display = "none";
                questionElement.textContent = "";
              } else {
                console.log(d);

                let allj = [];
                for (let i = 0; i < d.length; i++) {
                  allj.push(d[i].job_title);
                }
                const answers = allj;
                questionElement.textContent = question;

                answers.forEach((answer, index) => {
                  const label = document.createElement("label");
                  label.innerHTML = `<input oninput="inviteundo()" type="radio" name="answer" value="${answer}"> ${answer}<br>`;

                  answerOptionsElement.appendChild(label);
                  submitBtn.style.display = "block";
                });
              }
            });
          /*
         
          */
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

let checkempcomplete = () => {
  //   let user_id = localStorage.getItem("userloged");
  let user_id = getCookie("userloged");

  let formdata = new FormData();

  formdata.append("user_id", user_id);

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

  let fetchCheckComplete = fetch(
    `${baseUrl}/checkepcomplete`,
    optionWithFormData
  ).catch((err) => {
    console.log(err);
  });

  fetchCheckComplete
    .then((res) => res.json())
    .then((d) => {
      const {nocomplete} = d;
      if (nocomplete) {
         sessionStorage.setItem("employercomplete", "no");
       
        setTimeout(() => {
          document
            .getElementsByClassName("incompleteprofile")[0]
            .classList.add("adddincompleteprofile");
        }, 700);
      } else {
         sessionStorage.setItem("employercomplete", "yes");
        
      }
    });
};

let checkempcompletecancel = () => {
  document
    .getElementsByClassName("incompleteprofile")[0]
    .classList.remove("adddincompleteprofile");
};

function invitesubmit() {
  const resultElement = document.getElementById("result");

  const selectedAnswer = document.querySelector('input[name="answer"]:checked');
  const inloader = document.querySelector(".invitesecloader");

  if (!selectedAnswer) {
    resultElement.textContent = "Please select a Job.";
  } else {
    inloader.style.display = "flex";
    let selectedvalue = selectedAnswer.value;
    let fdata = new FormData();

    function findIndexByValue(array, valueToFind) {
      for (let i = 0; i < array.length; i++) {
        const keys = Object.keys(array[i]);
        for (const key of keys) {
          if (array[i][key] === valueToFind) {
            return i; // Return the index of the first object with the value
          }
        }
      }
      return -1; // Value not found in any object
    }

    fdata.append("candindate_id", inviteclickedpid);
    fdata.append(
      "job_id",
      darray[findIndexByValue(darray, selectedvalue)].job_id
    );

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

      body: fdata,
    };

    let fetchSendInvite = fetch(
      `${baseUrl}/sendinvite`,
      optionWithFormData
    ).catch((err) => {
      console.log(err);
    });

    fetchSendInvite
      .then((res) => res.json())
      .then((d) => {
        const {affectedRows} = d;
        if (affectedRows) {
          inloader.style.display = "none";
          const answerOptionsElement =
            document.getElementById("answer-options");
          while (answerOptionsElement.hasChildNodes()) {
            answerOptionsElement.firstChild.remove();
          }
          let invitesec = document.getElementsByClassName("invitesec");
          invitesec[0].classList.remove("addedinvitesec");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
function invitecancel() {
  const answerOptionsElement = document.getElementById("answer-options");
  while (answerOptionsElement.hasChildNodes()) {
    answerOptionsElement.firstChild.remove();
  }
  let invitesec = document.getElementsByClassName("invitesec");
  invitesec[0].classList.remove("addedinvitesec");
}

function inviteundo() {
  const resultElement = document.getElementById("result");
  resultElement.textContent = "";
}

//Message display Start here

let displaypoptions = () => {
  let poptions = document.getElementsByClassName("poptions");
  poptions[0].classList.add("addpoptions");
};
let hidepoptions = () => {
  let poptions = document.getElementsByClassName("poptions");
  poptions[0].classList.remove("addpoptions");
};

/*EMPLOYERPROFILE JS START HERE*/

let eprofload = () => {
  let loader = document.getElementsByClassName("loader");

  //   let theid = localStorage.getItem("userloged");
  let theid = getCookie("userloged");
  let formdata = new FormData();

  formdata.append("user_id", theid);

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

  let fetchProfileData = fetch(
    `${baseUrl}/eprofiledata`,
    optionWithFormData
  ).catch((err) => {
    console.log(err);
  });
  loader[0].classList.add("addedloader");

  fetchProfileData
    .then((res) => res.json())
    .then((d) => {
      const {user_id, city, first_name, last_name, country, no_complete} = d[1];
      /* loader1[0].classList.remove("addedloader1");*/

      if (no_complete) {
        try {
          if (d[0].file === "noprofilepic") {
          } else {
            const imageex = "data:image/png;base64,";
            let ppimage = document.getElementsByClassName("epprof");
            ppimage[0].style.backgroundImage = `url('${imageex + d[0].file}')`;
          }
        } catch (error) {
          console.log(error);
        }
        let firstname = document.getElementById("epfirstname");
        let secondname = document.getElementById("epsecondname");

        let country1 = document.getElementById("estate");

        let city1 = document.getElementById("ecity1");

        firstname.innerHTML = first_name;
        secondname.innerHTML = last_name;
        city1.innerHTML = "";

        country1.innerHTML = country;

        loader[0].classList.remove("addedloader");
      } else {
        try {
          if (d[0].file === "noprofilepic") {
          } else {
            const imageex = "data:image/png;base64,";
            let ppimage = document.getElementsByClassName("epprof");
            ppimage[0].style.backgroundImage = `url('${imageex + d[0].file}')`;
          }
        } catch (error) {
          console.log(error);
        }

        let firstname = document.getElementById("epfirstname");
        let secondname = document.getElementById("epsecondname");
        let department = document.getElementById("newdeppart");

        let city = document.getElementById("ecity1");

        let country = document.getElementById("estate");
        let summary = document.getElementById("epsp");
        let companyname = document.getElementById("epp");

        firstname.innerHTML = d[1].first_name;
        secondname.innerHTML = d[1].last_name;
        department.innerHTML = d[1].department;

        city.innerHTML = d[1].city;
        country.innerHTML = d[1].country;

        summary.innerHTML = d[1].company_summary;
        companyname.innerHTML = d[1].company_name;

        loader[0].classList.remove("addedloader");
      }
    });
  let fetchJobProfile = fetch(
    `${baseUrl}/jprofilejobs`,
    optionWithFormData
  ).catch((err) => {
    console.log(err);
  });

  fetchJobProfile
    .then((res) => res.json())
    .then((d) => {
      document.querySelector("#numberjobs").innerHTML = d.length;
      if (d.length > 1) {
        document.querySelector(".jbsp").innerHTML = "Jobs";
      } else {
        document.querySelector(".jbsp").innerHTML = "Job";
      }

      for (let i = 0; i < d.length; i++) {
        let order = d[i].job_id;
        let date = d[i].posted_date;
        let status;

        if (d[i].is_active === "y") {
          status = "In Progress";
        } else {
          status = "Closed";
        }

        let number = d[i].submits;

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
    })
    .catch((err) => {
      console.log(err);
    });

  const WIDTH = 150;
  let input = document.getElementById("input");
  input.addEventListener("change", (e) => {
    let image_file = e.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(image_file);

    reader.onload = (e) => {
      let image_url = e.target.result;

      let image = document.createElement("img");
      image.src = image_url;

      image.onload = (e) => {
        let canvas = document.createElement("canvas");
        let ratio = WIDTH / e.target.width;
        canvas.width = WIDTH;
        canvas.height = e.target.height * ratio;

        const context = canvas.getContext("2d");
        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        let new_url = context.canvas.toDataURL("image/jpg", 100);
        let new_image = document.createElement("img");
        new_image.src = new_url;

        /*console.log(new_url);*/
        /* document.getElementsByClassName("wrapper")[0].style.backgroundImage=`url(${image_url})`*/

        urltoFile(new_url);
      };

      // document.getElementsByClassName("wrapper")[0].style.backgroundImage=`url(${image_url})`
    };
  });
  let urltoFile = (url) => {
    let arr = url.split(",");
    let name = arr[0].match(/:(.*?);/)[1];
    let data = arr[1];

    let todString = atob(data);
    let n = todString.length;
    let dataarr = new Uint8Array(n);
    while (n--) {
      dataarr[n] = todString.charCodeAt(n);
    }
    // let useid = localStorage.getItem("userloged");
    // let firstname = localStorage.getItem("pfname");
    let useid = getCookie("userloged");
    let firstname = getCookie("pfname");

    let file = new File([dataarr], firstname + useid + ".png", {type: name});

    let formdata = new FormData();
    formdata.append("file", file);
    formdata.append("user_id", useid);

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

    let fetchImage = fetch(`${baseUrl}/eimageupload`, optionWithFormData).catch(
      (err) => {
        console.log(err);
      }
    );

    fetchImage
      .then((res) => res.json())
      .then((d) => {
        const {file} = d;

        let datatype = "data:image/png;base64,";
        let imageurl = datatype + file;

        document.getElementsByClassName(
          "wrapper"
        )[0].style.backgroundImage = `url(${imageurl})`;
      });
    //here is where you will upload your profile picture
  };

  let form = document.getElementById("eeditform");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    let scrolldiv = document.getElementById("profileedit");
    let loader1 = document.getElementById("loader1");
    let fname = document.getElementById("efirstname");
    let lnamme = document.getElementById("esecondname");
    let departmentname = document.getElementById("etitle");
    let countr = document.getElementById("ecountry");
    let city = document.getElementById("ecity");

    let ecompanyname = document.getElementById("ecompanyname");

    let companysummary = document.getElementById("eabout");

    if (countr.value === "") {
      countr.style.border = "1px solid red";
      scrolldiv.scroll({
        top: 0,
        behavior: "smooth",
      });
    } else {
      let formdata = new FormData();
      //   let id = localStorage.getItem("userloged");
      let id = getCookie("userloged");
      formdata.append("user_id", id);
      formdata.append("firstname", fname.value);
      formdata.append("secondname", lnamme.value);
      formdata.append("country", countr.value);
      formdata.append("department", departmentname.value);
      formdata.append("companyname", ecompanyname.value);
      formdata.append("companysumm", companysummary.value);
      formdata.append("city", city.value);

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

      let fetchEdit = fetch(
        `${baseUrl}/editep`,
        optionWithFormData
      ).catch((err) => {
        console.log(err);
      });
      loader1.style.display = "flex";

      fetchEdit
        .then((res) => res.json())
        .then((d) => {
          const {sucess} = d;
          if (sucess) {
            loader1.style.display = "none";
            form.reset();
            location.reload();
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  });
};

let profileeditbutton = () => {
  let loader1 = document.getElementById("loader1");
  loader1.style.display = "flex";

  let editpage = document.getElementsByClassName("profileedit");

  editpage[0].classList.add("addedprofileedit");
  //   let theid = localStorage.getItem("userloged");
  let theid = getCookie("userloged");
  let formdata = new FormData();

  formdata.append("user_id", theid);

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

  let fetchEditedData = fetch(
    `${baseUrl}/geteeditdata`,
    optionWithFormData
  ).catch((err) => {
    console.log(err);
  });

  fetchEditedData
    .then((res) => res.json())
    .then((d) => {
      const {user_id, first_name, last_name, country, no_complete} = d[1];
      loader1.style.display = "none";
      console.log(d);

      if (no_complete) {
        if (d[0].file === "noprofilepic") {
        } else {
          const imageex = "data:image/png;base64,";
          let ppimage = document.getElementsByClassName("wrapper");
          ppimage[0].style.backgroundImage = `url('${imageex + d[0].file}')`;
        }

        let fname = document.getElementById("efirstname");
        let lnamme = document.getElementById("esecondname");
        let countr = document.getElementById("ecountry");

        fname.value = first_name;
        lnamme.value = last_name;
        countr.value = country;
      } else {
        if (d[0].file === "noprofilepic") {
        } else {
          const imageex = "data:image/png;base64,";
          let ppimage = document.getElementsByClassName("wrapper");
          ppimage[0].style.backgroundImage = `url('${imageex + d[0].file}')`;
        }

        let fname = document.getElementById("efirstname");
        let lnamme = document.getElementById("esecondname");
        let ptitle = document.getElementById("etitle");
        let countr = document.getElementById("ecountry");
        let ecity = document.getElementById("ecity");
        let companyname = document.getElementById("ecompanyname");

        let achive = document.getElementById("eabout");

        fname.value = d[1].first_name;
        lnamme.value = d[1].last_name;
        ptitle.value = d[1].department;

        countr.value = d[1].country;
        ecity.value = d[1].city;

        achive.value = d[1].company_summary;
        companyname.value = d[1].company_name;
      }
    });
};

let profileeditcancel = () => {
  let editpage = document.getElementsByClassName("profileedit");
  editpage[0].classList.remove("addedprofileedit");
};

/*MESSENGER START HERE*/
let mainchats_count = document.getElementById("ac");
let main_message_box = document.getElementsByClassName("message");
let message_thread_container = document.getElementById("messagethreads");
let messageh = document.getElementById("messageheeader");
let thcontainer = document.getElementsByClassName("messagethreads");
let real_thread = document.getElementsByClassName("thread");
let wholechatscarrier = document.getElementById("wholemescontainer");

let chats = () => {
  message_thread_container.style.display = "block";
  wholechatscarrier.style.display = "none";

  messageh.innerHTML = "Chats!";

  main_message_box[0].classList.add("addmessage");
  let message_p_icon = document.getElementById("mesimg");
  let threads = [
    {
      message_id: "0001",
      sender_name: "Karanja G",
      message_body:
        "Im a software developer and i Im a software developer and i love what i do i cant think of something else  that would make me",
      sender_prof:
        "url('/images/financial-manager-job-description-4000x2667-20201114.jpeg')",
      message_state: "new",
      thread_id: "karg",
      time_stamp: "8:40pm",
      count: 2,
    },
    {
      message_id: "0002",
      sender_name: "Samantha K",
      message_body: "This is a second thread a trial on threads functionality",
      sender_prof: "url('/images/model-g07596919e_1280.jpg')",
      message_state: "new",
      time_stamp: "9:30pm",
      thread_id: "samk",
      count: 1,
    },
    {
      message_id: "0003",
      sender_name: "Kato M",
      message_body: "This is a third thread a trial on threads functionality",
      sender_prof: "url('/images/mentor-ga06c0b8e3_1280.jpg')",
      message_state: "new",
      thread_id: "katm",
      time_stamp: "2:15am",
      count: 4,
    },
    {
      message_id: "0004",
      sender_name: "Support",
      message_body: "What is wrong with your order?",
      sender_prof: "url('/images/mentor-ga06c0b8e3_1280.jpg')",
      message_state: "new",
      thread_id: "support",
      time_stamp: "2:15am",
      count: 4,
    },
  ];

  if (real_thread.length > 0) {
    for (let i = 0; i < threads.length; i++) {
      real_thread[0].remove();
    }
  }

  for (let i = 0; i < threads.length; i++) {
    let name = threads[i].sender_name;
    let time = threads[i].time_stamp;
    let message = threads[i].message_body.slice(0, 30);
    let count = threads[i].count;
    let thrid = threads[i].thread_id;
    var threadc = document.createElement("div");
    var mesthreads = document.getElementsByClassName("messagethreads")[0];

    let thread_content = ` <div class="thread">
    <section class="imgpart">
    <p class="messagethreadid">${thrid}</p>

        <section class="mesimg" id="mesimg">
   
        </section>
     </section>
     <section class="namemes">
        <p class="mesp" id="mesp">${name}</p>
        <p id="threadp2">${message + "...."}</p>
   
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

    threadc.innerHTML = thread_content;
    mesthreads.append(threadc);
    let sender_ppicture = document.getElementById("mesimg");
    sender_ppicture.style.backgroundImage = threads[i].sender_prof;
  }

  let threaddiv = document.getElementsByClassName("thread");

  for (var i = 0; i < threaddiv.length; i++) {
    let clickedthread = threaddiv[i];
    clickedthread.addEventListener("click", () => {
      let clickedthread_id =
        clickedthread.firstElementChild.firstElementChild.innerHTML;
      let thread_name = clickedthread.children[1].children[0].innerHTML;

      chatbox(clickedthread_id, thread_name);

      message_thread_container.style.display = "none";
    });
  }
};

let messageboxdis = () => {
  main_message_box[0].classList.remove("addmessage");
};

let chatbox = (letcaht_id, name) => {
  wholechatscarrier.style.display = "block";

  let p_iname = document.getElementById("mesp1");
  p_iname.innerHTML = name;

  let karg = [
    {
      message_id: 1003,
      message_type: "send",
      time_stamp: "8:30pm",
      body: "I would be more than happy if i get the opportunity to work with you",
    },
    {
      message_id: 1003,
      message_type: "receive",
      time_stamp: "5:40pm",
      body: "This sounds great what is your qulifications?",
    },
  ];
  let samk = [
    {
      message_id: 1003,
      message_type: "send",
      time_stamp: "1:30am",
      body: "Im a software developer and i Im a software developer and i love what i do i cant think of something else  that would make me ",
    },
    {
      message_id: 1003,
      message_type: "receive",
      time_stamp: "12:00pm",
      body: "it was great learning about you ",
    },
  ];

  let katm = [
    {
      message_id: 1003,
      message_type: "send",
      time_stamp: "2:30am",
      body: "Im looking to be hired in a position of nurse administration",
    },
    {
      message_id: 1003,
      message_type: "receive",
      time_stamp: "8:30pm",
      body: "wow wonderful to hear that for how long have you been a software developer ",
    },
  ];

  let support = [
    {
      message_id: 10001,
      message_type: "send",
      time_stamp: "2:30am",
      body: "I want help with order 4007",
    },
    {
      message_id: 1003,
      message_type: "receive",
      time_stamp: "8:30pm",
      body: "What's wrong with the otrder?",
    },
  ];

  let messagesarray = [];
  if (letcaht_id === "karg") {
    messagesarray.length = 0;
    messagesarray = messagesarray.concat(karg);
  } else if (letcaht_id === "katm") {
    messagesarray.length = 0;
    messagesarray = messagesarray.concat(katm);
  } else if (letcaht_id === "samk") {
    messagesarray.length = 0;
    messagesarray = messagesarray.concat(samk);
  } else if (letcaht_id === "support") {
    messagesarray.length = 0;
    messagesarray = messagesarray.concat(support);
  }

  //extra removecodes
  let car = document.getElementById("messagecarrier");
  while (car.hasChildNodes()) {
    car.firstChild.remove();
  }

  for (let i = 0; i < messagesarray.length; i++) {
    let type = messagesarray[i].message_type;
    let ts = messagesarray[i].time_stamp;
    let mbody = messagesarray[i].body;

    let chatscarrier = document.getElementsByClassName("messagecarrier")[0];
    let messdiv = document.createElement("div");
    let mess_content;
    if (type === "send") {
      mess_content = `<div class="sendmessage">
            <p class="sendmp">${mbody}</p>
            <p class="timefmp sendstyle">${ts}</p>
           
               </div>`;
    } else if (type === "receive") {
      mess_content = `<div class="receivemessage">
            <p class="receivmp">${mbody}</p>
            <p class="timefmp restyle">${ts}</p>
               </div>`;
    }

    messdiv.innerHTML = mess_content;
    chatscarrier.append(messdiv);
  }
};

let sendb = () => {
  let form = document.getElementById("form");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let text = document.getElementById("text");
    const tstamp = new Date().toLocaleString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    let chatscarrier = document.getElementsByClassName("messagecarrier")[0];
    let messdiv = document.createElement("div");

    let mess_content = `<div class="sendmessage">
        <p class="sendmp">${text.value}</p>
        <p class="timefmp sendstyle">${tstamp}</p>
       
           </div>`;
    messdiv.innerHTML = mess_content;
    chatscarrier.append(messdiv);

    form.reset();
  });
};

let support = (id, nam) => {
  messageh.innerHTML = "Hey!<br>How can we help you?";
  main_message_box[0].classList.add("addmessage");
  message_thread_container.style.display = "none";
  chatbox(id, nam);
};

//NOTIFICATIONS JAVASCRIPT START HERE
let notiload = () => {
  let noticarrier = document.getElementsByClassName("noticarrier")[0];
  let notiarray = [
    {
      noti_id: 1003,
      noti_title: "Job",
      order_id: 98989,
      body: "application has been accepted.",
      time_stamp: "Feb 24, 2022, 4:11 PM",
      img_type: "/images/customer-service.png",
    },
    {
      noti_id: 1003,
      noti_title: "Job",
      order_id: 98989,
      body: "application has been accepted.",
      time_stamp: "Feb 24, 2022, 4:11 PM",
      img_type: "/images/customer-service.png",
    },
    {
      noti_id: 1003,
      noti_title: "Job",
      order_id: 98989,
      body: "application has been accepted.",
      time_stamp: "Feb 24, 2022, 4:11 PM",
      img_type: "/images/customer-service.png",
    },
  ];
  for (let i = 0; i < notiarray.length; i++) {
    let noti_t = notiarray[i].noti_title;
    let order_id = notiarray[i].order_id;
    let body = notiarray[i].body;
    let tms = notiarray[i].time_stamp;
    let noti_icon = notiarray[i].img_type;

    let noticontent = `<div class="noti">
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

    </div>`;

    let notidiv = document.createElement("div");
    notidiv.innerHTML = noticontent;
    noticarrier.append(notidiv);
  }
};

/*ORDERS DETAILS START HERE*/

let orderdetails = () => {
     let jbid = sessionStorage.getItem("jobpostid");
  
  let loader = document.getElementsByClassName("loader");

  let jobtitle = document.getElementById("odh2");
  let name = document.getElementById("odp");
  let city = document.getElementById("citysta");
  let country = document.getElementById("countrysta");
  let time_posted = document.getElementById("postedt");
  let pay_rate = document.getElementById("payrate");
  let benefits = document.getElementById("benefits");
  let type = document.getElementById("ttype");
  let about = document.getElementById("aboutj");
  let responsibilities = document.getElementById("tasksres");
  let poster = document.getElementsByClassName("postername");
  let depart = document.getElementsByClassName("depart");

  const formdata = new FormData();
  formdata.append("job_id", jbid);
  formdata.append("type", "or");
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

  let fetchDetails = fetch(`${baseUrl}/sedetails`, optionWithFormData).catch(
    (err) => {}
  );
  loader[0].classList.add("addedloader");

  fetchDetails
    .then((res) => res.json())
    .then((d) => {
      let orderarray = d;

      let time;
      if (parseInt(orderarray[0].time_posted) > 60) {
        time = Math.trunc(parseInt(orderarray[0].time_posted) / 60) + " hours";
      } else if (Math.trunc(parseInt(orderarray[0].time_posted) / 24) > 0) {
        time = Math.trunc(parseInt(orderarray[0].time_posted) / 24) + " days";
      } else {
        time = orderarray[0].time_posted + " minutes";
      }

      jobtitle.innerHTML = orderarray[0].job_title;
      name.innerHTML = orderarray[0].company_name;
      city.innerHTML = orderarray[0].state_province + " " + orderarray[0].city;
      time_posted.innerHTML = time;
      poster[0].innerHTML = orderarray[0].first_name + ",";
      depart[0].innerHTML = orderarray[0].department;
      country.innerHTML = orderarray[0].country;
      pay_rate.innerHTML = orderarray[0].pay;
      benefits.innerHTML = orderarray[0].benefit;
      type.innerHTML = orderarray[0].job_type;
      about.innerHTML = orderarray[0].summary;
      responsibilities.innerHTML = orderarray[0].responsibilities;
    })
    .catch((err) => {
      console.log(err);
    });

  const sformdata = new FormData();
  sformdata.append("job_id", jbid);
  sformdata.append("type", "any");
  const soptions = {
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

    body: sformdata,
  };
  // https://1ed2-105-231-144-76.ngrok.io/api'

  //https://half-geode-roundworm.glitch.me/api

  let sf = fetch(`${baseUrl}/sedetails`, soptions).catch((err) => {});
  sf.then((res) => res.json()).then((d) => {
    let skillsarray = d;
    for (values in skillsarray[0]) {
      if (skillsarray[0][values] != null) {
        let skill = skillsarray[0][values];
        let skillcarier = document.getElementsByClassName("skillst")[0];
        let skilldiv = document.createElement("div");
        let skill_content = `<section class="skillcarrier">
              ${skill}        
            </section>`;
        skilldiv.innerHTML = skill_content;
        skillcarier.append(skilldiv);
        loader[0].classList.remove("addedloader");
      }
    }
  });
};
let orderdetailsvalue;
let orderdetailsvalueupdate = (vr) => {
  orderdetailsvalue = vr;
  /* console.log(orderdetailsvalue)*/
};

/*
let ordervalue=()=>{
orderdetails(2);
   
   
}*/

let trial = () => {
  let t = document.getElementById("vague2");
  console.log(t);
};

/*
let seeorder=()=>{
    
}



/*
let buttonclicked= document.getElementsByClassName("orderbutton");

for(let i=0;i<buttonclicked.length;i++){
    let button=buttonclicked[i]
    button.addEventListener('click',()=>{
        console.log(button);
    })
    
}*/

let seeorder = () => {
     let v = sessionStorage.getItem("id");
  
  orderdetails(0);
};

//MY APPLICATIONs START HERE

let myapporders = () => {
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
    {
      title: "Marketing Director",
      name: "Tix Dog",
      city: "Sacramento",
      country: "California",
      bids: "7",
      type: "Part time",
      pay: "10/h",
      order_id: 1,
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

    let orderlist = document.getElementsByClassName("jobsappcarrier")[0];
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
            <button class="orderbuttonp" id="orderbutton">See Job</button>
            
        
        </section>
        
        
        </div>`;
    order.innerHTML = orderitems;
    orderlist.append(order);
  }
  //here is the code for seeorder
  let buttonclicked = document.getElementsByClassName("orderbuttonp");
  for (let i = 0; i < buttonclicked.length; i++) {
    let button = buttonclicked[i];
    button.addEventListener("click", (e) => {
      let varbutton = e.target;
      let value =
        varbutton.parentElement.parentElement.firstElementChild.innerHTML;

      sessionStorage.setItem("id", value);
      
       sessionStorage.setItem("value", "Cancel");
      

      window.location.href = "/emp-orderdetails.html";
    });
  }
};

//HERE IS THE CODE FOR MY JOB POST

let myjobspost = () => {
  active();
};

let active = () => {
  let loader = document.getElementsByClassName("loader");

  let jblist = document.getElementById("jobspostlist");
  while (jblist.hasChildNodes()) {
    jblist.firstChild.remove();
  }

  let active = document.getElementById("active");
  let draft = document.getElementById("draft");
  let closed = document.getElementById("closed");

  active.style.borderBottom = "3px solid hsl(188,47%,20%)";
  draft.style.borderBottom = "3px solid transparent";
  closed.style.borderBottom = "3px solid transparent";

  const formdata = new FormData();
  //   let posterid = localStorage.getItem("userloged");
  //   let firstnmae = localStorage.getItem("pfname");
  let posterid = getCookie("userloged");
  let firstnmae = getCookie("pfname");

  formdata.append("orderid", posterid);
  formdata.append("firstname", firstnmae);
  formdata.append("q", "many");

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
  // https://1ed2-105-231-144-76.ngrok.io/api'

  //https://half-geode-roundworm.glitch.me/api

  let f = fetch(
    `${baseUrl}/mjpost`,
    options
  ).catch((err) => {});
  loader[0].classList.add("addedloader");
  f.then((res) => res.json())
    .then((d) => {
      const {err} = d;
      if (err) {
        console.log(err);
      } else {
        let mjarray = d;

        let myjpostscarrier =
          document.getElementsByClassName("jobspostlist")[0];
        console.log(mjarray);
        for (let i = 0; i < mjarray.length; i++) {
          let jbid = mjarray[i].job_id;
          let tit = mjarray[i].job_title;
          let dar = mjarray[i].time_posted;
          let appli = mjarray[i].submits;

          let jbdiv = document.createElement("div");
          let jbcontents = ` <div class="jobspcarrier">
            <section class="jbtitle">
                <div class="titlej">
                    <div class="animeb">
    
                    </div>
                    <p id="jbtitlep1">${tit}</p>
    
                </div>
                <p id="jbordrid">${jbid}</p>
    
            </section>
            <section class="jbstatus">
                <button>
                    Open to Applications
                </button>
                
            </section>
            <section class="jbbids">
                <div class="jbremin">
                    <p class="jbp1">Applications</p>
                    <p class="jbp2">Expires in 17 days</p>
    
                </div>
                <div class="jb3bs">
                    <div class="bscarrier">
                       <section></section>
                       <section></section>
                       <section></section>
    
                    </div>
                    <div class="jbquicklinks">
                        <div class="jbwd">
                            <img src="/images/cancel.png" alt="">
                            <p>Cancel Job</p>
                         
                        </div>
    
                        <div class="jbwd">
                            <img src="/images/copy.png" alt="">
                            <p>Create Similar Job</p>
                         
                        </div>
                        <div class="jbwd">
                            <img src="/images/invite.png" alt="">
                            <p>Invite candidates</p>
                         
                        </div>
    
                    </div>
    
                </div>
                
            </section>
    
        </div>`;

          jbdiv.innerHTML = jbcontents;
          myjpostscarrier.append(jbdiv);
        }
        loader[0].classList.remove("addedloader");
        //on this part calling  jobs applications page
        let myjpostscarrierdiv =
          document.getElementsByClassName("jobspcarrier");
        for (let i = 0; i < myjpostscarrierdiv.length; i++) {
          let clickedjobpost = myjpostscarrierdiv[i];
          clickedjobpost.addEventListener("click", () => {
            let jobpostid =
              clickedjobpost.parentElement.children[0].children[0].children[1]
                .innerHTML;

             sessionStorage.setItem("jobpostid", jobpostid);
            
            window.location.href = "/vieworderbids.html";
          });
        }
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

let drafts = () => {
  let jblist = document.getElementById("jobspostlist");
  while (jblist.hasChildNodes()) {
    jblist.firstChild.remove();
  }
  let active = document.getElementById("active");
  let draft = document.getElementById("draft");
  let closed = document.getElementById("closed");

  active.style.borderBottom = "3px solid transparent";
  draft.style.borderBottom = "3px solid hsl(188,47%,20%)";
  closed.style.borderBottom = "3px solid transparent";
  let mjarray = [];

  let myjpostscarrier = document.getElementsByClassName("jobspostlist")[0];

  for (let i = 0; i < mjarray.length; i++) {
    let jbid = mjarray[i].order_id;
    let tit = mjarray[i].title;
    let dar = mjarray[i].dayremain;
    let appli = mjarray[i].applications;

    let jbdiv = document.createElement("div");
    let jbcontents = ` <div class="jobspcarrier">
        <section class="jbtitle">
            <div class="titlej">
                <div class="animeb">

                </div>
                <p id="jbtitlep1">${tit}</p>

            </div>
            <p id="jbordrid">${jbid}</p>

        </section>
        <section class="jbstatus">
            <button>
               Draft
            </button>
            
        </section>
        <section class="jbbids">
            <div class="jbremin">
                <p class="jbp1">Applications</p>
                <p class="jbp2">Expires in 17 days</p>

            </div>
            <div class="jb3bs">
                <div class="bscarrier">
                   <section></section>
                   <section></section>
                   <section></section>

                </div>
                <div class="jbquicklinks">
                    <div class="jbwd">
                        <img src="/images/cancel.png" alt="">
                        <p>Cancel Job</p>
                     
                    </div>

                    <div class="jbwd">
                        <img src="/images/copy.png" alt="">
                        <p>Create Similar Job</p>
                     
                    </div>
                    <div class="jbwd">
                        <img src="/images/invite.png" alt="">
                        <p>Invite candidates</p>
                     
                    </div>

                </div>

            </div>
            
        </section>

    </div>`;

    jbdiv.innerHTML = jbcontents;
    myjpostscarrier.append(jbdiv);
  }
  //on this part calling  jobs applications page
  let myjpostscarrierdiv = document.getElementsByClassName("jobspcarrier");
  for (let i = 0; i < myjpostscarrierdiv.length; i++) {
    let clickedjobpost = myjpostscarrierdiv[i];
    clickedjobpost.addEventListener("click", () => {
      let jobpostid =
        clickedjobpost.parentElement.children[0].children[0].children[1]
          .innerHTML;

       sessionStorage.setItem("jobpostid", jobpostid);
    
      window.location.href = "/vieworderbids.html";
    });
  }
};
let closed = () => {
  let jblist = document.getElementById("jobspostlist");
  while (jblist.hasChildNodes()) {
    jblist.firstChild.remove();
  }
  let active = document.getElementById("active");
  let draft = document.getElementById("draft");
  let closed = document.getElementById("closed");

  active.style.borderBottom = "3px solid transparent";
  draft.style.borderBottom = "3px solid transparent";
  closed.style.borderBottom = "3px solid hsl(188,47%,20%)";
  let mjarray = [];

  let myjpostscarrier = document.getElementsByClassName("jobspostlist")[0];

  for (let i = 0; i < mjarray.length; i++) {
    let jbid = mjarray[i].order_id;
    let tit = mjarray[i].title;
    let dar = mjarray[i].dayremain;
    let appli = mjarray[i].applications;

    let jbdiv = document.createElement("div");
    let jbcontents = ` <div class="jobspcarrier">
        <section class="jbtitle">
            <div class="titlej">
                <div class="animeb">

                </div>
                <p id="jbtitlep1">${tit}</p>

            </div>
            <p id="jbordrid">${jbid}</p>

        </section>
        <section class="jbstatus">
            <button>
                Closed
            </button>
            
        </section>
        <section class="jbbids">
            <div class="jbremin">
                <p class="jbp1">Applications</p>
                <p class="jbp2">Expires in 17 days</p>

            </div>
            <div class="jb3bs">
                <div class="bscarrier">
                   <section></section>
                   <section></section>
                   <section></section>

                </div>
                <div class="jbquicklinks">
                    <div class="jbwd">
                        <img src="/images/cancel.png" alt="">
                        <p>Cancel Job</p>
                     
                    </div>

                    <div class="jbwd">
                        <img src="/images/copy.png" alt="">
                        <p>Create Similar Job</p>
                     
                    </div>
                    <div class="jbwd">
                        <img src="/images/invite.png" alt="">
                        <p>Invite candidates</p>
                     
                    </div>

                </div>

            </div>
            
        </section>

    </div>`;

    jbdiv.innerHTML = jbcontents;
    myjpostscarrier.append(jbdiv);
  }
  //on this part calling  jobs applications page
  let myjpostscarrierdiv = document.getElementsByClassName("jobspcarrier");
  for (let i = 0; i < myjpostscarrierdiv.length; i++) {
    let clickedjobpost = myjpostscarrierdiv[i];
    clickedjobpost.addEventListener("click", () => {
      let jobpostid =
        clickedjobpost.parentElement.children[0].children[0].children[1]
          .innerHTML;

      sessionStorage.setItem("jobpostid", jobpostid);
      window.location.href = "/vieworderbids.html";
    });
  }
};

/*

let cbutton=(vr)=>{
    let cancelbutton = document.getElementById("odbutton");
    console.log(cancelbutton);
    cancelbutton.innerHTML=vr;

}
cbutton(sessionStorage.getItem('value'));
*/

//VIEW JOBS START HERE*/

let viewjobsapplications = () => {
  let jobtitle = document.getElementById("jbtitlep1");
  let jjobid = document.getElementById("jbordrid");
  let jbappid = document.getElementById("jbappsid");
  let applicationssum = document.getElementById("numberofapp");
  let daysremaining = document.getElementById("daysremaining");

  let jbid = sessionStorage.getItem("jobpostid");
 

  jbappid.innerHTML = jbid;

  jjobid.innerHTML = jbid;

  const formdata = new FormData();
  formdata.append("job_id", jbid);
  formdata.append("q", "l");

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
  // https://1ed2-105-231-144-76.ngrok.io/api'

  //https://half-geode-roundworm.glitch.me/api

  let f = fetch(
    `${baseUrl}/mjpost`,
    options
  ).catch((err) => {});

  f.then((res) => res.json())
    .then((d) => {
      let mjarray = d;

      jobtitle.innerHTML = mjarray[0].job_title;
      applicationssum.innerHTML = mjarray[0].submits;
      daysremaining.innerHTML = mjarray[0].time_posted;

      //candidates who have applyed start here
      viewallaplicants();
    })
    .catch((err) => {
      console.log(err);
    });

  interviewasums();
  shortlistsum();
};

let viewallaplicants = () => {
  let loader = document.getElementsByClassName("loader");
  let car = document.getElementById("candidatelist");
  //code to ditermine whether the profile is online or not

  while (car.hasChildNodes()) {
    car.firstChild.remove();
  }

  let allapplicants_title = document.getElementById("allappli");
  let shortlist = document.getElementById("shortlist");
  let invites = document.getElementById("invites");

  allapplicants_title.style.borderBottom = "3px solid hsl(188,47%,20%)";
  shortlist.style.borderBottom = "3px solid transparent";
  invites.style.borderBottom = "3px solid transparent";

let jbid = sessionStorage.getItem("jobpostid");
  

  const formdata = new FormData();
  formdata.append("job_id", jbid);
  formdata.append("q", "l");

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
  // https://1ed2-105-231-144-76.ngrok.io/api'

  //https://half-geode-roundworm.glitch.me/api

  let f = fetch(
    `${baseUrl}/viewbids`,
    options
  ).catch((err) => {});
  loader[0].classList.add("addedloader");
  f.then((res) => res.json()).then((d) => {
    loader[0].classList.remove("addedloader");
    if (d.length === 0) {
      let candidates = document.getElementsByClassName("candidatelist")[0];
      var candidate = document.createElement("div");
      var carditems = `<div class="empty-message">
        <div class="empty-icon">&#128533;</div>
        <div class="empty-text">Oops! No Results Found</div>
       
    </div>`;
      candidate.innerHTML = carditems;
      candidates.append(candidate);
    }
    for (let i = 0; i < d.length; i++) {
      if ((profileimage = d[i].profile_picture === "default")) {
        let title = d[i].professional_title;
        let first_name = d[i].first_name;
        let second_name = d[i].last_name;
        let rate = d[i].rate;
        let isonline = d[i].is_online;
        let profid = d[i].user_id;
        let payarr = d[i].pay_rate.split(",");

        let candidates = document.getElementsByClassName("candidatelist")[0];
        var candidate = document.createElement("div");
        var carditems = `    <div class="candidatecarrier">
            <div id="profileid">${profid}</div>
            <section class="cadpsec">
              <div class="cadprfmain">
                
                <div class="divprfshow">
                    <div id="profileid">${profid}</div>
                   

                    <div class="cadprofile">
                        <img src="/images/user.png" alt="">
                        <section class="online">
                          
                        </section>

                      </div>

                      <div class="js">
                        <h3 id="cadph3">${
                          first_name + " " + second_name.slice(0, 1)
                        }</h3>
                      <p id="cadp">${isonline}</p>
                      </div>

                </div>

           

                  <div class="approvalr">
                    <h3 id="aprateh3">${rate}%</h3>
                    <p>Aprroval Rate</p>
                  </div>
              </div>
              

            </section>
            <section class="cadabout">
                   <div class="cadaboutag">
                     <div class="startchat"><h3>About Candidate:</h3>
                        <div id="startcb" class="startcb">Request Interview</div>
                    </div>
                    <p id="cadaboutp">${title}</p>

                   </div>
               
                  <div class="bidshiresec">
                    
                    <div class="hirethreebuttons">
                        <section></section>
                        <section></section>
                        <section></section>
                        
                    </div>
                    <div class="canclejobsec">
                        <div class="cancelappl">
                            <img src="/images/cancel.png" alt="">
                            <p>Decline</p>

                        </div>
                        <div class="cancelappl">
                            <img src="/images/add-to-favorites.png" alt="">
                            <p>Add to Shortlist</p>

                        </div>
                        
                    </div>
                    <div class="hirepart">
                        <p id="hirepp">${payarr[0] + payarr[1] + "/hr"}</p>
                        <div class="hirebutton">
                            Hire
                        </div>

                    </div>

                  </div>
                  

            </section>

        </div>
`;

        candidate.innerHTML = carditems;
        candidates.append(candidate);
      } else {
        let title = d[i].professional_title;
        let first_name = d[i].first_name;
        let second_name = d[i].last_name;
        let rate = d[i].rate;
        let isonline = d[i].is_online;
        let profid = d[i].user_id;
        let payarr = d[i].pay_rate.split(",");

        let profileimage = d[i].profile_picture;
        const imageex = "data:image/png;base64,";

        let pimage = imageex + profileimage;

        let candidates = document.getElementsByClassName("candidatelist")[0];
        var candidate = document.createElement("div");
        var carditems = `   <div class="candidatecarrier">
            <div id="profileid">${profid}</div>
            <section class="cadpsec">
              <div class="cadprfmain">
                
                <div class="divprfshow">
                    <div id="profileid">${profid}</div>
                   

                    <div class="cadprofile">
                        <img src="${pimage}" alt="">
                        <section class="online">
                          
                        </section>

                      </div>

                      <div class="js">
                        <h3 id="cadph3">${
                          first_name + " " + second_name.slice(0, 1)
                        }</h3>
                      <p id="cadp">${isonline}</p>
                      </div>

                </div>

           

                  <div class="approvalr">
                    <h3 id="aprateh3">${rate}%</h3>
                    <p>Aprroval Rate</p>
                  </div>
              </div>
              

            </section>
            <section class="cadabout">
                   <div class="cadaboutag">
                     <div class="startchat"><h3>About Candidate:</h3>
                        <div id="startcb" class="startcb">Request Interview</div>
                    </div>
                    <p id="cadaboutp">${title}</p>

                   </div>
               
                  <div class="bidshiresec">
                    
                    <div class="hirethreebuttons">
                        <section></section>
                        <section></section>
                        <section></section>
                        
                    </div>
                    <div class="canclejobsec">
                        <div class="cancelappl canclejob">
                            <img src="/images/cancel.png" alt="">
                            <p>Decline</p>

                        </div>
                        <div class="cancelappl shortlist">
                            <img src="/images/add-to-favorites.png" alt="">
                            <p>Add to Shortlist</p>

                        </div>
                        
                    </div>
                    <div class="hirepart">
                        <p id="hirepp">${payarr[0] + payarr[1] + "/hr"}</p>
                        <div class="hirebutton">
                            Hire
                        </div>

                    </div>

                  </div>
                  

            </section>

        </div>`;

        candidate.innerHTML = carditems;
        candidates.append(candidate);
      }
    }

    //code to ditermine whether the profile is online or not
    let ondiv = document.getElementsByClassName("online");
    for (let i = 0; i < ondiv.length; i++) {
      let styled = ondiv[i];
      let inerl =
        styled.parentElement.parentElement.children[2].children[1].innerHTML;

      if (inerl === "online") {
        styled.style.display = "block";
      }
    }

    //here is the code for view  profile clicked by from candidates side
    let profileclicked = document.getElementsByClassName("divprfshow");
    for (let i = 0; i < profileclicked.length; i++) {
      let profile = profileclicked[i];
      profile.addEventListener("click", (e) => {
        let vr = profile.parentElement.firstElementChild.children[0].innerHTML;

         sessionStorage.setItem("profileid", vr);
        
        window.location.href = "/candidateprofile.html";
      });
    }
    // here will be a code to add profile to shortlist
    let shortlist = document.querySelectorAll(".cancelappl");
    for (let i = 0; i < shortlist.length; i++) {
      let addtoshortlist = shortlist[i];
      addtoshortlist.addEventListener("click", (e) => {
        let value =
          addtoshortlist.parentElement.parentElement.parentElement.parentElement
            .firstElementChild.innerHTML;

        let bclicked = addtoshortlist.children[1].innerHTML;
        if (bclicked === "Add to Shortlist") {
      let jbid = sessionStorage.getItem("jobpostid");
          

          const formdata = new FormData();
          formdata.append("job_id", jbid);
          formdata.append("user_id", value);

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
          // https://1ed2-105-231-144-76.ngrok.io/api'

          //https://half-geode-roundworm.glitch.me/api

          let f = fetch(
            `${baseUrl}/addshortlist`,
            options
          ).catch((err) => {});
          loader[0].classList.add("addedloader");
          f.then((res) => res.json())
            .then((d) => {
              loader[0].classList.remove("addedloader");
              const {affectedRows} = d;
              if (affectedRows) {
                window.location.reload();
              }
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
        }
      });
    }

    //here is the code  for Request interview

    let requestinterviewB = document.getElementsByClassName("startcb");
    for (let i = 0; i < requestinterviewB.length; i++) {
      let clickedB = requestinterviewB[i];

      clickedB.addEventListener("click", () => {
        let cid =
          clickedB.parentElement.parentElement.parentElement.parentElement
            .firstElementChild.innerHTML;

        let jbid = sessionStorage.getItem("jobpostid");
           
        const formdata = new FormData();

        formdata.append("user_id", cid);
        // formdata.append("employer_id", localStorage.getItem("userloged"));
        formdata.append("employer_id", getCookie("userloged"));
        formdata.append("job_id", jbid);

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
        // https://1ed2-105-231-144-76.ngrok.io/api'

        //https://half-geode-roundworm.glitch.me/api

        let f = fetch(
          `${baseUrl}/requistinterview`,
          options
        ).catch((err) => {});
        loader[0].classList.add("addedloader");

        f.then((res) => res.json())
          .then((d) => {
            loader[0].classList.remove("addedloader");
            const {res} = d;
            console.log(d);
            let prompt = document.getElementsByClassName("prompt")[0];
            let mess = document.getElementById("messagepp");

            if (res === "noallapplied") {
              prompt.style.display = "flex";
              mess.innerHTML =
                "Oops! Add interview slots to be able to invite this candidate.";
            } else if (res === "addmoreslots") {
              prompt.style.display = "flex";
              mess.innerHTML =
                "Oops! Add more interview slots to be able to invite this candidate.";
            } else if (res === 1) {
             let jbid = sessionStorage.getItem("jobpostid");
              

              const formdata = new FormData();
              formdata.append("job_id", jbid);
              formdata.append("user_id", cid);

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
              // https://1ed2-105-231-144-76.ngrok.io/api'

              //https://half-geode-roundworm.glitch.me/api

              let f = fetch(
                `${baseUrl}/addshortlist`,
                options
              ).catch((err) => {});
              loader[0].classList.add("addedloader");
              f.then((res) => res.json())
                .then((d) => {
                  loader[0].classList.remove("addedloader");
                  const {affectedRows} = d;
                  if (affectedRows) {
                    window.location.reload();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    }
  });
};

let shortlist = () => {
  let loader = document.getElementsByClassName("loader");

  let car = document.getElementById("candidatelist");
  while (car.hasChildNodes()) {
    car.firstChild.remove();
  }
  let allapplicants_title = document.getElementById("allappli");
  let shortlist = document.getElementById("shortlist");
  let invites = document.getElementById("invites");

  allapplicants_title.style.borderBottom = "3px solid transparent";
  shortlist.style.borderBottom = "3px solid hsl(188,47%,20%)";
  invites.style.borderBottom = "3px solid transparent";

 let jbid = sessionStorage.getItem("jobpostid");
  

  const formdata = new FormData();
  formdata.append("job_id", jbid);
  formdata.append("q", "l");

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
  // https://1ed2-105-231-144-76.ngrok.io/api'

  //https://half-geode-roundworm.glitch.me/api

  let f = fetch(
    `${baseUrl}/shortlist`,
    options
  ).catch((err) => {});
  loader[0].classList.add("addedloader");
  f.then((res) => res.json()).then((d) => {
    loader[0].classList.remove("addedloader");
    if (d.length === 0) {
      let candidates = document.getElementsByClassName("candidatelist")[0];
      var candidate = document.createElement("div");
      var carditems = `<div class="empty-message">
        <div class="empty-icon">&#128533;</div>
        <div class="empty-text">Oops! No Results Found</div>
       
    </div>`;
      candidate.innerHTML = carditems;
      candidates.append(candidate);
    } else {
      let coLor;
      let peevents;
      let curse;

      let rbackgroundC;
      let rcoLor;
      let rpeevents;
      let rbColor;
      let rcurse;

      for (let i = 0; i < d.length; i++) {
        if ((profileimage = d[i].profile_picture === "default")) {
          let title = d[i].professional_title;
          let first_name = d[i].first_name;
          let second_name = d[i].last_name;
          let rate = d[i].rate;
          let isonline = d[i].is_online;
          let profid = d[i].user_id;
          let payarr = d[i].pay_rate.split(",");

          /*
            function checkTimestamps(timestamps) {
                const currentDate = new Date();
              
                for (const timestamp of timestamps) {
                  const date = new Date(timestamp);
              
                  if (date < currentDate) {
                    backgroundC="background-color:green;";
                    coLor="color:white;";
                    peevents="pointer-events:all;";
                    bColor="border: 1px solid blue;";
                    curse="cursor: pointer"
                     
                  }
                }
              }
            
            if(d[i].endtime.length===0){

            }
              checkTimestamps(d[i].endtime)
             */
          if (d[i].invitedexist === 1 || d[i].slotsexist === 1) {
            rbackgroundC = "background-color: hsla(287,63%,47%,0.5);";
            rcoLor = "color:hsla(0,0%,100%,0.5);";
            rpeevents = "pointer-events:none;";
            rbColor = "border: 1px solid hsla(287,63%,47%,0.5);";
            rcurse = "cursor: default;";

            coLor = "color: hsla(4,0%,0%,0.2);";
            peevents = "pointer-events:none;";
            curse = "cursor: default;";
          } else {
            rbackgroundC = "purple";
            rcoLor = "white";
            rpeevents = "pointer-events:all;";
            rbColor = "border: 1px solid purple";
            rcurse = "cursor: ponter;";

            coLor = "color: black;";
            peevents = "pointer-events:all;";
            curse = "cursor: ponter;";
          }

          let candidates = document.getElementsByClassName("candidatelist")[0];
          var candidate = document.createElement("div");
          var carditems = `<div class="candidatecarrier">
            <div id="profileid">${profid}</div>
            <section class="cadpsec">
              <div class="cadprfmain">
                
                <div class="divprfshow">
                    <div id="profileid">${profid}</div>
                   

                    <div class="cadprofile">
                        <img src="/images/user.png" alt="">
                        <section class="online">
                          
                        </section>

                      </div>

                      <div class="js">
                        <h3 id="cadph3">${
                          first_name + " " + second_name.slice(0, 1)
                        }</h3>
                      <p id="cadp">${isonline}</p>
                      </div>

                </div>

           

                  <div class="approvalr">
                    <h3 id="aprateh3">${rate}%</h3>
                    <p>Aprroval Rate</p>
                  </div>
              </div>
              

            </section>
            <section class="cadabout">
                   <div class="cadaboutag">
                     <div class="startchat"><h3>About Candidate:</h3>
                     <div style="${
                       rbackgroundC + rcoLor + rpeevents + rbColor + rcurse
                     }" id="startcb" class="startcb">Request Interview</div>
                    </div>
                    <p id="cadaboutp">${title}</p>

                   </div>
               
                  <div class="bidshiresec">
                    
                    <div class="hirethreebuttons">
                        <section></section>
                        <section></section>
                        <section></section>
                        
                    </div>
                    <div class="canclejobsec">
                        <div class="cancelappl">
                            <img src="/images/cancel.png" alt="">
                            <p>Decline</p>

                        </div>
                        <div style="${
                          coLor + peevents + curse
                        }"  class="cancelappl">
                            <img src="/images/add-to-favorites.png" alt="">
                            <p>Remove</p>

                        </div>
                        
                    </div>
                    <div  class="hirepart">
                        <p id="hirepp">${payarr[0] + payarr[1] + "/hr"}</p>
                        <div  class="hirebutton">
                            Hire
                        </div>

                    </div>

                  </div>
                  

            </section>

        </div>
`;

          candidate.innerHTML = carditems;
          candidates.append(candidate);
        } else {
          let title = d[i].professional_title;
          let first_name = d[i].first_name;
          let second_name = d[i].last_name;
          let rate = d[i].rate;
          let isonline = d[i].is_online;
          let profid = d[i].user_id;
          let payarr = d[i].pay_rate.split(",");

          /*

            function checkTimestamps(timestamps) {
                const currentDate = new Date();
              
                for (const timestamp of timestamps) {
                  const date = new Date(timestamp);
              
                  if (date < currentDate) {
                    backgroundC="background-color:green;";
                    coLor="color:white;";
                    peevents="pointer-events:all;";
                    bColor="border: 1px solid green;";
                    curse="cursor: pointer;"
                     
                  }
                }
              }
            
            
              checkTimestamps(d[i].endtime)
            
*/

          if (d[i].invitedexist === 1 || d[i].slotsexist === 1) {
            rbackgroundC = "background-color: hsla(287,63%,47%,0.5);";
            rcoLor = "color:hsla(0,0%,100%,0.5);";
            rpeevents = "pointer-events:none;";
            rbColor = "border: 1px solid hsla(287,63%,47%,0.5);";
            rcurse = "cursor: default;";

            coLor = "color: hsla(4,0%,0%,0.2);";
            peevents = "pointer-events:none;";
            curse = "cursor: default;";
          } else {
            rbackgroundC = "purple";
            rcoLor = "white";
            rpeevents = "pointer-events:all;";
            rbColor = "border: 1px solid purple";
            rcurse = "cursor: ponter;";

            coLor = "color: black;";
            peevents = "pointer-events:all;";
            curse = "cursor: ponter;";
          }

          let profileimage = d[i].profile_picture;
          const imageex = "data:image/png;base64,";

          let pimage = imageex + profileimage;

          let candidates = document.getElementsByClassName("candidatelist")[0];
          var candidate = document.createElement("div");
          var carditems = `   <div class="candidatecarrier">
            <div id="profileid">${profid}</div>
            <section class="cadpsec">
              <div class="cadprfmain">
                
                <div class="divprfshow">
                    <div id="profileid">${profid}</div>
                   

                    <div class="cadprofile">
                        <img src="${pimage}" alt="">
                        <section class="online">
                          
                        </section>

                      </div>

                      <div class="js">
                        <h3 id="cadph3">${
                          first_name + " " + second_name.slice(0, 1)
                        }</h3>
                      <p id="cadp">${isonline}</p>
                      </div>

                </div>

           

                  <div class="approvalr">
                    <h3 id="aprateh3">${rate}%</h3>
                    <p>Aprroval Rate</p>
                  </div>
              </div>
              

            </section>
            <section class="cadabout">
                   <div class="cadaboutag">
                     <div class="startchat"><h3>About Candidate:</h3>
                     <div style="${
                       rbackgroundC + rcoLor + rpeevents + rbColor + rcurse
                     }" id="startcb" class="startcb">Request Interview</div>
                    </div>
                    <p id="cadaboutp">${title}</p>

                   </div>
               
                  <div class="bidshiresec">
                    
                    <div class="hirethreebuttons">
                        <section></section>
                        <section></section>
                        <section></section>
                        
                    </div>
                    <div class="canclejobsec">
                        <div class="cancelappl">
                            <img src="/images/cancel.png" alt="">
                            <p>Decline</p>

                        </div>
                        <div style="${
                          coLor + peevents + curse
                        }"  class="cancelappl">
                            <img src="/images/add-to-favorites.png" alt="">
                            <p >Remove</p>

                        </div>
                        
                    </div>
                    <div   class="hirepart">
                        <p id="hirepp">${payarr[0] + payarr[1] + "/hr"}</p>
                        <div class="hirebutton">
                            Hire
                        </div>

                    </div>

                  </div>
                  

            </section>

        </div>`;

          candidate.innerHTML = carditems;
          candidates.append(candidate);
        }
      }

      //code to ditermine whether the profile is online or not
      let ondiv = document.getElementsByClassName("online");
      for (let i = 0; i < ondiv.length; i++) {
        let styled = ondiv[i];
        let inerl =
          styled.parentElement.parentElement.children[2].children[1].innerHTML;

        if (inerl === "online") {
          styled.style.display = "block";
        }
      }
      //here is the code for view  profile clicked by from candidates side
      let profileclicked = document.getElementsByClassName("divprfshow");
      for (let i = 0; i < profileclicked.length; i++) {
        let profile = profileclicked[i];
        profile.addEventListener("click", (e) => {
          let vr =
            profile.parentElement.firstElementChild.children[0].innerHTML;

            sessionStorage.setItem("profileid", vr);
        
          window.location.href = "/candidateprofile.html";
        });
      }

      //code to cancel shortlist

      let shortlist = document.querySelectorAll(".cancelappl");
      for (let i = 0; i < shortlist.length; i++) {
        let addtoshortlist = shortlist[i];
        addtoshortlist.addEventListener("click", (e) => {
          let value =
            addtoshortlist.parentElement.parentElement.parentElement
              .parentElement.firstElementChild.innerHTML;

          let bclicked = addtoshortlist.children[1].innerHTML;
          if (bclicked === "Remove") {
            let jbid = sessionStorage.getItem("jobpostid");
            

            const formdata = new FormData();
            
          } else {
          }
        });
      }

      // code for send interview request

      let requestinterviewB = document.getElementsByClassName("startcb");
      for (let i = 0; i < requestinterviewB.length; i++) {
        let clickedB = requestinterviewB[i];

        clickedB.addEventListener("click", () => {
          let cid =
            clickedB.parentElement.parentElement.parentElement.parentElement
              .firstElementChild.innerHTML;

         let jbid = sessionStorage.getItem("jobpostid");
           
          const formdata = new FormData();

          formdata.append("user_id", cid);
        //   formdata.append("employer_id", localStorage.getItem("userloged"));
        formdata.append("employer_id", getCookie("userloged"));
          formdata.append("job_id", jbid);

          const options = {
            method: "POST",

            body: formdata,
          };
          // https://1ed2-105-231-144-76.ngrok.io/api'

          //https://half-geode-roundworm.glitch.me/api

          let f = fetch(
            `${baseUrl}/requistinterview`,
            options
          ).catch((err) => {});
          loader[0].classList.add("addedloader");

          f.then((res) => res.json())
            .then((d) => {
              loader[0].classList.remove("addedloader");
              const {res} = d;
              console.log(d);
              let prompt = document.getElementsByClassName("prompt")[0];
              let mess = document.getElementById("messagepp");

              if (res === "noallapplied") {
                prompt.style.display = "flex";
                mess.innerHTML =
                  "Oops! Add interview slots to be able to invite this candidate.";
              } else if (res === "addmoreslots") {
                prompt.style.display = "flex";
                mess.innerHTML =
                  "Oops! Add more interview slots to be able to invite this candidate.";
              } else if (res === 1) {
                window.location.reload();
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

let invites = () => {
  let loader = document.getElementsByClassName("loader");
  loader[0].classList.add("addedloader");
  let car = document.getElementById("candidatelist");
  while (car.hasChildNodes()) {
    car.firstChild.remove();
  }
  let allapplicants_title = document.getElementById("allappli");
  let shortlist = document.getElementById("shortlist");
  let invites = document.getElementById("invites");

  allapplicants_title.style.borderBottom = "3px solid transparent";
  shortlist.style.borderBottom = "3px solid transparent";
  invites.style.borderBottom = "3px solid hsl(188,47%,20%)";

 let jbid = sessionStorage.getItem("jobpostid");
 

  const formdata = new FormData();
  formdata.append("job_id", jbid);

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

  let fetchEinvites = fetch(
    `${baseUrl}/einvites`,
    options
  ).catch((err) => {
    console.log(err);
  });

  /*
<div class="candidatecarrier">
               <div id="profileid">${profid}</div>
               <section class="cadpsec">
                   <div class="cadprfmain">
                     
                     <div class="divprfshow">
                         <div id="profileid">${profid}</div>
                        
             
                         <div class="cadprofile">
                             <img src="" alt="">
                             <section class="online">
                               
                             </section>
             
                           </div>
             
                           <div class="js">
                             <h3 id="cadph3">${first_name+" "+second_name.slice(0,1)}</h3>
                           <p id="cadp"></p>
                           </div>
             
                     </div>
             
                
             
                       <div class="approvalr">
                         <h3 id="aprateh3">${rate}%</h3>
                         <p>Aprroval Rate</p>
                       </div>
                   </div>
                   
             
                 </section>
               <section class="cadabout">
                      <div class="cadaboutag">
                       <h3>About Candidate:</h3>
                       <p id="cadaboutp">${title}</p>
       
                      </div>
                  
                   <button>Invited</button>
       
               </section>
       
           </div>


*/

  fetchEinvites.then((res) => res.json()).then((d) => {
    loader[0].classList.remove("addedloader");

    if (d.length === 0) {
      let candidates = document.getElementsByClassName("candidatelist")[0];
      var candidate = document.createElement("div");
      var carditems = `<div class="empty-message">
        <div class="empty-icon">&#128533;</div>
        <div class="empty-text">Oops! No Results Found</div>
       
    </div>`;
      candidate.innerHTML = carditems;
      candidates.append(candidate);
    }
    for (let i = 0; i < d.length; i++) {
      if ((profileimage = d[i].profile_picture === "default")) {
        let title = d[i].professional_title;
        let first_name = d[i].first_name;
        let second_name = d[i].last_name;
        let rate = d[i].rate;
        let isonline = d[i].is_online;
        let profid = d[i].user_id;

        let candidates = document.getElementsByClassName("candidatelist")[0];
        var candidate = document.createElement("div");
        var carditems = `  <div class="candidatecarrier">
            <div id="profileid">${profid}</div>
            <section class="cadpsec">
                <div class="cadprfmain">
                  
                  <div class="divprfshow">
                      <div id="profileid">${profid}</div>
                     
          
                      <div class="cadprofile">
                          <img src="/images/user.png" alt="">
                          <section class="online">
                            
                          </section>
          
                        </div>
          
                        <div class="js">
                          <h3 id="cadph3">${
                            first_name + " " + second_name.slice(0, 1)
                          }</h3>
                        <p id="cadp">${isonline}</p>
                        </div>
          
                  </div>
          
             
          
                    <div class="approvalr">
                      <h3 id="aprateh3">${rate}%</h3>
                      <p>Aprroval Rate</p>
                    </div>
                </div>
                
          
              </section>
            <section class="cadabout">
                   <div class="cadaboutag">
                    <h3>About Candidate:</h3>
                    <p id="cadaboutp">${title}</p>
    
                   </div>
               
                <button>Invited</button>
    
            </section>
    
        </div>
    `;

        candidate.innerHTML = carditems;
        candidates.append(candidate);
      } else {
        let title = d[i].professional_title;
        let first_name = d[i].first_name;
        let second_name = d[i].last_name;
        let rate = d[i].rate;
        let isonline = d[i].is_online;
        let profid = d[i].user_id;
        let payarr = d[i].pay_rate.split(",");

        let profileimage = d[i].profile_picture;
        const imageex = "data:image/png;base64,";

        let pimage = imageex + profileimage;

        let candidates = document.getElementsByClassName("candidatelist")[0];
        var candidate = document.createElement("div");
        var carditems = ` <div class="candidatecarrier">
            <div id="profileid">${profid}</div>
            <section class="cadpsec">
                <div class="cadprfmain">
                  
                  <div class="divprfshow">
                      <div id="profileid">${profid}</div>
                     
          
                      <div class="cadprofile">
                          <img src="" alt="">
                          <section class="online">
                            
                          </section>
          
                        </div>
          
                        <div class="js">
                          <h3 id="cadph3">${
                            first_name + " " + second_name.slice(0, 1)
                          }</h3>
                        <p id="cadp"></p>
                        </div>
          
                  </div>
          
             
          
                    <div class="approvalr">
                      <h3 id="aprateh3">${rate}%</h3>
                      <p>Aprroval Rate</p>
                    </div>
                </div>
                
          
              </section>
            <section class="cadabout">
                   <div class="cadaboutag">
                    <h3>About Candidate:</h3>
                    <p id="cadaboutp">${title}</p>
    
                   </div>
               
                <button>Invited</button>
    
            </section>
    
        </div>`;

        candidate.innerHTML = carditems;
        candidates.append(candidate);
      }
    }

    //code to ditermine whether the profile is online or not
    let ondiv = document.getElementsByClassName("online");
    for (let i = 0; i < ondiv.length; i++) {
      let styled = ondiv[i];
      let inerl =
        styled.parentElement.parentElement.children[2].children[1].innerHTML;

      if (inerl === "online") {
        styled.style.display = "block";
      }
    }

    //here is the code for view  profile clicked by from candidates side
    let profileclicked = document.getElementsByClassName("divprfshow");
    for (let i = 0; i < profileclicked.length; i++) {
      let profile = profileclicked[i];
      profile.addEventListener("click", (e) => {
        let vr = profile.parentElement.firstElementChild.children[0].innerHTML;

         sessionStorage.setItem("profileid", vr);
        
        window.location.href = "/candidateprofile.html";
      });
    }
  });
};

function selectslots() {
  document.getElementsByClassName("intergr2")[0].classList.toggle("addactive");
  document.getElementsByClassName("intergr1")[0].classList.remove("addactive");
  document.getElementById("confirmation-container").style.display = "none";
  document.querySelector(".interviewploader").style.display = "none";

  document
    .getElementsByClassName("interviewspart")[0]
    .classList.remove("interviewspartadded");

  const selectslotwindow = document.querySelector(".datesselect");
  selectslotwindow.classList.toggle("addeddatesselect");

  const prevMonthButton = document.getElementById("prevMonth");
  const nextMonthButton = document.getElementById("nextMonth");
  const monthYearElement = document.getElementById("monthYear");
  const daysElement = document.getElementById("days");
  const timezoneSelect = document.getElementById("timezone");
  const timeInput = document.getElementById("time");
  const submitButton = document.getElementById("submitBtn");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const today = new Date();
  let selectedDate = today;
  let selectedTime = "09:00"; // Default selected time
  const startTime = "09:00"; // Start time
  const endTime = "18:00"; // End time

  function renderCalendar(date) {
    const month = date.getMonth();
    const year = date.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    monthYearElement.textContent = `${months[month]} ${year}`;
    daysElement.innerHTML = "";

    for (let i = 1; i <= daysInMonth; i++) {
      const dayElement = document.createElement("div");
      dayElement.classList.add("day");
      dayElement.textContent = i;
      dayElement.addEventListener("click", () => selectDate(year, month, i));
      if (
        selectedDate.getDate() === i &&
        selectedDate.getMonth() === month &&
        selectedDate.getFullYear() === year
      ) {
        dayElement.classList.add("selected");
      }
      daysElement.appendChild(dayElement);
    }
  }

  function selectDate(year, month, day) {
    const selectedDateTime = new Date(
      year,
      month,
      day,
      parseInt(selectedTime.split(":")[0]),
      parseInt(selectedTime.split(":")[1])
    );
    const now = new Date();
    const selectedDateOnly = new Date(year, month, day);

    if (selectedDateOnly.getTime() === today.getTime()) {
      selectedDate = selectedDateTime;
      renderCalendar(selectedDate);
    } else if (selectedDateOnly >= today) {
      selectedDate = selectedDateOnly;
      renderCalendar(selectedDate);
    } else {
      alert("Please select a date from the current month and day onwards.");
    }
  }

  //here i added minutes
  function addMinutesToTime(inputTime, minutesToAdd) {
    const [hours, minutes] = inputTime.split(":").map(Number);
    let newHours = hours;
    let newMinutes = minutes + minutesToAdd;

    if (newMinutes >= 60) {
      newHours += Math.floor(newMinutes / 60);
      newMinutes %= 60;
    }
    const formattedHours = String(newHours).padStart(2, "0");
    const formattedMinutes = String(newMinutes).padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}`;
  }

  const timeInputEnd = document.getElementById("timeEnd");

  timeInputEnd.setAttribute("disabled", true);

  timeInput.addEventListener("input", (event) => {
    const now = new Date();
    const selectedTimeValue = event.target.value;
    const selectedDateTime = new Date(
      selectedDate.getFullYear(),
      selectedDate.getMonth(),
      selectedDate.getDate(),
      parseInt(selectedTimeValue.split(":")[0]),
      parseInt(selectedTimeValue.split(":")[1])
    );

    if (
      selectedDate.getDate() === today.getDate() &&
      selectedDate.getMonth() === today.getMonth() &&
      selectedDate.getFullYear() === today.getFullYear()
    ) {
      if (selectedDateTime >= now) {
        selectedTime = selectedTimeValue;
        timeInputEnd.removeAttribute("disabled");
        timeInputEnd.setAttribute("min", getMinTime(selectedTimeValue));
        timeInputEnd.setAttribute("max", getMaxTime(selectedTimeValue));

        const inputTime = timeInput.value;
        const minutesToAdd = 30;
        const newTime = addMinutesToTime(inputTime, minutesToAdd);
        timeInputEnd.value = newTime;
      } else {
        timeInputEnd.setAttribute("disabled", true);

        document.getElementById("wrongtime").innerHTML =
          "You can only select current hour and minutes onwards!";
        document.getElementById("time").style.border = "1px dotted red";
      }
    } else {
      selectedTime = selectedTimeValue;
      timeInputEnd.removeAttribute("disabled");
      timeInputEnd.setAttribute("min", getMinTime(selectedTimeValue));
      timeInputEnd.setAttribute("max", getMaxTime(selectedTimeValue));

      const inputTime = timeInput.value;
      const minutesToAdd = 30;
      const newTime = addMinutesToTime(inputTime, minutesToAdd);
      timeInputEnd.value = newTime;
    }
  });

  // ... (previous code)

  timeInputEnd.addEventListener("input", (event) => {
    const selectedTimeValueEnd = event.target.value;
    const selectedTimeValueStart = timeInput.value;

    const startHour = parseInt(selectedTimeValueStart.split(":")[0]);
    const startMinute = parseInt(selectedTimeValueStart.split(":")[1]);
    const endHour = parseInt(selectedTimeValueEnd.split(":")[0]);
    const endMinute = parseInt(selectedTimeValueEnd.split(":")[1]);

    const timeDiff = (endHour - startHour) * 60 + (endMinute - startMinute);

    if (timeDiff >= 30 && timeDiff <= 60) {
      selectedTime = selectedTimeValueEnd;
    } else if (timeDiff < 30) {
      document.getElementById("endwarn").innerHTML =
        "End time must be at least 30 minutes after start time.";
      document.getElementById("timeEnd").style.border = "1px dotted red";
      document.getElementById("submitBtn").setAttribute("disabled", true);

      timeInputEnd.value = getMinTime(selectedTimeValueStart);
    } else if (timeDiff > 60) {
      document.getElementById("endwarn").innerHTML =
        "End time cannot exceed 3 hours from start time.";
      document.getElementById("timeEnd").style.border = "1px solid red";

      document.getElementById("submitBtn").setAttribute("disabled", true);

      timeInputEnd.value = getMinTime(selectedTimeValueStart);
    }
  });

  // ... (rest of the code)

  // ... (rest of the code)

  // ... (rest of the code)

  function getMinTime(selectedTime) {
    const minTime = new Date(selectedDate);
    minTime.setHours(parseInt(selectedTime.split(":")[0]) + 1);
    minTime.setMinutes(parseInt(selectedTime.split(":")[1]) + 15);
    return minTime.toTimeString().slice(0, 5);
  }

  function getMaxTime(selectedTime) {
    const maxTime = new Date(selectedDate);
    maxTime.setHours(parseInt(selectedTime.split(":")[0]) + 3);
    return maxTime.toTimeString().slice(0, 5);
  }

  // ... (rest of the code)

  prevMonthButton.addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() - 1);
    renderCalendar(selectedDate);
  });

  nextMonthButton.addEventListener("click", () => {
    selectedDate.setMonth(selectedDate.getMonth() + 1);
    renderCalendar(selectedDate);
  });

  renderCalendar(selectedDate);

  submitButton.addEventListener("click", () => {
    if (selectedDate && selectedTime) {
      const selectedTimeValueStart = timeInput.value;
      const selectedTimeValueEnd = timeInputEnd.value;
      if (selectedTimeValueStart === "") {
        document.getElementById("time").style.border = "1px solid red";
      } else if (selectedTimeValueEnd === "") {
        document.getElementById("timeEnd").style.border = "1px solid red";
      } else {
        const selectedTimeValueStart = timeInput.value; // Example time value
        const selectedTimeParts = selectedTimeValueStart.split(":");
        const selectedStartDateTime = new Date(selectedDate);

        selectedStartDateTime.setHours(parseInt(selectedTimeParts[0]));
        selectedStartDateTime.setMinutes(parseInt(selectedTimeParts[1]));

        const selectedTimeValueEnd = timeInputEnd.value; // Example time value
        const selectedTimePartsE = selectedTimeValueEnd.split(":");
        const selectedEndDateTime = new Date(selectedDate);

        selectedEndDateTime.setHours(parseInt(selectedTimePartsE[0]));
        selectedEndDateTime.setMinutes(parseInt(selectedTimePartsE[1]));

         let jbid = sessionStorage.getItem("jobpostid");
      

        let formdata = new FormData();
        formdata.append("job_id", jbid);
        formdata.append("start_tme", selectedStartDateTime);
        formdata.append("end_time", selectedEndDateTime);

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

        let f = fetch(
          `${baseUrl}/interviewslots`,
          options
        ).catch((err) => {
          console.log(err);
        });
        timeInput.value = "";
        timeInputEnd.value = "";
        document
          .getElementsByClassName("slotsdisplay")[0]
          .classList.add("slotdisplayadded");
        document
          .getElementsByClassName("slotloader")[0]
          .classList.add("addedslotloader");

        f.then((res) => res.json()).then((d) => {
          const {five, inbetween} = d;

          if (inbetween) {
            document
              .getElementsByClassName("slotloader")[0]
              .classList.remove("addedslotloader");

            document
              .getElementsByClassName("error-box")[0]
              .classList.add("addederrb");
            let inbetweenmess = document.getElementById("errbmess");
            inbetweenmess.innerHTML = `Kindly you are not allowed to add a slot in between already existing slots
                    all slots are expected to be sequencial`;
            document.getElementById("submitBtn").setAttribute("disabled", true);
            const timeInputEnd = document.getElementById("timeEnd");
            const timeInput = document.getElementById("time");
            timeInputEnd.setAttribute("disabled", true);
            timeInput.setAttribute("disabled", true);
            document
              .getElementsByClassName("submitBtn")[0]
              .classList.add("addedsBtn");
          } else if (five) {
            document
              .getElementsByClassName("slotloader")[0]
              .classList.remove("addedslotloader");

            document
              .getElementsByClassName("error-box")[0]
              .classList.add("addederrb");
            let inbetweenmess = document.getElementById("errbmess");
            inbetweenmess.innerHTML = `The start time of your your slot should be at least 
                    five minutes after the end of the previous slot.`;
            document.getElementById("submitBtn").setAttribute("disabled", true);
            const timeInputEnd = document.getElementById("timeEnd");
            const timeInput = document.getElementById("time");
            timeInputEnd.setAttribute("disabled", true);
            timeInput.setAttribute("disabled", true);
            document
              .getElementsByClassName("submitBtn")[0]
              .classList.add("addedsBtn");
          } else {
            allinterviewslots();
          }
        });

        console.log(`Start time:  ${selectedStartDateTime}`);
        console.log(`End time:  ${selectedEndDateTime}`);
      }
    } else {
      document.getElementById("timeEnd").style.border = "1px solid red";
      document.getElementById("time").style.border = "1px solid red";
    }
  });
}

let allinterviewslots = () => {
  let formdata = new FormData();
 let jbid = sessionStorage.getItem("jobpostid");
  
  formdata.append("job_id", jbid);

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

  let f = fetch(
    `${baseUrl}/allintervieslots`,
    options
  ).catch((err) => {
    console.log(err);
  });
  document
    .getElementsByClassName("slotloader")[0]
    .classList.add("addedslotloader");

  f.then((res) => res.json()).then((d) => {
    document
      .getElementsByClassName("slotloader")[0]
      .classList.remove("addedslotloader");

    let slotdiv = document.getElementsByClassName("slotsdisplay")[0];
    let slotdiv1 = document.getElementById("slotsdisplay");
    while (slotdiv1.hasChildNodes()) {
      slotdiv1.firstChild.remove();
    }

    let deleteslotbutton;
    let backgroundColor;
    let innermessage;

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

      if (d[i].user_id === null) {
        deleteslotbutton = "block";
        backgroundColor = "green";
        innermessage = "Open";
      } else {
        deleteslotbutton = "none";
        backgroundColor = "purple";
        innermessage = "Taken";
      }

      let element = document.createElement("div");

      let content = `<div class="slotdcarrier">
                        <span class="slotid">${d[i].interviewslot_id}</span>
                        <div class="slotdcarrier1">
                            <span style="display:${deleteslotbutton};" class="slotcancel">
                                &#x1F5D9;
                            </span>
                        <p class="sttime">
                            ${"Start date: " + removeTimezone(d[i].start_time)}
                        </p>

                        <span style=" background-color: ${backgroundColor};" class="slotstatus">${innermessage}</span>
                
                        <p class="edtime">
                        ${"End date: " + removeTimezone(d[i].end_time)}
                        </p>
    
                        </div>
                    </div>`;
      element.innerHTML = content;

      slotdiv.append(element);
      slotdiv.scrollTop = slotdiv.scrollHeight;
    }

    //code to listean to cancelbutton

    let cancelb = document.getElementsByClassName("slotcancel");

    for (let i = 0; i < cancelb.length; i++) {
      let clickedslot = cancelb[i];

      clickedslot.addEventListener("click", () => {
        let clickedslotid =
          clickedslot.parentElement.parentElement.firstElementChild.innerHTML;

        let formdata2 = new FormData();
        formdata2.append("slot_id", clickedslotid);
        const options2 = {
          method: "POST",
          body: formdata2,
        };

        let f = fetch(
          `${baseUrl}/deleteinslot`,
          options2
        ).catch((err) => {
          console.log(err);
        });
        document
          .getElementsByClassName("slotloader")[0]
          .classList.add("addedslotloader");

        f.then((res) => res.json()).then((d) => {
          const {affectedrows} = d;

          if (affectedrows === 0 || affectedrows === 1) {
            document
              .getElementsByClassName("slotloader")[0]
              .classList.remove("addedslotloader");
            allinterviewslots();
          }
        });
      });
    }
  });
};

let calenderundo = () => {
  document.getElementById("submitBtn").removeAttribute("disabled");
  document.getElementById("wrongtime").innerHTML = "";
  document.getElementById("time").style.border = "1px dotted #3498db";
  document.getElementById("endwarn").innerHTML = "";
  document.getElementById("timeEnd").style.border = "1px dotted #3498db";
};
let interviewsl = () => {
  document.getElementsByClassName("intergr3")[0].classList.toggle("addactive");

  document
    .getElementsByClassName("slotsdisplay")[0]
    .classList.toggle("slotdisplayadded");

  allinterviewslots();
};

let removeerrorbox = () => {
  document.getElementsByClassName("error-box")[0].classList.remove("addederrb");
  let inbetweenmess = document.getElementById("errbmess");
  inbetweenmess.innerHTML = ``;
  document.getElementById("submitBtn").removeAttribute("disabled");
  const timeInputEnd = document.getElementById("timeEnd");
  const timeInput = document.getElementById("time");

  timeInputEnd.removeAttribute("disabled");
  timeInput.removeAttribute("disabled");
  document.getElementsByClassName("submitBtn")[0].classList.remove("addedsBtn");
  allinterviewslots();
};

let allinterviess = () => {
  document.getElementsByClassName("intergr1")[0].classList.toggle("addactive");
  document.getElementsByClassName("intergr2")[0].classList.remove("addactive");
  const selectslotwindow = document.querySelector(".datesselect");
  selectslotwindow.classList.remove("addeddatesselect");

  document
    .getElementsByClassName("interviewspart")[0]
    .classList.toggle("interviewspartadded");

  let jbid = sessionStorage.getItem("jobpostid");
  
  let formdata = new FormData();
  formdata.append("job_id", jbid);

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

  let fetchInterviesTaken = fetch(
    `${baseUrl}/takeninterviews`,
    options
  ).catch((err) => {
    console.log(err);
  });
  document.querySelector(".interviewploader").style.display = "flex";

  fetchInterviesTaken.then((res) => res.json())
    .then((d) => {
      document.querySelector(".interviewploader").style.display = "none";

      let interp = document.getElementById("interviewspart");
      let interviewscarrier =
        document.getElementsByClassName("interviewspart")[0];
      while (interp.hasChildNodes()) {
        interp.firstChild.remove();
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

        let lastname = d[i].last_name.split("");

        let creatediv = document.createElement("div");

        let content = `<div class="interviewscarrier">

              <span class="intcjbId">${d[i].interviewslot_id}</span>

          <div class="intervjnamep">
              <h3 class="intcname">
                  Candindate Name
              </h3>
              <p class="intfnmae">
                  ${d[i].first_name}
              </p>
              <p class="intsname">
                  ${lastname[0]}
              </p>

          </div>


          <div class="startdppart">
              <h3 class="intcname">
                  Start Time
              </h3>
              <p>${removeTimezone(d[i].start_time)}</p>
              

          </div>


          <div class="startdppart">
              <h3 class="intcname">
                  End Time
              </h3>
              <p>${removeTimezone(d[i].end_time)}</p>
              

          </div>

          <button class="intcancelBtn">
          Cancel
          </button>






        </div>`;

        creatediv.innerHTML = content;
        interviewscarrier.append(creatediv);
      }

      let terminateBtn = document.getElementsByClassName("intcancelBtn");

      for (let i = 0; i < terminateBtn.length; i++) {
        let clicked = terminateBtn[i];

        clicked.addEventListener("click", () => {
          let clickedid = clicked.parentElement.firstElementChild.innerHTML;
          terminateinterviews(clickedid);
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
  interviewasums();
};

let terminateinterviews = (interviewid) => {
  document.getElementById("confirmation-container").style.display = "block";

  const cancelButton = document.getElementById("cancel-button");
  const continueButton = document.getElementById("continue-button");
  const confirmationContainer = document.getElementById(
    "confirmation-container"
  );

  // Function to hide the confirmation prompt
  function hideConfirmation() {
    confirmationContainer.style.display = "none";
  }

  // Add click event listeners to buttons
  cancelButton.addEventListener("click", () => {
    // Handle cancel button click (You can customize this part)

    hideConfirmation();
  });

  continueButton.addEventListener("click", () => {
    // Handle continue button click (You can customize this part)
    let formdata = new FormData();
    formdata.append("interview_slot", interviewid);

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

    let fetchTerminatedInterviews = fetch(
      `${baseUrl}/terminateinterview`,
      options
    ).catch((err) => {
      console.log(err);
    });
    hideConfirmation();
    document.querySelector(".interviewploader").style.display = "flex";

    fetchTerminatedInterviews.then((res) => res.json()).then((d) => {
      const {affectedrows} = d;
      if (affectedrows) {
        document.querySelector(".interviewploader").style.display = "none";
        allinterviess();
        allinterviess();
        interviewasums();
      }
    });
  });
};

let interviewasums = () => {
 let jbid = getCookie("jobpostid");

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

  let fetchInterviewSums = fetch(
    `${baseUrl}/interviewsums`,
    options
  ).catch((err) => {
    console.log(err);
  });

  fetchInterviewSums.then((res) => res.json())
    .then((d) => {
      const {sum} = d;
      if (sum === 0) {
        //do nothing
      } else {
        let sumdiv = document.querySelector(".numbersecd");
        sumdiv.style.visibility = "visible";
        sumdiv.innerHTML = sum;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

let shortlistsum = () => {
  let jbid = getCookie("jobpostid");

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

  let f = fetch(
    `${baseUrl}/shortlistsum`,
    options
  ).catch((err) => {
    console.log(err);
  });

  f.then((res) => res.json())
    .then((d) => {
      const {sum} = d;
      if (sum === 0) {
        //do nothing
      } else {
        let sumdiv = document.querySelector(".numbersecdshort");
        sumdiv.style.visibility = "visible";
        sumdiv.innerHTML = sum;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

//profile load CANDIDTAE PROFILE
let profload = () => {
  let loader1 = document.getElementsByClassName("loader1");
  let loader = document.getElementsByClassName("loader");
  let userid = sessionStorage.getItem("profileid");
//   let firstn = localStorage.getItem("pfname");
  
//   let firstn = localStorage.getItem("pfname");

  let firstn = getCookie("pfname");

  let formdata = new FormData();

  formdata.append("first_name", firstn);
  formdata.append("user_id", userid);

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

  let fetchCandidateProfile = fetch(
    `${baseUrl}/candidateprofile`,
    options
  ).catch((err) => {
    console.log(err);
  });

  loader[0].classList.add("addedloader");
  fetchCandidateProfile.then((res) => res.json()).then((d) => {
    const {first_name, last_name, country, no_complete, user_id} = d;
    console.log(d);
    loader[0].classList.remove("addedloader");
    if (no_complete) {
      /*
        if(d[0].file==="noprofilepic"){
    
        }else{
         const imageex="data:image/png;base64,";
         let ppimage=document.getElementsByClassName("pp");
         ppimage[0].style.backgroundImage=`url('${imageex+d[0].file}')`
        }
        */
      let firstname = document.getElementById("nh21");
      let secondname = document.getElementById("nh22");
      let location = document.getElementById("location");
      let id = document.getElementById("id");

      id.innerHTML = user_id;

      firstname.innerHTML = first_name;
      secondname.innerHTML = last_name;
      location.innerHTML = country;
    } else if (d.length > 2) {
      /* if(d[0].file==="noprofilepic"){
    
        }else{
         const imageex="data:image/png;base64,";
         let ppimage=document.getElementsByClassName("pp");
         ppimage[0].style.backgroundImage=`url('${imageex+d[0].file}')`
        }*/
      let payr = d[1].pay_rate.split(",");

      let id = document.getElementById("id");
      let firstname = document.getElementById("nh21");
      let secondname = document.getElementById("nh22");
      let jobtitle = document.getElementById("jtitle");
      let payrate = document.getElementById("payrate");
      let payrate1 = document.getElementById("payrate1");

      let location = document.getElementById("location");
      let experience = document.getElementById("experience");
      let aboutme = document.getElementById("abme");
      let workh = document.getElementById("workh");

      id.innerHTML = userid;
      firstname.innerHTML = d[1].first_name;
      secondname.innerHTML = d[1].last_name;
      jobtitle.innerHTML = d[1].professional_title;
      // payrate.innerHTML=payr[1]+"/h";

      payrate.innerHTML = "";
      //  payrate1.innerHTML=payr[1]+"/hour";
      payrate1.innerHTML = " ";

      location.innerHTML = d[1].city + "," + d[1].country;
      experience.innerHTML = d[1].experience_in_years + " years";
      aboutme.innerHTML = d[1].about;
      workh.innerHTML = d[1].availability;

      let jobexperience = document.getElementsByClassName("experience")[0];

      for (let i = 0; i < d[2].length; i++) {
        positiont = d[2][i].job_title;
        start = d[2][i].start_date;
        end = d[2][i].end_date;
        cname = d[2][i].company_name;
        summary = d[2][i].achievement;

        var expecarrier = document.createElement("div");
        var expeitems = `<div class="expecarrier">
         <h3 id="expech3">${positiont}</h3>
         <p id="expecp">${start}-${end}</p>
         <h3 id="expech31">${cname}</h3>
         <p class="expeplast">${summary}</p>
      
      
      </div>`;

        expecarrier.innerHTML = expeitems;
        jobexperience.append(expecarrier);
      }
    }
  });
};

let requestintervieb = () => {
  let enquire = document.querySelector(".enquire");
  enquire.classList.toggle("addedenquire");

  let form = document.querySelector(".enquireform");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let anymessage = document.getElementById("anyinformation");
    let candidateid = sessionStorage.getItem("profileid");
    // let employerid = localStorage.getItem("userloged");
    
    let employerid = getCookie("userloged");

    let formdata = new FormData();

    formdata.append("candidateid", candidateid);
    formdata.append("employerid", employerid);
    formdata.append("addedinformation", anymessage.value);

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

    let fetchEnquiry = fetch(
      `${baseUrl}/enquire`,
      options
    ).catch((err) => {
      console.log(err);
    });
    let sending = document.querySelector(".sedingidi");
    sending.innerHTML = "Sending......";

    fetchEnquiry.then((res) => res.json()).then((d) => {
      const {sent} = d;
      if (sent) {
        sending.innerHTML = "Sent!";

        setTimeout(() => {
          sending.innerHTML = "";
          form.reset();
          enquire.classList.toggle("addedenquire");
        }, 1000);
      }
    });
  });
};


//JOB POST START

let postjobbutton=()=>{
  let comornot= sessionStorage.getItem("employercomplete")

  
if(comornot==="no"){
  
      document.getElementsByClassName("incompleteprofile")[0].classList.add("adddincompleteprofile");

 
}else{
  window.open("/postjob.html", "_blank")
}
}





let skills=[]
let postjobform=()=>{

  let posterid=getCookie("userloged");

  let formdat= new FormData()
  formdat.append("user_id",posterid)

  let optionsa={
      method: "POST",
      headers:{
          "Acces-Control-Allow-Credentials":true,
          "Access-Control-Allow-Origin": "https://www.enkaare.com",
          "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, authorization",
          "Access-Control-Allow-Methods": "POST",
             withCredentials:true
     
         },
        credentials: 'include',
     
      body:formdat

  }

  let f= fetch('https://yielding-dented-amusement.glitch.me/companyname',optionsa).catch(err =>{
       console.log(err)    
     
});

f.then(res=>res.json()).then(d=>{

  if(d[0].company_name != null){
      document.getElementById("company").value=d[0].company_name;
  }else{
      window.close()
  }

})


  let loader =document.getElementsByClassName("loader");
let v=  sessionStorage.getItem("jobposttype");

if(v==="edit"){
  editp();
}else if(v==="similar"){
  similar();
}
let statename;
  let form =document.getElementById("form");
  form.addEventListener("submit",(e)=>{
      e.preventDefault()
     
      
      let details=document.getElementsByClassName("pjorderdetails");
      let title = document.getElementById("title");
      let country= document.getElementById("country");
      let usstate=document.getElementById("usstates");
      let canadaprovince=document.getElementById("canadaprovence");
      let provstate=document.getElementById("state");
      let city=document.getElementById("city");
      let jobtype=document.getElementById("jbtype");
      let bnfits=document.getElementById("pjbenefits");
      let company=document.getElementById("company");
      let department=document.getElementById("department");

      
    
      let currency=document.getElementById("currency");
      let pay =document.getElementById("pay");
      let rate=document.getElementById("rate");
      let summary=document.getElementById("jbsummary");
      let responsibility= document.getElementById("responsibility");

      /*this function is just a continution of form validatio
      check below where it takes over from*/
      let validatescontinuation=()=>{
          if(jobtype.value===""){
              jobtype.style.borderBottomColor="red";

          }else if(currency.value===""){
              currency.style.borderBottomColor="red";
          }else if(rate.value===""){
              rate.style.borderBottomColor="red";
          }else if(summary.value===""){
              summary.style.borderColor="red";
          }else{
              //here is all where form data is collected
              

                //code the view detailselement
              details[0].classList.add("addedodetails");
           


              let jobtitle=document.getElementById("odh2");
             let name=document.getElementById("odp");
              let cit=document.getElementById("citysta");
              let ctry=document.getElementById("countrysta");
              let pay_rate=document.getElementById("payrate");
              let benefits=document.getElementById("benefits");
              let type=document.getElementById("ttype");
              let about=document.getElementById("aboutj");
              let responsibilities=document.getElementById("tasksres");
              let poster=document.getElementsByClassName("postername");
              let depart=document.getElementsByClassName("depart");
          
               jobtitle.innerHTML=title.value;
               name.innerHTML=company.value ;
               cit.innerHTML=city.value;
               poster[0].innerHTML=localStorage.getItem("pfname");;
               depart[0].innerHTML=department.value;

               ctry.innerHTML=country.value+","+statename;
               pay_rate.innerHTML=currency.value+" "+pay.value+rate.value;
               benefits.innerHTML=bnfits.value;
               type.innerHTML=jobtype.value;
               about.innerHTML=summary.value;
               responsibilities.innerHTML=responsibility.value;

               for(let i=0;i<skills.length;i++){
                  let skill=skills[i];
                  let skillcarier=document.getElementsByClassName("skillst")[0];
                  let skilldiv=document.createElement('div');
                  let skill_content=`<section class="skillcarrier">
                    ${skill}        
                  </section>`;
                  skilldiv.innerHTML=skill_content;
                  skillcarier.append(skilldiv)

               }
             
           

           
          };
      };



    if(country.value===""){
      country.style.borderBottomColor='red';
    }else
      
      if(usstate.value==="" && canadaprovince.value==="" && provstate.value===""){
          usstate.style.borderBottomColor="red";
          provstate.style.borderBottomColor="red";
          canadaprovince.style.borderBottomColor="red";
      }else if(usstate.value !=""){
          statename=usstate.value;
          validatescontinuation()
          
      }else if(canadaprovince.value !=""){
          statename=canadaprovince.value;
          validatescontinuation();
        
          
      }else if(provstate.value !=""){
          statename=provstate.value;
          validatescontinuation();
          
      }
    
      //Continution functions should continue from here
  });




/////////FOR POSTING A NEW EVENT HAD TO BE HANDLED//////////////*





  let postbutton=document.getElementsByClassName("pjbutton2");
 
   
    let clicks=0;
  postbutton[0].addEventListener('click',(e)=>{
//here is where the job is posted;
      
      let details=document.getElementsByClassName("pjorderdetails");
      let title = document.getElementById("title");
      let country= document.getElementById("country");
      let usstate=document.getElementById("usstates");
      let canadaprovince=document.getElementById("canadaprovence");
      let provstate=document.getElementById("state");
      let city=document.getElementById("city");
      let jobtype=document.getElementById("jbtype");
      let bnfits=document.getElementById("pjbenefits");
      let company=document.getElementById("company");
      let department=document.getElementById("department");

      
    
      let currency=document.getElementById("currency");
      let pay =document.getElementById("pay");
      let rate=document.getElementById("rate");
      let summary=document.getElementById("jbsummary");
      let responsibility= document.getElementById("responsibility");
      


     e.stopPropagation();

     
         clicks=1;
         let rt=  sessionStorage.setItem("jobposttype");

     if(v==="none" || v==="similar" ||v===null){
         const formdata = new FormData();
         formdata.append("user_id",posterid);
         formdata.append("title",title.value);  
         formdata.append("city",city.value);
         formdata.append("country",country.value);  
         formdata.append("state_province",statename);
         formdata.append("pay",currency.value+","+pay.value+","+rate.value);  
         formdata.append("benefit",bnfits.value);
         formdata.append("job_type",jobtype.value);  
         formdata.append("summary",summary.value);
         formdata.append("responsb",responsibility.value);  
         formdata.append("skills",skills);
         formdata.append("c","s"); 
         formdata.append("company",company.value);
         formdata.append("department",department.value);


        
         




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
         
         let f= fetch('https://yielding-dented-amusement.glitch.me/postjob',options).catch(err =>{
           
     
     });
     
     loader[0].classList.add("addedloader");
      f.then(res=> res.json()).then(d=>{
       if(d===1){
         details[0].classList.remove("addedodetails");
         form.reset();
         let removepr=document.getElementById("skillsdivcar");
         while(removepr.hasChildNodes()){
             removepr.firstChild.remove()
         }
         skills=[]
         loader[0].classList.remove("addedloader");
         sessionStorage.setItem("jobposttype","none");
         window.close()
       }

      });
      
     
     }else if(v==="edit"){
         let jbid= sessionStorage.getItem("jobpostid");
         const formdata = new FormData();
         formdata.append("joe_id",jbid);
         formdata.append("user_id",posterid);
         formdata.append("title",title.value);  
         formdata.append("city",city.value);
         formdata.append("country",country.value);  
         formdata.append("state_province",statename);
         formdata.append("pay",currency.value+","+pay.value+","+rate.value);  
         formdata.append("benefit",bnfits.value);
         formdata.append("job_type",jobtype.value);  
         formdata.append("summary",summary.value);
         formdata.append("responsb",responsibility.value);  
         formdata.append("skills",skills);
         formdata.append("c","e");  
        
         




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
         
         let f= fetch('https://yielding-dented-amusement.glitch.me/postjob',options).catch(err =>{
           
     
     });
    
     loader[0].classList.add("addedloader");
      f.then(res=> res.json()).then(d=>{
       if(d===1){
         details[0].classList.remove("addedodetails");
         form.reset();
         let removepr=document.getElementById("skillsdivcar");
         while(removepr.hasChildNodes()){
             removepr.firstChild.remove()
         }
         skills=[]
         sessionStorage.setItem("jobposttype","none");

         loader[0].classList.remove("addedloader");
         window.close()
       }

      });
         
      

     }

     

   
     
    


    
  },{once:true});

/////////FOR POSTING A NEW EVENT HAD TO BE HANDLED//////////////*



}

let listeancountry = () => {
  let country = document.getElementById("country");
  let provstate = document.getElementById("state");
  let usstate = document.getElementById("usstates");
  let canadaprovince = document.getElementById("canadaprovence");

  if (country.value === "United States") {
    provstate.style.display = "none";
    canadaprovince.style.display = "none";
    usstate.style.display = "block";
  } else if (country.value === "Canada") {
    provstate.style.display = "none";
    canadaprovince.style.display = "block";
    usstate.style.display = "none";
  } else {
    provstate.style.display = "block";
    canadaprovince.style.display = "none";
    usstate.style.display = "none";
  }
};

let inputreset = () => {
  let usstate = document.getElementById("usstates");
  let canadaprovince = document.getElementById("canadaprovence");
  let provstate = document.getElementById("state");
  let jobtype = document.getElementById("jbtype");
  let currency = document.getElementById("currency");
  let rate = document.getElementById("rate");
  let summary = document.getElementById("jbsummary");

  currency.style.borderBottomColor = "hsla(4,0%,0%,0.5)";
  jobtype.style.borderBottomColor = "hsla(4,0%,0%,0.5)";
  country.style.borderBottomColor = "hsla(4,0%,0%,0.5)";
  usstate.style.borderBottomColor = "hsla(4,0%,0%,0.5)";
  provstate.style.borderBottomColor = "hsla(4,0%,0%,0.5)";
  canadaprovince.style.borderBottomColor = "hsla(4,0%,0%,0.5)";
  rate.style.borderBottomColor = "hsla(4,0%,0%,0.5)";
  summary.style.borderColor = "hsla(4,0%,0%,0.5)";
};

let addskill = () => {
  let removepr = document.getElementById("skillsdivcar");
  while (removepr.hasChildNodes()) {
    removepr.firstChild.remove();
  }

  let skill = document.getElementById("skill");
  let skillcardiv = document.getElementsByClassName("skillsdivcar")[0];

  if (skill.value != "") {
    skills.push(skill.value);
  }
  for (let i = 0; i < skills.length; i++) {
    let sval = skills[i];

    let crdiv = document.createElement("div");
    let crdcontent = `<div class="skillit">
        <p>${sval}</p>
        <span class="pcancel">&#x2715;</span>

    </div>`;

    crdiv.innerHTML = crdcontent;
    skillcardiv.append(crdiv);
    skill.value = "";
  }

  let skcrr = document.getElementsByClassName("pcancel");
  for (let i = 0; i < skcrr.length; i++) {
    let canceld = skcrr[i];
    canceld.addEventListener("click", () => {
      let removedarrayelment =
        canceld.parentElement.firstElementChild.innerHTML;
      let index = skills.indexOf(removedarrayelment);
      skills.splice(index, 1);
      canceld.parentElement.remove();
    });
  }
};
let backbutton = () => {
  let details = document.getElementsByClassName("pjorderdetails");
  details[0].classList.remove("addedodetails");
};

//EDIT POSTED JOB START HERE

let editpost = () => {
     sessionStorage.setItem("jobposttype", "edit");
  
  var w = window.open("/postjob.html", "_system");
};
let editp = () => {
  let loader = document.getElementsByClassName("loader");
  let jbid = sessionStorage.getItem("jobpostid");
   

  let postjobtitle = document.getElementById("jbfph3");
  postjobtitle.innerHTML = "Edit Job";

  let details = document.getElementsByClassName("pjorderdetails");
  let title = document.getElementById("title");
  let company = document.getElementById("company");
  let department = document.getElementById("department");

  let provstate = document.getElementById("state");
  let city = document.getElementById("city");
  let jobtype = document.getElementById("jbtype");
  let bnfits = document.getElementById("pjbenefits");

  let currency = document.getElementById("currency");
  let pay = document.getElementById("pay");
  let rate = document.getElementById("rate");
  let summary = document.getElementById("jbsummary");
  let responsibility = document.getElementById("responsibility");

  const formdata = new FormData();
  formdata.append("job_id", jbid);
  formdata.append("type", "or");
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
  // https://1ed2-105-231-144-76.ngrok.io/api'

  //https://half-geode-roundworm.glitch.me/api

  let fetchDetails = fetch(
    `${baseUrl}/sedetails`,
    options
  ).catch((err) => {});
  loader[0].classList.add("addedloader");

  fetchDetails.then((res) => res.json()).then((d) => {
    let payvalues = d[0].pay.split(",");
    title.value = d[0].job_title;
    provstate.value = d[0].state_province;
    jobtype.value = d[0].job_type;
    city.value = d[0].city;
    bnfits.value = d[0].benefit;
    summary.value = d[0].summary;
    responsibility.value = d[0].responsibilities;
    currency.value = payvalues[0];
    pay.value = payvalues[1];
    rate.value = payvalues[2];
    company.value = d[0].company_name;
    department.value = d[0].department;
  });
  const sformdata = new FormData();
  sformdata.append("job_id", jbid);
  sformdata.append("type", "any");
  const soptions = {
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

    body: sformdata,
  };
  // https://1ed2-105-231-144-76.ngrok.io/api'

  //https://half-geode-roundworm.glitch.me/api

  let sf = fetch(
    `${baseUrl}/sedetails`,
    soptions
  ).catch((err) => {});

  sf.then((res) => res.json()).then((d) => {
    let emptyarray = [];
    emptyarray.push(d[0].skill1);
    emptyarray.push(d[0].skill2);
    emptyarray.push(d[0].skill3);
    emptyarray.push(d[0].skill4);
    emptyarray.push(d[0].skill5);
    emptyarray.push(d[0].skill6);
    emptyarray.push(d[0].skill7);
    emptyarray.push(d[0].skill8);

    for (let i = 0; i < emptyarray.length; i++) {
      if (emptyarray[i] != "") {
        skills.push(emptyarray[i]);
      }
    }

    addskill();
    loader[0].classList.remove("addedloader");
  });
};

// HERE IS THE FUNCTION TO CREATE NEW JOB

let createsimilarjob = () => {
     sessionStorage.setItem("jobposttype", "similar");
  

  var w = window.open("/postjob.html", "_system");
};
let similar = () => {
  let loader = document.getElementsByClassName("loader");
   let jbid = sessionStorage.getItem("jobpostid");


  let postjobtitle = document.getElementById("jbfph3");
  postjobtitle.innerHTML = "Edit Job";

  let details = document.getElementsByClassName("pjorderdetails");
  let title = document.getElementById("title");
  let company = document.getElementById("company");
  let department = document.getElementById("department");

  let provstate = document.getElementById("state");
  let city = document.getElementById("city");
  let jobtype = document.getElementById("jbtype");
  let bnfits = document.getElementById("pjbenefits");

  let currency = document.getElementById("currency");
  let pay = document.getElementById("pay");
  let rate = document.getElementById("rate");
  let summary = document.getElementById("jbsummary");
  let responsibility = document.getElementById("responsibility");

  const formdata = new FormData();
  formdata.append("job_id", jbid);
  formdata.append("type", "or");
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
  // https://1ed2-105-231-144-76.ngrok.io/api'

  //https://half-geode-roundworm.glitch.me/api

  let f = fetch(
    `${baseUrl}/sedetails`,
    options
  ).catch((err) => {});
  loader[0].classList.add("addedloader");

  f.then((res) => res.json()).then((d) => {
    let payvalues = d[0].pay.split(",");
    title.value = d[0].job_title;
    provstate.value = d[0].state_province;
    jobtype.value = d[0].job_type;
    city.value = d[0].city;
    bnfits.value = d[0].benefit;
    summary.value = d[0].summary;
    responsibility.value = d[0].responsibilities;
    currency.value = payvalues[0];
    pay.value = payvalues[1];
    rate.value = payvalues[2];
    company.value = d[0].company_name;
    department.value = d[0].department;
  });
  const sformdata = new FormData();
  sformdata.append("job_id", jbid);
  sformdata.append("type", "any");
  const soptions = {
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

    body: sformdata,
  };
  // https://1ed2-105-231-144-76.ngrok.io/api'

  //https://half-geode-roundworm.glitch.me/api

  let sf = fetch(
    `${baseUrl}/sedetails`,
    soptions
  ).catch((err) => {});

  sf.then((res) => res.json())
    .then((d) => {
      let emptyarray = [];
      emptyarray.push(d[0].skill1);
      emptyarray.push(d[0].skill2);
      emptyarray.push(d[0].skill3);
      emptyarray.push(d[0].skill4);
      emptyarray.push(d[0].skill5);
      emptyarray.push(d[0].skill6);
      emptyarray.push(d[0].skill7);
      emptyarray.push(d[0].skill8);

      for (let i = 0; i < emptyarray.length; i++) {
        if (emptyarray[i] != "") {
          skills.push(emptyarray[i]);
        }
      }

      addskill();
      loader[0].classList.remove("addedloader");
    })
    .catch((err) => {
      console.log(err);
    });
};

/*SETTING*/

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
/******************************************** */

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

    let fetchChangeName = fetch(
      `${baseUrl}/changeename`,
      options
    ).catch((err) => {
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

      let fetchChangePassword = fetch(
        `${baseUrl}/changeepassword`,
        options
      ).catch((err) => {
        console.log(err);
      });
      passvalue = "";
      confirmpassvalue = "";
      loader.style.display = "flex";

      fetchChangePassword.then((res) => res.json())
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

    let fetchChangeEmail = fetch(
      `${baseUrl}/changeemployeremail`,
      options
    ).catch((err) => {
      console.log(err);
    });
    loader.style.display = "flex";
    fetchChangeEmail.then((res) => res.json())
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

  let fetchChangeEmail = fetch(
    `${baseUrl}/changeemployeremail`,
    options
  ).catch((err) => {
    console.log(err);
  });
  loader.style.display = "flex";
  fetchChangeEmail.then((res) => res.json()).then((d) => {
    loader.style.display = "none";
    email.value = "";
    const {sent} = d;
    if (sent) {
      emaildis2.style.display = "none";
      emaildis3.style.display = "block";

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
                formdata.append("userid", getCookie("userloged"));
                // formdata.append("userid", localStorage.getItem("userloged"));

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

                let fetchChangeEmail = fetch(
                  `${baseUrl}/changeemployeremail`,
                  options
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
  formdata.append("userid", getCookie("userloged"));
//   formdata.append("userid", localStorage.getItem("userloged"));

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
  let fetchSetting = fetch(
    `${baseUrl}e/esettingdata`,
    options
  ).catch((err) => {
    console.log(err);
  });

  fetchSetting.then((res) => res.json()).then((d) => {
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
    setCookie("pfname", first_name);
    // localStorage.setItem("psname", last_name);
    setCookie("psname", last_name);
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

    let fetchSupport = fetch(
      `${baseUrl}/supporttalk`,
      options
    ).catch((err) => {
      console.log(err);
    });
    loader1[0].classList.add("addedloader1");

    fetchSupport.then((res) => res.json()).then((d) => {
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
