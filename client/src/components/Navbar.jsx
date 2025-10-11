import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // ✅ Check login state on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token); // true if token exists
  }, []);

  // ✅ Logout handler
  const handleLogout = async () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    navigate("/signin");
  };

  return (
    <nav className="text-white px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/">
          <h1 className="text-2xl font-bold">SwiftHire</h1>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-6 font-medium">
            <li className="hover:text-[#57c785] cursor-pointer">
              <Link to="/about">About Us</Link>
            </li>
            <li className="hover:text-[#57c785] cursor-pointer">
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          <div className="flex gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/signup">
                  <button className="bg-[#1E4633] cursor-pointer text-white rounded-full px-5 py-2 hover:bg-[#20362c] transition">
                    Sign Up
                  </button>
                </Link>
                <Link to="/signin">
                  <button className="bg-[#73248b] cursor-pointer text-white rounded-full px-5 py-2 hover:bg-[#402947] transition">
                    Sign In
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile">
                  <button className="bg-[#1E4633] text-white rounded-full px-5 py-2 hover:bg-[#20362c] transition cursor-pointer">
                    Profile
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white rounded-full px-5 py-2 hover:bg-red-700 transition cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
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
        <div className="md:hidden mt-4 space-y-4">
          <ul className="flex flex-col gap-2 font-medium">
            <li className="hover:text-[#57c785] cursor-pointer">
              <Link to="/about">About Us</Link>
            </li>
            <li className="hover:text-[#57c785] cursor-pointer">
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>

          {/* Mobile Auth Buttons */}
          <div className="flex flex-col gap-3">
            {!isAuthenticated ? (
              <>
                <Link to="/signup">
                  <button className="bg-[#1E4633] text-white rounded-full px-5 py-2 hover:bg-[#20362c] transition cursor-pointer">
                    Sign Up
                  </button>
                </Link>
                <Link to="/signin">
                  <button className="bg-[#73248b] text-white rounded-full px-5 py-2 hover:bg-[#402947] transition cursor-pointer">
                    Sign In
                  </button>
                </Link>
              </>
            ) : (
              <>
                <Link to="/profile">
                  <button className="bg-[#1E4633] text-white rounded-full px-5 py-2 hover:bg-[#20362c] transition cursor-pointer">
                    Profile
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="bg-red-600 text-white rounded-full px-5 py-2 hover:bg-red-700 transition cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
