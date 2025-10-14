import React, { useState, useEffect } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleSignin = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start spinner
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/signin`,
        { email, password },
        { withCredentials: true }
      );

      localStorage.setItem("token", response.data.token);

      toast.success(response.data.message || "Signin Successful", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });

      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Signin Failed", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    } finally {
      setLoading(false); // ✅ Stop spinner
    }
  };

  useEffect(() => {
    document.title = "Sign In - SwiftHire";
  }, []);

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="signup-section flex flex-col md:flex-row items-center mt-10 justify-center px-4 sm:px-6 lg:px-12 py-12 min-h-screen">
        <div className="w-full max-w-7xl flex flex-col md:flex-row items-center justify-center gap-10">
          {/* Left Section: Form */}
          <div className="form-section w-full md:w-1/2 max-w-md p-8 rounded-lg shadow-md">
            <h2 className="text-3xl font-bold mb-6 text-center text-[#fff]">
              Sign In
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleSignin}>
              <input
                type="email"
                placeholder="Email"
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="submit"
                className="bg-purple-500 hover:bg-purple-600 cursor-pointer transition tracking-widest text-white py-3 rounded text-lg mt-2 w-full flex justify-center items-center gap-2"
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
                    Signing In...
                  </>
                ) : (
                  "Sign In"
                )}
              </button>
            </form>
            <p className="text-center text-gray-400 mt-4">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/signup")}
                className="text-purple-500 font-semibold cursor-pointer hover:underline transition-colors"
              >
                Sign Up Now
              </span>
            </p>
          </div>

          {/* Right Section: Image */}
          <div className="description-section w-full md:w-1/2 flex justify-center">
            <img
              src="/signin.svg"
              alt="Sign In"
              className="w-64 sm:w-80 md:w-96 lg:w-[28rem]"
            />
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Signin;
