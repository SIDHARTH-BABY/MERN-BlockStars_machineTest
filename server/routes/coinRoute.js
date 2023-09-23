import express from "express";
import { addCoinDetails, getAllCoins } from "../Controller/coinController.js";

const router = express.Router();

router.post("/addCoinDetails", addCoinDetails);
router.get("/getAllCoins/:userId", getAllCoins);

export default router;
