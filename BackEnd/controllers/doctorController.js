/* eslint-disable no-undef */
import Doctor from "../models/Doctor.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import streamifier from "streamifier";
import cloudinary from "../config/cloudinary.js";

export const uploadProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Şəkil göndərilməyib" });
    }

    const streamUpload = () => {
      return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "profile_pics",
            public_id: `doctor_${req.params.id}`,
            overwrite: true,
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );
        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });
    };

    const result = await streamUpload();

    const imageUrl = result.secure_url;

    // Həkimin profil şəklini yenilə
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      { profileImage: imageUrl },
      { new: true }
    );

    if (!doctor) {
      return res.status(404).json({ message: "Həkim tapılmadı" });
    }

    res.json({
      message: "Profil şəkli uğurla yükləndi",
      profileImage: doctor.profileImage,
    });
  } catch (error) {
    console.error("Cloudinary yükləmə xətası:", error);
    res
      .status(500)
      .json({ message: "Cloudinary yükləmə xətası", error: error.message });
  }
};

// Login funksiyasi
export const loginDoctor = async (req, res) => {
  const { email, password } = req.body; // Remove role from destructuring
  try {
    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(404).json({ message: "Email və ya şifrə səhvdir" });
    }

    const isPasswordValid = await bcrypt.compare(password, doctor.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Email və ya şifrə səhvdir" });
    }

    const accessToken = jwt.sign(
      { id: doctor._id, role: doctor.role }, // Add role to payload
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "15m" }
    );

    const refreshToken = jwt.sign(
      { id: doctor._id, role: doctor.role }, // Add role to payload
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      doctorId: doctor._id,
      role: doctor.role, // Return role in response
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.error("Login xətası:", error);
    res.status(500).json({ message: "Server xətası" });
  }
};
// qeydiyyat funksiyasi
export const registerDoctor = async (req, res) => {
  const { email, password, ...rest } = req.body;
  try {
    const existing = await Doctor.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "Email artıq mövcuddur" });

    const hashed = await bcrypt.hash(password, 10);
    const doctor = await Doctor.create({ ...rest, email, password: hashed });

    const accessToken = jwt.sign(
      { id: doctor._id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "1m", // access token daha qısa ömürlü olsun
      }
    );

    const refreshToken = jwt.sign(
      { id: doctor._id },
      process.env.REFRESH_TOKEN_SECRET,
      {
        expiresIn: "7d", // refresh token daha uzun ömürlü
      }
    );

    res.json({ doctorId: doctor._id, accessToken, refreshToken });
  } catch (error) {
    console.error("Qeydiyyat xətası:", error);
    res.status(500).json({ message: "Server xətası" });
  }
};
// Refresh token funksiyası
export const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) {
    return res.status(401).json({ message: "Refresh token yoxdur" });
  }

  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, doctor) => {
    if (err) {
      return res.status(403).json({ message: "Refresh token etibarsızdır" });
    }

    const newAccessToken = jwt.sign(
      { id: doctor.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1m" }
    );

    res.json({ accessToken: newAccessToken });
  });
};
// Həkimlərin siyahısını almaq funksiyası
export const getDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({});
    res.json(doctors);
  } catch (error) {
    console.error("Həkimlər alınarkən xəta:", error);
    res.status(500).json({ message: "Xəta baş verdi" });
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
