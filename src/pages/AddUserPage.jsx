import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SetupFormLayout from "../components/SetupFormLayout";
import { createUser, getRoles } from "../services/api";

const initialForm = {
  username: "",
  password: "",
  email: "",
  fullName: "",
  roleId: "",
};

function AddUserPage() {
  const [roles, setRoles] = useState([]);
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loadAttempt, setLoadAttempt] = useState(0);

  useEffect(() => {
    getRoles()
      .then((response) => {
        setRoles(Array.isArray(response.data) ? response.data : []);
      })
      .catch((error) => {
        console.error("Failed to load roles:", error);
        setMessage("Could not load roles. Check the backend connection, then retry.");
        setMessageType("error");
      })
      .finally(() => setIsLoadingRoles(false));
  }, [loadAttempt]);

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setMessage("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setIsSubmitting(true);
    const payload = {
      username: form.username.trim(),
      password: form.password,
      email: form.email.trim(),
      fullName: form.fullName.trim(),
      isActive: true,
      role: { roleId: Number(form.roleId) },
    };

    try {
      const response = await createUser(payload);
      setMessage(`User “${response.data?.fullName || payload.fullName}” created successfully.`);
      setMessageType("success");
      setForm(initialForm);
    } catch (error) {
      console.error("Failed to create user:", error);
      const detail = error.response?.data?.message || error.response?.data;
      setMessage(typeof detail === "string" ? detail : "Could not create the user. Check the details and try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SetupFormLayout
      eyebrow="Access management"
      title="Create a user account"
      description="Add a staff account and assign the appropriate access role."
      backTo="/"
      backLabel="Back to dashboard"
    >
      {message && (
        <div className={`hms-setup-alert${messageType === "error" ? " hms-setup-alert-error" : ""}`} role={messageType === "error" ? "alert" : "status"}>
          {message}
          {isLoadingRoles && <span> Loading roles…</span>}
          {!isLoadingRoles && roles.length === 0 && (
            <>
              {" "}
              <Link to="/add-role">Create a role</Link>
              {" · "}
              <button
                type="button"
                onClick={() => {
                  setMessage("");
                  setIsLoadingRoles(true);
                  setLoadAttempt((attempt) => attempt + 1);
                }}
              >
                Retry
              </button>
            </>
          )}
        </div>
      )}
      {isLoadingRoles && <p className="hms-setup-help" role="status">Loading roles…</p>}
      {!isLoadingRoles && roles.length === 0 && !message && (
        <div className="hms-setup-alert hms-setup-alert-error" role="alert">
          No roles are available yet. <Link to="/add-role">Create a role</Link>, or{" "}
          <button
            type="button"
            onClick={() => {
              setMessage("");
              setIsLoadingRoles(true);
              setLoadAttempt((attempt) => attempt + 1);
            }}
          >
            retry loading roles
          </button>.
        </div>
      )}
      <form className="hms-setup-form" onSubmit={handleSubmit}>
        <label className="hms-setup-field" htmlFor="fullName">
          Full name
          <input id="fullName" name="fullName" value={form.fullName} onChange={handleChange} autoComplete="name" maxLength={120} required />
        </label>
        <label className="hms-setup-field" htmlFor="username">
          Username
          <input id="username" name="username" value={form.username} onChange={handleChange} autoComplete="username" maxLength={80} required />
        </label>
        <label className="hms-setup-field" htmlFor="email">
          Email address
          <input id="email" name="email" type="email" value={form.email} onChange={handleChange} autoComplete="email" maxLength={160} required />
        </label>
        <label className="hms-setup-field" htmlFor="roleId">
          Access role
          <select id="roleId" name="roleId" value={form.roleId} onChange={handleChange} disabled={isLoadingRoles || roles.length === 0} required>
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role.roleId} value={role.roleId}>{role.roleName}</option>
            ))}
          </select>
        </label>
        <label className="hms-setup-field hms-setup-field-wide" htmlFor="password">
          Password
          <input id="password" name="password" type="password" value={form.password} onChange={handleChange} autoComplete="new-password" minLength={8} required />
        </label>
        <div className="hms-setup-actions">
          <Link to="/add-role" className="hms-setup-button hms-setup-button-secondary" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
            Create role
          </Link>
          <button className="hms-setup-button" type="submit" disabled={isSubmitting || isLoadingRoles || roles.length === 0}>
            {isSubmitting ? "Saving…" : "Create user"}
          </button>
        </div>
      </form>
      <p className="hms-setup-help">Choose a password with at least 8 characters. The account will be created as active.</p>
    </SetupFormLayout>
  );
}

export default AddUserPage;
