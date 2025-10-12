import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRecruiterRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem("recruiterToken"); 

  if (!isAuthenticated) {
    return <Navigate to="/recruiter/signin" replace />;
  }

  return children;
};

export default ProtectedRecruiterRoute;
