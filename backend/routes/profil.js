// routes/profil.js
import express from "express";
const router = express.Router(); // Importation du router d'express qui permet de créer les routes de l'API 
import authenticateToken from "../middleware/authenticateToken.js";
import { getProfil, getProfilSettings} from "../controllers/profilController.js";

router.get("/getprofile", authenticateToken, getProfil); // Vérifie le token et renvoie les infos de l'utilisateur du profil
router.get("/getuserinfos", authenticateToken, getProfilSettings);  // Vérifie le token et renvoie les infos de l'utilisateur pour les réglages du compte

export default router; 
