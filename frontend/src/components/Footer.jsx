import React from 'react'

const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-3 mt-5">
  <div className="container text-center text-md-start">
    <div className="row">
      <div className="col-md-4 mb-3">
        <h5>Swift Hire</h5>
        <p>Connecting you with skilled workers when you need them most. Fast, reliable, and hassle-free.</p>
      </div>
      
      <div className="col-md-2 mb-3">
        <h6>Quick Links</h6>
        <ul className="list-unstyled">
          <li><a href="#" className="text-white text-decoration-none">Home</a></li>
          <li><a href="#" className="text-white text-decoration-none">Jobs</a></li>
          <li><a href="#" className="text-white text-decoration-none">Hire Workers</a></li>
          <li><a href="#" className="text-white text-decoration-none">Contact</a></li>
        </ul>
      </div>

      <div className="col-md-3 mb-3">
        <h6>Follow Us</h6>
        <a href="#" className="text-white me-3">
          <i className="bi bi-facebook"></i>
        </a>
        <a href="#" className="text-white me-3">
          <i className="bi bi-twitter"></i>
        </a>
        <a href="#" className="text-white me-3">
          <i className="bi bi-instagram"></i>
        </a>
        <a href="#" className="text-white">
          <i className="bi bi-linkedin"></i>
        </a>
      </div>

      <div className="col-md-3 mb-3">
        <h6>Contact Us</h6>
        <p>Email: support@swifthire.com</p>
        <p>Phone: +1 (555) 123-4567</p>
      </div>
    </div>
  </div>

  <div className="text-center py-3 border-top mt-3">
    <small>© {new Date().getFullYear()} Swift Hire. All rights reserved.</small>
  </div>
</footer>

  )
}

export default Footer