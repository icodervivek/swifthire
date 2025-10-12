import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AboutSvg from "../../public/about.svg";
import { motion } from "framer-motion";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      {/* Main content */}
      <section className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Left: Image */}
          <motion.div
            className="about-image w-full md:w-1/2 flex justify-center"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <img
              src={AboutSvg}
              alt="About Us"
              className="w-64 sm:w-80 md:w-full max-w-sm md:max-w-md"
            />
          </motion.div>

          {/* Right: Text */}
          <motion.div
            className="about-text w-full md:w-1/2 text-center md:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-6 masked-text leading-tight">
              About SwiftHire
            </h2>
            <p className="text-[#a39999] text-base sm:text-lg mb-4">
              SwiftHire is a platform dedicated to connecting talented individuals with meaningful opportunities. Our mission is to make hiring easy and efficient for both employers and job seekers.
            </p>
            <p className="text-[#a39999] text-base sm:text-lg mb-6">
              Whether you’re looking for a full-time role, part-time job, or freelance project, SwiftHire prioritizes skill and talent over resumes. We leverage data-driven matching and skill-first assessments to ensure the right fit for every opportunity.
            </p>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
