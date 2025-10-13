import Footer from "../components/Footer";
import RecruiterNav from "./RecruiterNav";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify"; // ✅ Toastify
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom"; // ✅ Navigation
import { useEffect } from "react";

const RecruiterSignup = () => {
  const [formData, setFormData] = useState({
    recruiter_name: "",
    recruiter_email: "",
    recruiter_password: "",
    recruiter_designation: "",
    recruiter_mobile: "",
    organisation_name: "",
    organisation_city: "",
    organisation_type: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // ✅ Initialize navigation

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/recruiter/signup`,
        formData
      );

      toast.success(res.data.message); // ✅ Show success toast

      // Reset form
      setFormData({
        recruiter_name: "",
        recruiter_email: "",
        recruiter_password: "",
        recruiter_designation: "",
        recruiter_mobile: "",
        organisation_name: "",
        organisation_city: "",
        organisation_type: "",
      });

      // Navigate to signin after a short delay
      setTimeout(() => {
        navigate("/recruiter/signin");
      }, 2000); // 2 seconds delay
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message); // ✅ Show error toast
      } else {
        toast.error("Something went wrong. Please try again.");
      }
      console.error(err);
    }
  };

  const inputClass =
    "w-full h-11 text-base border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-[#1E4633] outline-none";


    useEffect(() => {
        document.title = "Recruiter Sign Up - SwiftHire";
      }, []);

  return (
    <div className="flex flex-col min-h-screen tracking-tightest font-sans">
      <RecruiterNav />

      <main className="flex-grow flex items-center justify-center py-12 px-6 sm:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl w-full bg-[#252731] rounded-2xl shadow-lg p-8 text-white"
        >
          <motion.h2
            className="text-3xl font-bold text-center mb-2"
            initial={{ opacity: 0, y: -15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Recruiter Registration
          </motion.h2>

          <motion.p
            className="text-center mb-8 text-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            Join <span className="font-semibold">SwiftHire</span> and start
            posting job openings today!
          </motion.p>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {/* Recruiter Info */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Recruiter Name
                </label>
                <input
                  type="text"
                  name="recruiter_name"
                  value={formData.recruiter_name}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

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
                  minLength="6"
                  placeholder="Enter a strong password"
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

            {/* Other Fields */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Recruiter Designation
                </label>
                <input
                  type="text"
                  name="recruiter_designation"
                  value={formData.recruiter_designation}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Recruiter Mobile Number
                </label>
                <input
                  type="tel"
                  name="recruiter_mobile"
                  value={formData.recruiter_mobile}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Organisation Name
              </label>
              <input
                type="text"
                name="organisation_name"
                value={formData.organisation_name}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Organisation City
                </label>
                <input
                  type="text"
                  name="organisation_city"
                  value={formData.organisation_city}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Organisation Type
                </label>
                <select
                  name="organisation_type"
                  value={formData.organisation_type}
                  onChange={handleChange}
                  required
                  className={`${inputClass} bg-[#252731] text-white`}
                >
                  <option value="">Select Type</option>
                  <option value="Software Development">
                    Software Development
                  </option>
                  <option value="Finance & Banking">Finance & Banking</option>
                  <option value="Education & Training">
                    Education & Training
                  </option>
                  <option value="Healthcare">Healthcare</option>
                  <option value="Construction">Construction</option>
                  <option value="Manufacturing">Manufacturing</option>
                  <option value="Marketing & Advertising">
                    Marketing & Advertising
                  </option>
                  <option value="Other">Other</option>
                </select>
              </div>
            </div>

            {/* Submit Button */}
            <motion.div
              className="text-center"
              style={{ outline: "none" }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.button
                type="submit"
                className="bg-white text-black cursor-pointer rounded-full px-8 py-3 font-semibold hover:bg-gray-200 transition"
                whileHover={{ backgroundColor: "#e5e5e5" }}
                style={{ outline: "none" }}
              >
                Register & Continue
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </main>

      <Footer />
      <ToastContainer position="top-center" autoClose={2000} />
    </div>
  );
};

export default RecruiterSignup;
