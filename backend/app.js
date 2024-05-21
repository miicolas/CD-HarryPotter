// app.js
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router.js";

const app = express(); // Création de l'application express
const port = process.env.PORT || 3000; // Définition du port d'écoute du serveur

app.use(cors());
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(cookieParser());

app.use(express.static(path.resolve("../frontend"))); // Permet de servir les fichiers statiques du dossier frontend

app.use(router);

// Lancement du serveur
app.listen(port, () =>
  console.log(`Le serveur tourne sur :  http://localhost:${port}`),
);
