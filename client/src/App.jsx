import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import SignupPage from "./components/signup/signup";
import LandingPage from "./components/landingpage/landingpage";
import LoginPage from "./components/login/login";
import NotFound from "./components/notFound/notfound";
import HomePage from "./components/home/home";
import ApplicationsPage from "./components/applications/applications";
import LearnMore from "./components/learnmore/learnmore";
import Settings from "./components/settings/settings";
import { useAuthCheck } from "./hooks/auth/useAuth";

export default function App() {
  const { authenticated, recheck, logout } = useAuthCheck();
  return (
    <>
      <NavBar authenticated={authenticated} logout={logout} />
      <Routes>
        <Route
          path="/"
          element={<LandingPage authenticated={authenticated} />}
        />
        <Route path="/signup" element={<SignupPage recheck={recheck} />} />
        <Route
          path="/login"
          element={
            <LoginPage recheck={recheck} authenticated={authenticated} />
          }
        />
        <Route
          path="/home"
          element={<HomePage authenticated={authenticated} />}
        />
        <Route
          path="/applications"
          element={<ApplicationsPage authenticated={authenticated} />}
        />
        <Route path="/learn-more" element={<LearnMore />} />
        <Route path="/settings" element={<Settings logout={logout} />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
