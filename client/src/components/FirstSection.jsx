import React from "react";
import { Link } from "react-router-dom";

const FirstSection = () => {
  return (
    <div className="first-section mt-10 md:mt-4 flex flex-col items-center justify-center text-center px-6 py-24">
      <h1 className="text-4xl overflow-y-hidden md:text-6xl font-extrabold masked-text leading-tight">
        SwiftHire Makes
        <br />
        <span className="next-level-txt text-[#57c785]">Hiring Easy</span>
      </h1>

      <p className="mt-5 max-w-xl text-[1rem] text-[#a39999]">
        Need help with a task? Find skilled workers in just a few clicks. <br />
        From tech to trades, we’ve got the pros you need & ready to work when
        you are.
      </p>

      <div className="hire-buttons flex flex-row flex-wrap justify-center  mt-4">
        <button className="hirebtn  cursor-pointer job bg-[#1E4633] w-50 text-white px-6 py-2 rounded-full hover:bg-[#20362c]">
          Find a job
        </button>
        <Link to="/workers">
          <button className="hirebtn cursor-pointer  worker bg-[#73248b] w-50 text-white px-6 py-2 rounded-full hover:bg-[#402947]">
            Find a worker
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FirstSection;
