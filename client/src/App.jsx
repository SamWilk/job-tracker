import { Routes, Route } from "react-router-dom";
import NavBar from "./components/navbar/navbar";
import SignupPage from "./components/signup/signup";
import LandingPage from "./components/landingpage/landingpage";
import NotFound from "./components/notFound/notFound";
import LoginPage from "./components/login/login";

export default function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} />
        {/* <Route path="/home" element={<HomePage />} /> */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
