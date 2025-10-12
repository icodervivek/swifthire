import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Home.jsx";
import Signup from "./components/AuthPages/Signup.jsx";
import Signin from "./components/AuthPages/Signin.jsx";
import Profile from "./components/AuthPages/Profile.jsx";
import Signout from "./components/AuthPages/Signout.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import JobSeeker from "./JobSeeker.jsx";
import HiringCompanies from "./HiringCompanies.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/profile" element={<Profile />}></Route>
        <Route path="/about" element={<About />}></Route>
        <Route path="/contact" element={<Contact />}></Route>
        <Route
          path="/workers"
          element={
            <ProtectedRoute>
              <JobSeeker />
            </ProtectedRoute>
          }
        />
        <Route
          path="/find-job"
          element={
            <ProtectedRoute>
              <HiringCompanies />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
