import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createBill, getAppointments } from "../services/api";

const initialForm = {
  appointmentId: "",
  amount: "",
  status: "PENDING",
  billingDate: "",
};

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
    gridTemplateColumns: "minmax(260px, 360px) minmax(0, 1fr)",
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
  summaryCard: {
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

function AddBillingPage() {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [optionsError, setOptionsError] = useState("");
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    getAppointments()
      .then((res) => {
        setAppointments(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Billing appointments fetch failed:", err);
        setOptionsError("Could not load appointments. Check if the backend is running.");
        setMessageType("error");
      })
      .finally(() => setLoading(false));
  }, [loadAttempt]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (message) setMessage(null);
  };

  const clearForm = () => {
    setForm(initialForm);
    setMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    if (!form.appointmentId || !Number.isFinite(Number(form.amount)) || Number(form.amount) < 0 || !form.billingDate) {
      setMessage("Choose an appointment, enter a valid non-negative amount, and select a billing date.");
      setMessageType("error");
      return;
    }
    setIsSubmitting(true);

    const payload = {
      appointment: { appointmentId: Number(form.appointmentId) },
      consultationFee: Number(form.amount),
      otherCharges: 0,
      totalAmount: Number(form.amount),
      amount: Number(form.amount),
      status: form.status,
      billingDate: form.billingDate,
    };

    try {
      await createBill(payload);
      setMessage("Bill saved successfully.");
      setMessageType("success");
      setForm(initialForm);
      navigate("/billing");
    } catch (err) {
      console.error(err);
      const backendMessage = err.response?.data?.message || err.response?.data;
      setMessage(
        backendMessage ? String(backendMessage) : "Error saving bill. Check the backend and try again."
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const selectedAppointment = appointments.find((a) => String(a.appointmentId) === String(form.appointmentId));

  return (
    <div className="hms-responsive-page" style={styles.page}>
      <div style={styles.topBar}>
        <div>
          <p style={styles.eyebrow}>Finance operations</p>
          <h1 style={styles.title}>Create a bill</h1>
        </div>
        <button type="button" style={styles.secondaryButton} onClick={() => navigate("/billing")}>
          View billing list
        </button>
      </div>

      <div className="hms-form-shell" style={styles.shell}>
        <aside style={styles.infoPanel}>
          <p style={styles.panelLabel}>Invoice summary</p>
          <h2 style={styles.panelTitle}>Payment record</h2>

          <div style={styles.summaryCard}>
            <div style={styles.summaryRow}>
              <span>Appointment</span>
              <strong>{selectedAppointment ? `#${selectedAppointment.appointmentId}` : "Not selected"}</strong>
            </div>
            <div style={styles.summaryRow}>
              <span>Patient</span>
              <strong>
                {selectedAppointment?.patient
                  ? `${selectedAppointment.patient.firstName} ${selectedAppointment.patient.lastName}`
                  : "Not selected"}
              </strong>
            </div>
            <div style={styles.summaryRow}>
              <span>Amount</span>
              <strong>{form.amount ? `$${form.amount}` : "Not set"}</strong>
            </div>
            <div style={styles.summaryRow}>
              <span>Status</span>
              <strong>{form.status || "PENDING"}</strong>
            </div>
          </div>
        </aside>

        <section style={styles.formCard}>
          <div style={styles.cardHeader}>
            <div>
              <p style={styles.eyebrow}>New invoice</p>
              <h2 style={styles.cardHeading}>Billing details</h2>
            </div>
            <span style={styles.pill}>Open</span>
          </div>

          {(message || optionsError) && (
            <div
              role={optionsError || messageType === "error" ? "alert" : "status"}
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
                      setLoading(true);
                      setOptionsError("");
                      setLoadAttempt((attempt) => attempt + 1);
                    }}
                  >
                    Retry
                  </button>
                </>
              )}
            </div>
          )}

          {loading && <p role="status">Loading appointments...</p>}
          {!loading && !optionsError && appointments.length === 0 && (
            <p role="status" style={{ ...styles.alert, ...styles.errorAlert }}>
              No appointments are available for billing. <Link to="/add-appointment">Book an appointment</Link> first.
            </p>
          )}
          {(!loading || optionsError) && (
            <form onSubmit={handleSubmit} className="hms-form-grid" style={styles.formGrid}>
              <div style={styles.field}>
                <label htmlFor="appointmentId" style={styles.label}>Appointment</label>
                <select
                  id="appointmentId"
                  style={styles.input}
                  name="appointmentId"
                  value={form.appointmentId}
                  onChange={handleChange}
                  disabled={loading || appointments.length === 0}
                  required
                >
                  <option value="">Select appointment</option>
                  {appointments.map((a) => (
                    <option key={a.appointmentId} value={a.appointmentId}>
                      #{a.appointmentId} - {a.patient?.firstName || "Patient"} {a.patient?.lastName || ""} / {a.doctor?.user?.fullName || `Doctor #${a.doctor?.doctorId || ""}`}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label htmlFor="status" style={styles.label}>Status</label>
                <select
                  id="status"
                  style={styles.input}
                  name="status"
                  value={form.status}
                  onChange={handleChange}
                >
                  <option value="PENDING">PENDING</option>
                  <option value="PAID">PAID</option>
                </select>
              </div>

              <div style={styles.field}>
                <label htmlFor="amount" style={styles.label}>Amount</label>
                <input
                  id="amount"
                  style={styles.input}
                  type="number"
                  min="0"
                  step="0.01"
                  name="amount"
                  placeholder="0.00"
                  value={form.amount}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.field}>
                <label htmlFor="billingDate" style={styles.label}>Billing date</label>
                <input
                  id="billingDate"
                  style={styles.input}
                  type="date"
                  name="billingDate"
                  value={form.billingDate}
                  onChange={handleChange}
                  required
                />
              </div>

              <div style={styles.actionRow}>
                <button type="button" style={styles.clearButton} onClick={clearForm}>
                  Clear
                </button>
                <button type="submit" style={styles.submitButton} disabled={isSubmitting || loading || appointments.length === 0}>
                  {isSubmitting ? "Saving..." : "Save bill"}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

export default AddBillingPage;