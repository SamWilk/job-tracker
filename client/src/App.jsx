import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import SignupPage from "./components/signup/signup";
import LandingPage from "./components/landingpage/landingpage";
import LoginPage from "./components/login/login";
import NotFound from "./components/notFound/notFound";
import HomePage from "./components/home/home";
import { useAuthCheck } from "./hooks/auth/useAuth";

export default function App() {
  const { authenticated, recheck, logout } = useAuthCheck();
  return (
    <>
      <NavBar authenticated={authenticated} logout={logout} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage recheck={recheck} />} />
        <Route path="/login" element={<LoginPage recheck={recheck} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
