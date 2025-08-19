import { useNavigate, Link } from "react-router-dom";
import "./navbar.css";

export default function NavBar({ authenticated, logout }) {
  const navigate = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          JobTrackr
        </Link>

        <div className="navbar-spacer" />

        <div className="button-container">
          {" "}
          {authenticated ? (
            <button
              className="navbar-login-btn"
              aria-label="Sign Out"
              onClick={() => {
                navigate("/home");
              }}
            >
              Home
            </button>
          ) : undefined}
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
      </div>
    </nav>
  );
}
