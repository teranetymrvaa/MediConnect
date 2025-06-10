import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Sadə yoxlama (demo üçün)
    if (email && password) {
      localStorage.setItem("user", "true");
      navigate("/"); // PublicLayout-a yönləndir
    } else {
      alert("Zəhmət olmasa bütün xanaları doldurun.");
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
          />
          <input
            type="password"
            placeholder="Şifrə"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Daxil ol</button>
        </form>
        <div className="register-links">
          <p>Hesabınız yoxdur?</p>
          <div>
            <span onClick={() => navigate("/patientRegister")}>
              Pasiyent kimi qeydiyyat
            </span>{" "}
            |
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
