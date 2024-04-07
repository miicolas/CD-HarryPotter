// controllers/profilController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export async function getAllCards(req ,res) {
  try {
    const cards = await prisma.card.findMany(); // Récupère toutes les cartes de la base de données 
    // console.log("getAllCards");
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
    // console.log("getCard", cardId);
   // Récupère une carte spécifique de la base de données
    const card = await prisma.card.findUnique({
      where: {
        id_card: cardId
      }
    });
    console.log(card);
    // console.log(card, 'check received card');
    res.status(200).json(card);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
}