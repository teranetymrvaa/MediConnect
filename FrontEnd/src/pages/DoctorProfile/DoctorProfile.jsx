import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DoctorProfile.css';

function DoctorProfile() {
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem('doctorToken');
        if (!token) {
          navigate('/login');
          return;
        }

        const response = await axios.get('http://localhost:5000/api/doctors/me', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setDoctor(response.data);
      } catch (err) {
        setError('Profil məlumatı yüklənə bilmədi.');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('doctorToken');
    navigate('/login');
  };

  if (loading) return <p style={{ textAlign: 'center' }}>Yüklənir...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  return (
    <div className="doctor-profile-container">
      <div className="profile-header">
        <img
          src={doctor.profileImage || 'https://via.placeholder.com/150'}
          alt={doctor.name}
          className="profile-img"
        />
        <div>
          <h2>{doctor.name}</h2>
          <p><strong>İxtisas:</strong> {doctor.specialization}</p>
          <p><strong>Şəhər:</strong> {doctor.city}</p>
          <p><strong>Xəstəxana:</strong> {doctor.hospitalName}</p>
          <p><strong>Qiymət:</strong> {doctor.price} AZN</p>
        </div>
      </div>
      <div className="profile-description">
        <h3>Haqqımda</h3>
        <p>{doctor.description || 'Həkim haqqında məlumat yoxdur.'}</p>
      </div>
      <button className="logout-btn" onClick={handleLogout}>Çıxış</button>
    </div>
  );
}

export default DoctorProfile;
