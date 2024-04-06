// routes/card.js
import express from "express";
const router = express.Router();
import { requestExchange } from "../controllers/exchangeController.js";
import authenticateToken from "../middleware/authenticateToken.js";

router.use("/request", authenticateToken, requestExchange ); // Vérifie le token, vérifie si l'utilisateur a déjà tiré une carte aujourd'hui et renvoie les cartes tirées par l'utilisateur

export default router;