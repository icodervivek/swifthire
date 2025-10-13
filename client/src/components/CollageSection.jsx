import React from "react";
import { motion } from "framer-motion";

const CollageSection = () => {
  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8, ease: "easeOut" } },
    hover: { scale: 1.05, rotate: 1, transition: { duration: 0.3 } },
  };

  const images = ["job1.png", "job3.png", "job2.png", "job4.png"];

  return (
    <section className="relative py-20 my-10  overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12 px-6 sm:px-10">
        {/* Text Section */}
        <motion.div
          className="md:w-1/2 text-center md:text-left"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={textVariants}
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight mb-6">
            Skills Over <span className="text-[#57c785]">Resumes</span>, Talent Over <span className="text-[#d11c0f]">Titles</span>
          </h1>
          <p className="text-gray-300 text-base sm:text-lg mb-6">
            Your abilities define your future, not just your degree. SwiftHire connects real talent to real opportunities with skill-first assessments and data-driven matching.
          </p>
         
        </motion.div>

        {/* Image Section */}
        <motion.div className="md:w-1/2 grid grid-cols-2 gap-4">
          {images.map((img, index) => (
            <motion.div
              key={index}
              className="overflow-hidden rounded-2xl relative cursor-pointer shadow-2xl"
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              variants={imageVariants}
              viewport={{ once: true }}
            >
              <img
                src={img}
                alt={`Job collage ${index}`}
                className="w-full h-40 sm:h-48 md:h-52 object-cover transform transition duration-500 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent rounded-2xl"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default CollageSection;
