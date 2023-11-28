let form = document.getElementById("form");
let freelance = document.getElementById("freelancer");
let hire = document.getElementById("hire");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (freelance.checked === true) {
    window.location.href = "/signupwork";
    form.reset();
  } else if (hire.checked === true) {
    window.location.href = "/sighnuphire";
    form.reset();
  }
});
