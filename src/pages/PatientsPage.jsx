import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getPatients } from "../services/api";

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f3f8ff 0%, #eefaf8 100%)",
    padding: "32px 24px 48px",
    fontFamily: "Inter, 'Segoe UI', sans-serif",
    color: "#133553",
  },
  shell: {
    maxWidth: "1220px",
    margin: "0 auto",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "12px",
    marginBottom: "20px",
    flexWrap: "wrap",
  },
  eyebrow: {
    margin: 0,
    textTransform: "uppercase",
    letterSpacing: "0.12em",
    fontSize: "12px",
    fontWeight: 800,
    color: "#1ca5a5",
  },
  title: {
    margin: "8px 0 0",
    fontSize: "clamp(2rem, 3vw, 2.7rem)",
    fontWeight: 800,
    color: "#0d2b42",
  },
  button: {
    border: "none",
    background: "linear-gradient(135deg, #1a7dc8 0%, #1db6b0 100%)",
    color: "#fff",
    borderRadius: "12px",
    padding: "12px 18px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 12px 25px rgba(29, 182, 176, 0.2)",
  },
  panel: {
    background: "rgba(255,255,255,0.95)",
    borderRadius: "24px",
    boxShadow: "0 18px 40px rgba(17, 57, 90, 0.08)",
    border: "1px solid rgba(15, 44, 67, 0.05)",
    overflow: "hidden",
  },
  tableWrap: {
    overflowX: "auto",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    minWidth: "900px",
  },
  thead: {
    background: "#f0f7ff",
  },
  th: {
    textAlign: "left",
    padding: "15px 18px",
    fontSize: "0.8rem",
    letterSpacing: "0.04em",
    textTransform: "uppercase",
    color: "#50708c",
    borderBottom: "1px solid #edf3f7",
  },
  td: {
    padding: "16px 18px",
    borderBottom: "1px solid #edf3f7",
    fontSize: "0.96rem",
    color: "#173b56",
    verticalAlign: "middle",
  },
  badge: {
    display: "inline-flex",
    padding: "7px 10px",
    borderRadius: "999px",
    fontSize: "0.75rem",
    fontWeight: 800,
    background: "#ebf7ff",
    color: "#216dbb",
  },
  empty: {
    padding: "28px",
    textAlign: "center",
    color: "#56708d",
    fontWeight: 600,
  },
  errorCard: {
    marginTop: "18px",
    background: "#fef7f7",
    border: "1px solid #f4d0d0",
    borderRadius: "24px",
    padding: "42px 28px",
    textAlign: "center",
    boxShadow: "0 12px 24px rgba(153, 58, 58, 0.06)",
  },
  errorBadge: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    width: "52px",
    height: "52px",
    borderRadius: "50%",
    background: "#ffe5e5",
    color: "#d92d20",
    fontSize: "1.7rem",
    marginBottom: "18px",
  },
  errorTitle: {
    margin: "0 0 10px",
    color: "#b42318",
    fontSize: "clamp(1.5rem, 2vw, 2.2rem)",
    fontWeight: 800,
  },
  errorText: {
    margin: "0 0 20px",
    color: "#7a2f2f",
    fontSize: "1rem",
    fontWeight: 600,
  },
  retryButton: {
    border: "none",
    background: "linear-gradient(135deg, #1a7dc8 0%, #1db6b0 100%)",
    color: "#fff",
    borderRadius: "12px",
    padding: "12px 18px",
    fontWeight: 800,
    cursor: "pointer",
    boxShadow: "0 12px 25px rgba(29, 182, 176, 0.2)",
  },
};

function PatientsPage() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPatients()
      .then((response) => {
        setPatients(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching patients:", err);
        setError("Could not connect to the backend. Make sure it's running.");
        setLoading(false);
      });
  }, []);

  if (loading) return <div style={styles.page}><div style={styles.shell}><p style={{ color: "#173b56", fontWeight: 700 }}>Loading patients...</p></div></div>;
  if (error) return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.errorCard}>
          <div style={styles.errorBadge}>!</div>
          <h2 style={styles.errorTitle}>Could not connect to the backend.</h2>
          <p style={styles.errorText}>{error}</p>
          <button type="button" style={styles.retryButton} onClick={() => window.location.reload()}>
            Retry
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.header}>
          <div>
            <p style={styles.eyebrow}>Patient records</p>
            <h1 style={styles.title}>Patient directory</h1>
          </div>
          <Link to="/add-patient" style={{ ...styles.button, textDecoration: "none" }}>+ Add patient</Link>
        </div>

        <div style={styles.panel}>
          {patients.length === 0 ? (
            <div style={styles.empty}>No patients found. Add one using the patient form.</div>
          ) : (
            <div style={styles.tableWrap}>
              <table style={styles.table}>
                <thead style={styles.thead}>
                  <tr>
                    <th style={styles.th}>ID</th>
                    <th style={styles.th}>First Name</th>
                    <th style={styles.th}>Last Name</th>
                    <th style={styles.th}>Date of Birth</th>
                    <th style={styles.th}>Gender</th>
                    <th style={styles.th}>Phone</th>
                    <th style={styles.th}>Email</th>
                  </tr>
                </thead>
                <tbody>
                  {patients.map((patient) => (
                    <tr key={patient.patientId}>
                      <td style={styles.td}><span style={styles.badge}>#{patient.patientId}</span></td>
                      <td style={styles.td}>{patient.firstName}</td>
                      <td style={styles.td}>{patient.lastName}</td>
                      <td style={styles.td}>{patient.dateOfBirth}</td>
                      <td style={styles.td}>{patient.gender}</td>
                      <td style={styles.td}>{patient.phone}</td>
                      <td style={styles.td}>{patient.email || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default PatientsPage;
