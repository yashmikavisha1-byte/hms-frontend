import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  const navItems = [
    { to: "/", label: "Dashboard", paths: ["/"] },
    { to: "/patients", label: "Patients", paths: ["/patients", "/add-patient"] },
    { to: "/doctors", label: "Doctors", paths: ["/doctors", "/add-doctor"] },
    { to: "/appointments", label: "Appointments", paths: ["/appointments", "/add-appointment"] },
    { to: "/billing", label: "Billing", paths: ["/billing", "/add-billing"] },
  ];

  const linkStyle = (isActive) => ({
    color: isActive ? "#0f2c43" : "#eaf4ff",
    background: isActive ? "#dff5ff" : "transparent",
    textDecoration: "none",
    fontWeight: 700,
    padding: "10px 14px",
    borderRadius: "10px",
    transition: "all 0.2s ease",
  });

  return (
    <nav
      style={{
        background: "linear-gradient(135deg, #0f2c43 0%, #123f6d 100%)",
        padding: "16px 24px",
        boxShadow: "0 12px 30px rgba(12, 38, 58, 0.18)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px", color: "#fff" }}>
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "12px",
              display: "grid",
              placeItems: "center",
              fontWeight: 800,
              background: "linear-gradient(135deg, #5fd2d8 0%, #4aa7ff 100%)",
              color: "#09314f",
            }}
          >
            HMS
          </div>
          <span style={{ fontWeight: 800, letterSpacing: "0.04em" }}>Hospital System</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", flexWrap: "wrap" }}>
          {navItems.map((item) => {
            const isActive = item.paths.includes(location.pathname);
            return (
              <Link key={item.to} to={item.to} style={linkStyle(isActive)}>
                {item.label}
              </Link>
            );
          })}

          <Link
            to="/add-patient"
            style={{
              color: "#fff",
              textDecoration: "none",
              fontWeight: 800,
              background: "linear-gradient(135deg, #66d7d4 0%, #4aa7ff 100%)",
              padding: "10px 16px",
              borderRadius: "12px",
              boxShadow: "0 10px 18px rgba(74, 167, 255, 0.28)",
            }}
          >
            + Add Patient
          </Link>
          <details style={{ position: "relative" }}>
            <summary style={{ ...linkStyle(["/add-role", "/add-department", "/add-user"].includes(location.pathname)), cursor: "pointer", listStyle: "none" }}>
              Setup <span aria-hidden="true">⌄</span>
            </summary>
            <div style={{ position: "absolute", zIndex: 5, right: 0, top: "calc(100% + 8px)", minWidth: "180px", display: "grid", gap: "4px", padding: "8px", borderRadius: "14px", background: "#fff", boxShadow: "0 16px 32px rgba(12, 38, 58, 0.18)" }}>
              {[
                { to: "/add-user", label: "Add user" },
                { to: "/add-role", label: "Add role" },
                { to: "/add-department", label: "Add department" },
              ].map((item) => (
                <Link key={item.to} to={item.to} style={{ color: "#12304a", padding: "10px 12px", borderRadius: "8px", textDecoration: "none", fontWeight: 700 }}>
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;