import "./home.css";
import { useAuthCheck } from "../../hooks/auth/useAuth";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const { loading, authenticated } = useAuthCheck();
  const Navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (!authenticated) {
    Navigate("/login");
  }

  return <div>Home</div>;
}
