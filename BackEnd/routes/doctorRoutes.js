import express from "express";
import {
  registerDoctor,
  getDoctorById,
  refreshToken, 
  loginDoctor,
} from "../controllers/doctorController.js";

const router = express.Router();
router.post("/login", loginDoctor);
router.post("/register", registerDoctor);
router.get("/:id", getDoctorById);
// refrest token
router.post("/refresh", refreshToken); // Əgər refresh token funksiyası varsa, onu da əlavə edin

export default router;
