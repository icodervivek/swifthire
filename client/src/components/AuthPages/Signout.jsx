import axios from "axios";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Bounce, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "../Navbar";
import Footer from "../Footer";

const Signout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const signoutUser = async () => {
      try {
        const response = await axios.post(
          "http://localhost:3000/api/signout",
          {},
          { withCredentials: true }
        );

        toast.success(response.data.message || "Logged out successfully", {
          position: "top-center",
          autoClose: 2000,
          transition: Bounce,
        });

        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } catch (error) {
        toast.error(error.response?.data?.message || "Error logging out", {
          position: "top-center",
          autoClose: 2000,
          transition: Bounce,
        });

        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      }
    };

    signoutUser();
  }, [navigate]);

  return (
    <>
      <ToastContainer />
      {/* Minimal UI to avoid white screen */}
      <Navbar />
      <div className="h-screen flex items-center justify-center">
        <p className="text-lg text-gray-700">Logging you out...</p>
      </div>
      <Footer />
    </>
  );
};

export default Signout;
