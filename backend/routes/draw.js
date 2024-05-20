// routes/card.js
import express from "express";
const router = express.Router();
import { getDrawCards } from "../controllers/drawController.js";
import drawTime from "../middleware/drawTimeValidation.js";
import authenticateToken from "../middleware/authenticateToken.js";

router.get("/draw", authenticateToken, drawTime, getDrawCards); // Vérifie le token, vérifie si l'utilisateur a déjà tiré une carte aujourd'hui et renvoie les cartes tirées par l'utilisateur

export default router;
