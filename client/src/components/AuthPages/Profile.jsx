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
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    experience: "",
    previous_job_role: "",
    contact_number: "",
  });

  useEffect(() => {
    document.title = "Profile - SwiftHire";
  }, []);

  useEffect(() => {
    const fetchProfileAndAppliedJobs = async () => {
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

        const profileRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/profile`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setUser(profileRes.data.user);

        const appliedRes = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/applied-jobs`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setAppliedJobs(appliedRes.data.appliedJobs || []);
      } catch (error) {
        console.error(error);
        toast.error(
          error.response?.data?.message || "Failed to fetch profile",
          { position: "top-center", autoClose: 2000, transition: Bounce }
        );
        setTimeout(() => navigate("/signin"), 2000);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileAndAppliedJobs();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Signed out successfully", {
      position: "top-center",
      autoClose: 1500,
      transition: Bounce,
    });
    setTimeout(() => navigate("/"), 1500);
  };

  const handleEditClick = () => {
    setFormData({
      experience: user.experience || "",
      previous_job_role: user.previous_job_role || "",
      contact_number: user.contact_number || "",
    });
    setIsEditing(true);
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSave = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/update-profile`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setUser(res.data.user);
      toast.success("Profile updated successfully!", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
      setIsEditing(false);
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "Failed to update profile", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-900 text-white">
      <Navbar />
      <ToastContainer />

      <motion.div
        className="flex flex-col mt-15 items-center justify-center px-4 sm:px-6 lg:px-12 py-12 flex-grow"
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
          <>
            {/* ===== User Info Card ===== */}
            <motion.div
              className="w-full max-w-md bg-[#0b0b0b]/60 backdrop-blur-md shadow-lg rounded-3xl p-10 text-center mb-8"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
              whileHover={{ scale: 1.02 }}
            >
              <h2 className="text-3xl font-bold mb-4 text-[#57c785]">
                Welcome, {user.name}
              </h2>
              <p className="text-lg text-gray-300 mb-2">
                <strong>Email:</strong> {user.email}
              </p>
              {/* <p className="text-lg text-gray-300 mb-2">
                <strong>User ID:</strong> {user.id}
              </p> */}

              {isEditing ? (
                <>
                  <input
                    type="text"
                    name="experience"
                    placeholder="Experience (in months)"
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full mb-3 px-4 py-2 rounded-lg border-1"
                  />
                  <input
                    type="text"
                    name="previous_job_role"
                    placeholder="Previous Job Role"
                    value={formData.previous_job_role}
                    onChange={handleChange}
                    className="w-full mb-3 px-4 py-2 rounded-lg border-1"
                  />
                  <input
                    type="text"
                    name="contact_number"
                    placeholder="Contact Number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    className="w-full mb-3 px-4 py-2 rounded-lg border-1"
                  />

                  <div className="flex justify-center gap-4 mt-2">
                    <motion.button
                      onClick={handleSave}
                      className="bg-green-500 cursor-pointer hover:bg-green-600 py-2 px-6 rounded-full font-semibold shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Save
                    </motion.button>
                    <motion.button
                      onClick={() => setIsEditing(false)}
                      className="bg-gray-500 cursor-pointer hover:bg-gray-600 py-2 px-6 rounded-full font-semibold shadow-lg"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                  </div>
                </>
              ) : (
                <>
                  <p className="text-lg text-gray-300 mb-2">
                    <strong>Experience:</strong> {user.experience ?? 0} months
                  </p>
                  <p className="text-lg text-gray-300 mb-2">
                    <strong>Previous Job Role:</strong>{" "}
                    {user.previous_job_role || "N/A"}
                  </p>
                  <p className="text-lg text-gray-300 mb-2">
                    <strong>Contact Number:</strong>{" "}
                    {user.contact_number || "N/A"}
                  </p>

                  <motion.button
                    onClick={handleEditClick}
                    className="bg-blue-600 hover:bg-blue-700 cursor-pointer text-white py-2 px-6 rounded-full font-semibold shadow-lg mt-4"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    Edit Profile
                  </motion.button>
                </>
              )}

              <motion.button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 cursor-pointer text-white mx-2 py-2 px-6 rounded-full font-semibold shadow-lg mt-4"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Out
              </motion.button>
            </motion.div>

            {/* ===== Jobs Applied Section ===== */}
            <motion.div
              className="w-full max-w-4xl bg-[#111111]/70 backdrop-blur-md shadow-lg rounded-3xl p-8"
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8 }}
            >
              <h3 className="text-2xl font-bold text-[#57c785] mb-4">
                Jobs Applied ({appliedJobs.length})
              </h3>

              {appliedJobs.length === 0 ? (
                <p className="text-gray-400">
                  You haven’t applied to any jobs yet.
                </p>
              ) : (
                <div className="py-4 space-y-4">
                  {appliedJobs.map((job) => (
                    <div
                      key={job.job_id}
                      className="bg-gray-800 p-4 rounded-2xl shadow-md hover:scale-105 transition-transform duration-200"
                    >
                      <h4 className="text-lg text-white mb-1">
                        Job Role: &nbsp;
                        <span className="font-semibold">
                          {job.role || job.hiring_for}
                        </span>
                      </h4>
                      <p className="text-gray-300 text-sm">
                        Company: {job.company_name}
                      </p>
                      <p className="text-gray-400 text-xs mt-1">
                        Status: {job.status || "Applied"}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </>
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
