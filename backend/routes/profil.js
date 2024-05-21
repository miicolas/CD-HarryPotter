// routes/profil.js
import express from "express";
const router = express.Router(); // Importation du router d'express qui permet de créer les routes de l'API
import authenticateToken from "../middleware/authenticateToken.js";
import { getProfil } from "../controllers/profilController.js";

router.get("/getprofile", authenticateToken, getProfil); // Vérifie le token et renvoie les infos de l'utilisateur du profil
router.get("profile", authenticateToken);
export default router;
