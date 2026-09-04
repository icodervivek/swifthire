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
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
      <motion.div
        className="glass-card p-8 rounded-3xl w-full max-w-md text-white shadow-2xl"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
      >
        <h3 className="text-xl font-bold mb-4">Complete Your Profile</h3>
        <input
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="field rounded-xl mb-3"
        />
        <input
          placeholder="Previous Job Role"
          value={previousJobRole}
          onChange={(e) => setPreviousJobRole(e.target.value)}
          className="field rounded-xl mb-3"
        />
        <input
          placeholder="Contact Number"
          value={contactNumber}
          onChange={(e) => setContactNumber(e.target.value)}
          className="field rounded-xl mb-3"
        />
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="btn-ghost px-4 py-2 cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="btn-primary px-4 py-2 cursor-pointer"
          >
            Save
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default UpdateProfileModal;
