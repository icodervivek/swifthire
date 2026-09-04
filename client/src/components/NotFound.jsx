import React from "react";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { useEffect } from "react";

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 Page Not Found";
  }, []);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-12">
        <div className="flex flex-col items-center justify-center min-h-screen text-white p-6 text-center">
          <p className="next-level-txt text-7xl sm:text-8xl font-extrabold mb-4">404</p>
          <p className="text-xl text-gray-400 mb-8">
            Oops! The page you're looking for does not exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn-primary px-6 py-3 cursor-pointer"
          >
            Go Home
          </button>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default NotFound;
