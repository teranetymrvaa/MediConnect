import Patient from "../models/Patient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerPatient = async (req, res) => {
  const { email, password, ...rest } = req.body;
  try {
    const existing = await Patient.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email artıq mövcuddur" });

    const hashed = await bcrypt.hash(password, 10);
    const patient = await Patient.create({ ...rest, email, password: hashed });

    const token = jwt.sign({ id: patient._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
    res.json({ patientId: patient._id, token });
  } catch {
    res.status(500).json({ message: "Server xətası" });
  }
};
