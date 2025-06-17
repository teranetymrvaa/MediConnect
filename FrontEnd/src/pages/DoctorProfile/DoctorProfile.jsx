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
          console.warn("Token və ya ID tapılmadı, login səhifəsinə yönləndirilir.");
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
    <div className="doctor-profile">
      <div className="profile-card">
        <div className="profile-image">
          <img
            src={doctor.profileImage || "https://via.placeholder.com/150"}
            alt={doctor.name}
          />
        </div>
        <div className="profile-info">
          <h1>{doctor.name}</h1>
          <p><strong>Ixtisas:</strong> {doctor.specialization}</p>
          <p><strong>Şəhər:</strong> {doctor.city}</p>
          <p><strong>Xəstəxana:</strong> {doctor.hospitalName}</p>
          <p><strong>Qiymət:</strong> {doctor.price} AZN</p>
          <p><strong>Email:</strong> {doctor.email}</p>
        </div>
      </div>

      <div className="about-section">
        <h2>Haqqımda</h2>
        <p>{doctor.description || "Həkim haqqında məlumat əlavə edilməyib."}</p>
      </div>

      <button className="logout-button" onClick={handleLogout}>
        Çıxış et
      </button>
    </div>
  );
}

export default DoctorProfile;
