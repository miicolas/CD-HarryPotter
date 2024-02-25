// routes/index.js
import express from "express";
const router = express.Router();
import { getAllCards, getCard } from "../controllers/cardController.js";


router.get("/cards", getAllCards); // Renvoie toutes les cartes de la base de données
router.get("/searchcard", getCard); // Renvoie une carte spécifique de la base de données

export default router;
