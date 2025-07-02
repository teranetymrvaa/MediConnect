import express from "express";
import {
  registerDoctor,
  getDoctorById,
  refreshToken,
  loginDoctor,
  uploadProfilePic, // bunu import et
} from "../controllers/doctorController.js";
import multer from "multer";

const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/login", loginDoctor);
router.post("/register", registerDoctor);
router.get("/:id", getDoctorById);
router.post("/refresh", refreshToken);

// Profil şəklin yüklənməsi endpointi — multer middleware burada işləyir
router.post("/:id/profile-pic", upload.single("profilePic"), uploadProfilePic);

export default router;
