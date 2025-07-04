import AvailableSlot from "../models/AvailableSlot.js";
import dayjs from "dayjs";

export const createSlot = async (req, res) => {
  try {
    const { date, time } = req.body;
    const { doctorId } = req.params;

    if (!date || !time || !doctorId) {
      return res
        .status(400)
        .json({ message: "Zəhmət olmasa bütün məlumatları daxil edin." });
    }

    const start = dayjs(`${date}T${time}`);
    const end = start.add(30, "minute");

    const newSlot = new AvailableSlot({
      doctor: doctorId,
      date,
      startTime: start.format("HH:mm"),
      endTime: end.format("HH:mm"),
    });

    await newSlot.save();

    res.status(201).json({ message: "Slot əlavə olundu", slot: newSlot });
  } catch (err) {
    console.error("Slot əlavə xətası:", err);
    res.status(500).json({ message: "Slot əlavə edilərkən xəta", error: err });
  }
};
export const getDoctorSlots = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const slots = await AvailableSlot.find({ doctor: doctorId }).sort({
      date: 1,
      startTime: 1,
    });

    res.json(slots);
  } catch (err) {
    console.error("Slot siyahısı xətası:", err);
    res
      .status(500)
      .json({ message: "Slot siyahısı alınarkən xəta", error: err });
  }
};

export const getAvailableSlots = async (req, res) => {
  try {
    const { doctorId, date } = req.query;

    const slots = await AvailableSlot.find({
      doctor: doctorId,
      date,
      isReserved: false,
    }).sort({ startTime: 1 });

    res.json(slots);
  } catch (err) {
    console.error("Boş slotlar alınarkən xəta:", err);
    res.status(500).json({ message: "Xəta baş verdi", error: err });
  }
};
export const reserveSlot = async (req, res) => {
  try {
    const { slotId } = req.params;
    const { userId } = req.body;

    const slot = await AvailableSlot.findById(slotId);

    if (!slot) return res.status(404).json({ message: "Slot tapılmadı" });
    if (slot.isReserved)
      return res.status(400).json({ message: "Bu saat artıq tutulub" });

    slot.isReserved = true;
    slot.reservedBy = userId;

    await slot.save();

    res.json({ message: "Rezervasiya tamamlandı", slot });
  } catch (err) {
    console.error("Rezervasiya xətası:", err);
    res.status(500).json({ message: "Rezervasiya xətası", error: err });
  }
};
export const getDoctorAppointments = async (req, res) => {
  try {
    const { doctorId } = req.params;

    const appointments = await AvailableSlot.find({
      doctor: doctorId,
      isReserved: true,
    }).populate("reservedBy", "name email");

    res.json(appointments);
  } catch (err) {
    console.error("Randevular alınarkən xəta:", err);
    res.status(500).json({ message: "Xəta baş verdi", error: err });
  }
};
