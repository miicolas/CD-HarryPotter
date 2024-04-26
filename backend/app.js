// app.js
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import ip from "ip";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import cors from "cors";

import router from './router.js';



const __filename = fileURLToPath(import.meta.url); // Permet de récupérer le chemin du fichier
const __dirname = path.dirname(__filename);  // Permet de récupérer le chemin du dossier


const app = express(); // Création de l'application express
const port = process.env.PORT || 3000; // Définition du port d'écoute du serveur
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());



app.use(express.static(path.join(__dirname, "../frontend"))); // Permet de servir les fichiers statiques du dossier frontend
// Exemple d'utilisation du middleware pour bloquer l'accès à une rout


app.use(router);


// Start the server
app.listen(port, () => console.log(`Server is running on http://${ip.address()}:${port}`));
