import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Layout-dan KƏNAR səhifələr */}
        <Route path="/login" element={<Login />} />
        <Route path="/patientRegister" element={<PatientRegister />} />
        <Route path="/doctorRegister" element={<DoctorRegister />} />

        {/* Layout DAXİLİ səhifələr */}
        <Route path="/" element={<PublicLayout />}>
          <Route index element={<Home />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="/patientProfile" element={<PatientProfile />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/doctorDetails/:id" element={<DoctorDetails />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<DoctorProfile />} />
          <Route path="myAppointments" element={<MyAppointments />} />
          <Route path="*" element={<NoPage/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
