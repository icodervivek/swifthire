import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import EngineerImg from "./engineer.svg";

const Signup = () => {
  return (
    <>
      <Navbar />
      <div className="signup-container container mt-5 p-5 rounded">
        <div className="row">
          <div className="justify-content-center align-items-center">
            <h1 className="text-center">Join Us</h1>
            <form>
              <div className="mb-3">
                <label htmlFor="fullname" className="form-label">
                  Full Name
                </label>
                <input type="text" className="form-control" id="fullname" />
              </div>
              <div className="mb-3">
                <label htmlFor="contactnumber" className="form-label">
                  Contact Number
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="contactnumber"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="dateofbirth" className="form-label">
                  Date of Birth
                </label>
                <input type="date" className="form-control" id="dateofbirth" />
              </div>
              <div className="mb-3">
                <label className="form-label d-block">Gender</label>
                <div className="d-flex">
                  <div className="form-check me-3">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="genderMale"
                      value="male"
                    />
                    <label className="form-check-label" htmlFor="genderMale">
                      Male
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="gender"
                      id="genderFemale"
                      value="female"
                    />
                    <label className="form-check-label" htmlFor="genderFemale">
                      Female
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="role" className="form-label">
                  Role
                </label>
                <input type="text" className="form-control" id="role" />
              </div>

              <div className="mb-3">
                <label htmlFor="skills" className="form-label">
                  Skills
                </label>
                <input type="text" className="form-control" id="skills" />
              </div>

              <div className="mb-3">
                <label htmlFor="experience" className="form-label">
                  Experience (in months)
                </label>
                <input type="number" className="form-control" id="experience" />
              </div>

              <div className="mb-3">
                <label htmlFor="address" className="form-label">
                  Address
                </label>
                <input type="text" className="form-control" id="address" />
              </div>
              <div className="mb-3">
                <label htmlFor="city" className="form-label">
                  City
                </label>
                <input type="text" className="form-control" id="city" />
              </div>
              <div className="mb-3">
                <label htmlFor="district" className="form-label">
                  District
                </label>
                <input type="text" className="form-control" id="district" />
              </div>
              <div className="mb-3">
                <label htmlFor="pincode" className="form-label">
                  Pincode
                </label>
                <input type="number" className="form-control" id="pincode" />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                />
              </div>
              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                />
              </div>
              <div className="d-grid gap-2">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </form>
          </div>
          {/* <div className="col-md-6 d-flex justify-content-center">
            <img className="engineer-img" src={EngineerImg} alt="" />
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Signup;
