import {hashPassword} from "../lib/utils.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function updateProfilInfos(req, res) {
  try {
    const userId = req.user.id; // Récupère l'id de l'utilisateur authentifié par le middleware authenticateToken
    let { username, password, name, email } = req.body; // Récupère les données du formulaire de mise à jour du profil

   // Récupère les données de l'utilisateur authentifié
    const user = await prisma.user.findUnique({
      where: {
        id: userId
      }
    });


    if ((!username) && (!password) && (!name) && (!email)) { // Si aucun champ n'est rempli, renvoie une erreur
      return res.status(400).json({ error: "Aucun changement" });
    }
    else {
      if (username && username !== user[0].username) { // Si le nom d'utilisateur est différent de celui enregistré dans la base de données, met à jour le nom d'utilisateur
        await prisma.user.update({
          where: {
            id: userId
          },
          data: {
            username: username
          }
        });
      }
      if (password && password.length > 7) { // Si le mot de passe est différent de celui enregistré dans la base de données, met à jour le mot de passe
        const hashedPassword = hashPassword(password);
        if (hashedPassword === user[0].password) {
          return res.status(400).json({ error: "Le mot de passe n'a pas" +
                " changé" });
        }
        await prisma.user.update({
          where: {
            id: userId
          },
          data: {
            password: hashedPassword
          }
        });
      }
      if (name && name !== user[0].name) { // Si le nom est différent de celui enregistré dans la base de données, met à jour le nom
        await prisma.user.update({
          where: {
            id: userId
          },
          data: {
            name: name
          }
        });
      } 
      if (email && email !== user[0].email) { // Si l'email est différent de celui enregistré dans la base de données, met à jour l'email
        await prisma.user.update({
          where: {
            id: userId
          },
          data: {
            email: email
          }
        });
      }
    }

    res.redirect('/settings')
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur dans la mise à jour du profil" });
  }
}
