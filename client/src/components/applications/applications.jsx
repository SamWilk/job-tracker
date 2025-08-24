import "./applications.css";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function ApplicationsPage({ authenticated }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (!authenticated) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  if (!authenticated) return null;

  return (
    <main className="applications-page">
      <div className="applications-container">
        <h1 className="applications-title">Your Applications</h1>
        <p className="applications-subtitle">
          Here you can view and manage all your job applications.
        </p>
        <div className="applications-list-empty">
          <p>No applications to display yet.</p>
        </div>
      </div>
    </main>
  );
}
