// controllers/drawController.js
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function drawTime(req, res, next) {
  try {
    console.log("drawTime");
    const userId = req.user.id;

    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        lastDraw: true,
      },
    });

    console.log(user.lastDraw, "user.lastDraw");

    if (user.lastDraw) {
      // Si lastDraw date de ya moins de 24h, l'utilisateur ne peut pas tirer de nouvelles cartes, last draw est défini sous cette forme : 2021-09-01T14:00:00.000Z

      const lastDrawTime = new Date(user.lastDraw).getTime();
      const currentTime = new Date().getTime();

      const timeDifference = currentTime - lastDrawTime;
      const timeDifferenceInHours = timeDifference / (1000 * 3600);

      if (timeDifferenceInHours < 24) {
        return res
          .status(403)
          .json({ error: "Vous avez déjà tiré des cartes aujourd'hui" });
      }

      console.log("lastDrawTime = true");
    } else {
      // Si lastDrawTime n'est pas défini, c'est la première fois que l'utilisateur tire des cartes
      await prisma.user.update({
        where: {
          id: userId,
        },
        data: {
          firstDraw: true,
          lastDraw: new Date(),
        },
      });

      console.log("firstDraw = true");
    }

    console.log("next");
    next();
  } catch (error) {
    console.error(error);
    res.status(500).send("Erreur serveur");
  }
}
