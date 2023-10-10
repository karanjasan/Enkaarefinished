








const countriesWithDialCodes = [
    { name: 'Afghanistan', dialCode: '+93' },
    { name: 'Albania', dialCode: '+355' },
    { name: 'Algeria', dialCode: '+213' },
    { name: 'American Samoa', dialCode: '+1-684' },
    { name: 'Andorra', dialCode: '+376' },
    { name: 'Angola', dialCode: '+244' },
    { name: 'Anguilla', dialCode: '+1-264' },
    { name: 'Antarctica', dialCode: '+672' },
    { name: 'Antigua and Barbuda', dialCode: '+1-268' },
    { name: 'Argentina', dialCode: '+54' },
    { name: 'Armenia', dialCode: '+374' },
    { name: 'Aruba', dialCode: '+297' },
    { name: 'Australia', dialCode: '+61' },
    { name: 'Austria', dialCode: '+43' },
    { name: 'Azerbaijan', dialCode: '+994' },
    { name: 'Bahamas', dialCode: '+1-242' },
    { name: 'Bahrain', dialCode: '+973' },
    { name: 'Bangladesh', dialCode: '+880' },
    { name: 'Barbados', dialCode: '+1-246' },
    { name: 'Belarus', dialCode: '+375' },
    { name: 'Belgium', dialCode: '+32' },
    { name: 'Belize', dialCode: '+501' },
    { name: 'Benin', dialCode: '+229' },
    { name: 'Bermuda', dialCode: '+1-441' },
    { name: 'Bhutan', dialCode: '+975' },
    { name: 'Bolivia', dialCode: '+591' },
    { name: 'Bonaire, Saint Eustatius and Saba', dialCode: '+599' },
    { name: 'Bosnia and Herzegovina', dialCode: '+387' },
    { name: 'Botswana', dialCode: '+267' },
    { name: 'Bouvet Island', dialCode: '+47' },
    { name: 'Brazil', dialCode: '+55' },
    { name: 'British Indian Ocean Territory', dialCode: '+246' },
    { name: 'Brunei Darussalam', dialCode: '+673' },
    { name: 'Bulgaria', dialCode: '+359' },
    { name: 'Burkina Faso', dialCode: '+226' },
    { name: 'Burundi', dialCode: '+257' },
    { name: 'Cabo Verde', dialCode: '+238' },
    { name: 'Cambodia', dialCode: '+855' },
    { name: 'Cameroon', dialCode: '+237' },
    { name: 'Canada', dialCode: '+1' },
    { name: 'Cayman Islands', dialCode: '+1-345' },
    { name: 'Central African Republic', dialCode: '+236' },
    { name: 'Chad', dialCode: '+235' },
    { name: 'Chile', dialCode: '+56' },
    { name: 'China', dialCode: '+86' },
    { name: 'Christmas Island', dialCode: '+61' },
    { name: 'Cocos (Keeling) Islands', dialCode: '+61' },
    { name: 'Colombia', dialCode: '+57' },
    { name: 'Comoros', dialCode: '+269' },
    { name: 'Congo', dialCode: '+242' },
    { name: 'Congo, Democratic Republic of the', dialCode: '+243' },
    { name: 'Cook Islands', dialCode: '+682' },
    { name: 'Costa Rica', dialCode: '+506' },
    { name: 'Cote d\'Ivoire', dialCode: '+225' },
    { name: 'Croatia', dialCode: '+385' },
    { name: 'Cuba', dialCode: '+53' },
    { name: 'Curacao', dialCode: '+599' },
    { name: 'Cyprus', dialCode: '+357' },
    { name: 'Czech Republic', dialCode: '+420' },
    { name: 'Denmark', dialCode: '+45' },
    { name: 'Djibouti', dialCode: '+253' },
    { name: 'Dominica', dialCode: '+1-767' },
    { name: 'Dominican Republic', dialCode: '+1-809, 1-829, 1-849' },
    { name: 'Ecuador', dialCode: '+593' },
    { name: 'Egypt', dialCode: '+20' },
    { name: 'El Salvador', dialCode: '+503' },
    { name: 'Equatorial Guinea', dialCode: '+240' },
    { name: 'Eritrea', dialCode: '+291' },
    { name: 'Estonia', dialCode: '+372' },
    { name: 'Eswatini', dialCode: '+268' },
    { name: 'Ethiopia', dialCode: '+251' },
    { name: 'Falkland Islands', dialCode: '+500' },
    { name: 'Faroe Islands', dialCode: '+298' },
    { name: 'Fiji', dialCode: '+679' },
    { name: 'Finland', dialCode: '+358' },
    { name: 'France', dialCode: '+33' },
    { name: 'French Guiana', dialCode: '+594' },
    { name: 'French Polynesia', dialCode: '+689' },
    { name: 'French Southern Territories', dialCode: '+262' },
    { name: 'Gabon', dialCode: '+241' },
    { name: 'Gambia', dialCode: '+220' },
    { name: 'Georgia', dialCode: '+995' },
    { name: 'Germany', dialCode: '+49' },
    { name: 'Ghana', dialCode: '+233' },
    { name: 'Gibraltar', dialCode: '+350' },
    { name: 'Greece', dialCode: '+30' },
    { name: 'Greenland', dialCode: '+299' },
    { name: 'Grenada', dialCode: '+1-473' },
    { name: 'Guadeloupe', dialCode: '+590' },
    { name: 'Guam', dialCode: '+1-671' },
    { name: 'Guatemala', dialCode: '+502' },
    { name: 'Guernsey', dialCode: '+44-1481' },
    { name: 'Guinea', dialCode: '+224' },
    { name: 'Guinea-Bissau', dialCode: '+245' },
    { name: 'Guyana', dialCode: '+592' },
    { name: 'Haiti', dialCode: '+509' },
    { name: 'Heard Island and McDonald Islands', dialCode: '+672' },
    { name: 'Holy See', dialCode: '+379' },
    { name: 'Honduras', dialCode: '+504' },
    { name: 'Hong Kong', dialCode: '+852' },
    { name: 'Hungary', dialCode: '+36' },
    { name: 'Iceland', dialCode: '+354' },
    { name: 'India', dialCode: '+91' },
    { name: 'Indonesia', dialCode: '+62' },
    { name: 'Iran', dialCode: '+98' },
    { name: 'Iraq', dialCode: '+964' },
    { name: 'Ireland', dialCode: '+353' },
    { name: 'Isle of Man', dialCode: '+44-1624' },
    { name: 'Israel', dialCode: '+972' },
    { name: 'Italy', dialCode: '+39' },
    { name: 'Jamaica', dialCode: '+1-876' },
    { name: 'Japan', dialCode: '+81' },
    { name: 'Jersey', dialCode: '+44-1534' },
    { name: 'Jordan', dialCode: '+962' },
    { name: 'Kazakhstan', dialCode: '+7' },
    { name: 'Kenya', dialCode: '+254' },
    { name: 'Kiribati', dialCode: '+686' },
    { name: 'Korea (North)', dialCode: '+850' },
    { name: 'Korea (South)', dialCode: '+82' },
    { name: 'Kosovo', dialCode: '+383' },
    { name: 'Kuwait', dialCode: '+965' },
    { name: 'Kyrgyzstan', dialCode: '+996' },
    { name: 'Lao People\'s Democratic Republic', dialCode: '+856' },
    { name: 'Latvia', dialCode: '+371' },
    { name: 'Lebanon', dialCode: '+961' },
    { name: 'Lesotho', dialCode: '+266' },
    { name: 'Liberia', dialCode: '+231' },
    { name: 'Libya', dialCode: '+218' },
    { name: 'Liechtenstein', dialCode: '+423' },
    { name: 'Lithuania', dialCode: '+370' },
    { name: 'Luxembourg', dialCode: '+352' },
    { name: 'Macao', dialCode: '+853' },
    { name: 'Madagascar', dialCode: '+261' },
    { name: 'Malawi', dialCode: '+265' },
    { name: 'Malaysia', dialCode: '+60' },
    { name: 'Maldives', dialCode: '+960' },
    { name: 'Mali', dialCode: '+223' },
    { name: 'Malta', dialCode: '+356' },
    { name: 'Marshall Islands', dialCode: '+692' },
    { name: 'Martinique', dialCode: '+596' },
    { name: 'Mauritania', dialCode: '+222' },
    { name: 'Mauritius', dialCode: '+230' },
    { name: 'Mayotte', dialCode: '+262' },
    { name: 'Mexico', dialCode: '+52' },
    { name: 'Micronesia', dialCode: '+691' },
    { name: 'Moldova', dialCode: '+373' },
    { name: 'Monaco', dialCode: '+377' },
    { name: 'Mongolia', dialCode: '+976' },
    { name: 'Montenegro', dialCode: '+382' },
    { name: 'Montserrat', dialCode: '+1-664' },
    { name: 'Morocco', dialCode: '+212' },
    { name: 'Mozambique', dialCode: '+258' },
    { name: 'Myanmar', dialCode: '+95' },
    { name: 'Namibia', dialCode: '+264' },
    { name: 'Nauru', dialCode: '+674' },
    { name: 'Nepal', dialCode: '+977' },
    { name: 'Netherlands', dialCode: '+31' },
    { name: 'New Caledonia', dialCode: '+687' },
    { name: 'New Zealand', dialCode: '+64' },
    { name: 'Nicaragua', dialCode: '+505' },
    { name: 'Niger', dialCode: '+227' },
    { name: 'Nigeria', dialCode: '+234' },
    { name: 'Niue', dialCode: '+683' },
    { name: 'Norfolk Island', dialCode: '+672' },
    { name: 'North Macedonia', dialCode: '+389' },
    { name: 'Northern Mariana Islands', dialCode: '+1-670' },
    { name: 'Norway', dialCode: '+47' },
    { name: 'Oman', dialCode: '+968' },
    { name: 'Pakistan', dialCode: '+92' },
    { name: 'Palau', dialCode: '+680' },
    { name: 'Palestine', dialCode: '+970' },
    { name: 'Panama', dialCode: '+507' },
    { name: 'Papua New Guinea', dialCode: '+675' },
    { name: 'Paraguay', dialCode: '+595' },
    { name: 'Peru', dialCode: '+51' },
    { name: 'Philippines', dialCode: '+63' },
    { name: 'Pitcairn', dialCode: '+64' },
    { name: 'Poland', dialCode: '+48' },
    { name: 'Portugal', dialCode: '+351' },
    { name: 'Puerto Rico', dialCode: '+1-787, 1-939' },
    { name: 'Qatar', dialCode: '+974' },
    { name: 'Reunion', dialCode: '+262' },
    { name: 'Romania', dialCode: '+40' },
    { name: 'Russia', dialCode: '+7' },
    { name: 'Rwanda', dialCode: '+250' },
    { name: 'Saint Barthelemy', dialCode: '+590' },
    { name: 'Saint Helena', dialCode: '+290' },
    { name: 'Saint Kitts and Nevis', dialCode: '+1-869' },
    { name: 'Saint Lucia', dialCode: '+1-758' },
    { name: 'Saint Martin', dialCode: '+590' },
    { name: 'Saint Pierre and Miquelon', dialCode: '+508' },
    { name: 'Saint Vincent and the Grenadines', dialCode: '+1-784' },
    { name: 'Samoa', dialCode: '+685' },
    { name: 'San Marino', dialCode: '+378' },
    { name: 'Sao Tome and Principe', dialCode: '+239' },
    { name: 'Saudi Arabia', dialCode: '+966' },
    { name: 'Senegal', dialCode: '+221' },
    { name: 'Serbia', dialCode: '+381' },
    { name: 'Seychelles', dialCode: '+248' },
    { name: 'Sierra Leone', dialCode: '+232' },
    { name: 'Singapore', dialCode: '+65' },
    { name: 'Sint Maarten', dialCode: '+1-721' },
    { name: 'Slovakia', dialCode: '+421' },
    { name: 'Slovenia', dialCode: '+386' },
    { name: 'Solomon Islands', dialCode: '+677' },
    { name: 'Somalia', dialCode: '+252' },
    { name: 'South Africa', dialCode: '+27' },
    { name: 'South Georgia and the South Sandwich Islands', dialCode: '+500' },
    { name: 'South Sudan', dialCode: '+211' },
    { name: 'Spain', dialCode: '+34' },
    { name: 'Sri Lanka', dialCode: '+94' },
    { name: 'Sudan', dialCode: '+249' },
    { name: 'Suriname', dialCode: '+597' },
    { name: 'Svalbard and Jan Mayen', dialCode: '+47' },
    { name: 'Sweden', dialCode: '+46' },
    { name: 'Switzerland', dialCode: '+41' },
    { name: 'Syria', dialCode: '+963' },
    { name: 'Taiwan', dialCode: '+886' },
    { name: 'Tajikistan', dialCode: '+992' },
    { name: 'Tanzania', dialCode: '+255' },
    { name: 'Thailand', dialCode: '+66' },
    { name: 'Timor-Leste', dialCode: '+670' },
    { name: 'Togo', dialCode: '+228' },
    { name: 'Tokelau', dialCode: '+690' },
    { name: 'Tonga', dialCode: '+676' },
    { name: 'Trinidad and Tobago', dialCode: '+1-868' },
    { name: 'Tunisia', dialCode: '+216' },
    { name: 'Turkey', dialCode: '+90' },
    { name: 'Turkmenistan', dialCode: '+993' },
    { name: 'Turks and Caicos Islands', dialCode: '+1-649' },
    { name: 'Tuvalu', dialCode: '+688' },
    { name: 'Uganda', dialCode: '+256' },
    { name: 'Ukraine', dialCode: '+380' },
    { name: 'United Arab Emirates', dialCode: '+971' },
    { name: 'United Kingdom', dialCode: '+44' },
    { name: 'United States', dialCode: '+1' },
    { name: 'Uruguay', dialCode: '+598' },
    { name: 'Uzbekistan', dialCode: '+998' },
    { name: 'Vanuatu', dialCode: '+678' },
    { name: 'Venezuela', dialCode: '+58' },
    { name: 'Vietnam', dialCode: '+84' },
    { name: 'Virgin Islands, British', dialCode: '+1-284' },
    { name: 'Virgin Islands, U.S.', dialCode: '+1-340' },
    { name: 'Wallis and Futuna', dialCode: '+681' },
    { name: 'Western Sahara', dialCode: '+212' },
    { name: 'Yemen', dialCode: '+967' },
    { name: 'Zambia', dialCode: '+260' },
    { name: 'Zimbabwe', dialCode: '+263' },
  ];
  let dialcode;
  let countrycode=()=>{
    let dcode=document.querySelector(".realpcode");
    let country=document.getElementById("country");
    for(let i=0;i<countriesWithDialCodes.length;i++){
        if(countriesWithDialCodes[i].name===country.value){
            dcode.innerHTML=countriesWithDialCodes[i].dialCode;
            dialcode=countriesWithDialCodes[i].dialCode;

        }

    }
  }


















  const verificationInputs = document.querySelectorAll('.codes');
let firstname=document.getElementById("fname");
let lastname=document.getElementById("lname");
let code=document.getElementById("code");
let email=document.getElementById("emai");
let pass1=document.getElementById("pass1");
let pass2=document.getElementById("pass2");

let country=document.getElementById("country");
let terms=document.getElementById("check");
let label =document.getElementById("checklabel");
let span1 =document.getElementById("span1");
let vbutton =document.getElementById("vbutton");
let sent= document.getElementById("span2");
let emailv= document.getElementById("emailv");

let loader =document.getElementsByClassName("loader");
let entercode= document.getElementsByClassName("code");

let eye=document.getElementsByClassName("fa");
let vbloader=document.getElementsByClassName("bloader");
let donotmatchspan=document.querySelector("#dmatchspan");
let phonenumber=document.querySelector("#phonenumberin")
let  phonenumbersection=document.querySelector(".phonecode");


let random=(min=10000, max =99999)=>{
    let dif= max-min;
    let rad= Math.random();
    rad=Math.floor(rad * dif);
    rad =rad +min;
    return rad
}
let db;
let workerp =()=>{
    db="candidate_profile";
    
}
let clientp =()=>{
    db="employer_profile";
    
}



let rcode= random();

document.getElementById("form").addEventListener('submit', (e) =>{
    e.preventDefault();
    if(pass1.value !=pass2.value){
        pass1.style.border="1px solid red";
        pass2.style.border="1px solid red";
        donotmatchspan.innerHTML="Passwords do not match!"

    }else
    if(country.value==="country"){
        country.style.border="2px solid red"
        let cspan = document.getElementById("spancountry");
        cspan.innerHTML="Select Country!";
       
    }else if(phonenumber.value===""){
        phonenumbersection.style.border="1px solid red";
    }

    else if(terms.checked ===false){
       label.style.color="red";
    }
    else{

      

        const emailaddress=email.value.trim();
   
  const formdata = new FormData();

 
  formdata.append("code",rcode);
  formdata.append("dbtype",db)
  formdata.append("email",emailaddress);

   
    const options ={
  
        method: 'POST',
   
        body: formdata,
       
    };
   // https://half-geode-roundworm.glitch.me/api'
    
    let f= fetch('https://yielding-dented-amusement.glitch.me/vcode',options).catch(err =>{
      /*https://yielding-dented-amusement.glitch.me/api*/
  });


  loader[0].classList.add("addedloader");
  f.then(res => res.json()).then(d =>{

    
    loader[0].classList.remove("addedloader");
    if(d.err==="error"){
    
        email.style.border="2px solid red";
        emailv.innerHTML="Invalid email!";
        vbloader[0].classList.remove("adddedbloader");

    
    }else if(d.exist==="exist"){
        email.style.border="2px solid red";
        emailv.innerHTML="Email already exists!"
        vbloader[0].classList.remove("adddedbloader");

    }else if(d.exist==="not"){
      email.style.border="2px solid red";
        emailv.innerHTML="Only business emails are accepted!"
        vbloader[0].classList.remove("adddedbloader");

    }else{

        let codeinputdiv=document.getElementsByClassName("emailvericationdivi");
        let eye=document.querySelector(".fa");
        let emailmess=document.querySelector("#sentemail");

        codeinputdiv[0].classList.add("addedcodep");
        eye.style.display="none";
        emailmess.innerHTML=email.value;

/*
      vbloader[0].classList.remove("adddedbloader");
        vbutton.innerHTML="Re-Send";
        sent.innerHTML=d.sent;
        span1.innerHTML="Enter code sent to your email.";
       
      
        setTimeout(()=>{
          
          sent.innerHTML="";
        },1000);*/
    }
    
    
    }).catch(err =>{
    
   
     if(err){
    // yes();
    //  alert("Not sent.........the server is down!");
    
     }else{
    
     }
    });



    }
   /* if(code.value != rcode){
        code.style.border="2px solid red";
    }else if(country.value===country){
       country.style.border="2px solid red"
        let cspan = document.getElementById("spancountry");
        cspan.innerHTML="Select Country!";
    }
*/

   
});


const maxLength = 1;

verificationInputs.forEach((input, index) => {
  input.addEventListener('input', (event) => {
    const value = event.target.value;

    if (value.length >= maxLength) {
      if (index < verificationInputs.length - 1) {
        verificationInputs[index + 1].focus();
      } else {
        // Last input reached, you can perform any action here (e.g., submit the form)
          if(getVerificationCode() !=rcode){
            verificationInputs[0].style.border="1px solid red";
            verificationInputs[1].style.border="1px solid red";
            verificationInputs[2].style.border="1px solid red";
            verificationInputs[3].style.border="1px solid red";
            verificationInputs[4].style.border="1px solid red";
          }else{
            let dbvariable=['first_name','last_name','email','password','country','phonenumber'];
    
       
       
        const formdata = new FormData();
        
       
        formdata.append("dbname", db);

        formdata.append("dbvariable", dbvariable);
        //formdata.append("dbvalues", dbvalues);
       
       formdata.append("firstname",firstname.value);
       formdata.append("lastname",lastname.value);
       formdata.append("email",email.value);
       formdata.append("password",pass1.value);
       formdata.append("country",country.value);
       formdata.append('phonenumber',dialcode+phonenumber.value);
     
        const options ={

            method: 'POST',
       
            body: formdata,
           
        };
       // https://1ed2-105-231-144-76.ngrok.io/api'

       //https://half-geode-roundworm.glitch.me/api
        
        let f= fetch('https://yielding-dented-amusement.glitch.me/register',options).catch(err =>{
          
    
    });

    getrid();
    loader[0].classList.add("addedloader");
   
    
f.then(res => res.json()).then(d =>{
   if(d.affectedRows===1){
   
    loader[0].classList.remove("addedloader");
    
  
       

        window.location.href="/login.html";
   

    
    
        
   
 
   }
   
   
  

}).catch(err =>{
   
    console.log(err);
       if(err){
     // yes();
    //  alert("Not sent.........the server is down!");
      
       }else{
    
       }
});


        document.getElementById("form").reset()
          }
        
       
      }
    }
  });

  input.addEventListener('keydown', (event) => {
    const BACKSPACE_KEY_CODE = 8;

    if (event.keyCode === BACKSPACE_KEY_CODE && index > 0 && input.value.length === 0) {
      verificationInputs[index - 1].focus();
    }
  });
});
function getVerificationCode() {
    let code = '';
    verificationInputs.forEach((input) => {
      code += input.value;
    });
    return code;
  }





let change =()=>{
    verificationInputs[0].style.border="1px solid  hsl(188,47%,20%)";
    verificationInputs[1].style.border="1px solid  hsl(188,47%,20%)";
    verificationInputs[2].style.border="1px solid  hsl(188,47%,20%)";
    verificationInputs[3].style.border="1px solid  hsl(188,47%,20%)";
    verificationInputs[4].style.border="1px solid  hsl(188,47%,20%)";
    let passspan= document.getElementById("passmess");
    passspan.style.color="black";
    pass1.style.border="1px solid  hsl(188,47%,20%)";
    pass2.style.border="1px solid  hsl(188,47%,20%)";
    donotmatchspan.innerHTML="";
    phonenumbersection.style.border="";
    country.style.border="2px solid black"
    let cspan = document.getElementById("spancountry");
    cspan.innerHTML="";
    label.style.color="black";

    email.style.border="1px solid black";
    emailv.innerHTML=""
}

const togglePassword = document.querySelector('#togglePassword');
  const password = document.querySelector('#pass1');
  const password2 = document.querySelector('#pass2');

  togglePassword.addEventListener('click', function (e) {
    // toggle the type attribute
    const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
    password.setAttribute('type', type);
    const type2 = password2.getAttribute('type') === 'password' ? 'text' : 'password';
    password2.setAttribute('type', type2);
    // toggle the eye slash icon
    this.classList.toggle('fa-eye-slash');
});

pass1.addEventListener("invalid",(e)=>{
    e.preventDefault();
    let passspan= document.getElementById("passmess");
    passspan.style.color="red";
    pass1.style.border="2px solid red";
});
let resend=()=>{
    const emailaddress=email.value.trim();
   
  const formdata = new FormData();

 
  formdata.append("code",rcode);
  formdata.append("dbtype",db)
  formdata.append("email",emailaddress);

   
    const options ={
  
        method: 'POST',
   
        body: formdata,
       
    };
   // https://half-geode-roundworm.glitch.me/api'
    
    let f= fetch('https://yielding-dented-amusement.glitch.me/vcode',options).catch(err =>{
      /*https://yielding-dented-amusement.glitch.me/api*/
  });
  vbloader[0].classList.add("adddedbloader");
  f.then(res => res.json()).then(d =>{
    vbloader[0].classList.remove("adddedbloader");
    
   
    
    }).catch(err =>{
    
   
     if(err){
    // yes();
    //  alert("Not sent.........the server is down!");
    
     }else{
    
     }
    });

}

let getrid=()=>{
    let codeinputdiv=document.getElementsByClassName("emailvericationdivi");
    let eye=document.querySelector(".fa");
    
    verificationInputs[0].value=""
    verificationInputs[1].value=""
    verificationInputs[2].value=""
    verificationInputs[3].value=""
    verificationInputs[4].value=""
    verificationInputs[0].style.border="1px solid  hsl(188,47%,20%)";
    verificationInputs[1].style.border="1px solid  hsl(188,47%,20%)";
    verificationInputs[2].style.border="1px solid  hsl(188,47%,20%)";
    verificationInputs[3].style.border="1px solid  hsl(188,47%,20%)";
    verificationInputs[4].style.border="1px solid  hsl(188,47%,20%)";

    codeinputdiv[0].classList.remove("addedcodep");
    eye.style.display="block";
    
}
let verify =()=>{
 
if(email.value===""){
    
    email.style.border="2px solid red";
}else{
    const emailaddress=email.value.trim();
   
  const formdata = new FormData();

 
  formdata.append("code",rcode);
  formdata.append("dbtype",db)
  formdata.append("email",emailaddress);

   
    const options ={
  
        method: 'POST',
   
        body: formdata,
       
    };
   // https://half-geode-roundworm.glitch.me/api'
    
    let f= fetch('https://yielding-dented-amusement.glitch.me/vcode',options).catch(err =>{
      /*https://yielding-dented-amusement.glitch.me/api*/
  });
  vbloader[0].classList.add("adddedbloader");
  f.then(res => res.json()).then(d =>{
  

  
    if(d.err==="error"){
    
        email.style.border="2px solid red";
        emailv.innerHTML="Invalid email!";
        vbloader[0].classList.remove("adddedbloader");

    
    }else if(d.exist==="exist"){
      console.log(d.exist);
        email.style.border="2px solid red";
        emailv.innerHTML="Email already exist!"
        vbloader[0].classList.remove("adddedbloader");

    }else if(d.exist==="not"){
      email.style.border="2px solid red";
        emailv.innerHTML="Only business emails are accepted!"
        vbloader[0].classList.remove("adddedbloader");

    }
    else{
      vbloader[0].classList.remove("adddedbloader");
        vbutton.innerHTML="Re-Send";
        sent.innerHTML=d.sent;
        span1.innerHTML="Enter code sent to your email.";
       
      
        setTimeout(()=>{
          
          sent.innerHTML="";
        },1000);
    }
    
    
    }).catch(err =>{
    console.log(err)
   
     if(err){
    // yes();
    //  alert("Not sent.........the server is down!");
    
     }else{
    
     }
    });
}




  
   
}