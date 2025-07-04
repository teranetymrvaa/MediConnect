import React from "react";
import PublicFooter from "../components/Footer/PublicFooter";
import DoctorNavbar from "../components/Navbar/DoctorNavbar";
import { Outlet } from "react-router-dom";

function DoctorLayout() {
  return (
    <div>
      <DoctorNavbar />
      <Outlet />
      <PublicFooter />
    </div>
  );
}

export default DoctorLayout;
