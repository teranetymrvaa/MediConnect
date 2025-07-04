import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import "./DoctorSlotsPage.css";

const DoctorSlotsPage = () => {
  const [slots, setSlots] = useState([]);
  const [newSlot, setNewSlot] = useState({ date: "", time: "" });

  const doctorId = localStorage.getItem("doctorId");
  const navigate = useNavigate(); // <-- navigate əlavə edildi

  const fetchSlots = async () => {
    try {
      const res = await axiosInstance.get(`/slots/doctor/${doctorId}/slots`);
      setSlots(res.data);
    } catch (err) {
      console.error("Slotlar alınmadı:", err);
    }
  };

  useEffect(() => {
    fetchSlots();
  }, [doctorId]);

  const handleCreateSlot = async () => {
    try {
      await axiosInstance.post(`/slots/doctor/${doctorId}/slots`, newSlot);
      setNewSlot({ date: "", time: "" });
      await fetchSlots();
    } catch (err) {
      console.error("Slot yaradılmadı:", err);
    }
  };

  return (
    <div className="slot-container">
      <h2>Slotlarım</h2>

      <div className="create-slot-form">
        <input
          type="date"
          value={newSlot.date}
          onChange={(e) => setNewSlot({ ...newSlot, date: e.target.value })}
        />
        <input
          type="time"
          value={newSlot.time}
          onChange={(e) => setNewSlot({ ...newSlot, time: e.target.value })}
        />
        <button onClick={handleCreateSlot}>Yeni Slot Yarat</button>
      </div>

      <ul className="slot-list">
        {slots.map((slot) => (
          <li key={slot._id}>
            📅 {slot.date} ⏰ {slot.startTime} - {slot.endTime} –{" "}
            {slot.isReserved ? "Rezerve olunub" : "Boşdur"}
          </li>
        ))}
      </ul>

      {/* Geri qayıt düyməsi */}
      <div style={{ marginTop: "32px", textAlign: "center" }}>
        <button
          className="back-button"
          onClick={() => navigate("/doctor/profile")}
        >
          ⬅️ Geri Qayıt
        </button>
      </div>
    </div>
  );
};

export default DoctorSlotsPage;
