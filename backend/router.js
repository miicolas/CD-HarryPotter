import express from "express";

import authRoute from "./routes/auth.js";
import profilRoute from "./routes/profil.js";
import cardRoute from "./routes/card.js";
import drawRoute from "./routes/draw.js";
import changeInfosRoute from "./routes/changeInfos.js"
import protectedRoutes from "./routes/protectedRoutes.js"
import IOTRoute from "./routes/IOT.js"
// import exchangeRoute from "./routes/exchange.js"

const router = express.Router();

// Routes publiques
router.use("/auth", authRoute);
router.use("/", profilRoute);
router.use("/", cardRoute);
router.use("/", drawRoute);
router.use("/", changeInfosRoute);
// router.use("/exchange", exchangeRoute)
router.use("/iot", IOTRoute);


// Routes protégées
router.use("/", protectedRoutes)

export default router;