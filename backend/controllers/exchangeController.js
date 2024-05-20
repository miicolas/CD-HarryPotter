import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function requestExchange(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token
    console.log(userId, "userId");
    const requestInfo = req.body;

    console.log(requestInfo, "requestInfo");
    console.log(userId, "userId");

    const checkCardGive = await prisma.userCard.findFirst({
      where: {
        id_user: userId,
        id_card: requestInfo.card_name_give,
      },
      select: {
        id_user_card: true,
      },
    });
    console.log(checkCardGive, "checkCardGive");

    const checkCardWantExist = await prisma.userCard.findFirst({
      where: {
        id_user: userId,
        id_card: requestInfo.card_name_want,
      },
      select: {
        id_user_card: true,
      },
    });

    if (checkCardWantExist) {
      return res.status(400).json({ error: "Vous possédez déjà cette carte" });
    }

    if (!checkCardGive) {
      return res
        .status(400)
        .json({ error: "Vous ne possédez pas cette carte" });
    }

    const checkUserAsked = await prisma.user.findFirst({
      where: {
        username: requestInfo.card_user,
      },
      select: {
        id: true,
      },
    });

    // console.log(checkUserAsked, "checkUserAsked");

    if (!checkUserAsked) {
      console.error(error);
      return res
        .status(400)
        .json({ error: "L'utilisateur demandé n'existe pas" });
    }

    const checkCardAsked = await prisma.userCard.findFirst({
      where: {
        id_user: checkUserAsked.id,
        id_card: requestInfo.card_name_want,
      },
      select: {
        id_user_card: true,
      },
    });
    console.log(checkCardAsked, "checkCardAsked");

    if (!checkCardAsked) {
      console.error(error);
      return res
        .status(400)
        .json({ error: "L'utilisateur demandé ne possède pas cette carte" });
    }

    console.log("create exchange");

    await prisma.exchange.create({
      data: {
        id_user: userId,
        id_card: requestInfo.card_name_give,
        id_card_want: requestInfo.card_name_want,
        id_user_asked: checkUserAsked.id,
        status: "pending",
        date: new Date(),
      },
    });

    return res.status(200).json({ message: "Demande d'échange envoyée" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur dans la récupération des informations" });
  }
}

export async function getExchangeRequest(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token

    const exchangeRequest = await prisma.exchange.findMany({
      where: {
        id_user_asked: userId,
        status: "pending",
      },
      select: {
        id_exchange: true,
        id_card: true,
        id_card_want: true,
        id_user: true,
        date: true,
      },
    });

    // console.log(exchangeRequest, "exchangeRequest");

    if (exchangeRequest.length === 0) {
      return res.status(200).json({ message: "Aucune demande d'échange" });
    }
    return res.status(200).json({ exchangeRequest });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Erreur dans la récupération des informations" });
  }
}
export async function acceptExchange(req, res) {
  try {
    const requestId = parseInt(req.params.id);

    console.log(requestId, "requestId");

    const exchangeInfo = await prisma.exchange.findFirst({
      where: {
        id_exchange: requestId,
      },
    });

    const id_user_card_give = await prisma.userCard.findFirst({
      where: {
        id_user: exchangeInfo.id_user,
        id_card: exchangeInfo.id_card,
      },
      select: {
        id_user_card: true,
      },
    });

    await prisma.userCard.update({
      where: {
        id_user_card: id_user_card_give.id_user_card,
      },
      data: {
        id_card: exchangeInfo.id_card_want,
      },
    });

    const id_user_card_want = await prisma.userCard.findFirst({
      where: {
        id_user: exchangeInfo.id_user_asked,
        id_card: exchangeInfo.id_card_want,
      },
      select: {
        id_user_card: true,
      },
    });

    await prisma.userCard.update({
      where: {
        id_user_card: id_user_card_want.id_user_card,
      },
      data: {
        id_card: exchangeInfo.id_card,
      },
    });

    await prisma.exchange.update({
      where: {
        id_exchange: requestId,
      },

      data: {
        status: "accepted",
      },
    });

    res.status(200).json({ message: "Echange accepté" });
  } catch (error) {
    console.error("Error processing exchange:", error);
    res
      .status(500)
      .json({ error: "Erreur dans la récupération des informations" });
  }
}

export async function refuseExchange(req, res) {
  try {
    const requestId = req.params.id;

    await prisma.exchange.update({
      where: {
        id_exchange: parseInt(requestId),
      },
      data: {
        status: "refused",
      },
    });

    res.status(200).json({ message: "Echange refusé" });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur dans la récupération des informations" });
  }
}
