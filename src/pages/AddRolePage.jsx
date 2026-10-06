import { useState } from "react";
import { Link } from "react-router-dom";
import SetupFormLayout from "../components/SetupFormLayout";
import { createRole } from "../services/api";

function AddRolePage() {
  const [roleName, setRoleName] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const normalizedRoleName = roleName.trim().toUpperCase();
    if (!normalizedRoleName) return;

    setMessage("");
    setIsSubmitting(true);
    try {
      const response = await createRole({ roleName: normalizedRoleName });
      setMessage(`Role “${response.data?.roleName || normalizedRoleName}” created successfully.`);
      setMessageType("success");
      setRoleName("");
    } catch (error) {
      console.error("Failed to create role:", error);
      const detail = error.response?.data?.message || error.response?.data;
      setMessage(typeof detail === "string" ? detail : "Could not create the role. Please try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SetupFormLayout
      eyebrow="Access management"
      title="Create a role"
      description="Define a role that can be assigned to a user account."
      backTo="/"
      backLabel="Back to dashboard"
    >
      {message && (
        <p className={`hms-setup-alert${messageType === "error" ? " hms-setup-alert-error" : ""}`} role={messageType === "error" ? "alert" : "status"}>
          {message}
        </p>
      )}
      <form className="hms-setup-form" onSubmit={handleSubmit}>
        <label className="hms-setup-field hms-setup-field-wide" htmlFor="roleName">
          Role name
          <input
            id="roleName"
            name="roleName"
            value={roleName}
            onChange={(event) => {
              setRoleName(event.target.value);
              setMessage("");
            }}
            placeholder="e.g. ADMIN, DOCTOR, NURSE"
            maxLength={60}
            autoComplete="off"
            required
          />
        </label>
        <div className="hms-setup-actions">
          <Link to="/add-user" className="hms-setup-button hms-setup-button-secondary" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
            Manage users
          </Link>
          <button className="hms-setup-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Create role"}
          </button>
        </div>
      </form>
      <p className="hms-setup-help">Role names are saved in uppercase for consistent assignment.</p>
    </SetupFormLayout>
  );
}

export default AddRolePage;
