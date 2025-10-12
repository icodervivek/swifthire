import React from "react";
import { motion } from "framer-motion";

const CollageSection = () => {
  return (
    <div className="m-5 p-10 flex flex-col-reverse md:flex-row items-center justify-between gap-6 rounded-xl">
      {/* Text Section */}
      <motion.div
        className="collage-section-header md:w-1/2 text-center md:text-left"
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <h1 className="text-4xl md:text-6xl mt-12 font-extrabold leading-tight text-white">
          Skills Over Resumes, Talent Over Titles.
        </h1>
        <p className="mt-4 text-white text-sm md:text-base">
          We believe that your abilities define your future — not just your degree. SwiftHire focuses on connecting real talent to real opportunities, using data-driven matching and skill-first assessments to level the playing field.
        </p>
      </motion.div>

      {/* Image Section */}
      <motion.div
        className="collage-section-img md:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        <img
          src="collage.png"
          className="rounded w-full max-w-[400px] mx-auto"
          alt="Collage"
        />
      </motion.div>
    </div>
  );
};

export default CollageSection;
