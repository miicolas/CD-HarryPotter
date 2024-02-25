// recupere l'id de la carte dans l'url http://localhost:3000/cardinfo.html?card=albusdumbledore
const urlParams = new URLSearchParams(window.location.search); // Récupère les paramètres de l'URL
const cardId = urlParams.get("card"); // Récupère la valeur du paramètre "card"
console.log(cardId);


fetch("/searchcard?card=" + cardId)

  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    let gallery = document.querySelector(".card_container");


      gallery.innerHTML += `
          <div> 
            <p>Hello</p>
            <p>${data.name}</p>
          </div>
        `;
    
            
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
