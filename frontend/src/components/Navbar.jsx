import React from "react";
import { Link } from "react-router-dom";
import WorkersHome from "./Workers/WorkersHome";
import Signin from "./Signin";
import Signup from "./Signup";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand text-white" href="#">
          Swift Hire
        </Link>
        <button
          className="navbar-toggler text-secondary bg-success"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <a className="nav-link active text-white" id="about" aria-current="page" href="#">
                About
              </a>
            </li> */}
            <li className="nav-item">
              <Link to="/workers" className="nav-link active text-white" aria-current="page" >
                Workers
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/signup">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-white" to="/signin">
                Sign In
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
