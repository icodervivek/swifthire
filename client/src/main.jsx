import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import Home from "./Home.jsx";
import Signup from "./components/AuthPages/Signup.jsx";
import Signin from "./components/AuthPages/Signin.jsx";
import Profile from "./components/AuthPages/Profile.jsx";
import About from "./components/About.jsx";
import Contact from "./components/Contact.jsx";
import JobSeeker from "./JobSeeker.jsx";
import HiringCompanies from "./HiringCompanies.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UploadResume from "./UploadResume.jsx";
import RecruiterHome from "./recruiter/RecruiterHome.jsx";
import RecruiterSignup from "./recruiter/RecruiterSignup.jsx";
import RecruiterSignin from "./recruiter/RecruiterSignin.jsx";
import ProtectedRecruiterRoute from "./recruiter/ProtectedRecruiterRoute.jsx";
import PostJob from "./recruiter/PostJob.jsx";

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
          path="/recruiter"
          element={
            <ProtectedRecruiterRoute>
              <RecruiterHome />
            </ProtectedRecruiterRoute>
          }
        ></Route>
        <Route
          path="/recruiter/post-job"
          element={
            <ProtectedRecruiterRoute>
              <PostJob />
            </ProtectedRecruiterRoute>
          }
        ></Route>

        <Route path="/recruiter/signup" element={<RecruiterSignup />}></Route>
        <Route path="/recruiter/signin" element={<RecruiterSignin />}></Route>
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
        <Route
          path="/find-job/upload-resume"
          element={
            <ProtectedRoute>
              <UploadResume />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
