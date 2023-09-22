import express from "express";
import { addCoinDetails, getAllCoins } from "../Controller/coinController.js";

const router = express.Router();

router.post("/addCoinDetails", addCoinDetails);
router.get("/getAllCoins", getAllCoins);

export default router;
