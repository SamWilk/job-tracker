import { useNavigate, Link } from "react-router-dom";
import "./navbar.css";
import { useAuthCheck } from "../../hooks/auth/useAuth";

export default function NavBar() {
  const navigate = useNavigate();
  const { authenticated } = useAuthCheck();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          JobTrackr
        </Link>

        <div className="navbar-spacer" />

        {authenticated ? (
          <button className="navbar-login-btn" aria-label="Sign Out">
            Sign Out
          </button>
        ) : (
          <button
            className="navbar-login-btn"
            onClick={() => navigate("/login")}
            aria-label="Login"
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
}
