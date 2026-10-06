import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAppointments, getBills, getPatients } from "../services/api";

const quickActions = [
  { label: "Add patient", path: "/add-patient", accent: "#4aa7ff" },
  { label: "Book visit", path: "/add-appointment", accent: "#29c2a0" },
  { label: "Create bill", path: "/add-billing", accent: "#f7b955" },
  { label: "Doctor roster", path: "/doctors", accent: "#7c6ef7" },
];

const styles = {
  page: {
    minHeight: "100vh",
    background: "linear-gradient(180deg, #f2f7ff 0%, #eefaf8 100%)",
    padding: "32px 24px 48px",
    color: "#133553",
    fontFamily: "Inter, 'Segoe UI', sans-serif",
  },
  shell: {
    maxWidth: "1200px",
    margin: "0 auto",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "16px",
    marginBottom: "24px",
    flexWrap: "wrap",
  },
  titleWrap: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
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
    margin: 0,
    fontSize: "clamp(2rem, 3vw, 2.7rem)",
    fontWeight: 800,
    color: "#0e2942",
  },
  actionButton: {
    border: "none",
    background: "linear-gradient(135deg, #1a7dc8 0%, #1db6b0 100%)",
    color: "#fff",
    borderRadius: "14px",
    padding: "12px 18px",
    fontSize: "0.96rem",
    fontWeight: 800,
    boxShadow: "0 15px 30px rgba(29, 182, 176, 0.2)",
    cursor: "pointer",
  },
  statGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
    gap: "18px",
    marginBottom: "24px",
  },
  statCard: {
    background: "rgba(255,255,255,0.9)",
    borderRadius: "22px",
    padding: "20px",
    boxShadow: "0 14px 35px rgba(18, 52, 80, 0.06)",
    border: "1px solid rgba(20, 53, 81, 0.05)",
  },
  statCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "18px",
  },
  iconBubble: {
    width: "42px",
    height: "42px",
    borderRadius: "14px",
    display: "grid",
    placeItems: "center",
    fontSize: "1.2rem",
    fontWeight: 700,
  },
  statValue: {
    fontSize: "2rem",
    fontWeight: 800,
    color: "#0d2a40",
    marginBottom: "4px",
  },
  statLabel: {
    fontSize: "0.88rem",
    color: "#57728d",
  },
  delta: {
    fontSize: "0.77rem",
    fontWeight: 800,
    padding: "6px 10px",
    borderRadius: "999px",
  },
  contentGrid: {
    display: "grid",
    gridTemplateColumns: "1.4fr 0.9fr",
    gap: "20px",
  },
  panel: {
    background: "rgba(255,255,255,0.9)",
    borderRadius: "26px",
    padding: "22px",
    boxShadow: "0 18px 40px rgba(19, 53, 83, 0.08)",
    border: "1px solid rgba(20, 53, 81, 0.04)",
  },
  panelHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "10px",
    marginBottom: "20px",
  },
  panelTitle: {
    margin: 0,
    fontSize: "1.3rem",
    fontWeight: 800,
    color: "#102e49",
  },
  mutedLink: {
    fontWeight: 700,
    color: "#2276c1",
    textDecoration: "none",
  },
  appointmentRow: {
    display: "grid",
    gridTemplateColumns: "90px 1.4fr 1.2fr 1fr auto",
    gap: "12px",
    alignItems: "center",
    padding: "14px 0",
    borderBottom: "1px solid #edf3f7",
  },
  time: {
    fontWeight: 800,
    color: "#1d4f73",
  },
  name: {
    fontWeight: 800,
    color: "#12304d",
    marginBottom: "3px",
  },
  subtext: {
    fontSize: "0.82rem",
    color: "#6d8295",
  },
  statusPill: {
    padding: "8px 10px",
    borderRadius: "999px",
    fontSize: "0.76rem",
    fontWeight: 800,
    textAlign: "center",
  },
  quickGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
    gap: "14px",
    marginTop: "8px",
  },
  quickAction: {
    padding: "16px",
    borderRadius: "18px",
    border: "1px solid rgba(18, 52, 80, 0.06)",
    background: "#f8fbff",
    display: "flex",
    alignItems: "center",
    gap: "12px",
    fontWeight: 700,
    color: "#12304a",
    textDecoration: "none",
  },
  patientList: {
    display: "grid",
    gap: "12px",
  },
  patientItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: "12px",
    padding: "12px 0",
    borderBottom: "1px solid #edf3f7",
  },
  avatar: {
    width: "42px",
    height: "42px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #dceeff 0%, #a7d7ff 100%)",
    display: "grid",
    placeItems: "center",
    fontWeight: 800,
    color: "#12304d",
  },
  pillButton: {
    background: "#eaf7fb",
    color: "#0a73a5",
    borderRadius: "999px",
    border: "none",
    padding: "8px 12px",
    fontWeight: 800,
    fontSize: "0.72rem",
  },
  stateCard: {
    padding: "24px",
    borderRadius: "18px",
    background: "#f8fbff",
    color: "#49647d",
    fontWeight: 600,
  },
};

function DashboardPage() {
  const [dashboardData, setDashboardData] = useState({ patients: [], appointments: [], bills: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [reloadKey, setReloadKey] = useState(0);
  const [todayKey] = useState(() => {
    const today = new Date();
    return [
      today.getFullYear(),
      String(today.getMonth() + 1).padStart(2, "0"),
      String(today.getDate()).padStart(2, "0"),
    ].join("-");
  });

  useEffect(() => {
    Promise.all([getPatients(), getAppointments(), getBills()])
      .then(([patientsResponse, appointmentsResponse, billsResponse]) => {
        setDashboardData({
          patients: Array.isArray(patientsResponse.data) ? patientsResponse.data : [],
          appointments: Array.isArray(appointmentsResponse.data) ? appointmentsResponse.data : [],
          bills: Array.isArray(billsResponse.data) ? billsResponse.data : [],
        });
      })
      .catch((err) => {
        console.error("Failed to load dashboard data:", err);
        setError("Dashboard data could not be loaded. Check the backend connection and try again.");
      })
      .finally(() => setIsLoading(false));
  }, [reloadKey]);

  const todaysAppointments = dashboardData.appointments
    .filter((appointment) => String(appointment.appointmentDate || "").slice(0, 10) === todayKey)
    .sort((first, second) => String(first.appointmentTime).localeCompare(String(second.appointmentTime)))
    .slice(0, 4);
  const recentPatients = [...dashboardData.patients]
    .sort((first, second) => Number(second.patientId) - Number(first.patientId))
    .slice(0, 4);
  const totalBilled = dashboardData.bills.reduce(
    (total, bill) => total + Number(bill.totalAmount ?? bill.amount ?? 0),
    0,
  );
  const statCards = [
    { label: "Total patients", value: isLoading ? "…" : error ? "—" : dashboardData.patients.length.toLocaleString(), tone: "blue" },
    { label: "Today's visits", value: isLoading ? "…" : error ? "—" : todaysAppointments.length.toLocaleString(), tone: "green" },
    { label: "Appointments", value: isLoading ? "…" : error ? "—" : dashboardData.appointments.length.toLocaleString(), tone: "purple" },
    { label: "Total billed", value: isLoading ? "…" : error ? "—" : totalBilled.toLocaleString(), tone: "amber" },
  ];

  return (
    <div className="hms-responsive-page" style={styles.page}>
      <div style={styles.shell}>
        <div style={styles.topRow}>
          <div style={styles.titleWrap}>
            <p style={styles.eyebrow}>Hospital overview</p>
            <h1 style={styles.title}>Hospital overview</h1>
          </div>
            <Link to="/add-appointment" style={{ ...styles.actionButton, textDecoration: "none" }}>+ New appointment</Link>
        </div>

          {error && (
            <div role="alert" style={{ ...styles.stateCard, marginBottom: "20px" }}>
              {error}{" "}
              <button
                type="button"
                onClick={() => {
                  setIsLoading(true);
                  setError("");
                  setReloadKey((key) => key + 1);
                }}
              >
                Retry
              </button>
            </div>
          )}

          <section className="hms-dashboard-stats" style={styles.statGrid}>
            {statCards.map((item) => (
            <div key={item.label} style={styles.statCard}>
              <div style={styles.statCardHeader}>
                <div>
                  <div style={styles.statValue}>{item.value}</div>
                  <div style={styles.statLabel}>{item.label}</div>
                </div>
                <div
                  style={{
                    ...styles.iconBubble,
                    background:
                      item.tone === "blue"
                        ? "#eaf4ff"
                        : item.tone === "green"
                          ? "#eafaf5"
                          : item.tone === "purple"
                            ? "#f0edff"
                            : "#fff3df",
                    color:
                      item.tone === "blue"
                        ? "#1d6ec8"
                        : item.tone === "green"
                          ? "#0e8b68"
                          : item.tone === "purple"
                            ? "#6c5ce7"
                            : "#d28a00",
                  }}
                >
                  {item.tone === "blue" ? "P" : item.tone === "green" ? "V" : item.tone === "purple" ? "A" : "$"}
                </div>
              </div>
            </div>
          ))}
        </section>

        <section className="hms-dashboard-content" style={styles.contentGrid}>
          <div style={styles.panel}>
            <div style={styles.panelHeader}>
              <h2 style={styles.panelTitle}>Today's appointments</h2>
              <Link to="/appointments" style={styles.mutedLink}>View all</Link>
            </div>

            {isLoading ? (
              <div style={styles.stateCard}>Loading today’s appointments…</div>
            ) : error ? (
              <div style={styles.stateCard}>Appointments are unavailable until the backend reconnects.</div>
            ) : todaysAppointments.length === 0 ? (
              <div style={styles.stateCard}>No appointments scheduled for today.</div>
            ) : todaysAppointments.map((item) => (
                <div key={item.appointmentId} className="hms-dashboard-appointment" style={styles.appointmentRow}>
                  <div style={styles.time}>{item.appointmentTime || "Time not set"}</div>
                  <div>
                    <div style={styles.name}>{[item.patient?.firstName, item.patient?.lastName].filter(Boolean).join(" ") || "Patient"}</div>
                    <div style={styles.subtext}>{item.reason || "Appointment"}</div>
                  </div>
                  <div>
                    <div style={styles.subtext}>Doctor</div>
                    <div style={{ fontWeight: 700, color: "#12304d" }}>{item.doctor?.user?.fullName || `Doctor #${item.doctor?.doctorId ?? "—"}`}</div>
                  </div>
                  <div style={{ ...styles.statusPill, background: "#eafaf5", color: "#0d7b62" }}>
                    {item.status || "Scheduled"}
                  </div>
                </div>
              ))}
          </div>

          <div style={{ display: "grid", gap: "20px" }}>
            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <h2 style={styles.panelTitle}>Quick actions</h2>
              </div>

              <div style={styles.quickGrid}>
                {quickActions.map((item) => (
                  <Link key={item.label} to={item.path} style={{ ...styles.quickAction, borderColor: item.accent + "33" }}>
                    <span style={{ width: "12px", height: "12px", borderRadius: "50%", background: item.accent, display: "inline-block" }} />
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <div style={styles.panel}>
              <div style={styles.panelHeader}>
                <h2 style={styles.panelTitle}>Recent patients</h2>
                <Link to="/patients" style={styles.mutedLink}>See all</Link>
              </div>

              <div style={styles.patientList}>
                {isLoading ? (
                  <div style={styles.stateCard}>Loading patient records…</div>
                ) : error ? (
                  <div style={styles.stateCard}>Patient records are unavailable until the backend reconnects.</div>
                ) : recentPatients.length === 0 ? (
                  <div style={styles.stateCard}>No patient records found.</div>
                ) : recentPatients.map((patient) => {
                  const name = [patient.firstName, patient.lastName].filter(Boolean).join(" ") || `Patient #${patient.patientId}`;
                  return (
                  <div key={patient.patientId} style={styles.patientItem}>
                    <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                      <div style={styles.avatar}>{name.charAt(0)}</div>
                      <div>
                        <div style={{ fontWeight: 800, color: "#12304d" }}>{name}</div>
                        <div style={styles.subtext}>Patient record #{patient.patientId}</div>
                      </div>
                    </div>
                    <Link to="/patients" style={{ ...styles.pillButton, textDecoration: "none" }}>View</Link>
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default DashboardPage;
