import { Schema, model } from "mongoose";

const DoctorSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    specialization: { type: String, required: true },
    profileImage: {
      type: String,
      default:
        "https://i.pinimg.com/736x/2c/47/d5/2c47d5dd5b532f83bb55c4cd6f5bd1ef.jpg",
    },
    city: { type: String },
    price: { type: Number, default: 0 },
    hospitalName: { type: String },
    description: { type: String },
    role: { type: String },
  },
  { timestamps: true }
);

export default model("Doctor", DoctorSchema);
