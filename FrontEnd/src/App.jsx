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
import DoctorLayout from "./layout/DoctorLayout";
import DoctorProfile from "./pages/DoctorProfile/DoctorProfile";
import MyAppointments from "./pages/MyAppointments/MyAppointments";
import NoPage from "./pages/NoPage";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Əgər giriş edilməyibsə, ana səhifədən login-ə yönləndir */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Giriş və qeydiyyat səhifələri */}
        <Route path="/login" element={<Login />} />
        <Route path="/patientRegister" element={<PatientRegister />} />
        <Route path="/doctorRegister" element={<DoctorRegister />} />

        {/* İctimai layout (qorunan) */}
        <Route
          path="/public/*"
          element={
            <ProtectedRoute>
              <PublicLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="wishlist" element={<Wishlist />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="patientProfile" element={<PatientProfile />} />
          <Route path="faq" element={<Faq />} />
          <Route path="doctorDetails/:id" element={<DoctorDetails />} />
        </Route>

        {/* Həkim üçün layout (qorunan) */}
        <Route
          path="/doctor"
          element={
            <ProtectedRoute>
              <DoctorLayout />
            </ProtectedRoute>
          }
        >
         <Route path="/doctor/:id" element={<DoctorProfile />} />
  <Route path="myAppointments" element={<MyAppointments />} />
        </Route>

        {/* Not Found */}
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
