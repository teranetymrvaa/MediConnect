import express from "express";
import { registerDoctor, getDoctorById } from "../controllers/doctorController.js";

const router = express.Router();
router.post("/register", registerDoctor);
router.get("/:id", getDoctorById);

export default router;
