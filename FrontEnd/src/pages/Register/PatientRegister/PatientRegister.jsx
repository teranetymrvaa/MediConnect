import { useState } from "react";
import axios from "axios";
import "./PatientRegister.css";
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

function PatientRegister() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    birthDate: "",
    gender: "",
    city: "",
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const payload = { ...formData, role: "patient" };
      await axios.post("http://localhost:5000/api/patients/register", payload);

      setMessage("Qeydiyyat uğurla tamamlandı!");
      setTimeout(() => {
        navigate("/login");
      }, 1000);

      setFormData({
        name: "",
        email: "",
        password: "",
        phone: "",
        birthDate: "",
        gender: "",
        city: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Xəta baş verdi!");
    }
  };

  return (
    <div className="patient-register-container">
      <form className="patient-register-form" onSubmit={handleSubmit}>
        <h2>Pasiyent Qeydiyyatı</h2>

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
          type="tel"
          name="phone"
          placeholder="Telefon nömrəsi"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <input
          type="date"
          name="birthDate"
          placeholder="Doğum tarixi"
          value={formData.birthDate}
          onChange={handleChange}
          required
        />

        <select name="gender" value={formData.gender} onChange={handleChange} required>
          <option value="" disabled>
            Cinsiyyət seçin
          </option>
          <option value="Kişi">Kişi</option>
          <option value="Qadın">Qadın</option>
          <option value="Digər">Digər</option>
        </select>

        <select name="city" value={formData.city} onChange={handleChange} required>
          <option value="" disabled>
            Şəhər seçin
          </option>
          {cities.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>

        <button type="submit">Qeydiyyat</button>

        {message && <p className="register-message">{message}</p>}
      </form>
    </div>
  );
}

export default PatientRegister;
