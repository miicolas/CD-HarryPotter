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
            <p>${data.username}</p>
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

    if (data.remainingTime !== "Tirer vos cartes") {
      htmlContent += `
        
          <div class="draw_button disabled">Tirer vos cartes</div>
        `;
    } else {
      htmlContent += `
        <a href="/draw">
          <div class="draw_button">${data.remainingTime}</div>
        </a>`;
    }

    // Fermer la balise div principale
    // htmlContent += `</div>`;

    // Ajouter le contenu HTML à profileContent une seule fois
    profileContent.innerHTML = htmlContent;

    let cardsProfile = document.querySelector(".cards_container_gallery");

    for (let i = 0; i < data.cards.length; i++) {
      cardsProfile.innerHTML += `
          <div class="card" data-house="${data.cards[i].house}" data-id="${data.cards[i].name}">
              <img
                class="card_image"
                src="../../img/cartes/${data.cards[i].id_card}.jpg"
                alt="${data.cards[i].name}"
              />
              <div class="card_buttons">
                <a href="">
                  <div class="card_button_readmore">En savoir plus</div>
                </a>
              </div>
            </div>
        `;
    }
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
