// middleware/authValidation.js
import { hashPassword } from "../lib/utils.js";

import {PrismaClient} from '@prisma/client';

const prisma = new PrismaClient();


export async function validateLogin(req, res, next) {
  try {
    const { email_login, password_login } = req.body; // Récupère les données de l'utilisateur depuis le corps de la requête

    const result = await prisma.user.findMany({
      where: {
        email: email_login
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true
      }
    });

    console.log(result);

    if (result.length === 0) {
      // Si l'email n'existe pas dans la base de données
      return res.status(400).json({ error: "Le compte n'existe pas" });
    }

    const hashedPassword = result[0].password; // Récupère le mot de passe hashé depuis la base de données

    const hashingPassword = hashPassword(password_login); // Hash le mot de passe entré par l'utilisateur

    if (hashedPassword !== hashingPassword) {
      // Compare les mots de passe
      return res.status(400).json({ error: "Mot de passe incorrect" });
    }

    req.user = result[0]; // Ajoute les données de l'utilisateur à l'objet req
    next(); // Passe au middleware ou à la fonction suivante si la connexion est valide
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur de connexion" });
  }
}

export async function validateLogout(req, res, next) {
  const token = req.cookies.AuthToken;
  if (token === undefined || token === null) {
    return res.status(400).json({ error: "Pas de token" });
  }
  next();
}

export async function validateSignup(req, res, next) {
  const {
    username_signup,
    password_signup,
    password_signup_confirm,
    email_signup,
  } = req.body;

  if (
    !(
      username_signup &&
      password_signup &&
      password_signup_confirm &&
      email_signup
    )
  ) {
    return res.status(400).json({ error: "Tous les champs sont requis" });
  }

  if (password_signup.length < 8) {
    return res
      .status(400)
      .json({ error: "Le mot de passe doit contenir au moins 8 caractères" });
  }

  if (username_signup.length < 1) {
    return res.status(400).json({ error: "Nom d'utilisateur invalide" });
  }

  if (email_signup.length < 1) {
    return res.status(400).json({ error: "Email invalide" });
  }
  next();
}
