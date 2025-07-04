import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import "./DoctorProfile.css";
import axiosInstance from "../../../api/axiosInstance";

function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const id = localStorage.getItem("doctorId");

        console.log("Token:", token);
        console.log("Doctor ID:", id);

        if (!token || !id) {
          console.warn(
            "Token və ya ID tapılmadı, login səhifəsinə yönləndirilir."
          );
          navigate("/login");
          return;
        }

        const response = await axiosInstance.get(`/doctors/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        console.log("Gələn doktor məlumatı:", response.data);

        setDoctor(response.data);
      } catch (error) {
        console.error("Məlumat alınarkən xəta baş verdi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <div className="loading">Yüklənir...</div>;

  if (!doctor) return <div className="error">Həkim tapılmadı.</div>; // əlavə təhlükəsizlik

  return (
    <div className="doctor-profile-layout">
      <div className="container doctor-profile-container">
        {/* Sidebar with links */}
        <div className="sidebar">
          <div className="profile-header">
            <img src={doctor.profileImage} alt={doctor.name} />
            <h2>{doctor.name}</h2>
            <p>{doctor.specialization}</p>
          </div>

          <nav className="sidebar-links">
            <ul>
              <li onClick={() => navigate("/doctor/appointments")}>
                🗓️ Randevularım
              </li>
              <li onClick={() => navigate("/doctor/calendar")}>📅 Təqvimim</li>
              <li onClick={() => navigate("/doctor/reviews")}>🧾 Rəylərim</li>
              <li onClick={() => navigate("/doctor/settings")}>⚙️ Ayarlar</li>
              <li onClick={() => navigate("/doctor/slots")}>🕒 Slotlarım</li>

              <li onClick={handleLogout}>🚪 Çıxış et</li>
            </ul>
          </nav>
        </div>

        {/* Main content area */}
        <div className="main-content">
          <div className="about-section">
            <h2>Haqqımda</h2>
            <p>
              {doctor.description || "Həkim haqqında məlumat əlavə edilməyib."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DoctorProfile;
