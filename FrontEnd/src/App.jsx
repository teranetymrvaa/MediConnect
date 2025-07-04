import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login/Login";
import PatientRegister from "./pages/Register/PatientRegister/PatientRegister";
import DoctorRegister from "./pages/Register/DoctorRegister/DoctorRegister";

import PublicLayout from "./layout/PublicLayout";
import Home from "./pages/Home/Home";
import Wishlist from "./pages/Wishlist/Wishlist";
import Faq from "./pages/Faq/Faq";
import Appointments from "./pages/Appointments/Appointments";
import DoctorDetails from "./pages/DoctorDetails/DoctorDetails";
import PatientProfile from "./pages/PatientProlfile/PatientProfile";

import NoPage from "./pages/NoPage";
import ProtectedRoute from "./routes/ProtectedRoute";
import DoctorSlotsPage from "./pages/DoctorSlots/DoctorSlotsPage";
import Doctors from "./pages/Doctors/Doctors";
import DoctorProfile from "./pages/DoctorProfile/DoctorProfile";
import MyAppointments from "./pages/MyAppointments/MyAppointments";

function App() {
  const accessToken = localStorage.getItem("accessToken");
  const role = localStorage.getItem("role");

  return (
    <BrowserRouter>
      <Routes>
        {/* Əsas yönləndirmə */}
        <Route
          path="/"
          element={
            accessToken ? (
              role === "doctor" ? (
                <Navigate to="/doctor/profile" replace />
              ) : (
                <Navigate to="/public" replace />
              )
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Login və qeydiyyat yolları */}
        <Route path="/login" element={<Login />} />
        <Route path="/patientRegister" element={<PatientRegister />} />
        <Route path="/doctorRegister" element={<DoctorRegister />} />

        {/* Pasiyent və Doktor eyni layout */}
        <Route
          path="/public"
          element={
            <ProtectedRoute>
              <PublicLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="faq" element={<Faq />} />
          <Route path="doctorDetails/:id" element={<DoctorDetails />} />
          <Route path="doctors" element={<Doctors />} />
        </Route>

        {/* Patient Profile ayrıca */}
        <Route
          path="/public/patientProfile"
          element={
            <ProtectedRoute>
              <PatientProfile />
            </ProtectedRoute>
          }
        />

        {/* Həkim paneli — eyni layoutla */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute>
              <PublicLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="slots" element={<DoctorSlotsPage />} />
          <Route path="profile" element={<DoctorProfile />} />
          <Route path="myAppointments" element={<MyAppointments />} />
        </Route>

        {/* 404 səhifəsi */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
