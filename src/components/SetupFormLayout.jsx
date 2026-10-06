import { Link } from "react-router-dom";

function SetupFormLayout({ eyebrow, title, description, backTo, backLabel, children }) {
  return (
    <main className="hms-setup-page">
      <header className="hms-setup-header">
        <div>
          <p className="hms-setup-eyebrow">{eyebrow}</p>
          <h1 className="hms-setup-title">{title}</h1>
          <p className="hms-setup-description">{description}</p>
        </div>
        <Link className="hms-setup-back" to={backTo}>{backLabel}</Link>
      </header>
      <section className="hms-setup-card">
        {children}
      </section>
    </main>
  );
}

export default SetupFormLayout;
