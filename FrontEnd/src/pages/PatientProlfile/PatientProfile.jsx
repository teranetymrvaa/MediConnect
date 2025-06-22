import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import { motion } from "framer-motion";
import { FaHeartbeat, FaPhoneAlt, FaMapMarkerAlt, FaCalendarAlt, FaVenusMars, FaEnvelope } from "react-icons/fa";
import "./PatientProfile.css";

const containerVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "easeOut" } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15 },
  }),
};

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
    <motion.div
      className="profile-wrapper"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="profile-card" layout>
        <motion.div className="profile-header" custom={0} variants={itemVariants}>
          <FaHeartbeat className="heartbeat-icon" />
          <h1>{patient.name}</h1>
          <p className="subtitle">Sağlamlıq səni gözləyir!</p>
        </motion.div>

        <motion.div className="profile-info" custom={1} variants={itemVariants}>
          <FaEnvelope className="icon" />
          <span>{patient.email}</span>
        </motion.div>

        <motion.div className="profile-info" custom={2} variants={itemVariants}>
          <FaPhoneAlt className="icon" />
          <span>{patient.phone}</span>
        </motion.div>

        <motion.div className="profile-info" custom={3} variants={itemVariants}>
          <FaCalendarAlt className="icon" />
          <span>{patient.birthDate}</span>
        </motion.div>

        <motion.div className="profile-info" custom={4} variants={itemVariants}>
          <FaVenusMars className="icon" />
          <span>{patient.gender}</span>
        </motion.div>

        <motion.div className="profile-info" custom={5} variants={itemVariants}>
          <FaMapMarkerAlt className="icon" />
          <span>{patient.city}</span>
        </motion.div>

        <motion.button
          className="btn-logout"
          whileHover={{ scale: 1.1, boxShadow: "0 0 15px #ff5252" }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          custom={6}
          variants={itemVariants}
        >
          Çıxış
        </motion.button>
      </motion.div>

      <motion.div className="health-quote" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}>
        <p>“Güclü bədən, sağlam ruh – həyatın ən böyük sərvətidir.”</p>
      </motion.div>
    </motion.div>
  );
}

export default PatientProfile;
