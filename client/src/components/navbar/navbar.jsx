import { useNavigate, Link } from "react-router-dom";
import "./navbar.css";

export default function NavBar() {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          JobTrackr
        </Link>

        <div className="navbar-spacer" />

        <button
          className="navbar-login-btn"
          onClick={() => navigate("/login")}
          aria-label="Login"
        >
          Login
        </button>
      </div>
    </nav>
  );
}
