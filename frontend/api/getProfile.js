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
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
