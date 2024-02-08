function darkMode() {
  const darkModeButton = document.querySelector(".dark_mode_button");
  const body = document.querySelector("body");
  if (localStorage.getItem("darkMode") === "true") {
    body.classList.add("dark-mode");
  }
  else {
    body.classList.remove("dark-mode");
  }
  darkModeButton.addEventListener("click", function () {
    body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
  });

}

function Carousel() {
  const swiper = new Swiper(".mySwiper", {
    loop: true,
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 2500,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}


function navTap() {
  const btnOpen = document.getElementById("btn_open");
  const btnClose = document.getElementById("btn_close");
  const navContent = document.getElementById("nav_content");

  btnOpen.addEventListener("click", function () {
    btnOpen.style.display = "none";
    navContent.style.display = "block";
    navContent.classList.remove("closeTab");
    navContent.classList.add("openTab");
  });

  btnClose.addEventListener("click", function () {
    navContent.classList.remove("openTab");
    navContent.classList.add("closeTab");
  });

  navContent.addEventListener("animationend", function () {
    if (navContent.classList.contains("closeTab")) {
      navContent.style.display = "none";
      btnOpen.style.display = "flex";
    }
  });
}


function openTab(e, tabName) {
  let i = 0;
  const tabcontent = document.getElementsByClassName("tab_content");
  const tabbutton = document.getElementsByClassName("account_tab_button");

  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  for (i = 0; i < tabbutton.length; i++) {
    tabbutton[i].classList.remove("active");
  }

  document.getElementById(tabName).style.display = "block";
  e.currentTarget.classList.add("active");
}

function formVerification() {
  const form = document.getElementById("signup_form");
  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let email = document.querySelector("#email_signup");
    let name = document.querySelector("#name");
    let password = document.querySelector("#password_signup");
    let confirmPassword = document.querySelector("#confirmPassword");


    const errorList = document.getElementById("error_list");
    errorList.innerHTML = "";

    if (name.value === "" || name.value.length < 6) {
      addErrorToList("Le nom doit contenir au moins 6 caractères");
    }

    if (email.value === "" || email.value.indexOf("@") === -1) {
      addErrorToList("L'adresse email n'est pas valide");
    }

    const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).{8,}$/;

    if (password.value.length < 8 || regexPassword.test(password.value) === false) {
      addErrorToList("Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial");
    }

    if (password.value !== confirmPassword.value || confirmPassword.value === "") {
      addErrorToList("Les mots de passe ne correspondent pas");
    }

    if (errorList.children.length > 0) {
      const errorMessage = document.querySelector(".error_form");
      errorMessage.style.display = "block";
    } else {
      const successMessage = document.querySelector(".success_form");
      successMessage.style.display = "block";
      setTimeout(() => {
        form.submit();
      }, 2000);
    }

    console.log("Formulaire envoyé");
  });

  function addErrorToList(errorMessage) {
    const errorList = document.getElementById("error_list");
    const errorItem = document.createElement("li");
    errorItem.textContent = errorMessage;
    errorList.appendChild(errorItem);
  }
}

function burgerMenu() {
  const burgerIcon = document.getElementById('menuIcon');
  const overlay = document.getElementById('overlay');
  const closeIcon = document.getElementById('closeIcon');


  burgerIcon.addEventListener('click', function () {
    overlay.style.display = "flex";
    burgerIcon.style.display = "none";
    closeIcon.style.display = "block";


  });
  closeIcon.addEventListener('click', function () {
    overlay.style.display = "none";
    closeIcon.style.display = "none";
    burgerIcon.style.display = "block";
  });
}

document.addEventListener("DOMContentLoaded", function () {
  burgerMenu();
  darkMode();
  Carousel();
  navTap();
  document.getElementById("defaultOpen").click();
  formVerification();

});










