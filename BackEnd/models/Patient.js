import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  age: Number,
  gender: String,
});

export default mongoose.model("Patient", patientSchema);
