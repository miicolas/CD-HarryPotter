import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getProfil(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token
    if (!userId) {
      // Si l'id n'est pas défini, l'utilisateur n'est pas connecté
      return res.redirect("dashboard");
    }

    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        lastDraw: true,
      },
    });

    // console.log(userInfo);
    if (!userInfo) {
      // Si l'utilisateur n'a pas d'infos, il n'est pas connecté
      return res.redirect("dashboard");
    }

    const numberCards = await prisma.userCard.count({
      where: {
        id_user: userId,
      },
    });
    // console.log(numberCards, 'numberCards');

    // Récupère les cartes de l'utilisateur à partir de l'id de l'utilisateur et les jointures de la table userCard et card
    const cards_user = await prisma.userCard.findMany({
      where: {
        id_user: userId,
      },
      include: {
        card: true,
      },
    });

    // console.log(cards_user, 'cards_user');

    let message = ""; // Initialise le message si l'utilisateur n'a pas de cartes

    if (cards_user.length === 0) {
      // Si l'utilisateur n'a pas de cartes, affiche un message
      message = "Vous n'avez pas encore de cartes";
    }
    console.log(message);

    if (userInfo.lastDraw !== null) {
      const lastDrawBigInt = BigInt(userInfo.lastDraw); // Convertir la valeur de date en BigInt
      const currentTimeBigInt = BigInt(new Date().getTime()); // Convertir le temps actuel en BigInt
      const timeLeftBigInt =
        lastDrawBigInt + BigInt(24 * 60 * 60 * 1000) - currentTimeBigInt; // Calculer le temps restant en BigInt
      const timeLeft = Number(timeLeftBigInt); // Convertir le temps restant en nombre entier
      const hoursLeft =
        timeLeft > 0 ? Math.floor(timeLeft / (60 * 60 * 1000)) : 0; // Calculer les heures restantes
      const minutesLeft =
        timeLeft > 0
          ? Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000))
          : 0; // Calculer les minutes restantes

      if (hoursLeft <= 0 || minutesLeft <= 0) {
        let hoursLeft = 0;
        let minutesLeft = 0;
        console.log("Tirer vos cartes");
        console.log(hoursLeft, minutesLeft);
        res.status(200).json({
          id: userId,
          username: userInfo.username,
          cards: cards_user,
          message: message,
          numberCards: numberCards,
          remainingTime: hoursLeft + "h " + minutesLeft + "m",
        });
      } else {
        //console.log("Vous devez attendre");
        res.status(200).json({
          id: userId,
          username: userInfo.username,
          cards: cards_user,
          message: message,
          numberCards: numberCards,
          remainingTime: hoursLeft + "h " + minutesLeft + "m",
        });
      }
    } else {
      res.status(200).json({
        id: userId,
        username: userInfo.username,
        cards: cards_user,
        message: message,
        numberCards: numberCards,
        remainingTime: "0h 0m",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération du profil de l'utilisateur",
    });
  }
}

export async function getProfilSettings(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token

    const userInfo = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        username: true,
        email: true,
        lastDraw: true,
      },
    });

    if (!userInfo) {
      // Si l'utilisateur n'a pas d'infos, il n'est pas connecté
      return res.redirect("login");
    }

    const lastDraw = userInfo.lastDraw; // Récupère la date du dernier tirage
    const currentTime = new Date().getTime(); // Obtenir le temps actuel et le temps restant jusqu'au prochain tirage
    const timeLeft = lastDraw + 24 * 60 * 60 * 1000 - currentTime; // Ajouter 24 heures en millisecondes pour le prochain tirage
    const hoursLeft = Math.floor(timeLeft / (60 * 60 * 1000)); // Calcul des heures restantes
    const minutesLeft = Math.floor((timeLeft % (60 * 60 * 1000)) / (60 * 1000)); // Calcul des minutes restantes

    if (hoursLeft < 0 || minutesLeft < 0) {
      // Si le temps restant est négatif, le prochain tirage est disponible
      res.status(200).json({
        username: userInfo.username,
        email: userInfo.email,
        hoursLeft: 0,
        minutesLeft: 0,
      });
    } else {
      // Sinon, le prochain tirage n'est pas encore disponible
      res.status(200).json({
        username: userInfo.username,
        email: userInfo.email,
        hoursLeft: hoursLeft,
        minutesLeft: minutesLeft,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Erreur lors de la récupération du profil de l'utilisateur",
    });
  }
}
