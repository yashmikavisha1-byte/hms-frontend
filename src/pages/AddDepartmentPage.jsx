import { useState } from "react";
import { Link } from "react-router-dom";
import SetupFormLayout from "../components/SetupFormLayout";
import { createDepartment } from "../services/api";

const initialForm = { departmentName: "", description: "" };

function AddDepartmentPage() {
  const [form, setForm] = useState(initialForm);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = {
      departmentName: form.departmentName.trim(),
      description: form.description.trim(),
    };
    if (!payload.departmentName) return;

    setMessage("");
    setIsSubmitting(true);
    try {
      const response = await createDepartment(payload);
      setMessage(`Department “${response.data?.departmentName || payload.departmentName}” created successfully.`);
      setMessageType("success");
      setForm(initialForm);
    } catch (error) {
      console.error("Failed to create department:", error);
      const detail = error.response?.data?.message || error.response?.data;
      setMessage(typeof detail === "string" ? detail : "Could not create the department. Please try again.");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (event) => {
    setForm((current) => ({ ...current, [event.target.name]: event.target.value }));
    setMessage("");
  };

  return (
    <SetupFormLayout
      eyebrow="Hospital setup"
      title="Add a department"
      description="Organize your care teams by creating a department."
      backTo="/doctors"
      backLabel="View doctors"
    >
      {message && (
        <p className={`hms-setup-alert${messageType === "error" ? " hms-setup-alert-error" : ""}`} role={messageType === "error" ? "alert" : "status"}>
          {message}
        </p>
      )}
      <form className="hms-setup-form" onSubmit={handleSubmit}>
        <label className="hms-setup-field hms-setup-field-wide" htmlFor="departmentName">
          Department name
          <input
            id="departmentName"
            name="departmentName"
            value={form.departmentName}
            onChange={handleChange}
            placeholder="e.g. Cardiology"
            maxLength={100}
            required
          />
        </label>
        <label className="hms-setup-field hms-setup-field-wide" htmlFor="description">
          Description <span style={{ fontWeight: 400 }}>(optional)</span>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="What this department cares for"
            maxLength={500}
          />
        </label>
        <div className="hms-setup-actions">
          <Link to="/add-doctor" className="hms-setup-button hms-setup-button-secondary" style={{ display: "inline-flex", alignItems: "center", textDecoration: "none" }}>
            Add a doctor
          </Link>
          <button className="hms-setup-button" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving…" : "Create department"}
          </button>
        </div>
      </form>
    </SetupFormLayout>
  );
}

export default AddDepartmentPage;
