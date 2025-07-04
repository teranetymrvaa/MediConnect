import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import {
  FaHeartbeat,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaVenusMars,
  FaEnvelope,
} from "react-icons/fa";
import "./PatientProfile.css";

function PatientProfile() {
  const [patient, setPatient] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatient = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const id = localStorage.getItem("patientId");
        if (!token || !id) {
          navigate("/login");
          return;
        }
        const res = await axiosInstance.get(`/patients/${id}`);
        setPatient(res.data);
      } catch (error) {
        console.error("Pasiyent məlumatı alınmadı", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPatient();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (loading) return <div className="loading">Yüklənir...</div>;
  if (!patient) return <div className="error">Məlumat tapılmadı.</div>;

  return (
    <div className="profile-wrapper">
      <div className="profile-card">
        <div className="profile-header">
          <FaHeartbeat className="heartbeat-icon" />
          <h1>{patient.name}</h1>
          <p className="subtitle">Sağlamlıq səni gözləyir!</p>
        </div>

        <div className="profile-info">
          <FaEnvelope className="icon" />
          <span>{patient.email}</span>
        </div>
        <div className="profile-info">
          <FaPhoneAlt className="icon" />
          <span>{patient.phone}</span>
        </div>
        <div className="profile-info">
          <FaCalendarAlt className="icon" />
          <span>{patient.birthDate}</span>
        </div>
        <div className="profile-info">
          <FaVenusMars className="icon" />
          <span>{patient.gender}</span>
        </div>
        <div className="profile-info">
          <FaMapMarkerAlt className="icon" />
          <span>{patient.city}</span>
        </div>

        <button className="btn-logout" onClick={handleLogout}>
          Çıxış
        </button>
      </div>
      <div className="health-quote">
        “Güclü bədən, sağlam ruh – həyatın ən böyük sərvətidir.”
      </div>
    </div>
  );
}

export default PatientProfile;
