import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch profile data when page loads
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          toast.error("Please log in first!", {
            position: "top-center",
            autoClose: 2000,
            transition: Bounce,
          });
          setTimeout(() => navigate("/signin"), 2000);
          return;
        }

        const response = await axios.get("http://localhost:3000/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        });

        setUser(response.data.user);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch profile",
          {
            position: "top-center",
            autoClose: 2000,
            transition: Bounce,
          }
        );
        setTimeout(() => navigate("/signin"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // ✅ Handle logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Signed out successfully", {
      position: "top-center",
      autoClose: 1500,
      transition: Bounce,
    });
    setTimeout(() => navigate("/signin"), 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <ToastContainer />

      <motion.div
        className="flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-12 flex-grow"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        {loading ? (
          <motion.div
            className="text-xl font-semibold text-gray-400"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            Loading...
          </motion.div>
        ) : user ? (
          <motion.div
            className="w-full max-w-md bg-[#0b0b0b]/60 backdrop-blur-md shadow-lg rounded-3xl p-10 text-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.02 }}
          >
            <h2 className="text-3xl font-bold mb-4 text-[#57c785]">
              Welcome, {user.name} 👋
            </h2>
            <p className="text-lg text-gray-300 mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-lg text-gray-300 mb-6">
              <strong>User ID:</strong> {user.id}
            </p>
            <motion.button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-3 px-8 rounded-full font-semibold shadow-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Sign Out
            </motion.button>
          </motion.div>
        ) : (
          <motion.div
            className="text-lg text-gray-400"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            No profile data found. Please sign in again.
          </motion.div>
        )}
      </motion.div>

      <Footer />
    </div>
  );
};

export default Profile;
