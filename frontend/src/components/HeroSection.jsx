import React from "react";
import "animate.css";

const HeroSection = () => {
  return (
    <>
      <div className="hero-section container text-center p-5 mt-5 rounded">
        <div className="row">
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-center">
            <h2>Need Workers Today? Swift Hire!</h2>
            <p>
              Swift Hire connects you with reliable, skilled daily wage laborers
              for all your tasks whether it’s construction, moving, cleaning, or
              any on-site work. Search for a job in minutes, and get workers on
              the ground fast.
            </p>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <img
              src="https://images.unsplash.com/photo-1621905251918-48416bd8575a?q=80&w=1469&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="hero-section-img rounded"
              style={{ width: "80%" }}
              draggable="false"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
