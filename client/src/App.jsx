import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import SignupPage from "./components/signup/signup";
import LandingPage from "./components/landingpage/landingpage";
import LoginPage from "./components/login/login";
import NotFound from "./components/notFound/notFound";
import HomePage from "./components/home/home";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
