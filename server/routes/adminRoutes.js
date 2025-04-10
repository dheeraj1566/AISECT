import express from "express";
import { registerAdmin, loginAdmin, createUserByAdmin} from "../controllers/adminController.js";
import { checkAuth } from "../middlewares/Authentication.js";

const router = express.Router();

router.post('/register-admin', registerAdmin);
router.post('/login', loginAdmin);
router.get("/check", checkAuth("admin"), (req, res) =>
    res.send({ message: "Access Granted" })
  );
  
router.post('/create-employee',checkAuth("admin"), createUserByAdmin);

export default router;
