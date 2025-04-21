import React from "react";

const HowWeWork = () => {
  return (
    <>
      <div className="how-we-work container" id="about">
        <h1 className="text-center rounded">How It Works ?</h1>
        <div className="row">
          <div className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Step 1</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Search a Job
                </h6>
                <hr />
                <p className="card-text">
                  Find the kind of work you need and where. It only takes a few
                  seconds.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Step 2</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Match with Workers
                </h6>
                <hr />
                <p className="card-text">
                  Our system instantly finds available and verified laborers in
                  your area.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            {" "}
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <h5 className="card-title">Step 3</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Hire & Pay
                </h6>
                <hr />
                <p className="card-text">
                  Confirm the hire. Pay by day or project. Rate and review after
                  the job is done.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HowWeWork;
