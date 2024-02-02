try {
    class Navmenuu extends HTMLElement{
        constructor(){
            super();
    
        }
        connectedCallback(){
            this.innerHTML=`<div>
            <a href="https://www.enkaare.com"><img id="employerdlogo" src="/images/enkari logo.jpg" alt=""></a>
            <div onmouseover="hidepoptions()" class="status">
                <div onclick="pop()" class="navbutton">
                    <div class="nav"></div>
                    <div class="nav"></div>
                    <div class="nav"></div>
                </div>
                
                <button onclick="postjobbutton()"><img src="/images/add.png" alt="">Post a Job</button>
             
             <span id="ebeta">Beta</span>
    
             <div class="phoneprofilenav">
                <div class="logo-container">
                    <img src="/images/profileuser.png" alt="Logo" id="logo">
    
                    
                </div>
                <img onclick="displaypoptionsp()" src="/images/greater-than-symbol (1).png" alt="greaterthan" id="gthanphone">
    
             </div>
            </div>
            <div onmouseover="displaypoptions()" class="profile navhv" id="myprofile">
                <section class="img">
    
                </section>
                <p id="ppname"></p>
                <span class="gt">
                    <img src="/images/greater-than-symbol (1).png" alt="">
                </span>
    
            </div>
            <!--Phone nav menu-->
            <div class="phonenavmenu">
                <div onmouseover="hidepoptions()" class="balance navhv">
                    <img src="/images/wallet.png" alt="" id="ephonestyle1">
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
                       <div onclick="getRidOfOverlayWindows()" class="aorders navhv">
                           <img src="/images/profile.png" alt="" id="canidateimg">
                           <p id="pb">Candidates</p>
              
                           
                          
                              
                              
              
                          </div>
                     </a>
       
       
                      <a href="/myjoposts.html">
                       <div onclick="orderd();getRidOfOverlayWindows()" id="vague2" class="mbids navhv">
                           <img src="/images/order-now.png" id="mypostedjobimg"  alt="">
                           <p id="pb">My posted jobs</p>
              
              
                          </div>
                      </a>
       
       
            
       
                      <div onclick="chats()"  class="chats navhv">
                       <img src="/images/chat.png" alt="">
                       <p id="pb">Chats</p>
                       <p id="ac"></p>
          
                      </div>
                  <!-- onclick="support('support','Support')"-->
                      <div onclick="tsupport();suuemployer('employer_profile'); getRidOfOverlayWindows()" class="hcentre navhv">
                       <img src="/images/support.png" id="recruiterimg" alt="">
                       <p id="pb" class="contarec">Contact Recruiter</p>
                      
          
          
                      </div>
                      <a href="/clientTermsandConditions/terms.html" target="_blank">
                        <div onclick="getRidOfOverlayWindows()" class="rules navhv">
                            <img src="/images/guidelines.png" id="termsimg" alt="">
                            <p id="rb">Terms & Conditions</p>
               
               
                           </div>
            
                      </a>
               </div>
            </div>
            
           `
        }
    }
    customElements.define('nav-menu',Navmenuu);
} catch (error) {
    console.log(error)
    
}

try {

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
    
} catch (error) {
    console.log(error)
    
}

try {

    class CandidateNavmenu extends HTMLElement{
        constructor(){
            super();
        }
        connectedCallback(){
            this.innerHTML=` <a href="https://www.enkaare.com"><img id="employerdlogo" src="/images/enkari logo.jpg" alt=""></a>
            <div onmouseover="hidepoptions()" class="status">
                <div onclick="pop()" class="navbutton">
                    <div class="nav"></div>
                    <div class="nav"></div>
                    <div class="nav"></div>
                </div>


                <p>Acount status </p>
                <button id="statusbuton"></button>
                <span id="cbeta">Beta</span>

                
             <div class="phoneprofilenav">
                <div class="logo-container">
                    <img src="/images/profileuser.png" alt="Logo" id="logo">

                    
                </div>
                <img onclick="displaypoptionsp()" src="/images/greater-than-symbol (1).png" alt="greaterthan" id="gthanphone">

             </div>
            </div>



            <div onmouseover="displaypoptions()" class="profile navhv" id="myprofile">
                <section class="img">

                </section>
                <p id="ppname"></p>
                <span class="gt">
                    <img src="/images/greater-than-symbol (1).png" alt="">
                </span>

            </div>




            <div class="phonenavmenu">
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
                <div onclick="getRidOfOverlayWindows()"  onmouseover="hidepoptions()"   class="aorders navhv">
                    <img src="/images/clipboard.png" alt="">
                    <p id="pb">Available jobs</p>
       
                    
                   
                       
                       
       
                   </div>
              </a>


               <a href="/myorders.html">
                <div onclick="orderd();getRidOfOverlayWindows()" id="vague2" class="mbids navhv">
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
               <!--onclick="support('support','Support')"-->
               <div  onclick="tsupport();suuemployer('candidate_profile');getRidOfOverlayWindows()"   class="hcentre navhv">
                <img src="/images/support.png" alt="">
                <p id="pb">Contact Recruiter</p>
   
   
               </div>
              <a href="/terms and conditions/term.html">
                <div onclick="getRidOfOverlayWindows()" class="rules navhv">
                    <img src="/images/guidelines.png" alt="">
                    <p id="rb">Terms and Conditions</p>
       
       
                   </div>
              </a>

        </div>`
        }
    }
    
    customElements.define('candidate-navmenu',CandidateNavmenu);
    
} catch (error) {

    console.log(error)
    
}


try {
    class CandidatePview extends HTMLElement{
        constructor(){
            super();
        }
        connectedCallback(){
            this.innerHTML=` <a href="/profile.html">
            <section onclick="getRidOfOverlayWindows()" class="myprofile">
                <img src="/images/user.png" alt="">
                <p>My profile</p>
    
               </section>
          </a>
      <a href="/settings.html">
        <section onclick="getRidOfOverlayWindows()" class="myprofile">
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
    
    
    
    
} catch (error) {
    console.log(error)
    
}