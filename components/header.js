class Navmenu extends HTMLElement{
    constructor(){
        super();

    }
    connectedCallback(){
        this.innerHTML=`  <a href="https://www.enkaare.com"><img src="/images/enkari logo.jpg" alt=""></a>
        <div onmouseover="hidepoptions()" class="status">
            
        <button onclick="postjobbutton()"><img src="/images/add.png" alt=""> Post a Job</button><span id="ebeta">Beta</span>
        </div>
        <div onmouseover="displaypoptions()" class="profile navhv" id="myprofile">
            <section class="img">

            </section>
            <p id="ppname"></p>
            <span class="gt">
                    <img src="/images/greater-than-symbol (1).png" alt="">
                </span>

        </div>
        <div onmouseover="hidepoptions()" class="balance navhv">
         <img src="/images/wallet.png" alt="">
         <p id="pb">Balance</p>

         <p id="bp">$0.0</p>
        
            
            

        </div>
        <a href="/emnotifications.html">
            <div class="notification navhv">
                <img src="/images/bell.png" alt="">
                <p id="pb">Notifications</p>
   
                <p id="np"></p>
               
                   
                   
   
               </div>
        </a>


          <a href="/candidates.html">
            <div  onmouseover="hidepoptions()"  class="aorders navhv">
                <img src="/images/profile.png" alt="">
                <p id="pb">Candidates</p>
   
                
               
                   
                   
   
               </div>
          </a>


           <a href="/myjoposts.html">
            <div onclick="orderd()" id="vague2" class="mbids navhv">
                <img src="/images/order-now.png" alt="">
                <p id="pb">My posted jobs</p>
   
   
               </div>
           </a>


 

           <div onclick="chats()"  class="chats navhv">
            <img src="/images/chat.png" alt="">
            <p id="pb">Chats</p>
            <p id="ac"></p>

           </div>
       
           <div  onclick="tsupport();suuemployer('employer_profile')"   class="hcentre navhv">
            <img src="/images/support.png" alt="">
            <p id="pb">Support</p>


           </div>
           <div class="rules navhv">
            <img src="/images/guidelines.png" alt="">
            <p id="rb">Rules & guidelines</p>


           </div>`
    }
}
customElements.define('nav-menu',Navmenu);

class ProfileView extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.innerHTML=` <a href="/e-myprofile.html">
        <section class="myprofile">
            <img src="/images/user.png" alt="">
            <p>My profile</p>

           </section>
      </a>
      <a href="/e-setting.html">
            <section class="myprofile">
                <img src="/images/settings.png" alt="">
                <p>Settings</p>
    
               </section>
           </a>
       <section onclick="logout()" class="myprofile">
        <img src="/images/logout.png" alt="">
        <p>Logout</p>

       </section>`
    }
}
customElements.define('profile-options',ProfileView);

class CandidateNavmenu extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.innerHTML=` <a href="https://www.enkaare.com"><img src="/images/enkari logo.jpg" alt=""></a>
        <div onmouseover="hidepoptions()" class="status">
            <p>Acount status </p>
            <button id="statusbuton"></button>
            <span id="cbeta">Beta</span>
        </div>
        <div onmouseover="displaypoptions()" class="profile navhv" id="myprofile">
            <section class="img">

            </section>
            <p id="ppname"></p>
            <span class="gt">
                <img src="/images/greater-than-symbol (1).png" alt="">
            </span>

        </div>
        <div onmouseover="hidepoptions()" class="balance navhv">
         <img src="/images/wallet.png" alt="">
         <p id="pb">Balance</p>

         <p id="bp">$0.0</p>
        
            
            

        </div>
        <a href="/notification.html">
            <div onclick="changesource('/notification.html')" class="notification navhv">
                <img src="/images/bell.png" alt="">
                <p id="pb">Notifications</p>
   
                <p id="np"></p>
               
                   
                   
   
               </div>
        </a>


          <a href="/availableorders.html">
          <div onclick="changesource('/availableorders.html')"  onmouseover="hidepoptions()"   class="aorders navhv">
                <img src="/images/clipboard.png" alt="">
                <p id="pb">Available jobs</p>
   
                
               
                   
                   
   
               </div>
          </a>


           <a href="/myorders.html">
            <div onclick="orderd()" id="vague2" class="mbids navhv">
                <img src="/images/add-user.png" alt="">
                <p id="pb">My Jobs</p>
   
   
               </div>
           </a>


         <a href="/acceptedjobs.html">
            <div  class="abids navhv">
                <img src="/images/archive.png" alt="">
                <p id="pb">Accepted Jobs</p>
   
                <p id="ap"></p>
               
                   
               </div>
         </a>

           <div onclick="chats()"  class="chats navhv">
            <img src="/images/chat.png" alt="">
            <p id="pb">Chats</p>
            <p id="ac"></p>

           </div>
           <div onclick="thhhh()" class="rating navhv">
            <img src="/images/star.png" alt="">
            <p id="pb">Rating</p>

            <p id="rp">100%</p>
           
               
               

           </div>
           <div  onclick="tsupport();suuemployer('candidate_profile')"  class="hcentre navhv">
            <img src="/images/support.png" alt="">
            <p id="pb">Support</p>


           </div>
           <div class="rules navhv">
            <img src="/images/guidelines.png" alt="">
            <p id="rb">Rules & guidelines</p>


           </div>`
    }
}

customElements.define('candidate-navmenu',CandidateNavmenu);


class CandidatePview extends HTMLElement{
    constructor(){
        super();
    }
    connectedCallback(){
        this.innerHTML=`<a href="/profile.html">
        <section class="myprofile">
            <img src="/images/user.png" alt="">
            <p>My profile</p>

           </section>
      </a>

      <a href="/settings.html">
      <section class="myprofile">
          <img src="/images/settings.png" alt="">
          <p>Settings</p>

         </section>
     </a>

       <section onclick="logout()" class="myprofile">
        <img src="/images/logout.png" alt="">
        <p>Logout</p>

       </section>`
    }
}

customElements.define('candidate-pview',CandidatePview)

