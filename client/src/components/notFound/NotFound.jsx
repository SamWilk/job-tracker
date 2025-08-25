import { useNavigate } from "react-router-dom";
import "./NotFound.css";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <main className="notfound-container">
      <h1 className="notfound-title">404 - Page Not Found</h1>
      <p className="notfound-text">
        Sorry, the page you are looking for does not exist.
      </p>
      <button
        className="notfound-link"
        onClick={() => navigate(-1)}
        aria-label="Go back to previous page"
      >
        Go back
      </button>
    </main>
  );
}
