// routes/auth.js;
import express from "express";
const router = express.Router();
import { login, logout, signup} from "../controllers/authController.js";
import { validateSignup, validateLogin, validateLogout } from "../middleware/authValidation.js";


router.post("/signup", validateSignup, signup); // Vérifie les données du formulaire d'inscription et crée un nouvel utilisateur
router.get("/logout", validateLogout, logout);  // Supprime le token pour déconnecter l'utilisateur
router.post("/login", validateLogin, login);  // Vérifie les données du formulaire de connexion et connecte l'utilisateur

export default router; 
