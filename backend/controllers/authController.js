// controllers/loginController.js
import { hashPassword } from "../lib/utils.js";
import jwt from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function login(req, res) {
  try {
    const user = req.user; // Récupère l'utilisateur authentifié par le middleware authenticateToken
    const token = jwt.sign({ user }, "secretKey"); // Crée un token avec l'utilisateur authentifié

    res.status(200).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error logging in" });
  }
}

export async function signup(req, res) {
  try {
    const { username_signup, password_signup, email_signup } = req.body;

    // Vérifie si l'utilisateur existe déjà

    const confirmUsername = await prisma.user.findFirst({
      where: {
        username: username_signup,
      },
      select: {
        username: true,
      },
    });

    const confirmEmail = await prisma.user.findFirst({
      where: {
        email: email_signup,
      },
      select: {
        email: true,
      },
    });

    if (confirmUsername) {
      return res.status(400).json({ error: "L'utilisateur existe déjà" });
    }
    if (confirmEmail) {
      return res.status(400).json({ error: "L'email existe déjà" });
    }

    const hashedPassword = hashPassword(password_signup);

    await prisma.user.create({
      data: {
        email: email_signup,
        username: username_signup,
        password: hashedPassword,
      },
    });

    res.redirect("/signin.html");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erreur lors de l'inscription" });
  }
}
