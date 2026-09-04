import Footer from "../components/Footer";
import RecruiterNav from "./RecruiterNav";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import cors from "cors";
import { useEffect } from "react";

const RecruiterSignin = () => {
  const [formData, setFormData] = useState({
    recruiter_email: "",
    recruiter_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start spinner

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/recruiter/signin`,
        formData
      );

      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      });

      if (res.data.token) {
        localStorage.setItem("recruiterToken", res.data.token);
      }

      setTimeout(() => {
        navigate("/recruiter");
      }, 2000);
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message, {
          position: "top-right",
          autoClose: 3000,
        });
      } else {
        toast.error("Something went wrong. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
      }
      console.error(err);
    } finally {
      setLoading(false); // ✅ Stop spinner
    }
  };

  // Common input style
  const inputClass = "field field-recruiter w-full h-11 text-base rounded-lg px-4";

  useEffect(() => {
    document.title = "Recruiter Sign In - SwiftHire";
  }, []);

  return (
    <div className="flex flex-col min-h-screen font-sans text-white">
      <RecruiterNav />

      <main className="flex-grow flex items-center justify-center py-12 px-6 sm:px-8">
        <motion.div
          className="glass-card max-w-md w-full rounded-3xl shadow-2xl p-8 text-white"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-2"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Recruiter <span className="text-[#8b5cf6]">Login</span>
          </motion.h2>

          <motion.p
            className="text-center mb-8 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Welcome back to <span className="font-semibold">SwiftHire</span>!
            Please sign in to manage your job postings.
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Recruiter Email
              </label>
              <input
                type="email"
                name="recruiter_email"
                value={formData.recruiter_email}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="recruiter_password"
                  value={formData.recruiter_password}
                  onChange={handleChange}
                  required
                  className={`${inputClass} pr-10`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-gray-300 hover:text-white transition"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.div
              className="text-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              style={{ outline: "none" }}
            >
              <motion.button
                type="submit"
                className="btn-recruiter cursor-pointer px-8 py-3 transition focus:outline-none focus:ring-0"
                disabled={loading} // prevent multiple clicks
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
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
                  </div>
                ) : (
                  "Sign In"
                )}
              </motion.button>
            </motion.div>
            <p className="text-center text-gray-400 mt-4">
              Don't have an account?{" "}
              <span
                onClick={() => navigate("/recruiter/signup")}
                className="text-[#8b5cf6] font-semibold cursor-pointer hover:underline"
              >
                Sign Up Now
              </span>
            </p>
          </motion.form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default RecruiterSignin;
