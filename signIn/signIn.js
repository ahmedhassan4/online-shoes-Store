//////////////////////////////image slider//////////////////////////////////////////////

let bg = document.querySelector(".bg");
let slides = document.querySelectorAll(".slide");

let activeSlide = 0;

setInterval(function () {
  activeSlide++;
  if (activeSlide > slides.length - 1) {
    activeSlide = 0;
  }
  setBackground();
  setActiveSlide();
}, 3000);

setBackground();
function setBackground() {
  bg.style.backgroundImage = slides[activeSlide].style.backgroundImage;
}
function setActiveSlide() {
  slides.forEach((slide) => slide.classList.remove("active"));
  slides[activeSlide].classList.add("active");
}

///////////////////////////////////////////////////////////////////////////////////////////////////////

const users = JSON.parse(localStorage.getItem("users", JSON.stringify()));

//email and password validation
//====================================
document
  .getElementById("sign-with-email")
  .addEventListener("submit", function (event) {
    let valid = true;

    event.preventDefault();
    const email = document.getElementById("email").value;

    const password = document.getElementById("password").value;

    const user = users.find((user) => user.email === email);
    if (user) {
      if (user.email == email && user.password == password) {
        console.log("done");
        localStorage.setItem("activeUser", JSON.stringify(user));
        window.location.href = "../products";
      } else {
        console.log("wrong password");
        document.getElementById("password-error").innerHTML =
          "Incorrect password";
      }
    } else {
      console.log("email doesn't exist");
      document.getElementById("emailError").innerHTML = "email doesn't exist";
    }
  });
