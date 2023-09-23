import express from "express";
import { userData, userLogin, userRegister } from "../Controller/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/get-user-info-by-id", authMiddleware, userData);

export default router;
