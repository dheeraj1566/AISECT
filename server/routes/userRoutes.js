import express from "express";
import {registerUser, loginUser } from "../controllers/userController.js";
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/verify', (req, res) => {
  res.status(200).json({ message: "User verified" });
});

export default router;
