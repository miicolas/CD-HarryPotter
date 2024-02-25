function darkMode() {
  const darkModeButton = document.querySelectorAll(".dark_mode_button");
  const rulesContent = document.querySelectorAll(".rules_content");
  const body = document.querySelector("body");
  const titleForm = document.querySelectorAll(".tab_content_title");
  const labelForm = document.querySelectorAll("label");

  if (localStorage.getItem("darkMode") === "true") {
    body.classList.add("dark-mode");
    rulesContent.forEach((container) => {
      container.classList.add("dark-mode");
    });
    titleForm.forEach((title) => {
      title.classList.add("dark-mode");
    });
    labelForm.forEach((form) => {
      form.classList.add("dark-mode");
    });
  } else {
    body.classList.remove("dark-mode");
    rulesContent.forEach((container) => {
      container.classList.remove("dark-mode");
    });
    titleForm.forEach((title) => {
      title.classList.remove("dark-mode");
    });
    labelForm.forEach((form) => {
      form.classList.remove("dark-mode");
    });
  }
  darkModeButton.forEach((button) => {
    button.addEventListener("click", function () {
      body.classList.toggle("dark-mode");
      rulesContent.forEach((container) => {
        container.classList.toggle("dark-mode");
      });
      titleForm.forEach((title) => {
        title.classList.toggle("dark-mode");
      });
      labelForm.forEach((form) => {
        form.classList.toggle("dark-mode");
      });
      localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
      localStorage.setItem(
        "darkMode",
        rulesContent.classList.contains("dark-mode")
      );
      localStorage.setItem(
        "darkMode",
        titleForm.classList.contains("dark-mode")
      );
      localStorage.setItem(
        "darkMode",
        labelForm.classList.contains("dark-mode")
      );
    });
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
  if (!swiper) return;
}

function navTap() {
  const btnOpen = document.getElementById("btn_open");
  const btnClose = document.getElementById("btn_close");
  const navContent = document.getElementById("nav_content");
  if (!navContent) return;
  console.log(btnOpen);
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

// function formVerificationSignup() {
//   const form = document.getElementById("signup_form");
//   if (!form) return;

//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     let email = document.querySelector("#email_signup");
//     let name = document.querySelector("#name");
//     let password = document.querySelector("#password_signup");
//     let confirmPassword = document.querySelector("#confirmPassword");

//     const errorList = document.getElementById("error_list");
//     errorList.innerHTML = "";

//     if (name.value === "" || name.value.length < 6) {
//       addErrorToList("Le nom doit contenir au moins 6 caractères");
//     }

//     if (email.value === "" || email.value.indexOf("@") === -1) {
//       addErrorToList("L'adresse email n'est pas valide");
//     }

//     const regexPassword =
//       /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[-+_!@#$%^&*.,?]).{8,}$/;

//     if (
//       password.value.length < 8 ||
//       regexPassword.test(password.value) === false
//     ) {
//       addErrorToList(
//         "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial"
//       );
//     }

//     if (
//       password.value !== confirmPassword.value ||
//       confirmPassword.value === ""
//     ) {
//       addErrorToList("Les mots de passe ne correspondent pas");
//     }

//     if (errorList.children.length > 0) {
//       const errorMessage = document.querySelector(".error_form");
//       errorMessage.style.display = "block";
//     } else {
//       const successMessage = document.querySelector(".success_form");
//       successMessage.style.display = "block";
//       setTimeout(() => {
//         form.submit();
//       }, 2000);
//     }console.log("Formulaire envoyé");

//     window.location.replace("/signup");

//   });

//   function addErrorToList(errorMessage) {
//     const errorList = document.getElementById("error_list");
//     const errorItem = document.createElement("li");
//     errorItem.textContent = errorMessage;
//     errorList.appendChild(errorItem);
//   }
// }

function formVerificationLogin() {
  const formLogin = document.getElementById("login_form");
  if (!formLogin) return;

  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();
    let email = document.querySelector("#email_login");
    let password = document.querySelector("#password_login");

    const errorList = document.getElementById("error_list");
    errorList.innerHTML = "";

    if (email.value === "" || email.value.indexOf("@") === -1) {
      addErrorToList("L'adresse email n'est pas valide");
    }

    if (password.value === "" || password.value.length < 8) {
      addErrorToList("Le mot de passe doit contenir au moins 8 caractères");
    }

    if (errorList.children.length > 0) {
      const errorMessage = document.querySelector(".error_form");
      errorMessage.style.display = "block";
    } else {
      const successMessage = document.querySelector(".success_form");
      successMessage.style.display = "block";
      setTimeout(() => {
        formLogin.submit();
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
  const burgerIcon = document.getElementById("menuIcon");
  const overlay = document.getElementById("overlay");
  const closeIcon = document.getElementById("closeIcon");

  if (!burgerIcon) return;

  burgerIcon.addEventListener("click", function () {
    overlay.style.display = "flex";
    burgerIcon.style.display = "none";
    closeIcon.style.display = "block";
  });
  closeIcon.addEventListener("click", function () {
    overlay.style.display = "none";
    closeIcon.style.display = "none";
    burgerIcon.style.display = "block";
  });
}
function openTab() {
  const tabButtons = document.querySelectorAll(".account_tab_button");
  const tabContent = document.querySelectorAll(".tab_content");
  tabButtons.forEach((button) => {
    button.addEventListener("click", function () {
      tabButtons.forEach((btn) => {
        btn.classList.remove("active");
      });
      button.classList.add("active");
      tabContent.forEach((content) => {
        content.style.display = "none";
      });

      const tabName = button.dataset.tab;
      const tabActive = document.getElementById(tabName);
      tabActive.style.display = "block";
    });
  });
}

function filterCards() {
  const filterAll = document.getElementById("BtnAll");
  const filterGryff = document.getElementById("BtnGryff");
  const filterPouff = document.getElementById("BtnPouff");
  const filterSerdaigle = document.getElementById("BtnSerdaigle");
  const filterSerpentard = document.getElementById("BtnSerpen");

  if (!filterAll) return;

  const filterButtons = [
    filterAll,
    filterGryff,
    filterPouff,
    filterSerdaigle,
    filterSerpentard,
  ];

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => {
        btn.classList.remove("select");
      });
      button.classList.add("select");

      const maison = button.getAttribute("data-house");
      console.log(maison);

      filterCardsByType(maison);
    });
  });

  function filterCardsByType(maison) {
    const cards = document.querySelectorAll(".card");
    cards.forEach((card) => {
      const cardType = card.getAttribute("data-house");
      if (maison === "Tous" || maison === cardType) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  }
}

function buttonFriends() {
  // Dans votre frontend JavaScript où vous gérez les clics sur le bouton "Accepter"
  const acceptButtons = document.querySelectorAll(".acceptButton");
  const deleteButtons = document.querySelectorAll(".deleteButton");
  if (!deleteButtons) return;
  if (acceptButtons) {
    acceptButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        const username = button.closest(".friend").getAttribute("data-username");
        // Utilisez le nom d'utilisateur pour construire l'URL de la requête
        window.location.href = `/acceptFriend?friend=${username}`;
      });
    });
  }
  if (deleteButtons){
    deleteButtons.forEach((button) => {
      button.addEventListener("click", function (event) {
        event.preventDefault();
        const username = button.closest(".friend").getAttribute("data-username");
        // Utilisez le nom d'utilisateur pour construire l'URL de la requête
        window.location.href = `/deletefriend?friend=${username}`;
      });
    });
  
  }
}

function cardInfo (){
  const card = document.querySelectorAll(".card_button_readmore");
  
  if (!card) return;
  card.forEach((card) => {
    card.addEventListener("click", function () {
      const cardId = card.closest(".card").getAttribute("data-id");
      console.log(cardId, "cardId appjs")
      // renvoie sur la page de la carte
      window.location.href = `/cardinfo.html?card=${cardId}`;

    });
  });

}

document.addEventListener("DOMContentLoaded", function () {
  
  navTap();
  openTab();
  burgerMenu();
  darkMode();
  formVerificationLogin();
  
  // formVerificationSignup();
  // Carousel();
  filterCards();
  setTimeout(() => {
    cardInfo();}, 1000);
  setTimeout(() => {
    buttonFriends();
  }, 100);
});
