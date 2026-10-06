import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createDoctor, getDepartments, getUsers } from "../services/api";

const initialForm = {
  userId: "",
  departmentId: "",
  specialization: "",
  phone: "",
  availableDays: "",
  availableTime: "",
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

function AddDoctorPage() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [optionsError, setOptionsError] = useState("");
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    Promise.all([getUsers(), getDepartments()])
      .then(([userRes, deptRes]) => {
        setUsers(Array.isArray(userRes.data) ? userRes.data : []);
        setDepartments(Array.isArray(deptRes.data) ? deptRes.data : []);
      })
      .catch((err) => {
        console.error("Failed to load doctor setup data:", err);
        setOptionsError("Could not load users or departments. Check the backend connection.");
        setMessageType("error");
      })
      .finally(() => setIsLoading(false));
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

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(null);
    setIsSubmitting(true);

    const payload = {
      user: { userId: Number(form.userId) },
      department: { departmentId: Number(form.departmentId) },
      specialization: form.specialization,
      phone: form.phone,
      availableDays: form.availableDays,
      availableTime: form.availableTime,
    };

    createDoctor(payload)
      .then((res) => {
        setMessage(`Doctor saved successfully. Record ID: ${res.data.doctorId || "created"}`);
        setMessageType("success");
        setForm(initialForm);
      })
      .catch((err) => {
        console.error(err);
        const backendMessage = err.response?.data?.message || err.response?.data;
        setMessage(
          backendMessage ? String(backendMessage) : "Failed to save doctor. Make sure the selected user isn't already a doctor."
        );
        setMessageType("error");
      })
      .finally(() => setIsSubmitting(false));
  };

  const selectedUser = users.find((u) => String(u.userId) === String(form.userId));
  const selectedDepartment = departments.find((d) => String(d.departmentId) === String(form.departmentId));

  return (
    <div className="hms-responsive-page" style={styles.page}>
      <div style={styles.topBar}>
        <div>
          <p style={styles.eyebrow}>Healthcare team</p>
          <h1 style={styles.title}>Add a doctor</h1>
        </div>
        <button type="button" style={styles.secondaryButton} onClick={() => navigate("/doctors")}>
          View doctor list
        </button>
      </div>

      <div className="hms-form-shell" style={styles.shell}>
        <aside style={styles.infoPanel}>
          <p style={styles.panelLabel}>Coverage</p>
          <h2 style={styles.panelTitle}>Medical staff profile</h2>

          <div style={styles.infoList}>
            <div style={styles.infoItem}>
              <span style={styles.infoItemLabel}>Doctor</span>
              <span style={styles.infoItemValue}>{selectedUser ? selectedUser.fullName : "Not selected"}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoItemLabel}>Department</span>
              <span style={styles.infoItemValue}>{selectedDepartment ? selectedDepartment.departmentName : "Not selected"}</span>
            </div>
            <div style={styles.infoItem}>
              <span style={styles.infoItemLabel}>Schedule</span>
              <span style={styles.infoItemValue}>{form.availableDays || "Availability pending"}</span>
            </div>
          </div>
        </aside>

        <section style={styles.formCard}>
          <div style={styles.cardHeader}>
            <div>
              <p style={styles.eyebrow}>New profile</p>
              <h2 style={styles.cardHeading}>Doctor details</h2>
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
                      setIsLoading(true);
                      setOptionsError("");
                      setLoadAttempt((attempt) => attempt + 1);
                    }}
                  >
                    Retry
                  </button>
                  {" "}
                  <Link to="/add-user">Add user</Link>
                  {" · "}
                  <Link to="/add-department">Add department</Link>
                </>
              )}
            </div>
          )}

          {isLoading && <p role="status">Loading user and department data...</p>}
          {!isLoading && !optionsError && (users.length === 0 || departments.length === 0) && (
            <p role="status" style={{ ...styles.alert, ...styles.errorAlert }}>
              {users.length === 0 && departments.length === 0
                ? "Create a user account and department before adding a doctor."
                : users.length === 0
                  ? "Create a user account before adding a doctor."
                  : "Create a department before adding a doctor."}
              {" "}
              <Link to="/add-user">Add user</Link>
              {" · "}
              <Link to="/add-department">Add department</Link>
            </p>
          )}
          {(!isLoading || optionsError) && (
            <form onSubmit={handleSubmit} className="hms-form-grid" style={styles.formGrid}>
              <div style={styles.field}>
                <label htmlFor="userId" style={styles.label}>User account</label>
                <select
                  id="userId"
                  style={styles.input}
                  name="userId"
                  value={form.userId}
                  onChange={handleChange}
                  disabled={isLoading || users.length === 0}
                  required
                >
                  <option value="">Select user</option>
                  {users.map((u) => (
                    <option key={u.userId} value={u.userId}>
                      {u.fullName} ({u.username})
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label htmlFor="departmentId" style={styles.label}>Department</label>
                <select
                  id="departmentId"
                  style={styles.input}
                  name="departmentId"
                  value={form.departmentId}
                  onChange={handleChange}
                  disabled={isLoading || departments.length === 0}
                  required
                >
                  <option value="">Select department</option>
                  {departments.map((d) => (
                    <option key={d.departmentId} value={d.departmentId}>
                      {d.departmentName}
                    </option>
                  ))}
                </select>
              </div>

              <div style={styles.field}>
                <label htmlFor="specialization" style={styles.label}>Specialization</label>
                <input
                  id="specialization"
                  style={styles.input}
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                  placeholder="Cardiology"
                  required
                />
              </div>

              <div style={styles.field}>
                <label htmlFor="phone" style={styles.label}>Phone</label>
                <input
                  id="phone"
                  style={styles.input}
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+1 555 123 4567"
                />
              </div>

              <div style={styles.field}>
                <label htmlFor="availableDays" style={styles.label}>Available days</label>
                <input
                  id="availableDays"
                  style={styles.input}
                  name="availableDays"
                  value={form.availableDays}
                  onChange={handleChange}
                  placeholder="Mon, Wed, Fri"
                />
              </div>

              <div style={styles.field}>
                <label htmlFor="availableTime" style={styles.label}>Available time</label>
                <input
                  id="availableTime"
                  style={styles.input}
                  name="availableTime"
                  value={form.availableTime}
                  onChange={handleChange}
                  placeholder="09:00-13:00"
                />
              </div>

              <div style={styles.actionRow}>
                <button type="button" style={styles.clearButton} onClick={clearForm}>
                  Clear
                </button>
                <button type="submit" style={styles.submitButton} disabled={isSubmitting || isLoading || users.length === 0 || departments.length === 0}>
                  {isSubmitting ? "Saving..." : "Save doctor"}
                </button>
              </div>
            </form>
          )}
        </section>
      </div>
    </div>
  );
}

export default AddDoctorPage;