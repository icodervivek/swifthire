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
import HiringCompanies from "./HiringCompanies.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UploadResume from "./UploadResume.jsx";
import RecruiterHome from "./recruiter/RecruiterHome.jsx";
import RecruiterSignup from "./recruiter/RecruiterSignup.jsx";
import RecruiterSignin from "./recruiter/RecruiterSignin.jsx";
import ProtectedRecruiterRoute from "./recruiter/ProtectedRecruiterRoute.jsx";
import PostJob from "./recruiter/PostJob.jsx";
import PublicRecruiterRoute from "./recruiter/PublicRecruiterRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";
import ManageCandidate from "./recruiter/ManageCandidate.jsx";
import JobAnalytics from "./recruiter/JobAnalytics.jsx";
import NotFound from "./components/NotFound.jsx"; // import the 404 page

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        ></Route>
        <Route
          path="/signin"
          element={
            <PublicRoute>
              <Signin />
            </PublicRoute>
          }
        ></Route>
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
        <Route
          path="/recruiter/job-analytics"
          element={
            <ProtectedRecruiterRoute>
              <JobAnalytics />
            </ProtectedRecruiterRoute>
          }
        ></Route>

        <Route
          path="/recruiter/signup"
          element={
            <PublicRecruiterRoute>
              <RecruiterSignup />
            </PublicRecruiterRoute>
          }
        ></Route>
        <Route
          path="/recruiter/signin"
          element={
            <PublicRecruiterRoute>
              <RecruiterSignin />
            </PublicRecruiterRoute>
          }
        ></Route>
        <Route
          path="/recruiter/manage-candidate"
          element={
            <ProtectedRecruiterRoute>
              <ManageCandidate />
            </ProtectedRecruiterRoute>
          }
        ></Route>
     
        <Route path="/find-job" element={<HiringCompanies />} />
        <Route
          path="/find-job/upload-resume"
          element={
              <UploadResume />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
