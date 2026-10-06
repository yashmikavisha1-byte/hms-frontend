import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPatients, getDoctors, createAppointment } from "../services/api";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f3f8ff 0%, #edf7f7 100%)",
    padding: "32px 24px 48px",
    fontFamily: "Inter, 'Segoe UI', sans-serif",
    color: "#12304a",
  },
  topBar: {
    maxWidth: "1180px",
    margin: "0 auto 24px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    flexWrap: "wrap",
  },
  eyebrow: {
    margin: 0,
    fontSize: "12px",
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    color: "#1ca5a5",
    fontWeight: 700,
  },
  title: {
    margin: "8px 0 0",
    fontSize: "clamp(2rem, 3vw, 2.8rem)",
    fontWeight: 800,
    color: "#0f2c43",
  },
  secondaryButton: {
    border: "1px solid rgba(26, 91, 145, 0.2)",
    background: "#ffffff",
    color: "#0f2c43",
    padding: "11px 18px",
    borderRadius: "999px",
    fontWeight: 700,
    cursor: "pointer",
    boxShadow: "0 10px 30px rgba(15, 44, 67, 0.08)",
  },
  shell: {
    maxWidth: "1180px",
    margin: "0 auto",
    display: "grid",
    gridTemplateColumns: "minmax(250px, 350px) minmax(0, 1fr)",
    gap: "24px",
    alignItems: "stretch",
  },
  infoPanel: {
    background: "linear-gradient(180deg, #0d3b66 0%, #123f6d 100%)",
    borderRadius: "28px",
    padding: "24px",
    color: "#edf8ff",
    boxShadow: "0 20px 45px rgba(17, 61, 96, 0.18)",
  },
  panelLabel: {
    margin: 0,
    fontSize: "12px",
    fontWeight: 700,
    letterSpacing: "0.12em",
    textTransform: "uppercase",
    opacity: 0.75,
  },
  panelTitle: {
    margin: "12px 0 20px",
    fontSize: "1.8rem",
    fontWeight: 700,
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "12px",
    marginTop: "18px",
  },
  statCard: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "18px",
    padding: "16px 14px",
  },
  statValue: {
    display: "block",
    fontSize: "1.5rem",
    fontWeight: 800,
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "0.75rem",
    opacity: 0.8,
  },
  summaryCard: {
    marginTop: "22px",
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "18px",
    padding: "16px",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "12px",
    padding: "10px 0",
    borderBottom: "1px solid rgba(255,255,255,0.1)",
    color: "#eaf4ff",
  },
  formCard: {
    background: "rgba(255,255,255,0.94)",
    borderRadius: "28px",
    boxShadow: "0 18px 40px rgba(18, 48, 74, 0.08)",
    border: "1px solid rgba(17, 61, 96, 0.06)",
    padding: "28px",
  },
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "24px",
  },
  cardHeading: {
    margin: "6px 0 0",
    fontSize: "1.45rem",
    fontWeight: 800,
    color: "#0f2c43",
  },
  pill: {
    background: "#e8f9f4",
    color: "#0f8b74",
    borderRadius: "999px",
    padding: "8px 12px",
    fontWeight: 700,
    fontSize: "0.78rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "20px",
  },
  field: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  fieldWide: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    gridColumn: "1 / -1",
  },
  label: {
    fontSize: "0.81rem",
    fontWeight: 700,
    color: "#49647d",
  },
  input: {
    width: "100%",
    padding: "13px 14px",
    borderRadius: "14px",
    border: "1px solid #d8e3ef",
    background: "#f9fbff",
    fontSize: "0.99rem",
    color: "#153758",
    outline: "none",
    boxSizing: "border-box",
  },
  textarea: {
    width: "100%",
    minHeight: "110px",
    padding: "13px 14px",
    borderRadius: "14px",
    border: "1px solid #d8e3ef",
    background: "#f9fbff",
    fontSize: "0.99rem",
    color: "#153758",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
  },
  actionRow: {
    gridColumn: "1 / -1",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginTop: "8px",
    flexWrap: "wrap",
  },
  clearButton: {
    border: "1px solid #d4dfea",
    background: "#fff",
    borderRadius: "12px",
    padding: "12px 18px",
    fontWeight: 700,
    color: "#173c5a",
    cursor: "pointer",
  },
  submitButton: {
    border: "none",
    borderRadius: "12px",
    background: "linear-gradient(135deg, #1a7dc8 0%, #18a0b5 100%)",
    color: "#fff",
    padding: "14px 22px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 12px 25px rgba(24, 160, 181, 0.28)",
  },
  alert: {
    marginBottom: "18px",
    padding: "13px 16px",
    borderRadius: "12px",
    fontWeight: 600,
    border: "1px solid transparent",
  },
  successAlert: {
    background: "#eafaf5",
    color: "#0d7b62",
    borderColor: "#bfeee0",
  },
  errorAlert: {
    background: "#fff1f0",
    color: "#bb3d3d",
    borderColor: "#f6d4d1",
  },
};

function AddAppointmentPage() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    patientId: "",
    doctorId: "",
    appointmentDate: "",
    appointmentTime: "",
    reason: "",
  });
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const [optionsError, setOptionsError] = useState("");

  useEffect(() => {
    Promise.all([getPatients(), getDoctors()])
      .then(([patientRes, doctorRes]) => {
        setPatients(Array.isArray(patientRes.data) ? patientRes.data : []);
        setDoctors(Array.isArray(doctorRes.data) ? doctorRes.data : []);
      })
      .catch((err) => {
        console.error("Failed to load appointment options:", err);
        setOptionsError("Could not load patients or doctors. Check the backend connection.");
        setMessageType("error");
      })
      .finally(() => setIsLoading(false));
  }, [loadAttempt]);

  const selectedPatient = patients.find((p) => String(p.patientId) === String(form.patientId));
  const selectedDoctor = doctors.find((d) => String(d.doctorId) === String(form.doctorId));

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (message) setMessage(null);
  };

  const normalizeDate = (value) => {
    if (!value) return "Select a date";
    return new Date(`${value}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    if (!form.patientId || !form.doctorId || !form.appointmentDate || !form.appointmentTime) {
      setMessage("Please complete all required appointment fields before saving.");
      setMessageType("error");
      return;
    }

    const payload = {
      patient: { patientId: Number(form.patientId) },
      doctor: { doctorId: Number(form.doctorId) },
      appointmentDate: form.appointmentDate,
      appointmentTime: form.appointmentTime,
      reason: form.reason.trim(),
      status: "SCHEDULED",
    };

    setIsSubmitting(true);

    createAppointment(payload)
      .then((res) => {
        setMessage(`Saved appointment successfully. Confirmation ID: ${res.data?.appointmentId ?? "created"}`);
        setMessageType("success");
        setForm({ patientId: "", doctorId: "", appointmentDate: "", appointmentTime: "", reason: "" });
      })
      .catch((err) => {
        console.error(err);
        const backendMessage = err.response?.data?.message || err.response?.data;
        if (err.response?.status === 409) {
          setMessage("This doctor already has an appointment at that date and time. Please choose another slot.");
        } else if (backendMessage) {
          setMessage(String(backendMessage));
        } else {
          setMessage("Failed to save appointment. Please review the form and try again.");
        }
        setMessageType("error");
      })
      .finally(() => setIsSubmitting(false));
  };

  const clearForm = () => {
    setForm({ patientId: "", doctorId: "", appointmentDate: "", appointmentTime: "", reason: "" });
    setMessage(null);
  };

  return (
    <div className="hms-responsive-page" style={styles.page}>
      <div style={styles.topBar}>
        <div>
          <p style={styles.eyebrow}>Clinic operations</p>
          <h1 style={styles.title}>Book an appointment</h1>
        </div>
        <Link to="/appointments" style={{ ...styles.secondaryButton, textDecoration: "none" }}>View schedule</Link>
      </div>

      <div className="hms-form-shell" style={styles.shell}>
        <aside style={styles.infoPanel}>
          <p style={styles.panelLabel}>Today</p>
          <h2 style={styles.panelTitle}>Care coordination</h2>

          <div style={styles.statGrid}>
            <div style={styles.statCard}>
              <span style={styles.statValue}>{isLoading ? "…" : patients.length}</span>
              <span style={styles.statLabel}>Patients available</span>
            </div>
            <div style={styles.statCard}>
              <span style={styles.statValue}>{isLoading ? "…" : doctors.length}</span>
              <span style={styles.statLabel}>Doctors available</span>
            </div>
          </div>

          <div style={styles.summaryCard}>
            <div style={styles.summaryRow}>
              <span>Patient</span>
              <strong>{selectedPatient ? `${selectedPatient.firstName} ${selectedPatient.lastName}` : "Not selected"}</strong>
            </div>
            <div style={styles.summaryRow}>
              <span>Doctor</span>
              <strong>{selectedDoctor ? selectedDoctor.user?.fullName || `Doctor #${selectedDoctor.doctorId}` : "Not selected"}</strong>
            </div>
            <div style={styles.summaryRow}>
              <span>Date</span>
              <strong>{normalizeDate(form.appointmentDate)}</strong>
            </div>
            <div style={styles.summaryRow}>
              <span>Time</span>
              <strong>{form.appointmentTime || "Not selected"}</strong>
            </div>
          </div>
        </aside>

        <section style={styles.formCard}>
          <div style={styles.cardHeader}>
            <div>
              <p style={styles.eyebrow}>New visit</p>
              <h2 style={styles.cardHeading}>Appointment details</h2>
            </div>
            <span style={styles.pill}>Open</span>
          </div>

          {(message || optionsError) && (
            <div
              role={messageType === "error" || optionsError ? "alert" : "status"}
              style={{
                ...styles.alert,
                ...(messageType === "success" ? styles.successAlert : styles.errorAlert),
              }}
            >
              {optionsError || message}
              {optionsError && (
                <>
                  {" "}
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoading(true);
                      setOptionsError("");
                      setMessage(null);
                      setLoadAttempt((attempt) => attempt + 1);
                    }}
                  >
                    Retry
                  </button>
                  {" "}
                  <Link to="/add-patient">Add patient</Link>
                  {" · "}
                  <Link to="/add-doctor">Add doctor</Link>
                </>
              )}
            </div>
          )}

          {isLoading && <p role="status">Loading patients and doctors...</p>}
          {!isLoading && !optionsError && (patients.length === 0 || doctors.length === 0) && (
            <p role="status" style={{ ...styles.alert, ...styles.errorAlert }}>
              {patients.length === 0 && doctors.length === 0
                ? "Add at least one patient and one doctor before booking an appointment."
                : patients.length === 0
                  ? "Add a patient before booking an appointment."
                  : "Add a doctor before booking an appointment."}
              {" "}
              <Link to="/add-patient">Add patient</Link>
              {" · "}
              <Link to="/add-doctor">Add doctor</Link>
            </p>
          )}
          {(!isLoading || optionsError) && (
            <form onSubmit={handleSubmit} className="hms-form-grid" style={styles.formGrid}>
              <div style={styles.field}>
                <label htmlFor="patientId" style={styles.label}>Patient</label>
                <select
                  id="patientId"
                  style={styles.input}
                  name="patientId"
                  value={form.patientId}
                  onChange={handleChange}
                  disabled={isLoading || patients.length === 0}
                  required
                >
                  <option value="">Select patient</option>
                  {patients.map((p) => (
                    <option key={p.patientId} value={p.patientId}>
                      {p.firstName} {p.lastName}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label htmlFor="doctorId" style={styles.label}>Doctor</label>
                <select
                  id="doctorId"
                  style={styles.input}
                  name="doctorId"
                  value={form.doctorId}
                  onChange={handleChange}
                  disabled={isLoading || doctors.length === 0}
                  required
                >
                  <option value="">Select doctor</option>
                  {doctors.map((d) => (
                    <option key={d.doctorId} value={d.doctorId}>
                      {d.user?.fullName || `Doctor #${d.doctorId}`} · {d.specialization}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label htmlFor="appointmentDate" style={styles.label}>Date</label>
                <input
                  id="appointmentDate"
                  style={styles.input}
                  type="date"
                  name="appointmentDate"
                  value={form.appointmentDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.field}>
                <label htmlFor="appointmentTime" style={styles.label}>Time</label>
                <input
                  id="appointmentTime"
                  style={styles.input}
                  type="time"
                  name="appointmentTime"
                  value={form.appointmentTime}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.fieldWide}>
                <label htmlFor="reason" style={styles.label}>Reason for visit</label>
                <textarea
                  id="reason"
                  style={styles.textarea}
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  placeholder="Describe the patient concern or symptoms"
                />
              </div>

              <div style={styles.actionRow}>
                <button type="button" style={styles.clearButton} onClick={clearForm}>Clear</button>
                <button
                  type="submit"
                  style={styles.submitButton}
                  disabled={isSubmitting || isLoading || patients.length === 0 || doctors.length === 0}
                >
                  {isSubmitting ? "Saving..." : "Confirm appointment"}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

export default AddAppointmentPage;