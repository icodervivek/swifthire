import React from "react";
import AakashImg from  "./aakash.jpg"
import SumitImg from "./sumit.png"

const WorkersAll = () => {
  return (
    <>
      <div
        className="workers-all container d-flex justify-content-center"
        id="about"
      >
        <div className="row">
          <div className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <div className="img-container d-flex justify-content-center">
                  <img
                    className="workers-avatar m-2"
                    src="https://avatars.githubusercontent.com/u/39510579?v=4"
                    alt=""
                  />
                </div>
                <h5 className="card-title">Vivek</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Ranchi, Jharkhand
                </h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Fullstack Developer
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <div className="img-container d-flex justify-content-center">
                  <img
                    className="workers-avatar m-2"
                    src={AakashImg}
                    alt=""
                  />
                </div>
                <h5 className="card-title">Aakash Kumar</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Bangalore
                </h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Software Engineer
                </h6>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card" style={{ width: "18rem" }}>
              <div className="card-body">
                <div className="img-container d-flex justify-content-center">
                  <img
                    className="workers-avatar m-2"
                    src={SumitImg}
                    alt=""
                  />
                </div>
                <h5 className="card-title">Sumit</h5>
                <h6 className="card-subtitle mb-2 text-body-secondary">
                  Remote
                </h6>
                <h6 className="card-subtitle mb-2 text-body-secondary">Gym Trainer</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkersAll;
