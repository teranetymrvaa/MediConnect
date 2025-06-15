import { useState } from "react";
import axios from "axios";
import "./DoctorRegister.css";
import { useNavigate } from "react-router-dom";

const cities = [
  "Bakı",
  "Gəncə",
  "Sumqayıt",
  "Şəki",
  "Mingəçevir",
  "Lənkəran",
  "Quba",
  "Naftalan",
  "Qəbələ",
  "Şirvan",
  "Salyan",
  "Yevlax",
];

function DoctorRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    profileImage: "",
    city: "",
    price: "",
    hospitalName: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...formData, role: "doctor" };
      await axios.post("http://localhost:5000/api/doctors/register", payload);

      setMessage("Qeydiyyat uğurla tamamlandı!");
      setTimeout(() => {
        navigate("/login");
      }, 500); // Redirect after 2 secondsq
      setFormData({
        name: "",
        email: "",
        password: "",
        specialization: "",
        profileImage: "",
        city: "",
        price: "",
        hospitalName: "",
        description: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Xəta baş verdi!");
    }
  };

  return (
    <div className="doctor-register-container">
      <form className="doctor-register-form" onSubmit={handleSubmit}>
        <h2>Həkim Qeydiyyatı</h2>

        <input
          type="text"
          name="name"
          placeholder="Ad və Soyad"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Şifrə"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="text"
          name="specialization"
          placeholder="İxtisas"
          value={formData.specialization}
          onChange={handleChange}
          required
        />

        <input
          type="url"
          name="profileImage"
          placeholder="Profil şəkil URL-si (istəyə bağlı)"
          value={formData.profileImage}
          onChange={handleChange}
        />

        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Şəhər/Rayon seçin
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <input
          type="number"
          name="price"
          placeholder="Konsultasiya qiyməti (AZN)"
          value={formData.price}
          onChange={handleChange}
          min="0"
          required
        />

        <input
          type="text"
          name="hospitalName"
          placeholder="Xəstəxana adı"
          value={formData.hospitalName}
          onChange={handleChange}
          required
        />

        <textarea
          name="description"
          placeholder="Özünüz haqda məlumat yazın"
          value={formData.description}
          onChange={handleChange}
          rows="4"
          required
        />

        <button type="submit">Qeydiyyat</button>

        {message && <p className="register-message">{message}</p>}
      </form>
    </div>
  );
}

export default DoctorRegister;
