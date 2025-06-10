import Doctor from "../models/Doctor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerDoctor = async (req, res) => {
  const { email, password, ...rest } = req.body;
  try {
    const existing = await Doctor.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email artıq mövcuddur" });

    const hashed = await bcrypt.hash(password, 10);
    const doctor = await Doctor.create({ ...rest, email, password: hashed });

    const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ doctorId: doctor._id, token });
  } catch {
    res.status(500).json({ message: "Server xətası" });
  }
};

export const getDoctorById = async (req, res) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Həkim tapılmadı" });
    res.json(doctor);
  } catch {
    res.status(500).json({ message: "Xəta" });
  }
};
