import React from "react";

const HeroSection = () => {
  return (
    <div className="dotted-svg py-10 px-4">
      <div className="card-section text-center rounded border border-[#57c785] p-10 md:p-20">
        <h2 className="text-2xl overflow-y-hidden md:text-5xl text-[#d8d3d3] my-5 font-extrabold font-sans">
          Select a category
        </h2>

        <div className="cards flex flex-wrap justify-center items-center gap-10 md:gap-50">
          <div className="card cursor-pointer">
            <img className="w-32 md:w-40 mb-4 mx-auto card-image" src="fulltime.png" alt="Full Time Job" />
            <h3 className="text-xl font-semibold text-white">Full Time Job</h3>
          </div>

          <div className="card cursor-pointer">
            <img className="w-32 md:w-40 mb-4 mx-auto card-image" src="parttime.png" alt="Part Time Job" />
            <h3 className="text-xl font-semibold text-white">Part Time Job</h3>
          </div>

          <div className="card cursor-pointer">
            <img className="w-32 md:w-40 mb-4 mx-auto card-image" src="wfh.png" alt="Work From Home" />
            <h3 className="text-xl font-semibold text-white">Work From Home</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
