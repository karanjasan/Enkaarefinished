let anime= document.getElementsByClassName("anime");
let huberger =document.getElementsByClassName("navbutton");
let navmenu =document.getElementsByClassName("pnavlinks");
let pop=()=>{
    huberger[0].classList.toggle("active");
    navmenu[0].classList.toggle("active");
    
}
   
  
window.addEventListener('scroll',()=>{
    const triggerb=window.innerHeight/5*4;
    for(i=0;i<anime.length;i++){
        let boxl= anime[i].getBoundingClientRect().top;
        if(boxl<triggerb){
            anime[i].classList.add("animel");
        }else{
            anime[i].classList.remove("animel");
        }

    }
});


let tsupport = () => {
   
    let sendmess=document.querySelector(".messend");
    var audio = new Audio("/images/shooting-sound-fx-159024.mp3");
    audio.play();
  
    document.querySelector(".contactsupport").classList.add("addedhove");
    let form = document.querySelector(".suuform");
  
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let name=document.querySelector("#lname");
      let number=document.querySelector("#lnumber");
      let email =document.querySelector("#email");
      let subject = document.querySelector("#subject");
      let message = document.querySelector("#sumessage");
  
      let formdata = new FormData();
      formdata.append("name", name.value);
      formdata.append("number", number.value);
      formdata.append("email", email.value);
      formdata.append("subject", subject.value);
      formdata.append("message", message.value);
      
  
      const optionWithFormData = {
        method: "POST",
        headers: {
          "Access-Control-Allow-Credentials": true,
          "Access-Control-Allow-Origin": "https://enkaare.com",
          "Access-Control-Allow-Headers":
            "Origin, X-Requested-With, Content-Type, Accept, authorization",
          "Access-Control-Allow-Methods": "POST",
          withCredentials: true,
        },
        credentials: "include",
  
        body: formdata,
      };
  
      let f = fetch(`https://yielding-dented-amusement.glitch.me/supporttalklandingp`, optionWithFormData).catch((err) => {
        console.log(err);
      });
      sendmess.innerHTML="Sending...."
  
      f.then((res) => res.json()).then((d) => {
        const {sent} = d;
  
        if (sent) {
          form.reset();
          sendmess.innerHTML="Sent!"

          setTimeout(()=>{
            sendmess.innerHTML=""

          },2000)
          tsupportcancel();
        }
      });
    });
  };
  let tsupportcancel = () => {
    document.querySelector(".contactsupport").classList.remove("addedhove");
  };


  

