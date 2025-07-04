import Patient from "../models/Patient.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// PASİYENT QEYDİYYATI
export const registerPatient = async (req, res) => {
  const { email, password, name, phone, birthDate, gender, city, age } = req.body;

  try {
    const existing = await Patient.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email artıq mövcuddur" });

    const hashed = await bcrypt.hash(password, 10);
    const patient = await Patient.create({
      name,
      email,
      password: hashed,
      phone,
      birthDate,
      gender,
      city,
      age,
    });

    const accessToken = jwt.sign(
      { id: patient._id, role: "patient" },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: patient._id, role: "patient" },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      accessToken,
      refreshToken,
      patientId: patient._id,
      role: "patient",
    });
  } catch (error) {
    console.error("Qeydiyyat xətası:", error);
    res.status(500).json({ message: "Server xətası" });
  }
};

// PASİYENT GİRİŞ (LOGIN)
export const loginPatient = async (req, res) => {
  const { email, password } = req.body;

  try {
    const patient = await Patient.findOne({ email });
    if (!patient) {
      return res.status(404).json({ message: "Email tapılmadı" });
    }

    const isMatch = await bcrypt.compare(password, patient.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Şifrə yanlışdır" });
    }

    const accessToken = jwt.sign(
      { id: patient._id, role: "patient" },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );

    const refreshToken = jwt.sign(
      { id: patient._id, role: "patient" },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      accessToken,
      refreshToken,
      patientId: patient._id,
      role: "patient",
    });
  } catch (error) {
    console.error("Login xətası:", error);
    res.status(500).json({ message: "Server xətası" });
  }
};

// ID ilə pasiyent məlumatını gətir
export const getPatientById = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).select("-password");
    if (!patient) {
      return res.status(404).json({ message: "Pasiyent tapılmadı" });
    }

    res.status(200).json(patient);
  } catch (error) {
    console.error("Pasiyent məlumatı gətirilərkən xəta:", error);
    res.status(500).json({ message: "Server xətası" });
  }
};
