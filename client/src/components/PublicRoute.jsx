import React from "react";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {
  // Check if recruiter is already logged in (for example stored token)
  const token = localStorage.getItem("token");

  if (token) {
    // Already logged in → redirect to home
    return <Navigate to="/" replace />;
  }

  return children;
};

export default PublicRoute;
