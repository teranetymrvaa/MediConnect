// src/components/DoctorNavbar.jsx
import { Link } from "react-router-dom";
import "./DoctorNavbar.css";
import { CgProfile } from "react-icons/cg";
import { GiMedicalDrip } from "react-icons/gi";

function DoctorNavbar() {
  return (
    <nav className="doctor-navbar">
      <div className="container doctor-navbar-container">
        <Link to={"/public"} className="nav-icon">
          <GiMedicalDrip className="medical-icon" />
          <div className="logo-text">MediConnect</div>
        </Link>
        <ul className="doctor-nav-links">
          <li>
            <Link to="profile">Profilim</Link>
          </li>
          <li>
            <Link to="myAppointments">Randevularım</Link>
          </li>
          <li>
            <Link to="profile" className="doctor-profile-link">
              <CgProfile className="doctor-profile-icon" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default DoctorNavbar;
