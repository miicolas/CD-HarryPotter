// controllers/drawController.js
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();


export async function getDrawCards(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token
    const cards = await prisma.card.findMany({
      select: {
        id_card: true,
        rarity: true,
      },
      orderBy: {
        rarity: 'desc',
      },
      take: 5,
    });
    console.log(cards);


    const cards_user = await prisma.userCard.findMany({ 
      where: {
        id_user: userId,
      },
      select: {
        id_card: true,
      },
    });
    
    const cardsToAdd = []; // Initialise un tableau pour les cartes à ajouter

    for (let i = 0; i < cards.length; i++) { // Parcours les cartes tirées
      let cardExists = false; // Initialise une variable pour vérifier si la carte existe déjà
      for (let j = 0; j < cards_user.length; j++) { // Parcours les cartes de l'utilisateur
        if (cards[i].id_card === cards_user[j].id_card) { // Si la carte tirée existe déjà dans cards_user, cardExists est vrai
          cardExists = true;
          break; 
        }
      }
      if (!cardExists) { // Si la carte n'existe pas, on l'ajoute à cardsToAdd
        cardsToAdd.push(cards[i]); //
         
        await prisma.userCard.create({ // Ajoute la carte à la table userCard
          data: {
            id_user: userId,
            id_card: cards[i].id_card,
          },
        });
      }
    }
    // console.log(cardsToAdd);

    const date = new Date(); // Récupère la date actuelle
    const currentTimeStamp = date.getTime(); // Récupère le timestamp de la date actuelle
    console.log("currentTimeStamp", currentTimeStamp);

    await prisma.user.update({
      where: {
        id: userId
      },
      data: {
        lastDraw: currentTimeStamp
      }
    });
    
    // Met à jour le timestamp du dernier tirage
    res.redirect("/dashboard"); // Redirige vers la page du profil
    
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
}