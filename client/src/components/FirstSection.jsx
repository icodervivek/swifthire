import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import CoverImg from "../../public/cover.jpg"; // adjust path if needed
import Search from "./Search";

const FirstSection = () => {
  const navigate = useNavigate();

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-center overflow-hidden px-4 sm:px-6 py-12 md:py-20">
      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-2xl scale-110"
        style={{ backgroundImage: `url(${CoverImg})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/20"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-[90%] sm:max-w-[85%] md:max-w-3xl lg:max-w-5xl mx-auto flex flex-col items-center"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        {/* Heading */}
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-snug md:leading-tight masked-text break-words mt-16 md:mt-20"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          SwiftHire Makes
          <br />
          <span className="next-level-txt text-[#57c785]">Hiring Easy</span>
        </motion.h1>

        {/* Subheading */}
        <motion.p
          className="mt-6 md:mt-8 text-sm sm:text-base md:text-lg lg:text-xl text-[#a39999] break-words max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Need help with a task? Find skilled workers in just a few clicks.
          <br />
          From tech to trades, we’ve got the pros you need & ready to work when
          you are.
        </motion.p>

        {/* Search */}
        <div className="mt-8 md:mt-10 w-full max-w-md">
          <Search
            initialQuery=""
            onSearch={(query) => {
              navigate(`/find-job?search=${encodeURIComponent(query)}`);
            }}
          />
        </div>

        {/* AI Job Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center bg-gray-800 py-16 md:py-20 px-10 rounded-2xl shadow-xl mt-10 mx-auto max-w-xl"
        >
          <p className="text-3xl md:text-4xl font-extrabold mb-6 text-white">
            Discover Your Perfect Job with AI
          </p>
          <Link to="/find-job/upload-resume">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0a803b] text-white font-semibold px-8 md:px-10 py-3 md:py-4 rounded-full shadow-lg transition-transform cursor-pointer"
            >
              Check Now
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FirstSection;
