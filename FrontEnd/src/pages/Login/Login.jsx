import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../../api/axiosInstance";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("doctor"); // Yeni: rol seçimi üçün state
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    const role = localStorage.getItem("role");

    if (token) {
      if (role === "doctor") {
        navigate("/doctor");
      } else if (role === "patient") {
        navigate("/public");
      } else {
        navigate("/public");
      }
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post(`${role}s/login`, {
        email,
        password,
      });

      const { accessToken, refreshToken, doctorId, patientId, role: returnedRole } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("role", returnedRole);

      // Həkim və pasiyent ID-ləri fərqli olduğu üçün ikisini də yoxlayırıq
      if (returnedRole === "doctor") {
        localStorage.setItem("doctorId", doctorId);
        navigate("/doctor");
      } else if (returnedRole === "patient") {
        localStorage.setItem("patientId", patientId);
        navigate("/public");
      } else {
        navigate("/public");
      }
    } catch (error) {
      setMessage(
        error.response?.data?.message || "Giriş zamanı xəta baş verdi!"
      );
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>Giriş et</h2>
        <p>Hesabınıza daxil olun</p>

        {/* ROL SEÇİMİ */}
        <div className="role-select">
          <label>Rol:</label>
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="doctor">Həkim</option>
            <option value="patient">Pasiyent</option>
          </select>
        </div>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email ünvanı"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Şifrə"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Daxil ol</button>
          {message && <p className="error-message">{message}</p>}
        </form>

        <div className="register-links">
          <p>Hesabınız yoxdur?</p>
          <div>
            <span onClick={() => navigate("/patientRegister")}>
              Pasiyent kimi qeydiyyat
            </span>{" "}
            |{" "}
            <span onClick={() => navigate("/doctorRegister")}>
              Həkim kimi qeydiyyat
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
