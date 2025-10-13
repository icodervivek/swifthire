import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { motion } from "framer-motion";

const JobSeeker = () => {
  const [seekers, setSeekers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch job seekers when component loads
  useEffect(() => {
    const fetchSeekers = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/job-seekers`);
        setSeekers(response.data);
      } catch (error) {
        console.error("Error fetching job seekers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeekers();
  }, []);

  // Framer Motion variants
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="mt-5 flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 tracking-wider">
        {/* Top Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gray-100 p-12 rounded-xl shadow-lg mx-auto my-12"
        >
          <p className="text-3xl font-extrabold mb-6 text-gray-800">
            Explore Top Talent Instantly
          </p>
          <p className="text-gray-800 mb-6">
            Browse skilled professionals ready to join your team immediately.
          </p>
        </motion.div>

        <motion.h2
          className="text-4xl font-extrabold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Available Job Seekers 👩‍💼👨‍🔧
        </motion.h2>

        {loading ? (
          <div className="text-center text-gray-600 text-lg">Loading...</div>
        ) : seekers.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No job seekers found.
          </div>
        ) : (
          <div className="scroll-horizontal overflow-x-auto py-6">
            <div className="flex gap-6 min-w-max">
              {seekers.map((seeker, index) => (
                <motion.div
                  key={seeker.id}
                  className="bg-gray-900 text-white rounded-3xl shadow-lg p-6 min-w-[280px] hover:scale-105 transition-transform duration-300 flex-shrink-0"
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-2xl font-bold mb-2">{seeker.full_name}</h3>
                  <p className="text-gray-300">
                    <strong>Age:</strong> {seeker.age}
                  </p>
                  <p className="text-gray-300">
                    <strong>City:</strong> {seeker.city}
                  </p>
                  <p className="text-gray-300">
                    <strong>Mobile:</strong> {seeker.mobile_number}
                  </p>
                  <p className="text-gray-300">
                    <strong>Email:</strong> {seeker.email_address}
                  </p>
                  <p className="text-gray-300">
                    <strong>Experience:</strong> {seeker.work_experience}
                  </p>
                  <p className="text-gray-300">
                    <strong>Designation:</strong> {seeker.designation}
                  </p>
                  <p
                    className={`mt-3 font-semibold ${
                      seeker.immediate_joiner ? "text-green-500" : "text-yellow-400"
                    }`}
                  >
                    {seeker.immediate_joiner
                      ? "✅ Immediate Joiner"
                      : "⏳ Not Immediate"}
                  </p>
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

export default JobSeeker;
