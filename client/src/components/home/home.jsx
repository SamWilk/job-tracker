import "./home.css";
import { useAuthCheck } from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export default function HomePage({ authenticated }) {
  const { loading, user } = useAuthCheck();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !authenticated) {
      navigate("/login");
    }
  }, [loading, authenticated, navigate]);

  if (!authenticated) return null;

  return (
    <main className="home-page">
      <div className="home-container">
        <h1 className="home-title">Welcome, {user?.username || "User"} 👋</h1>
        <p className="home-subtitle">
          Glad to have you back! Here’s a quick look at your account.
        </p>

        <div className="home-buttons">
          <button
            className="btn btn-primary"
            onClick={() => navigate("/applications")}
          >
            View Applications
          </button>
        </div>

        <section className="home-features">
          <div className="home-card">
            <div className="home-card-content">
              <h2 className="home-card-title">Profile</h2>
              <p className="home-card-text">Email: {user?.email}</p>
              <p className="home-card-text">
                Status: {user?.is_validated ? "Verified ✅" : "Not Verified ❌"}
              </p>
            </div>
            {user?.is_validated ? undefined : (
              <button disabled={true} className="btn btn-primary email">
                <span>Verify Email</span> <span>(Coming soon)</span>
              </button>
            )}
          </div>

          <div className="home-card">
            <div className="home-card-content">
              <h2 className="home-card-title">Quick Actions</h2>
              <p className="home-card-text">Access things quickly here.</p>
            </div>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/settings")}
            >
              Settings
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
