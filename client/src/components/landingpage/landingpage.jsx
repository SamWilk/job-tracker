import { Link } from "react-router-dom";
import "./landingpage.css";

export default function LandingPage() {
  return (
    <main className="landing-page">
      <div className="landing-container">
        <h1 className="landing-title">Your Job Hunt, Organized.</h1>
        <p className="landing-subtitle">
          JobTrackr is the simple, powerful way to keep track of all your job
          applications in one place. Stay on top of deadlines, monitor
          application statuses, and never lose track of an opportunity again.
        </p>

        <div className="landing-buttons">
          <Link to="/signup" className="btn btn-primary">
            Get Started
          </Link>
          <Link to="/learn-more" className="btn btn-secondary">
            Learn More
          </Link>
        </div>

        <section className="features">
          <Feature
            title="Track Applications"
            text="Log details for every job you apply to, including company name, role, salary, and application date."
          />
          <Feature
            title="Stay Organized"
            text="Sort and filter your applications by status, company, and priority to focus your efforts."
          />
          <Feature
            title="Never Miss a Deadline"
            text="Get reminders for interviews, follow-ups, and important hiring dates."
          />
        </section>
      </div>
    </main>
  );
}

function Feature({ title, text }) {
  return (
    <div className="feature-card">
      <h3 className="feature-title">{title}</h3>
      <p className="feature-text">{text}</p>
    </div>
  );
}
