import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  specialization: String,
  profileImage: String,
  city: String,
  price: Number,
  hospitalName: String,
  description: String,
});

export default mongoose.model("Doctor", doctorSchema);
