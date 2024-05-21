import { PrismaClient } from "@prisma/client";
import { shuffle } from "../lib/utils.js";
const prisma = new PrismaClient();

export async function getDrawCards(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token
    console.log(userId, "userId");
    // Récupérer toutes les cartes disponibles
    const allCards = await prisma.card.findMany({
      select: {
        id_card: true,
        rarity: true,
      },
    });

    // Mélanger les cartes de manière aléatoire
    const shuffledCards = shuffle(allCards);

    // Prendre les 5 premières cartes du mélange
    const drawnCards = shuffledCards.slice(0, 5);

    const userCard = await prisma.userCard.findMany({
      where: {
        id_user: userId,
      },
      select: {
        id_card: true,
      },
    });

    // Ajouter les cartes tirées à la table userCard et vérifier si elles existent déjà
    for (const card of drawnCards) {
      const cardExists = userCard.find(
        // Vérifie si la carte existe déjà dans la table userCard
        (userCard) => userCard.id_card === card.id_card, // Si la carte existe déjà, on ne l'ajoute pas
      );
      if (!cardExists) {
        // Si la carte n'existe pas, on l'ajoute
        await prisma.userCard.create({
          data: {
            id_user: userId,
            id_card: card.id_card,
          },
        });
      }
    }

    // Mettre à jour la date du dernier tirage
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        lastDraw: new Date(),
      },
    });

    console.log(drawnCards, "drawnCards");

    res.status(200).json({ drawnCards });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
}
