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
    city: "",
    price: "",
    hospitalName: "",
    description: "",
  });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleFileChange = (e) => setProfileImageFile(e.target.files[0]);

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      specialization: "",
      city: "",
      price: "",
      hospitalName: "",
      description: "",
    });
    setProfileImageFile(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // 1) Register JSON
      const { data } = await axios.post(
        "http://localhost:5000/api/doctors/register",
        { ...formData, role: "doctor" }
      );
      const doctorId = data.doctorId;

      // 2) If there's a selected file, upload it
      if (profileImageFile) {
        const picData = new FormData();
        picData.append("profilePic", profileImageFile);
        await axios.post(
          `http://localhost:5000/api/doctors/${doctorId}/profile-pic`,
          picData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
      }

      setMessage("Qeydiyyat və şəkil yükləmə uğurla tamamlandı!");
      resetForm();
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || "Xəta baş verdi!");
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

        {/* PROFILE PIC */}
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <select
          name="city"
          value={formData.city}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Şəhər/Rayon seçin
          </option>
          {cities.map((c) => (
            <option key={c} value={c}>
              {c}
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
          rows="4"
          placeholder="Özünüz haqda məlumat yazın"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <button type="submit">Qeydiyyat</button>
        {message && <p className="register-message">{message}</p>}
      </form>
    </div>
  );
}

export default DoctorRegister;
