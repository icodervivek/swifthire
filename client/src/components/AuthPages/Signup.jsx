import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state

  useEffect(() => {
    document.title = "Sign Up - SwiftHire";
  }, []);

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start spinner

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signup`,
        { name, email, password },
        { withCredentials: true }
      );

      toast.success(response.data.message || "Signup Successful", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });

      setTimeout(() => navigate("/signin"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup Failed", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    } finally {
      setLoading(false); // ✅ Stop spinner
    }
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="signup-section flex flex-col md:flex-row items-center justify-center px-4 sm:px-6 lg:px-12 py-12 min-h-screen mt-10">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Left Section: Form */}
          <div className="form-section w-full md:w-1/2 max-w-md p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center">Sign Up</h2>
            <form className="flex flex-col gap-4" onSubmit={handleSignup}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* Submit Button */}
              <button
                type="submit"
                className="bg-green-500 hover:bg-green-600 cursor-pointer transition tracking-widest text-white py-3 rounded text-lg flex justify-center items-center gap-2"
                disabled={loading} // ✅ Disable button while loading
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Registering...
                  </>
                ) : (
                  "Register"
                )}
              </button>
            </form>
          </div>

          {/* Right Section: Image */}
          <div className="description-section w-full md:w-1/2 flex justify-center">
            <img src="/signup.svg" alt="Sign Up" className="w-80 md:w-96" />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Signup;
