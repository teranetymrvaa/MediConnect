import mongoose from "mongoose";

const availableSlotSchema = new mongoose.Schema({
  doctor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  date: {
    type: String, // Yalnız "YYYY-MM-DD" formatı üçün
    required: true,
  },
  startTime: {
    type: String, // "HH:mm"
    required: true,
  },
  endTime: {
    type: String, // "HH:mm"
    required: true,
  },
  isReserved: {
    type: Boolean,
    default: false,
  },
});

const AvailableSlot = mongoose.model("AvailableSlot", availableSlotSchema);
export default AvailableSlot;
