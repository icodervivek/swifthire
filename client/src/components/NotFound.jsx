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
        <div className="flex flex-col items-center justify-center min-h-screen text-white p-6">
          <h1 className="text-6xl font-bold mb-4">404</h1>
          <p className="text-xl mb-6">
            Oops! The page you're looking for does not exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-[#57c785] cursor-pointer hover:bg-green-600 text-black font-semibold px-6 py-3 rounded-lg transition"
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
