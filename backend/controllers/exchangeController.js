import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function requestExchange(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token
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
      return res
        .status(400)
        .json({ error: "L'utilisateur demandé ne possède pas cette carte" });
    }

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

    return res.status(200).redirect("/dashboard");
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

    console.log(exchangeRequest, "exchangeRequest");

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
    const requestId = req.params.id;

    console.log(requestId, "requestId");

    const exchangeInfo = await prisma.exchange.findFirst({
      where: {
        id_exchange: parseInt(requestId),
      },
    });

    console.log(exchangeInfo, "exchangeInfo");

    const fistExchange = await prisma.userCard.create({
      data: {
        id_user: exchangeInfo.id_user,
        id_card: exchangeInfo.id_card_want,
      },
    });

    const id_user_cardFirstExchange = await prisma.userCard.findFirst({
      where: {
        id_user: exchangeInfo.id_user,
        id_card: exchangeInfo.id_card_want,
      },
      select: {
        id_user_card: true,
      },
    });

    console.log(id_user_cardFirstExchange, "fistExchange");

    const deleteCardFirstExchange = await prisma.userCard.delete({
      where: {
        id_user_card: id_user_cardFirstExchange.id_user_card,
      },
    });

    console.log(deleteCardFirstExchange, "deleteCardFirstExchange");

    const secondExchange = await prisma.userCard.create({
      data: {
        id_user: exchangeInfo.id_user_asked,
        id_card: exchangeInfo.id_card,
      },
    });

    const id_user_cardSecondExchange = await prisma.userCard.findFirst({
      where: {
        id_user: exchangeInfo.id_user_asked,
        id_card: exchangeInfo.id_card,
      },
      select: {
        id_user_card: true,
      },
    });

    console.log(id_user_cardSecondExchange, "id_user_cardSecondExchange");

    console.log(secondExchange, "secondExchange");

    const deleteCardSecondExchange = await prisma.userCard.delete({
      where: {
        id_user_card: id_user_cardSecondExchange.id_user_card,
      },
    });

    console.log(deleteCardSecondExchange, "deleteCardSecondExchange");

    const updateExchange = await prisma.exchange.update({
      where: {
        id_exchange: parseInt(requestId),
      },
      data: {
        status: "accepted",
      },
    });

    console.log(updateExchange, "updateExchange");

    return res.redirect("/dashboard.html");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur dans la récupération des informations" });
  }
}

export async function refuseExchange(req, res) {
  try {
    const requestId = req.params.id;

    console.log(requestId, "requestId");

    const exchangeInfo = await prisma.exchange.findFirst({
      where: {
        id_exchange: parseInt(requestId),
      },
    });

    console.log(exchangeInfo, "exchangeInfo");

    const updateExchange = await prisma.exchange.update({
      where: {
        id_exchange: parseInt(requestId),
      },
      data: {
        status: "refused",
      },
    });

    console.log(updateExchange, "updateExchange");

    return res.redirect("/dashboard.html");
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Erreur dans la récupération des informations" });
  }
}
