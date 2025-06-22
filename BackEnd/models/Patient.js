import mongoose from "mongoose";

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  phone: { type: String },             // Telefon nömrəsi
  birthDate: { type: Date },           // Doğum tarixi
  gender: { type: String },            // Cinsiyyət
  city: { type: String },              // Şəhər
  age: { type: Number },               // Yaş (isteğe bağlı)
}, {
  timestamps: true
});

export default mongoose.model("Patient", patientSchema);
