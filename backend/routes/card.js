// routes/index.js
import express from "express";
const router = express.Router();
import {
  getAllCards,
  getCard,
  likeCard,
} from "../controllers/cardController.js";
import authenticateToken from "../middleware/authenticateToken.js";

router.get("/cards", getAllCards); // Renvoie toutes les cartes de la base de données
router.get("/searchcard", getCard); // Renvoie une carte spécifique de la base de données
router.post("/likecard/:cardId", authenticateToken, likeCard);

export default router;
