import React from "react";
import PublicNavbar from "../components/Navbar/PublicNavbar";
import { Outlet } from "react-router-dom";
import PublicFooter from "../components/Footer/PublicFooter";

function PublicLayout() {
  return (
    <>
      <PublicNavbar />
      <Outlet />
      <PublicFooter />
    </>
  );
}

export default PublicLayout;
