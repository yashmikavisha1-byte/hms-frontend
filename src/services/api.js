import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// ---------------- Patients ----------------
export const getPatients = () => api.get("/patients");
export const getPatientById = (id) => api.get(`/patients/${id}`);
export const createPatient = (data) => api.post("/patients", data);
export const updatePatient = (id, data) => api.put(`/patients/${id}`, data);
export const deletePatient = (id) => api.delete(`/patients/${id}`);

// ---------------- Doctors ----------------
export const getDoctors = () => api.get("/doctors");
export const getUsers = () => api.get("/users");
export const getDoctorById = (id) => api.get(`/doctors/${id}`);
export const createDoctor = (data) => api.post("/doctors", data);
export const updateDoctor = (id, data) => api.put(`/doctors/${id}`, data);
export const deleteDoctor = (id) => api.delete(`/doctors/${id}`);

// ---------------- Departments ----------------
export const getDepartments = () => api.get("/departments");
export const createDepartment = (data) => api.post("/departments", data);
export const createRole = (data) => api.post("/roles", data);
export const createUser = (data) => api.post("/users", data);

// ---------------- Appointments ----------------
export const getAppointments = () => api.get("/appointments");
export const createAppointment = (data) => api.post("/appointments", data);
export const updateAppointment = (id, data) => api.put(`/appointments/${id}`, data);
export const deleteAppointment = (id) => api.delete(`/appointments/${id}`);

// ---------------- Billing ----------------
export const getBills = () => api.get("/billing");
export const createBill = (data) => api.post("/billing", data);

// ---------------- Roles ----------------
export const getRoles = () => api.get("/roles");

export default api;