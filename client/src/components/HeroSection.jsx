import React from "react";
import { Briefcase, Users, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const HeroSection = () => {
  const cardVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.7, ease: "easeOut" },
    }),
    hover: {
      scale: 1.05,
      rotateY: 5,
      rotateX: 5,
      transition: { duration: 0.3, ease: "easeOut" },
    },
  };

  return (
    <section className="py-16 px-6 sm:px-10 lg:px-20 bg-gradient-to-b from-[#0a0a0a] to-[#111111]">
      <div className="text-center max-w-5xl mx-auto mb-14">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white mb-4">
          What would you like to <span className="next-level-txt">do?</span>
        </h2>
        <p className="text-gray-400 text-lg sm:text-xl">
          Choose an option below to find your path. Whether you want to find a job, hire a candidate, or explore AI-based recommendations, we’ve got you covered.
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 place-items-stretch">
        {[{
          icon: <Briefcase className="w-10 h-10 text-white" />,
          title: "Find Job",
          desc: "Browse thousands of opportunities and land your dream job effortlessly."
        }, {
          icon: <Users className="w-10 h-10 text-white" />,
          title: "Hire Job Seeker",
          desc: "Post jobs and connect with verified professionals ready to join your team."
        }, {
          icon: <Cpu className="w-10 h-10 text-white" />,
          title: "AI Job Recommendation",
          desc: "Get personalized job recommendations powered by AI to accelerate your career."
        }].map((card, index) => (
          <motion.div
            key={index}
            className="flex flex-col justify-between w-full p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-[#57c785]/30 shadow-lg cursor-pointer hover:shadow-2xl transition-transform duration-300 text-center min-h-[320px]"
            custom={index}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            variants={cardVariants}
          >
            <div>
              <div className="flex items-center justify-center w-20 h-20 mx-auto rounded-full bg-gradient-to-tr from-[#57c785]/40 to-[#00ffa0]/30 mb-6">
                {card.icon}
              </div>
              <h3 className="text-2xl font-semibold text-white mb-2">{card.title}</h3>
              <p className="text-gray-300 text-sm">{card.desc}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HeroSection;
