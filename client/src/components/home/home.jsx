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

  if (loading) return <p>Loading...</p>;
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
          <button
            className="btn btn-secondary"
            onClick={() => navigate("/profile")}
          >
            Edit Profile
          </button>
        </div>

        <section className="home-features">
          <div className="home-card">
            <h2 className="home-card-title">Profile</h2>
            <p className="home-card-text">Email: {user?.email}</p>
            <p className="home-card-text">
              Status: {user?.is_validated ? "Verified ✅" : "Not Verified ❌"}
            </p>
            {authenticated ? undefined : <button>Verify Email</button>}
          </div>

          <div className="home-card">
            <h2 className="home-card-title">Quick Actions</h2>
            <p className="home-card-text">
              Access your most used features quickly.
            </p>
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
