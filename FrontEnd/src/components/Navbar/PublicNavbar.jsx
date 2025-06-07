import React from "react";
import { Link } from "react-router-dom";
import "./PublicNavbar.css";
import { CgProfile } from "react-icons/cg";
import { GiMedicalDrip } from "react-icons/gi";

function PublicNavbar() {
  return (
    <nav className="public-navbar">
      <div className="container navbar-container">
        <div className="nav-icon">
          <GiMedicalDrip className="medical-icon" />
          <div className="logo-text">MediConnect</div>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/">Ana səhifə</Link>
          </li>
          <li>
            <Link to="/appointments">Növbələrim</Link>
          </li>
          <li>
            <Link to="/wishlist">Bəyəndiklərim</Link>
          </li>
          <li>
            <Link to="/patientProfile" className="profile-link">
              <CgProfile className="patient-icon" />
            </Link>
          </li>
          <li>
            <Link to="/faq">FAQ</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default PublicNavbar;
