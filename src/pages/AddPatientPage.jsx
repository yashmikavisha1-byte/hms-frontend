import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createPatient } from "../services/api";

const initialForm = {
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  gender: "MALE",
  phone: "",
  email: "",
  address: "",
  bloodGroup: "",
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
  infoList: {
    display: "grid",
    gap: "12px",
    marginTop: "20px",
  },
  infoItem: {
    background: "rgba(255,255,255,0.08)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "18px",
    padding: "16px",
  },
  infoItemLabel: {
    display: "block",
    fontSize: "0.72rem",
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    opacity: 0.75,
    marginBottom: "6px",
  },
  infoItemValue: {
    fontSize: "1.05rem",
    fontWeight: 700,
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

function AddPatientPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (message) setMessage(null);
  };

  const clearForm = () => {
    setForm(initialForm);
    setMessage(null);
  };

  const normalizeDateOfBirth = (value) => {
    const match = value.trim().match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{4})$/);
    if (!match) return null;

    const [, monthText, dayText, yearText] = match;
    const month = Number(monthText);
    const day = Number(dayText);
    const year = Number(yearText);
    const date = new Date(year, month - 1, day);
    const isValidDate =
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === day &&
      date <= new Date();

    if (!isValidDate) return null;
    return `${yearText}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);

    const dateOfBirth = normalizeDateOfBirth(form.dateOfBirth);
    if (!dateOfBirth) {
      setMessage("Enter a valid birthday in mm/dd/yyyy format. The date cannot be in the future.");
      setMessageType("error");
      return;
    }

    setIsSubmitting(true);

    const payload = {
      ...form,
      dateOfBirth,
    };

    createPatient(payload)
      .then((res) => {
        setMessage(`Patient saved successfully. Record ID: ${res.data.patientId || "created"}`);
        setMessageType("success");
        setForm(initialForm);
        navigate("/patients");
      })
      .catch((err) => {
        console.error(err);
        const backendMessage = err.response?.data?.message || err.response?.data;
        setMessage(
          backendMessage ? String(backendMessage) : "Failed to save patient. Check the fields and try again."
        );
        setMessageType("error");
      })
      .finally(() => setIsSubmitting(false));
  };

  const patientName = [form.firstName, form.lastName].filter(Boolean).join(" ") || "New patient";

  return (
    <div className="hms-responsive-page" style={styles.page}>
      <div style={styles.topBar}>
        <div>
          <p style={styles.eyebrow}>Patient intake</p>
          <h1 style={styles.title}>Register a new patient</h1>
        </div>
        <button type="button" style={styles.secondaryButton} onClick={() => navigate("/patients")}>
          View patient list
        </button>
      </div>

      <div className="hms-form-shell" style={styles.shell}>
        <aside style={styles.infoPanel}>
          <p style={styles.panelLabel}>Quick review</p>
          <h2 style={styles.panelTitle}>{patientName}</h2>

          <div style={styles.infoList}>
            <div style={styles.infoItem}>
              <span style={styles.infoItemLabel}>Patient</span>
              <span style={styles.infoItemValue}>{patientName}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoItemLabel}>Contact</span>
              <span style={styles.infoItemValue}>{form.phone || "Phone not added"}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoItemLabel}>Status</span>
              <span style={styles.infoItemValue}>Ready for visit</span>
            </div>
          </div>
        </aside>

        <section style={styles.formCard}>
          <div style={styles.cardHeader}>
            <div>
              <p style={styles.eyebrow}>New record</p>
              <h2 style={styles.cardHeading}>Patient details</h2>
            </div>
            <span style={styles.pill}>Open</span>
          </div>

          {message && (
            <div
              style={{
                ...styles.alert,
                ...(messageType === "success" ? styles.successAlert : styles.errorAlert),
              }}
            >
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="hms-form-grid" style={styles.formGrid}>
            <div style={styles.field}>
              <label htmlFor="firstName" style={styles.label}>First name</label>
              <input
                id="firstName"
                style={styles.input}
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="lastName" style={styles.label}>Last name</label>
              <input
                id="lastName"
                style={styles.input}
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="dateOfBirth" style={styles.label}>Date of birth</label>
              <input
                id="dateOfBirth"
                style={styles.input}
                type="text"
                name="dateOfBirth"
                value={form.dateOfBirth}
                onChange={handleChange}
                placeholder="mm/dd/yyyy"
                aria-describedby="dateOfBirthHint"
                required
              />
              <span id="dateOfBirthHint" style={{ color: "#6b8297", fontSize: "0.75rem" }}>
                Use month/day/year, for example 05/24/1990.
              </span>
            </div>

            <div style={styles.field}>
              <label htmlFor="gender" style={styles.label}>Gender</label>
              <select
                id="gender"
                style={styles.input}
                name="gender"
                value={form.gender}
                onChange={handleChange}
              >
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>

            <div style={styles.field}>
              <label htmlFor="phone" style={styles.label}>Phone</label>
              <input
                id="phone"
                style={styles.input}
                name="phone"
                value={form.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="email" style={styles.label}>Email</label>
              <input
                id="email"
                style={styles.input}
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div style={styles.fieldWide}>
              <label htmlFor="address" style={styles.label}>Address</label>
              <textarea
                id="address"
                style={styles.textarea}
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="Street, city, state, ZIP code"
              />
            </div>

            <div style={styles.field}>
              <label htmlFor="bloodGroup" style={styles.label}>Blood group</label>
              <input
                id="bloodGroup"
                style={styles.input}
                name="bloodGroup"
                value={form.bloodGroup}
                onChange={handleChange}
                placeholder="e.g. O+"
              />
            </div>

            <div style={styles.field}>
              <label style={styles.label}>&nbsp;</label>
              <div style={{ display: "flex", gap: "12px" }}>
                <button type="button" style={styles.clearButton} onClick={clearForm}>
                  Clear
                </button>
                <button type="submit" style={styles.submitButton} disabled={isSubmitting}>
                  {isSubmitting ? "Saving..." : "Save patient"}
                </button>
              </div>
            </div>
          </form>
        </section>
      </div>
    </div>
  );
}

export default AddPatientPage;