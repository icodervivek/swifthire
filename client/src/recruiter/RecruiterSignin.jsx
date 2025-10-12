import Footer from "../components/Footer";
import RecruiterNav from "./RecruiterNav";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import cors from "cors"

const RecruiterSignin = () => {
  const [formData, setFormData] = useState({
    recruiter_email: "",
    recruiter_password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/recruiter/signin", formData);

      // Show success toast
      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
      });

      console.log("Recruiter Logged In:", res.data.recruiter);

      // Optionally save token in localStorage
      if (res.data.token) {
        localStorage.setItem("recruiterToken", res.data.token);
      }

      // Navigate to recruiter dashboard after 2s
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
    }
  };

  // Common input style
  const inputClass =
    "w-full h-11 text-base border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-[#1E4633] outline-none";

  return (
    <div className="flex flex-col min-h-screen tracking-tightest font-sans">
      <RecruiterNav />

      <main className="flex-grow flex items-center justify-center py-12 px-6 sm:px-8">
        <motion.div
          className="max-w-md w-full bg-[#252731] rounded-2xl shadow-lg p-8 text-white"
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
            Recruiter Login
          </motion.h2>

          <motion.p
            className="text-center mb-8 text-gray-200"
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
              <label className="block text-sm font-semibold mb-1">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="recruiter_password"
                  value={formData.recruiter_password}
                  onChange={handleChange}
                  required
                  className={`${inputClass} pr-10`}
                  placeholder="Enter your password"
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
            >
              <motion.button
                type="submit"
                className="bg-white text-black cursor-pointer rounded-full px-8 py-3 font-semibold hover:bg-gray-200 transition"
                whileHover={{ backgroundColor: "#e5e5e5" }}
              >
                Sign In
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default RecruiterSignin;
