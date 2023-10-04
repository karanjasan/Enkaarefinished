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
        }

    }
});



