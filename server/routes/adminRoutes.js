import express from "express";
import { registerAdmin, loginAdmin, createUserByAdmin} from "../controllers/adminController.js";

const router = express.Router();

router.post('/register-admin', registerAdmin);
router.post('/login', loginAdmin);
router.post('/create-employee', createUserByAdmin);

export default router;
