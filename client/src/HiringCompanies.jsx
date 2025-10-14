import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, Briefcase, Clock } from "lucide-react"; // ✅ Import icons
import { toast, Bounce } from "react-toastify";
import Search from "./components/Search";
import { useLocation } from "react-router-dom";

const HiringCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const queryFromUrl = searchParams.get("search") || "";

  const [searchQuery, setSearchQuery] = useState(queryFromUrl);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCompaniesAndAppliedJobs = async () => {
      try {
        document.title = "Find Jobs - SwiftHire";
        const jobsRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/recruiter/jobs`
        );
        setCompanies(jobsRes.data.data);

        const token = localStorage.getItem("token");
        const appliedRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/applied-jobs`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const appliedJobIds = appliedRes.data.appliedJobs.map(
          (job) => job.job_id
        );
        setAppliedJobs(appliedJobIds);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompaniesAndAppliedJobs();
  }, []);

 useEffect(() => {
  const fetchCompanies = async () => {
    try {
      setLoading(true);
      const url = `${import.meta.env.VITE_API_URL}/recruiter/jobs`;

      // Always call API — if searchQuery is empty, show all jobs
      const res = await axios.get(url, {
        params: searchQuery ? { search: searchQuery } : {},
      });

      setCompanies(res.data.data || []);
    } catch (err) {
      console.error("Error fetching companies:", err);
      setCompanies([]);
    } finally {
      setLoading(false);
    }
  };

  fetchCompanies();
}, [searchQuery]);




  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/apply/${jobId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Application submitted!", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });

      setAppliedJobs((prev) => [...prev, jobId]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 mt-15 tracking-wider">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gray-800 p-12 rounded-xl shadow-lg mx-auto my-10"
        >
          <p className="text-3xl font-extrabold mb-6 text-white">
            Discover Your Perfect Job with AI
          </p>
          <Link to="/find-job/upload-resume">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-gradient-to-r from-[#2a7b9b] to-[#57c785] text-white font-semibold px-8 py-3 rounded-full shadow-lg transition-transform cursor-pointer"
            >
              Check Now
            </motion.button>
          </Link>
        </motion.div>
      </div>

     <div className="flex-grow container px-4 sm:px-6 lg:px-8 tracking-wider mx-auto">
  <Search
    initialQuery={searchQuery}
    onSearch={(q) => setSearchQuery(q)}
  />

  <motion.h2
    className="text-4xl font-extrabold text-center mt-10 mb-10"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 0.2, duration: 0.6 }}
  >
    Companies Ready to Hire
  </motion.h2>

  {loading ? (
    <div className="text-center text-gray-600 text-lg">Loading...</div>
  ) : companies.length === 0 ? (
    <div className="text-center text-gray-600 text-lg">
      No hiring companies found.
    </div>
  ) : (
    <div className="py-6 flex justify-center">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 justify-center">
        {companies.map((company, index) => (
          <motion.div
            key={company.job_id}
            className="bg-gray-900 text-white rounded-3xl shadow-lg p-8 flex flex-col justify-between hover:scale-105 transition-transform duration-300"
            custom={index}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            whileHover={{ scale: 1.05 }}
            style={{ minHeight: "380px" }} // consistent height
          >
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-3 text-white">
                {company.company_name}
              </h3>
              <p className="text-gray-300 text-sm md:text-base flex items-center gap-2 mb-1">
                <Building2 size={18} /> {company.industry}
              </p>
              <p className="text-gray-300 text-sm md:text-base flex items-center gap-2 mb-1">
                <Building2 size={18} /> {company.city}
              </p>
              <p className="text-gray-300 text-sm md:text-base flex items-center gap-2 mb-1">
                <Briefcase size={18} /> {company.contact_email}
              </p>
              <p className="text-gray-300 text-sm md:text-base flex items-center gap-2 mb-1">
                <Briefcase size={18} /> {company.phone_number}
              </p>
              <p className="text-gray-300 text-sm md:text-base flex items-center gap-2 mb-1">
                <Briefcase size={18} /> Open Positions: {company.open_positions}
              </p>
              <p className="text-gray-300 text-sm md:text-base flex items-center gap-2 mb-3">
                <Briefcase size={18} /> Hiring For: {company.hiring_for}
              </p>
            </div>

            <div className="flex items-center justify-between mt-4 gap-4 flex-wrap">
              <p
                className={`font-semibold flex items-center gap-2 text-sm md:text-base text-ellipsis overflow-hidden whitespace-normal ${
                  company.immediate_hiring
                    ? "text-green-500"
                    : "text-yellow-400"
                }`}
                style={{ flex: 1, minWidth: "0" }}
              >
                {company.immediate_hiring ? (
                  <>
                    <Briefcase size={16} /> Immediate Hiring
                  </>
                ) : (
                  <>
                    <Clock size={16} /> Hiring Soon
                  </>
                )}
              </p>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  const token = localStorage.getItem("token");
                  if (token) {
                    handleApply(company.job_id);
                  } else {
                    navigate("/signin");
                  }
                }}
                disabled={appliedJobs.includes(company.job_id)}
                className={`font-semibold px-5 py-3 rounded-full text-sm shadow-md text-center flex-shrink-0 ${
                  appliedJobs.includes(company.job_id)
                    ? "bg-gray-600 text-white cursor-not-allowed"
                    : "bg-green-600 text-white cursor-pointer hover:opacity-90"
                }`}
              >
                {appliedJobs.includes(company.job_id) ? "Applied" : "Apply Now"}
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )}
</div>


      <Footer />
    </div>
  );
};

export default HiringCompanies;
