import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();



export async function addFriend(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token
    const { friend } = req.body; // Récupère le nom de l'ami à ajouter

    if (userId === friend) {
      // Si l'ami est l'utilisateur lui-même, renvoie une erreur
      return res
        .status(400)
        .json({ error: "Vous ne pouvez pas vous ajouter en ami" });
    }

    const friendId = await prisma.user.findMany({
      where: {
        username: friend,
      },
    });


    if (friendId.length === 0) {
      // Si l'ami n'existe pas, renvoie une erreur
      return res.status(400).json({ error: "L'ami n'existe pas" });
    }

    const friendIdValue = friendId[0].id;

    const friendExist = await prisma.friend.findMany ({
      where: {
        userId1: userId,
        userId2: friendIdValue,
      },
    });


    if (friendExist.length > 0) {
      // Si l'ami existe déjà, renvoie une erreur
      return res.status(400).json({ error: "L'ami existe déjà" });
    }

    await prisma.friend.create({
      data: {
        userId1: userId,
        userId2: friendIdValue,
      },
    });


    res.status(200).redirect("/friends");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'ajout de l'ami" });
  }
}

export async function getFriends(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token
    // const usernamefriendsPending = await query(
    //   "SELECT DISTINCT username FROM Users JOIN Friends ON Users.id = Friends.userID1 WHERE Friends.userID2 = ? AND Friends.statut = 'pending'",
    //   [userId]
    // );

    const usernamefriendsPending = await prisma.user.findMany({
      where : {
        id: userId,
        friends: {
          some: {
            statut: "pending",
          },
        },
      },
      select: {
        username: true,
      },
    });

    console.log(usernamefriendsPending);

    // const usernamefriends = await query(
    //   "SELECT DISTINCT username FROM Users JOIN Friends ON Users.id = CASE WHEN Friends.userID1 = ? THEN Friends.userID2 ELSE Friends.userID1 END WHERE (Friends.userID1 = ? OR Friends.userID2 = ?) AND Friends.statut = 'accepted'",
    //   [userId, userId, userId]
    // );
    // username selectionne le nom de l'utilisateur dans la table Users et Friends.userID1 = ? et Friends.userID2 = ? selectionne les amis de l'utilisateur connecté et Friends.statut = 'accepted' selectionne les amis acceptés

    const usernamefriends = await prisma.user.findMany({
      where: {
        id: userId,
        friends: {
          some: {
            statut: "accepted",
          },
        },
      },
      select: {
        username: true,
      },
    });
    console.log(usernamefriends);

    res.status(200).json({
      usernamefriendsPending: usernamefriendsPending,
      usernamefriends: usernamefriends,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de la récupération des amis" });
  }
}

export async function acceptFriend(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token

    const friend = req.query.friend; // Récupère le nom de l'ami à accepter depuis la requête GET

    const friendID = await prisma.user.findMany({
      where: {
        username: friend,
      },
      select: {
        id: true,
      },
    });


    if (friendID.length === 0) {
      // Si l'ami n'existe pas, renvoie une erreur
      return res.status(400).json({ error: "L'ami n'existe pas" });
    }

    const friendIdValue = friendID[0].id;

    const friendExist = await prisma.friend.findMany({
      where: {
        userId1: friendIdValue,
        userId2: userId,
      },
    });

    if (friendExist.length === 0) {
      // Si l'ami n'existe pas, renvoie une erreur
      return res.status(400).json({ error: "L'ami n'existe pas" });
    }

    // await query(
    //   "UPDATE Friends SET statut = 'accepted' WHERE userID1 = ? AND userID2 = ?",
    //   [friendIdValue, userId]
    // );

    await prisma.friend.updateMany({
      where: {
        userId1: friendIdValue,
        userId2: userId,
      },
      data: {
        statut: "accepted",
      },
    });

    res.status(200).redirect("/friends");
  } catch (error) {
    error.status(500).json({ error: "Erreur lors de l'acceptation de l'ami" });
  }
}

export async function deleteFriend(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur à partir du token
    const friend = req.query.friend; // Récupère le nom de l'ami à supprimer depuis la requête GET

    const friendID = await prisma.user.findMany({
      where: {
        username: friend,
      },
      select: {
        id: true,
      },
    });

    if (friendID.length === 0) {
      // Si l'ami n'existe pas, renvoie une erreur
      return res.status(400).json({ error: "L'ami n'existe pas" });
    }

    const friendIdValue = friendID[0].id;

    // const friendExist = await query(
    //   "SELECT * from Friends WHERE (userID1 = ? AND userID2 = ?) OR (userID1 = ? AND userID2 = ?)",
    //   [friendIdValue, userId, userId, friendIdValue]
    // );

    const friendExist = await prisma.friend.findMany({
      where: {
        OR: [
          {
            userId1: friendIdValue,
            userId2: userId,
          },
          {
            userId1: userId,
            userId2: friendIdValue,
          },
        ],
      },
    });


    if (friendExist.length === 0) {
      // Si l'ami n'existe pas, renvoie une erreur
      return res.status(400).json({ error: "L'ami n'existe pas" });
    }

    // await query("DELETE FROM Friends WHERE (userID1 = ? AND userID2 = ?) OR (userID1 = ? AND userID2 = ?)", [friendIdValue, userId, userId, friendIdValue]);

    await prisma.friend.deleteMany({
      where: {
        OR: [
          {
            userId1: friendIdValue,
            userId2: userId,
          },
          {
            userId1: userId,
            userId2: friendIdValue,
          },
        ],
      },
    });
    res.status(200).redirect("/friends");
  } catch (error) {
    error.status(500).json({ error: "Erreur lors de la suppression de l'ami" });
  }
}
