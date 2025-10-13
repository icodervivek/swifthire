import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecruiterNav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // ✅ Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem("recruiterToken");
    setIsAuthenticated(!!token);
  }, []);

  // ✅ Sign out handler
  const handleSignOut = () => {
    localStorage.removeItem("recruiterToken");
    setIsAuthenticated(false);
    toast.success("Logged out successfully!", { autoClose: 2000 });
    navigate("/recruiter/signin");
  };

  return (
    <nav className="text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-bold">SwiftHire</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {isAuthenticated ? (
            <>
              <Link to="/recruiter">
                <button className="bg-[#0c6b34] cursor-pointer text-white rounded-full px-5 py-2 hover:bg-[#0d8d42] transition">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-[#73248b] cursor-pointer text-white rounded-full px-5 py-2 hover:bg-[#402947] transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link to="/recruiter/signup">
                <button className="bg-[#160a80] cursor-pointer text-white rounded-full px-5 py-2 hover:bg-[#0a14a7] transition">
                  Sign Up
                </button>
              </Link>
              <Link to="/recruiter/signin">
                <button className="bg-[#0c6b34] cursor-pointer text-white rounded-full px-5 py-2 hover:bg-[#0d8d42] transition">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden cursor-pointer"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden mt-4 flex flex-col items-center space-y-3">
          {isAuthenticated ? (
            <>
              <Link
                to="/recruiter"
                className="w-full flex justify-center"
              >
                <button className="w-11/12 bg-[#0c6b34] text-white rounded-full px-5 py-2 hover:bg-[#0d8d42] transition cursor-pointer">
                  Dashboard
                </button>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-11/12 bg-[#73248b] text-white rounded-full px-5 py-2 hover:bg-[#402947] transition cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <>
              <Link
                to="/recruiter/signup"
                className="w-full flex justify-center"
              >
                <button className="w-11/12 bg-[#1E4633] text-white rounded-full px-5 py-2 hover:bg-[#20362c] transition cursor-pointer">
                  Sign Up
                </button>
              </Link>
              <Link
                to="/recruiter/signin"
                className="w-full flex justify-center"
              >
                <button className="w-11/12 bg-[#73248b] text-white rounded-full px-5 py-2 hover:bg-[#402947] transition cursor-pointer">
                  Sign In
                </button>
              </Link>
            </>
          )}
        </div>
      )}
      <ToastContainer />
    </nav>
  );
};

export default RecruiterNav;
