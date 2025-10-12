import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const HiringCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch companies when component loads
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/companies");
        setCompanies(response.data.data); // because backend sends { success, data: [...] }
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  // Framer Motion variants for cards
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

      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 tracking-wider">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gray-800 p-12 rounded-xl shadow-lg mx-auto my-12"
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

        <motion.h2
          className="text-4xl font-extrabold text-center mb-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Companies Ready to Hire 🏢💼
        </motion.h2>

        {loading ? (
          <div className="text-center text-gray-600 text-lg">Loading...</div>
        ) : companies.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No hiring companies found.
          </div>
        ) : (
          <div className="scroll-horizontal overflow-x-auto py-6">
            <div className="flex gap-6 min-w-max">
              {companies.map((company, index) => (
                <motion.div
                  key={company.id}
                  className="bg-gray-900 text-white rounded-3xl shadow-lg p-6 min-w-[280px] hover:scale-105 transition-transform duration-300 flex-shrink-0"
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={cardVariants}
                  whileHover={{ scale: 1.05 }}
                >
                  <h3 className="text-2xl font-bold mb-2">
                    {company.company_name}
                  </h3>
                  <p className="text-gray-300">
                    <strong>Industry:</strong> {company.industry}
                  </p>
                  <p className="text-gray-300">
                    <strong>City:</strong> {company.city}
                  </p>
                  <p className="text-gray-300">
                    <strong>Contact:</strong> {company.contact_email}
                  </p>
                  <p className="text-gray-300">
                    <strong>Phone:</strong> {company.phone_number}
                  </p>
                  <p className="text-gray-300">
                    <strong>Open Positions:</strong> {company.open_positions}
                  </p>
                  <p className="text-gray-300">
                    <strong>Hiring For:</strong> {company.hiring_for}
                  </p>
                  <p
                    className={`mt-3 font-semibold ${
                      company.immediate_hiring
                        ? "text-green-500"
                        : "text-yellow-400"
                    }`}
                  >
                    {company.immediate_hiring
                      ? "✅ Immediate Hiring"
                      : "⏳ Hiring Soon"}
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

export default HiringCompanies;
