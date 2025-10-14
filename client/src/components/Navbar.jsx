import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isRecruiter, setIsRecruiter] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const recruiterToken = localStorage.getItem("recruiterToken");

    setIsAuthenticated(!!token);
    setIsRecruiter(!!recruiterToken); // ✅ recruiter login check
  }, []);

  const navigate = useNavigate();
  const location = useLocation();

  // ✅ Check authentication state on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, []);

  // ✅ Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    toast.info("Signed out successfully !", {
      position: "top-center",
      autoClose: 1500,
      transition: Bounce,
    });
    setTimeout(() => navigate("/"), 1500);
  };

  // ✅ Active link styling
  const getActiveClass = (path) =>
    location.pathname === path
      ? "text-[#57c785] font-semibold"
      : "text-gray-300 hover:text-[#57c785]";

  return (
    <nav className="bg-[#0b0b0b]/90 backdrop-blur-md fixed top-0 left-0 right-0 z-50 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-[#57c785]">
          SwiftHire
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <ul className="flex items-center gap-6 text-sm font-medium">
            <li>
              <Link to="/about" className={getActiveClass("/about")}>
                About
              </Link>
            </li>
            <li>
              <Link to="/contact" className={getActiveClass("/contact")}>
                Contact
              </Link>
            </li>
          </ul>

          {/* Auth Buttons */}
          {/* Auth Buttons */}
          <div className="flex items-center gap-3 ml-6">
            {!isAuthenticated && !isRecruiter ? (
              <>
                <Link to="/signin">
                  <button className="px-5 py-2 rounded-full bg-[#73248b] hover:bg-[#5b1b70] transition text-white font-medium shadow-md hover:shadow-lg cursor-pointer">
                    Candidate Sign In
                  </button>
                </Link>

                <Link to={isRecruiter ? "/recruiter" : "/recruiter/signin"}>
                  <button className="px-5 py-2 rounded-full bg-[#1E4633] hover:bg-[#163528] transition text-white font-medium shadow-md hover:shadow-lg cursor-pointer">
                    {isRecruiter ? "Dashboard" : "Recruiter Sign In"}
                  </button>
                </Link>
              </>
            ) : isAuthenticated ? (
              <>
                <Link to="/profile">
                  <button className="px-5 py-2 rounded-full bg-[#1E4633] hover:bg-[#163528] transition text-white font-medium shadow-md hover:shadow-lg cursor-pointer">
                    Profile
                  </button>
                </Link>
                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 transition text-white font-medium shadow-md hover:shadow-lg cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : isRecruiter ? (
              <Link to="/recruiter">
                <button className="px-5 py-2 rounded-full bg-[#1E4633] hover:bg-[#163528] transition text-white font-medium shadow-md hover:shadow-lg cursor-pointer">
                  Dashboard
                </button>
              </Link>
            ) : null}
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-white"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      <div
        className={`md:hidden bg-[#0b0b0b]/95 backdrop-blur-md border-t border-gray-800 transition-all duration-300 overflow-hidden ${
          isMenuOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="flex flex-col gap-4 px-6 py-4 text-sm font-medium text-gray-300">
          <li>
            <Link
              to="/about"
              className={getActiveClass("/about")}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={getActiveClass("/contact")}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact Us
            </Link>
          </li>
        </ul>

        {/* Mobile Auth Buttons */}
        <div className="flex flex-col gap-3 px-6 pb-6">
          {!isAuthenticated ? (
            <>
              <Link to="/signin" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full px-5 py-2 rounded-full bg-[#73248b] hover:bg-[#5b1b70] transition text-white font-medium cursor-pointer">
                  User Sign In
                </button>
              </Link>
              <Link to="/recruiter/signin" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full px-5 py-2 rounded-full bg-[#1E4633] hover:bg-[#163528] transition text-white font-medium cursor-pointer">
                  Recruiter Sign In
                </button>
              </Link>
            </>
          ) : (
            <>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full px-5 py-2 rounded-full bg-[#1E4633] hover:bg-[#163528] transition text-white font-medium cursor-pointer">
                  Profile
                </button>
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMenuOpen(false);
                }}
                className="w-full px-5 py-2 rounded-full bg-red-600 hover:bg-red-700 transition text-white font-medium cursor-pointer"
              >
                Sign Out
              </button>
            </>
          )}
        </div>
      </div>

      <ToastContainer />
    </nav>
  );
};

export default Navbar;
