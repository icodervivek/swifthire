import React from "react";
import { Briefcase, Users, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section className="dotted-svg py-10 px-4 sm:px-6 lg:px-12">
      <div className="card-section text-center rounded-2xl border border-[#57c785] p-6 sm:p-10 md:p-16 lg:p-20 bg-[#0b0b0b]/40 backdrop-blur-md">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#e6e6e6] mb-10 font-extrabold font-sans tracking-tight leading-tight">
          What would you like to <span className="text-[#57c785]">do?</span>
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-16 lg:gap-20 place-items-center">
          {/* Find Job */}
          <motion.div
            className="card cursor-pointer hover:scale-105 transition-transform duration-300 text-center"
            custom={0}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Briefcase className="w-16 h-16 mb-4 mx-auto text-[#57c785]" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#f1f1f1] tracking-wide">
              Find Job
            </h3>
          </motion.div>

          {/* Hire Job Seeker */}
          <motion.div
            className="card cursor-pointer hover:scale-105 transition-transform duration-300 text-center"
            custom={1}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Users className="w-16 h-16 mb-4 mx-auto text-[#57c785]" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#f1f1f1] tracking-wide">
              Hire Job Seeker
            </h3>
          </motion.div>

          {/* Get AI Job Recommendation */}
          <motion.div
            className="card cursor-pointer hover:scale-105 transition-transform duration-300 text-center"
            custom={2}
            initial="hidden"
            animate="visible"
            variants={cardVariants}
          >
            <Cpu className="w-16 h-16 mb-4 mx-auto text-[#57c785]" />
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#f1f1f1] tracking-wide">
              Get AI Job Recommendation
            </h3>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
