import React from "react";
import { Navigate } from "react-router-dom";

const PublicRecruiterRoute = ({ children }) => {
  // Check if recruiter is already logged in (for example stored token)
  const token = localStorage.getItem("recruiterToken");

  if (token) {
    // Already logged in → redirect to home
    return <Navigate to="/recruiter" replace />;
  }

  return children;
};

export default PublicRecruiterRoute;
