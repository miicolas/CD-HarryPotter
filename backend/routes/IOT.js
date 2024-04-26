// routes/card.js
import express from "express";
const router = express.Router();


import { getLastVisited, updateLastVisited } from "../controllers/iotController.js";

router.get("/lastVisited", getLastVisited);

router.post("/updateLastVisited", updateLastVisited);

export default router;
