import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config.js";

import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
