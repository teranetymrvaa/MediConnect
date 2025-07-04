import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config.js";

import doctorRoutes from "./routes/doctorRoutes.js";
import patientRoutes from "./routes/patientRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import slotRoutes from "./routes/slotRoutes.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/slots", slotRoutes);

connectDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
