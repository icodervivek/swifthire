import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import EngineerImg from "./engineer.svg"

const Signin = () => {
  return (
    <>
        <Navbar />
        <div className="signin-container container mt-5 p-5 rounded">
        <div className="row">
            <h1 className="text-center">Sign In</h1>
          <div className="col-md-6 justify-content-center align-items-center mt-3">
            <form>
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
                <button type="submit" className="btn btn-success bg-gradient">
                  Submit
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6 d-flex justify-content-center">
            <img className='engineer-img' src={EngineerImg} alt="" />
          </div>
        </div>
      </div>
        <Footer />
    </>
  )
}

export default Signin