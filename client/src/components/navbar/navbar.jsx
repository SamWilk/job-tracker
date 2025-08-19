import { useNavigate, Link } from "react-router-dom";
import "./navbar.css";

export default function NavBar({ authenticated, logout }) {
  const navigate = useNavigate();

  console.log("Nav Auth:", authenticated);

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          JobTrackr
        </Link>

        <div className="navbar-spacer" />

        {authenticated ? (
          <button
            className="navbar-login-btn"
            aria-label="Sign Out"
            onClick={() => {
              logout();
              navigate("/");
            }}
          >
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
