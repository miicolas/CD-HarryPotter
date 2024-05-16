// routes/exchange.js
import express from "express";
const router = express.Router();
import {
  getExchangeRequest,
  requestExchange,
  acceptExchange,
  refuseExchange,
} from "../controllers/exchangeController.js";
import authenticateToken from "../middleware/authenticateToken.js";

router.use("/request", authenticateToken, requestExchange);
router.use("/getrequests", authenticateToken, getExchangeRequest);
router.use("/accept/:id", authenticateToken, acceptExchange);
router.use("/refuse/:id", authenticateToken, refuseExchange);

export default router;
