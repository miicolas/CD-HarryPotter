// controllers/drawController.js
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function drawTime(req, res, next) {
  try {
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId
      },
      select: {
        lastDraw: true
      }
    });

    const lastDrawTime = user ? user.lastDraw : null;

    console.log(lastDrawTime);

    const currentTime = Date.now(); // Heure actuelle en millisecondes

    if (lastDrawTime !== null && lastDrawTime !== undefined) {
      const elapsedTime = currentTime - Number(lastDrawTime); // or lastDrawTime.valueOf()

      const twentyFourHoursInMillis = 24 * 60 * 60 * 1000;  // 24 heures en millisecondes

      if (elapsedTime < twentyFourHoursInMillis) {
        return res
          .status(403)
          .send("Vous ne pouvez pas tirer de nouvelles cartes pour le moment. Attendez 24 heures.");
      }
    } else {
      // Si lastDrawTime n'est pas défini, c'est la première fois que l'utilisateur tire des cartes
      await prisma.user.update({
        where: {
          id: userId
        },
        data: {
          firstDraw: true
        }
      });

      console.log("firstDraw = true");
    }

    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
}
