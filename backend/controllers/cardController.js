// controllers/profilController.js
import { query } from "../config/queries.js";

export async function getAllCards(req, res) {
  try {
    console.log("getAllCards");
    const cards = await query("SELECT id_card, name , house FROM cards"); // Récupère toutes les cartes de la base de données
    res.status(200).json(cards);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
}
}

export async function getCard(req, res) {
  try {
    // Récupère l'id de la carte dans l'URL http://localhost:3000/cardinfo.html?card=albusdumbledore
    const cardId = req.query.card;
    console.log("getCard", cardId);
    const card = await query("SELECT * FROM cards WHERE id_card = ?", [cardId]); // Récupère une carte spécifique de la base de données
    res.status(200).json(card[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
}