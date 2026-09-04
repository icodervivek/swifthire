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
    <nav className="text-white px-6 py-4 bg-[#08090a]/80 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/recruiter" className="flex items-center gap-2">
          <span className="text-xl font-extrabold tracking-tight">
            Swift<span className="text-[#8b5cf6]">Hire</span>
          </span>
          <span className="hidden sm:inline text-xs font-semibold uppercase tracking-wider text-[#8b5cf6] bg-[#8b5cf6]/10 border border-[#8b5cf6]/30 rounded-full px-2 py-0.5">
            Recruiter
          </span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <>
              <Link to="/">
                <button className="btn-ghost cursor-pointer px-5 py-2 text-sm">
                  Homepage
                </button>
              </Link>
              <button
                onClick={handleSignOut}
                className="bg-red-500/90 hover:bg-red-500 cursor-pointer text-white rounded-full px-5 py-2 text-sm font-medium transition"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/">
              <button className="btn-ghost cursor-pointer px-5 py-2 text-sm">
                Homepage
              </button>
            </Link>
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
                to="/"
                className="w-full flex justify-center"
              >
                <button className="btn-ghost w-11/12 px-5 py-2 cursor-pointer">
                  Homepage
                </button>
              </Link>
              <button
                onClick={handleSignOut}
                className="w-11/12 bg-red-500/90 hover:bg-red-500 text-white rounded-full px-5 py-2 transition cursor-pointer"
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link
              to="/"
              className="w-full flex justify-center"
            >
              <button className="btn-ghost w-11/12 px-5 py-2 cursor-pointer">
                Homepage
              </button>
            </Link>
          )}
        </div>
      )}
      <ToastContainer theme="dark" />
    </nav>
  );
};

export default RecruiterNav;
