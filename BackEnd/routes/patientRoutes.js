import express from "express";
import { loginPatient, registerPatient, getPatientById } from "../controllers/patientController.js";

const router = express.Router();

// Pasiyent qeydiyyatı və giriş
router.post("/register", registerPatient);
router.post("/login", loginPatient);

// 🔥 Yeni əlavə etdik: ID ilə pasiyent məlumatı
router.get("/:id", getPatientById);

export default router;
