import express from "express";

import authRoute from "./routes/auth.js";
import profilRoute from "./routes/profil.js";
import cardRoute from "./routes/card.js";
import drawRoute from "./routes/draw.js";
import changeInfosRoute from "./routes/changeInfos.js"
import protectedRoutes from "./routes/protectedRoutes.js"
import friendsRoute from "./routes/friends.js"


const router = express.Router();

// Use routes
router.use("/", authRoute);
router.use("/", profilRoute);
router.use("/", cardRoute);
router.use("/", drawRoute);
router.use("/", changeInfosRoute);
router.use("/", friendsRoute);

// Protected routes
router.use("/", protectedRoutes)

export default router;