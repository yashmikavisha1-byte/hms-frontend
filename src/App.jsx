import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Navbar from "./components/Navbar";
import DashboardPage from "./pages/DashboardPage";
import PatientsPage from "./pages/PatientsPage";
import DoctorsPage from "./pages/DoctorsPage";
import AppointmentsPage from "./pages/AppointmentsPage";
import BillingPage from "./pages/BillingPage";
import AddPatientPage from "./pages/AddPatientPage";
import AddRolePage from "./pages/AddRolePage";
import AddDepartmentPage from "./pages/AddDepartmentPage";
import AddUserPage from "./pages/AddUserPage";
import AddDoctorPage from "./pages/AddDoctorPage";
import AddAppointmentPage from "./pages/AddAppointmentPage";
import AddBillingPage from "./pages/AddBillingPage";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        <Route path="/billing" element={<BillingPage />} />
        <Route path="/add-patient" element={<AddPatientPage />} />
        <Route path="/add-role" element={<AddRolePage />} />
        <Route path="/add-department" element={<AddDepartmentPage />} />
        <Route path="/add-user" element={<AddUserPage />} />
        <Route path="/add-doctor" element={<AddDoctorPage />} />
        <Route path="/add-appointment" element={<AddAppointmentPage />} />
        <Route path="/add-billing" element={<AddBillingPage />} />
        <Route
          path="*"
          element={
            <main style={{ minHeight: "60vh", display: "grid", placeItems: "center", padding: "32px" }}>
              <div style={{ textAlign: "center", color: "#12304a" }}>
                <p style={{ margin: "0 0 8px", color: "#1ca5a5", fontWeight: 800, letterSpacing: "0.1em" }}>404</p>
                <h1 style={{ margin: "0 0 12px", fontSize: "2rem" }}>Page not found</h1>
                <p style={{ margin: "0 0 20px" }}>The page you’re looking for doesn’t exist.</p>
                <Link to="/" style={{ color: "#1a7dc8", fontWeight: 700 }}>Return to dashboard</Link>
              </div>
            </main>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;