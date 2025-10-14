import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

const UpdateProfileModal = ({ isOpen, onClose, onSuccess }) => {
  const [experience, setExperience] = useState("");
  const [previousJobRole, setPreviousJobRole] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const token = localStorage.getItem("token");

  const handleSubmit = async () => {
    if (!experience || !previousJobRole || !contactNumber) {
      toast.error("All fields are required", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
      return;
    }
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/update-profile`,
        {
          experience,
          previous_job_role: previousJobRole,
          contact_number: contactNumber,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(res.data.message, {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
      onSuccess();
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to update profile", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50">
      <motion.div
        className="bg-gray-900 p-8 rounded-2xl w-full max-w-md text-white"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <h3 className="text-xl font-bold mb-4">Complete Your Profile</h3>
        <input
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="w-full p-3 rounded mb-3 text-black"
        />
        <input
          placeholder="Previous Job Role"
          value={previousJobRole}
          onChange={(e) => setPreviousJobRole(e.target.value)}
          className="w-full p-3 rounded mb-3 text-black"
        />
        <input
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="w-full p-3 rounded mb-3 text-black"
        />
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-700 hover:bg-gray-600"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 rounded bg-green-600 hover:bg-green-500"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateProfileModal;
