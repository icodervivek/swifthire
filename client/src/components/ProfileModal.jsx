import React, { useState, useEffect } from "react";
import Modal from "react-modal";
import axios from "axios";
import { toast, Bounce } from "react-toastify";

Modal.setAppElement("#root"); // required

const ProfileModal = ({ isOpen, onClose, user, onProfileUpdated }) => {
  const [experience, setExperience] = useState(user?.experience || "");
  const [previousJobRole, setPreviousJobRole] = useState(user?.previous_job_role || "");
  const [contactNumber, setContactNumber] = useState(user?.contact_number || "");

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}/user/update-profile`,
        { experience, previous_job_role: previousJobRole, contact_number: contactNumber },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Profile updated!", { position: "top-center", autoClose: 2000, transition: Bounce });
      onProfileUpdated(res.data.user);
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || "Error updating profile", { position: "top-center", autoClose: 2000, transition: Bounce });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      className="glass-card text-white rounded-3xl p-8 max-w-md mx-auto mt-20 shadow-2xl"
      overlayClassName="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center"
    >
      <h2 className="text-2xl font-bold mb-4">Complete Your Profile</h2>
      <input
        type="text"
        placeholder="Experience (in months)"
        value={experience}
        onChange={(e) => setExperience(e.target.value)}
        className="field rounded-xl mb-3"
      />
      <input
        type="text"
        placeholder="Previous Job Role"
        value={previousJobRole}
        onChange={(e) => setPreviousJobRole(e.target.value)}
        className="field rounded-xl mb-3"
      />
      <input
        type="text"
        placeholder="Contact Number"
        value={contactNumber}
        onChange={(e) => setContactNumber(e.target.value)}
        className="field rounded-xl mb-5"
      />
      <button
        onClick={handleSubmit}
        className="btn-primary px-5 py-2 cursor-pointer"
      >
        Save & Apply
      </button>
    </Modal>
  );
};

export default ProfileModal;
