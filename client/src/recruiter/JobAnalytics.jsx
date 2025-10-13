import RecruiterNav from "./RecruiterNav";
import Footer from "../components/Footer";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const JobAnalytics = () => {
  const [jobCount, setJobCount] = useState(0);
  const [applicantCount, setApplicantCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        document.title = "Job Analytics"
        const token = localStorage.getItem("recruiterToken");
        if (!token) return;

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/recruiter/job-analytics`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setJobCount(res.data.totalJobs || 0);
        setApplicantCount(res.data.totalApplicants || 0);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  return (
    <div className="flex flex-col min-h-screen tracking-tightest font-sans text-white">
      <RecruiterNav />

      <main className="flex-grow px-6 sm:px-8 py-12">
        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading...</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Total Job Posts */}
            <motion.div
              className="bg-[#111]/70 backdrop-blur-md rounded-2xl p-8 shadow-lg flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
            >
              <h2 className="text-xl text-gray-400 mb-2">Total Job Posts</h2>
              <p className="text-4xl font-bold text-[#57c785]">{jobCount}</p>
            </motion.div>

            {/* Total Unique Applicants */}
            <motion.div
              className="bg-[#111]/70 backdrop-blur-md rounded-2xl p-8 shadow-lg flex flex-col items-center justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ scale: 1.03 }}
            >
              <h2 className="text-xl text-gray-400 mb-2">Total Applicants</h2>
              <p className="text-4xl font-bold text-[#57c785]">{applicantCount}</p>
            </motion.div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default JobAnalytics;
