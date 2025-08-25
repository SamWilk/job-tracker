import { Link } from "react-router-dom";
import "./learnmore.css";

function FeatureSection({ title, description, items }) {
  return (
    <div className="feature-section">
      <h2>{title}</h2>
      <p>{description}</p>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function LearnMore() {
  const features = [
    {
      title: "Streamlined Application Tracking",
      description:
        "Keep all your job applications organized in one centralized location.",
      items: [
        "Track company names, positions, and application dates",
        "Monitor application status from pending to offer",
        "Add notes and URLs for each application",
        "Sort and filter your applications",
      ],
    },
    {
      title: "User-Friendly Interface",
      description:
        "An intuitive design that makes managing your job search effortless.",
      items: [
        "Clean, modern dashboard layout",
        "Easy-to-use forms for adding applications",
        "Quick status updates with a single click",
        "Responsive design for desktop and mobile",
      ],
    },
    {
      title: "Secure & Private",
      description:
        "Your job search data is protected with industry-standard security.",
      items: [
        "Secure user authentication",
        "Encrypted data storage",
        "Personal data privacy",
        "Individual user accounts",
      ],
    },
  ];

  return (
    <main className="learn-more-page">
      <div className="learn-more-container">
        <section className="learn-more-hero">
          <h1>Everything You Need to Know About JobTrackr</h1>
          <p>
            JobTrackr is designed to simplify your job search process by
            providing a comprehensive solution for tracking and managing your
            job applications.
          </p>
        </section>

        <section className="learn-more-features">
          {features.map((feature, index) => (
            <FeatureSection
              key={index}
              title={feature.title}
              description={feature.description}
              items={feature.items}
            />
          ))}
        </section>

        <section className="learn-more-cta">
          <h2>Ready to Get Started?</h2>
          <p>
            Join thousands of job seekers who have streamlined their job search
            with JobTrackr.
          </p>
          <div className="cta-buttons">
            <Link to="/signup" className="btn btn-primary">
              Sign Up Now
            </Link>
            <Link to="/login" className="btn btn-secondary">
              Log In
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
