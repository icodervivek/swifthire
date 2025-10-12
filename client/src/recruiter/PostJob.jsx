import Footer from "../components/Footer";
import RecruiterNav from "./RecruiterNav";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

const PostJob = () => {
  const [companyName, setCompanyName] = useState("");

  const [formData, setFormData] = useState({
    company_name: "",
    industry: "",
    city: "",
    contact_email: "",
    phone_number: "",
    open_positions: "",
    hiring_for: "",
    immediate_hiring: "no",
  });

  const navigate = useNavigate();

  // ✅ Fetch company name from backend on mount
  useEffect(() => {
    const fetchCompanyName = async () => {
      try {
        const token = localStorage.getItem("recruiterToken");
        if (!token) return console.error("No token in localStorage");

        const res = await axios.get("http://localhost:3000/recruiter/company", {
          headers: { Authorization: `Bearer ${token}` }, // ✅ correct format
        });
        setCompanyName(res.data.company_name);
        setFormData((prev) => ({
          ...prev,
          company_name: res.data.company_name,
        }));
      } catch (err) {
        console.error(
          "Error fetching company name:",
          err.response?.data || err.message
        );
      }
    };

    fetchCompanyName();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("recruiterToken");

      const res = await axios.post("http://localhost:3000/recruiter/jobs", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      toast.success(res.data.message, {
        position: "top-right",
        autoClose: 2000,
      });

      setFormData((prev) => ({
        ...prev,
        industry: "",
        city: "",
        contact_email: "",
        phone_number: "",
        open_positions: "",
        hiring_for: "",
        immediate_hiring: "no",
      }));

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

  const inputClass =
    "w-full h-11 text-base border border-gray-300 rounded-lg px-4 focus:ring-2 focus:ring-[#1E4633] outline-none";

  return (
    <div className="flex flex-col min-h-screen tracking-tightest font-sans">
      <RecruiterNav />

      <main className="flex-grow flex items-center justify-center py-12 px-6 sm:px-8">
        <motion.div
          className="max-w-2xl w-full bg-[#252731] rounded-2xl shadow-lg p-8 text-white"
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
            Post a Job
          </motion.h2>

          <motion.form
            onSubmit={handleSubmit}
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Company Name
                </label>
                <input
                  type="text"
                  name="company_name"
                  value={formData.company_name}
                  onChange={handleChange}
                  className={`${inputClass} bg-gray-700 cursor-not-allowed`}
                  disabled // ✅ Make it read-only
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Industry
                </label>
                <input
                  type="text"
                  name="industry"
                  value={formData.industry}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            {/* Other fields remain unchanged */}
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-1">City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Contact Email
                </label>
                <input
                  type="email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-semibold mb-1">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleChange}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-1">
                  Open Positions
                </label>
                <input
                  type="number"
                  name="open_positions"
                  value={formData.open_positions}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Hiring For
              </label>
              <input
                type="text"
                name="hiring_for"
                value={formData.hiring_for}
                onChange={handleChange}
                required
                className={inputClass}
              />
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1">
                Immediate Hiring
              </label>
              <select
                name="immediate_hiring"
                value={formData.immediate_hiring}
                onChange={handleChange}
                required
                className={`${inputClass} bg-[#252731] text-white`}
              >
                <option value="yes">Yes</option>
                <option value="no">No</option>
              </select>
            </div>

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
                Post Job
              </motion.button>
            </motion.div>
          </motion.form>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default PostJob;
