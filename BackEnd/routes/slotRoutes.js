import express from "express";
import {
  createSlot,
  getAvailableSlots,
  getDoctorAppointments,
  getDoctorSlots,
  reserveSlot,
} from "../controllers/slotController.js";

const router = express.Router();

router.get("/", getAvailableSlots);
router.post("/doctor/:doctorId/slots", createSlot);
router.get("/doctor/:doctorId/slots", getDoctorSlots);
router.patch("/slots/:slotId/reserve", reserveSlot);
router.get("/doctor/:doctorId/appointments", getDoctorAppointments);

export default router;
