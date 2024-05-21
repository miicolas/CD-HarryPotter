function darkMode() {
  const darkModeButton = document.querySelectorAll(".dark_mode_button");
  const body = document.querySelector("body");
  const elementsToToggle = document.querySelectorAll(".dark-mode-toggle");

  const toggleDarkMode = () => {
    body.classList.toggle("dark-mode");
    elementsToToggle.forEach((element) => {
      element.classList.toggle("dark-mode");
    });
    localStorage.setItem("darkMode", body.classList.contains("dark-mode"));
  };

  darkModeButton.forEach((button) => {
    button.addEventListener("click", toggleDarkMode);
  });

  if (localStorage.getItem("darkMode") === "true") {
    toggleDarkMode();
  }
}

function logout() {
  const button = document.querySelector(".logout");
  if (!button) return;

  button.addEventListener("click", () => {
    // console.log("Click on logout button");
    localStorage.removeItem("token");
    window.location.href = "/signin.html";
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

function searchCard() {
  const searchInput = document.getElementById("search");
  if (!searchInput) return;
  // console.log(searchInput);

  searchInput.addEventListener("input", function () {
    const galleryItems = document.querySelectorAll(".card");
    // console.log(galleryItems);

    const searchValue = searchInput.value.trim().toLowerCase(); // trim() supprime les espaces avant et après la chaîne de caractères
    // console.log("Valeur ", searchValue);
    // console.log("Items ", galleryItems);

    galleryItems.forEach(function (item) {
      // Vérifiez que l'élément possède bien un attribut data-id

      const dataId = item.getAttribute("data-id");
      // console.log("Data id: ", dataId);

      // Vérifiez si l'attribut data-id est null ou non
      if (dataId !== null) {
        const lowerCaseDataId = dataId.toLowerCase(); // Convertissez la valeur de l'attribut data-id en minuscules

        if (lowerCaseDataId.includes(searchValue)) {
          // Vérifiez si la valeur de l'attribut data-id contient la valeur de la recherche
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      } else {
        // Si l'attribut data-id est null, affichez un message dans la console pour le signaler
        console.log("Attribut manquant");
      }
    });
  });
}

function navTap() {
  const btnOpen = document.getElementById("btn_open");
  const btnClose = document.getElementById("btn_close");
  const navContent = document.getElementById("nav_content");
  if (!navContent) return;
  // console.log(btnOpen);
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

function addErrorToList(errorMessage) {
  const errorList = document.getElementById("error_list");
  const errorItem = document.createElement("li");
  errorItem.textContent = errorMessage;
  errorList.appendChild(errorItem);
}

// function formVerificationSignup() {
//   const form = document.getElementById("signup_form");
//   if (!form) return;

//   form.addEventListener("submit", function (e) {
//     e.preventDefault();

//     let email = document.querySelector("#email_signup");
//     let username_signup = document.querySelector("#username_signup");
//     let password = document.querySelector("#password_signup");
//     let confirmPassword = document.querySelector("#confirmPassword");

//     const errorList = document.getElementById("error_list");
//     errorList.innerHTML = "";

//     if (username_signup.value === "" || username_signup.value.length < 6) {
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
//         "Le mot de passe doit contenir au moins 8 caractères, une majuscule, une minuscule, un chiffre et un caractère spécial",
//       );
//     }

//     if (
//       password.value !== confirmPassword.value ||
//       confirmPassword.value === ""
//     ) {
//       addErrorToList("Les mots de passe ne correspondent pas");
//     }

//     if (errorList.children.length > 0) {
//       const errorMessage = document.querySelectorAll(".error_form");
//       errorMessage.style.display = "block";
//     } else {
//       const successMessage = document.querySelectorAll(".success_form");
//       successMessage.style.display = "block";

//       form.submit();
//     }
//     console.log("Formulaire envoyé");
//   });
// }

async function formVerificationLogin() {
  const formLogin = document.getElementById("login_form");
  if (!formLogin) return;

  formLogin.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.querySelector("#email_login");
    const password = document.querySelector("#password_login");

    localStorage.setItem("email", email.value);

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

      fetch("/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.value,
          password: password.value,
        }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          if (data.token) {
            localStorage.setItem("token", data.token);
            window.location.href = "/dashboard.html";
          } else {
            addErrorToList("Erreur lors de la connexion. Veuillez réessayer.");
            document.querySelector(".error_form").style.display = "block";
          }
        })
        .catch((error) => {
          console.error("Erreur:", error);
          addErrorToList("Erreur lors de la connexion. Veuillez réessayer.");
          document.querySelector(".error_form").style.display = "block";
        });
    }
  });
}

function addErrorToList(errorMessage) {
  const errorList = document.getElementById("error_list");
  const errorItem = document.createElement("li");
  errorItem.textContent = errorMessage;
  errorList.appendChild(errorItem);
}

function formExchange() {
  const form = document.querySelector(".form_exchange");
  const cardNameGive = document.getElementById("card_name_give");
  const cardNameWant = document.getElementById("card_name_want");
  const cardUser = document.getElementById("card_user");
  if (!form) return;

  console.log("form", form);

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    fetch("/exchange/request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        card_name_give: cardNameGive.value,
        card_name_want: cardNameWant.value,
        card_user: cardUser.value,
      }),
    })
      // si la reponse n'est pas une reponse status 200, on renvoie une erreur
      .then((response) => {
        if (!response.status === 200) {
          throw new Error("Erreur lors de la requête");
        }
      })
      .then((data) => {
        // console.log("Success:", data);
        window.location.href = "/dashboard.html";
      })
      .catch((error) => {
        console.error("Erreur:", error);
      });
  });
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

function cardInfo() {
  const card = document.querySelectorAll(".card_button_readmore");
  if (!card) return;

  card.forEach((card) => {
    card.addEventListener("click", function () {
      const cardId = card.closest(".card").getAttribute("data-id");
      // console.log(cardId, "cardId appjs");
      // renvoie sur la page de la carte
      window.location.href = `/cardinfo.html?card=${cardId}`;
    });
  });
}

function newRequestExchange() {
  const btnExchange = document.getElementById("btn_exchange");
  const exchangeForm = document.getElementById("exchange");
  const closeExchange = document.getElementById("close_exchange");

  if (btnExchange && exchangeForm && closeExchange) {
    btnExchange.addEventListener("click", function () {
      exchangeForm.style.display = "block";
    });

    closeExchange.addEventListener("click", function () {
      exchangeForm.style.display = "none";
    });
  }
}

document.addEventListener("DOMContentLoaded", function () {
  navTap();
  logout();
  openTab();
  formExchange();
  burgerMenu();
  darkMode();
  formVerificationLogin();
  newRequestExchange();
  // formVerificationSignup();
  // Carousel();
  filterCards();
  searchCard();
  setTimeout(() => {
    cardInfo();
  }, 1000);
});
