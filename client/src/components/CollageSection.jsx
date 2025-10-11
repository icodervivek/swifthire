import React from "react";

const CollageSection = () => {
  return (
    <div className="m-5 p-10 flex flex-col-reverse md:flex-row items-center justify-between gap-6 rounded-xl">
      {/* Text Section */}
      <div className="collage-section-header md:w-1/2 text-center md:text-left">
        <h1 className="text-4xl md:text-6xl mt-12 font-extrabold leading-tight text-white">
          Skills Over Resumes, Talent Over Titles.
        </h1>
        <p className="mt-4 text-white text-sm md:text-base">
         We believe that your abilities define your future — not just your degree. SwiftHire focuses on connecting real talent to real opportunities, using data-driven matching and skill-first assessments to level the playing field.
        </p>
      </div>

      {/* Image Section */}
      <div className="collage-section-img md:w-1/2">
        <img
          src="collage.png"
          className="rounded w-full max-w-[400px] mx-auto"
          alt="Collage"
        />
      </div>
    </div>
  );
};

export default CollageSection;
