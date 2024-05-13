// Fonction pour accepter une demande d'échange
function acceptExchangeRequest(requestId) {
  fetch(`/exchange/accept/${requestId}`, { method: "POST" })
    .then((response) => {
      // Gérer la réponse si nécessaire
    })
    .catch((error) => {
      console.error(
        "Erreur lors de l'acceptation de la demande d'échange:",
        error,
      );
    });
}

// Fonction pour refuser une demande d'échange
function refuseExchangeRequest(requestId) {
  fetch(`/exchange/refuse/${requestId}`, { method: "POST" })
    .then((response) => {
      // Gérer la réponse si nécessaire
    })
    .catch((error) => {
      console.error("Erreur lors du refus de la demande d'échange:", error);
    });
}

fetch("/getprofile")
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let profileContent = document.querySelector(".profile_content");

    // Créer une chaîne de caractères pour le contenu HTML
    let htmlContent = `
      <div class="profile_username">
          <h2>Profil de ${data.username}</h2>
      </div>
      <div class="profile_card_container">
        <div class="profile_card">
          <p class="profile_card_title">Votre identifiant</p>
          <div class="profil_card_content">
              ${data.id}
          </div>
        </div>
          <div class="profile_card">
            <p class="profile_card_title">Nombre de cartes</p>
            <div class="profil_card_content">
                ${data.numberCards}
            </div>
          </div>
          <div class="profile_card">
              <p class="profile_card_title">Prochain tirage</p>
              <div class="profil_card_content">
                ${data.remainingTime}
              </div>
          </div>
        </div>
        `;

    if (
      data.remainingTime !== "Tirer vos cartes" &&
      data.remainingTime !== "0h 0m" &&
      data.remainingTime !== "0 h 0 m"
    ) {
      htmlContent += `
          <div class="draw_button disabled">Tirer vos cartes</div>
        `;
    } else {
      htmlContent += `
        <a href="/draw">
          <div class="draw_button">Tirer vos cartes</div>
        </a>`;
    }

    // Ajouter le contenu HTML à profileContent une seule fois
    profileContent.innerHTML = htmlContent;

    let cardsProfile = document.querySelector(".cards_container_gallery");

    for (let i = 0; i < data.cards.length; i++) {
      cardsProfile.innerHTML += `
          <div class="card" data-house="${data.cards[i].card.house}" data-id="${data.cards[i].id_card}">
              <img
                  class="card_image"
                  src="../../img/cartes/${data.cards[i].id_card}.jpg"
                  alt="${data.cards[i].card.name}"
              />
          </div>
      `;
    }

    // Fetch pour récupérer les demandes d'échange
    fetch("/exchange/getrequests")
      .then((response) => response.json())
      .then((exchangeData) => {
        let exchangeRequest = document.querySelector(
          ".dashboard_container_requests",
        );

        let exchangeRequestHTML = "";

        if (!exchangeData.exchangeRequest) {
          exchangeRequestHTML += `
                <div class="dashboard_content_request">
                  <div class="dashboard_content_request_infos">
                    <div class="dashboard_content_request_by">
                      <div class="dashboard_content_request_infos_by">
                        <h5>PAS DE DEMANDE D'ÉCHANGE</h5>
                      </div>
                    </div>
                  </div>
                </div>`;
        } else {
          for (let i = 0; i < exchangeData.exchangeRequest.length; i++) {
            exchangeRequestHTML += `
            <div class="dashboard_content_request">
              <div class="dashboard_content_request_infos">
                <div class="dashbord_content_request_exchange_card">
                  <h4>${exchangeData.exchangeRequest[i].id_card_want}</h4>
                  <svg xmlns="http://www.w3.org/2000/svg" id="arrow-circle-down" viewBox="0 0 24 24"><path d="M0,7A1,1,0,0,1,1,6H18V2.639a.792.792,0,0,1,1.35-.552l4.418,4.361a.773.773,0,0,1,0,1.1L19.35,11.913A.792.792,0,0,1,18,11.361V8H1A1,1,0,0,1,0,7Zm23,9H6V12.639a.792.792,0,0,0-1.35-.552L.232,16.448a.773.773,0,0,0,0,1.1L4.65,21.913A.792.792,0,0,0,6,21.361V18H23a1,1,0,0,0,0-2Z"/></svg>
                  <h4>${exchangeData.exchangeRequest[i].id_card}</h4>
                </div>
                <div class="dashboard_content_request_status">
                  <h6>EN COURS</h6>
                </div>
              </div>
              <div class="dashboard_content_request_by">
                <div class="dashboard_content_request_infos_by">
                  <h5>DEMANDE PAR</h5>
                  <h6>${exchangeData.exchangeRequest[i].id_user}</h6>
                </div>
                <div>
                  <button class="card_button_exchange acceptButton" data-request-id="${exchangeData.exchangeRequest[i].id_exchange}">Accepter</button>
                  <button class="card_button_exchange deleteButton" data-request-id="${exchangeData.exchangeRequest[i].id_exchange}">Refuser</button>
                </div>
              </div>
            </div>`;
          }
        }

        exchangeRequest.innerHTML = exchangeRequestHTML;

        // Ajouter des écouteurs d'événements aux boutons d'acceptation et de refus
        const acceptButtons = document.querySelectorAll(".acceptButton");
        const deleteButtons = document.querySelectorAll(".deleteButton");
        if (!deleteButtons) return;
        if (acceptButtons) {
          acceptButtons.forEach((button) => {
            button.addEventListener("click", function (event) {
              event.preventDefault();
              console.log("click");
              const requestId = button.getAttribute("data-request-id");
              // Envoyer l'identifiant de la demande d'échange à la fonction d'acceptation
              acceptExchangeRequest(requestId);
            });
          });
        }
        if (deleteButtons) {
          deleteButtons.forEach((button) => {
            button.addEventListener("click", function (event) {
              event.preventDefault();
              const requestId = button.getAttribute("data-request-id");
              console.log(requestId, "requestId appjs");
              // Envoyer l'identifiant de la demande d'échange à la fonction de refus
              refuseExchangeRequest(requestId);
            });
          });
        }
      })
      .catch((error) => {
        console.error(
          "Erreur lors de la récupération des demandes d'échange:",
          error,
        );
      });
  })
  .catch((error) => {
    console.error("Erreur lors de la récupération des données:", error);
  });
