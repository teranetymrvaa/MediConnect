import express from "express";
import { loginPatient, registerPatient } from "../controllers/patientController.js";

const router = express.Router();
router.post("/register", registerPatient);
router.post("/login", loginPatient); //

export default router;
