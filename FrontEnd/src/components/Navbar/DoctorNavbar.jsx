// src/components/DoctorNavbar.jsx
import React from "react";
import { Link } from "react-router-dom";
import "./DoctorNavbar.css";
import { MdOutlineDashboard } from "react-icons/md";
import { AiOutlineCalendar } from "react-icons/ai";
import { CgProfile } from "react-icons/cg";

function DoctorNavbar() {
  return (
    <nav className="doctor-navbar">
      <div className="container doctor-navbar-container">
        <div className="doctor-logo">
          <MdOutlineDashboard className="doctor-icon" />
          <span className="doctor-logo-text">Doctor Panel</span>
        </div>
        <ul className="doctor-nav-links">
          <li>
            <Link to="profile">Profilim</Link>
          </li>
          <li>
            <Link to="myAppointments">Randevularım</Link>
          </li>
          <li>
            <Link to="">
              <CgProfile className="doctor-profile-icon" />
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default DoctorNavbar;
