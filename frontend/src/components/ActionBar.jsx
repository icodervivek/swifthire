import React from "react";

const ActionBar = () => {
  return (
    <>
      <div className="action-bar container p-5 text-center rounded">
        <h1 className="mt-3">Start Hiring or Working Today!</h1>
        <p className="mt-4">
          Whether you need help or want to offer it — Swift Hire makes it
          simple.
        </p>
        <p>Post a Job | Find Work | Sign Up Free</p>
        <button className="btn mt-3 text-black" style={{backgroundColor: "#f0ead2"}}>Sign Up Now</button>
      </div>
    </>
  );
};

export default ActionBar;
