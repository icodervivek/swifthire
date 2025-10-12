import React from "react";

const HeroSection = () => {
  return (
    <section className="dotted-svg py-10 px-4 sm:px-6 lg:px-12">
      <div className="card-section text-center rounded-2xl border border-[#57c785] p-6 sm:p-10 md:p-16 lg:p-20 bg-[#0b0b0b]/40 backdrop-blur-md">
        {/* Title */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-[#e6e6e6] mb-10 font-extrabold font-sans tracking-tight leading-tight">
          Select a <span className="text-[#57c785]">Category</span>
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-10 md:gap-16 lg:gap-20 place-items-center">
          {/* Full Time */}
          <div className="card cursor-pointer hover:scale-105 transition-transform duration-300 text-center">
            <img
              className="w-28 sm:w-32 md:w-40 mb-4 mx-auto card-image"
              src="fulltime.png"
              alt="Full Time Job"
            />
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#f1f1f1] tracking-wide">
              Full Time Job
            </h3>
          </div>

          {/* Part Time */}
          <div className="card cursor-pointer hover:scale-105 transition-transform duration-300 text-center">
            <img
              className="w-28 sm:w-32 md:w-40 mb-4 mx-auto card-image"
              src="parttime.png"
              alt="Part Time Job"
            />
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#f1f1f1] tracking-wide">
              Part Time Job
            </h3>
          </div>

          {/* Work From Home */}
          <div className="card cursor-pointer hover:scale-105 transition-transform duration-300 text-center">
            <img
              className="w-28 sm:w-32 md:w-40 mb-4 mx-auto card-image"
              src="wfh.png"
              alt="Work From Home"
            />
            <h3 className="text-lg sm:text-xl md:text-2xl font-semibold text-[#f1f1f1] tracking-wide">
              Work From Home
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
