import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";
import axiosInstance from "../../../api/axiosInstance";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  // Əgər artıq daxil olunubsa, login səhifəsinə daxil olmaq olmaz
  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      navigate("/public");
    }
  }, [navigate]);

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await axiosInstance.post("doctors/login", {
        email,
        password,
      });

      const { accessToken, refreshToken, doctorId, role } = res.data;

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("doctorId", doctorId);
      localStorage.setItem("role", role);

      // 🔁 Login sonrası birbaşa qorunan route-a yönləndir
      navigate("/public");
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
