// protectedRoutes.js
import express from 'express';
import path from 'path';
import authenticateToken from '../middleware/authenticateToken.js';
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url); // Permet de récupérer le chemin du fichier
const __dirname = path.dirname(__filename);  // Permet de récupérer le chemin du dossier
const router = express.Router();

router.get('/dashboard', authenticateToken, (req, res) => { // Si le middleware a réussi la vérification, l'accès à cette route est autorisé
  res.sendFile(path.join(__dirname, '../../frontend/dashboard.html'));
});
router.get("/settings", authenticateToken, (req, res) => { // Si le middleware a réussi la vérification, l'accès à cette route est autorisé
    res.sendFile(path.join(__dirname, "../../frontend/settings.html"));
});
router.get("/changeinfos", authenticateToken, (req, res) => { // Si le middleware a réussi la vérification, l'accès à cette route est autorisé
    res.sendFile(path.join(__dirname, "../../frontend/settings.html"));
});

export default router;
