import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./DoctorDetails.css";

function DoctorDetails() {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/doctors/${id}`);
        setDoctor(response.data);
      } catch (error) {
        console.error("Həkim tapılmadı:", error);
      }
    };

    fetchDoctor();
  }, [id]);

  if (!doctor) {
    return <div className="loading">Yüklənir...</div>;
  }

  return (
    <div className="doctor-details">
      <div className="doctor-card-large">
        <img
          src={doctor.profileImage}
          alt={doctor.name}
          className="doctor-image"
        />
        <div className="doctor-info">
          <h2>{doctor.name}</h2>
          <p><strong>İxtisas:</strong> {doctor.specialization}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Şəhər:</strong> {doctor.city || "Yoxdur"}</p>
          <p><strong>Xəstəxana:</strong> {doctor.hospitalName || "Yoxdur"}</p>
          <p><strong>Qiymət:</strong> {doctor.price ? `${doctor.price} AZN` : "Qiymət göstərilməyib"}</p>
          <p><strong>Haqqında:</strong> {doctor.description?.trim() ? doctor.description : "Haqqında məlumat yoxdur"}</p>
        </div>
      </div>
    </div>
  );
}

export default DoctorDetails;
