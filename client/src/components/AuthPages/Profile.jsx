import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import Footer from "../Footer";
import axios from "axios";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

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
        toast.success("Profile loaded successfully!", {
          position: "top-center",
          autoClose: 1500,
          transition: Bounce,
        });
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
    toast.info("Logged out successfully", {
      position: "top-center",
      autoClose: 1500,
      transition: Bounce,
    });
    setTimeout(() => navigate("/signin"), 1500);
  };

  return (
    <>
      <Navbar />
      <ToastContainer />

      <div className="profile-section flex flex-col items-center justify-center px-4 sm:px-6 lg:px-12 py-12 min-h-screen">
        {loading ? (
          <div className="text-xl font-semibold text-gray-600">Loading...</div>
        ) : user ? (
          <div className="w-full max-w-md bg-orange-200 shadow-md rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4 text-gray-800">
              Welcome, {user.name} 👋
            </h2>
            <p className="text-lg text-gray-700 mb-2">
              <strong>Email:</strong> {user.email}
            </p>
            <p className="text-lg text-gray-700 mb-6">
              <strong>User ID:</strong> {user.id}
            </p>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white py-2 px-6 rounded-md transition duration-200 cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="text-lg text-gray-500">
            No profile data found. Please sign in again.
          </div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default Profile;
