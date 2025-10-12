import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import CoverImg from "../../public/cover.jpg"; // adjust path if needed

const FirstSection = () => {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-center overflow-hidden px-2 sm:px-4">

      {/* Blurred background */}
      <div
        className="absolute inset-0 bg-cover bg-center filter blur-2xl scale-110"
        style={{ backgroundImage: `url(${CoverImg})` }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full max-w-[90%] sm:max-w-[85%] md:max-w-3xl lg:max-w-5xl mx-auto"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <motion.h1
          className="text-4xl md:text-4xl lg:text-6xl font-extrabold leading-snug md:leading-tight masked-text break-words"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          SwiftHire Makes
          <br />
          <span className="next-level-txt text-[#57c785]">Hiring Easy</span>
        </motion.h1>

        <motion.p
          className="mt-3 sm:mt-4 md:mt-5 text-sm sm:text-base md:text-lg lg:text-xl text-[#a39999] break-words"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Need help with a task? Find skilled workers in just a few clicks. <br />
          From tech to trades, we’ve got the pros you need & ready to work when
          you are.
        </motion.p>

        <motion.div
          className="hire-buttons flex flex-col sm:flex-row flex-wrap justify-center mt-4 gap-3 sm:gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link to="/find-job">
            <button className="hirebtn cursor-pointer job bg-[#1E4633] text-white px-5 py-3 rounded-full hover:bg-[#20362c] w-full sm:w-auto min-w-[120px]">
              Find a job
            </button>
          </Link>
          <Link to="/workers">
            <button className="hirebtn cursor-pointer worker bg-[#73248b] text-white px-5 py-3 rounded-full hover:bg-[#402947] w-full sm:w-auto min-w-[120px]">
              Hire for job
            </button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default FirstSection;
