import React, { useState, useEffect, useRef } from "react";
import { Upload, FileText, CheckCircle, XCircle } from "lucide-react";
import axios from "axios";
import { toast, Bounce } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProfileModal from "./components/ProfileModal";

const UploadResume = () => {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [uploadData, setUploadData] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [pendingJobId, setPendingJobId] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type === "application/pdf") {
      setFile(selected);
      setUploaded(false);
      setMatchedJobs([]);
      setSkills([]);
    } else {
      alert("Please upload a PDF file only!");
    }
  };

  // Handle drag & drop
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.type === "application/pdf") {
      setFile(droppedFile);
      setUploaded(false);
      setMatchedJobs([]);
      setSkills([]);
    } else {
      alert("Please upload a PDF file only!");
    }
  };

  // Trigger file input click programmatically
  const handleClickUploadArea = () => {
    if (inputRef.current) inputRef.current.click();
  };

  // Handle file upload to backend
  const handleUpload = async () => {
    if (!file) return alert("Please select a file first!");
    setUploading(true);

    try {
      const formData = new FormData();
      formData.append("pdf", file);

      const res = await fetch(`${import.meta.env.VITE_API_URL}/resume/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setUploading(false);
      setUploaded(true);

      setUploadData(data);
      setMatchedJobs(data.jobs || []); // ✅ backend sends "jobs"
      setSkills(data.skills || []); // ✅ backend sends "skills"
    } catch (err) {
      console.error(err);
      setUploading(false);
      alert("Failed to upload resume. Please try again.");
    }
  };

  const resetForm = () => {
    setFile(null);
    setUploaded(false);
    setMatchedJobs([]);
    setSkills([]);
  };

  const handleApply = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/apply/${jobId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast.success(res.data.message || "Application submitted!", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });

      setAppliedJobs((prev) => [...prev, jobId]);
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    }
  };

  useEffect(() => {
    document.title = "Upload PDF - SwiftHire";

    const fetchAppliedJobs = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/user/applied-jobs`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const appliedJobIds = res.data.appliedJobs.map((job) =>
          Number(job.job_id)
        );
        setAppliedJobs(appliedJobIds);
      } catch (err) {
        console.error("Error fetching applied jobs:", err);
      }
    };

    fetchAppliedJobs();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUser(res.data.user);
      } catch (err) {
        console.error("Error fetching profile:", err);
      }
    };

    fetchProfile();
  }, []);

  const handleApplyClick = (jobId) => {
    // If user is logged in but profile incomplete
    if (
      user &&
      (!user.experience || !user.previous_job_role || !user.contact_number)
    ) {
      setPendingJobId(jobId);
      setShowModal(true);
      return;
    }

    // If profile complete or no user (login check handled elsewhere)
    handleApply(jobId);
  };

  // After profile update from modal
  const handleProfileUpdated = (updatedUser) => {
    setUser(updatedUser);
    if (pendingJobId) handleApply(pendingJobId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b0b] text-white">
      <Navbar />
      {/* ===== Upload Form Container ===== */}
      <div className="flex-grow flex flex-col items-center mt-12 justify-center px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-gray-900/80 border border-[#57c785] rounded-3xl shadow-xl p-10 sm:p-12 md:p-16 w-full max-w-lg text-center backdrop-blur-lg">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#57c785] mb-6">
            Upload Your Resume
          </h2>
          <p className="text-gray-400 mb-8">
            Upload your resume and get instant job recommendations tailored to
            your skills and experience.
          </p>

          {/* File Upload Area */}
          {!file ? (
            <div
              onClick={handleClickUploadArea}
              onDragOver={(e) => e.preventDefault()}
              onDrop={handleDrop}
              className="cursor-pointer border-2 border-dashed border-[#57c785] rounded-xl py-12 flex flex-col items-center justify-center transition-all hover:bg-[#57c785]/10"
            >
              <Upload className="w-12 h-12 text-[#57c785] mb-3" />
              <p className="text-gray-300">Click to upload or drag & drop</p>
              <p className="text-sm text-gray-500">Only PDF files allowed</p>
              <input
                ref={inputRef}
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          ) : (
            <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 text-left relative">
              <div className="flex items-center gap-3">
                <FileText className="text-[#57c785] w-6 h-6" />
                <div>
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-gray-400 text-sm">
                    {(file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
              </div>

              {/* Upload Actions */}
              <div className="mt-6 flex justify-between items-center">
                {!uploaded ? (
                  <button
                    onClick={handleUpload}
                    disabled={uploading}
                    className={`${
                      uploading
                        ? "bg-gray-600"
                        : "bg-[#57c785] hover:bg-[#4cb377]"
                    } text-white px-6 py-2 rounded-full transition-transform duration-300 cursor-pointer`}
                  >
                    {uploading ? "Uploading..." : "Upload"}
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-green-500 font-semibold">
                    <CheckCircle className="w-5 h-5" /> Uploaded Successfully
                  </div>
                )}

                <button
                  onClick={resetForm}
                  className="text-red-400 hover:text-red-500 transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              </div>

              {/* Progress bar */}
              {uploading && (
                <div className="w-full bg-gray-700 rounded-full h-2 mt-4 overflow-hidden">
                  <div className="bg-[#57c785] h-2 animate-pulse w-3/4"></div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* ===== Job Recommendations Section ===== */}
      {uploaded && (
        <div className="px-4 sm:px-6 lg:px-8 py-8 w-full max-w-5xl mx-auto">
          <h3 className="text-2xl font-bold text-center text-[#57c785] mb-4">
            {matchedJobs.length
              ? "Job Recommendations"
              : "No Matching Job Recommendations Found"}
          </h3>

          {uploadData?.description && (
            <p className="text-gray-400 mb-6">{uploadData.description}</p>
          )}

          {matchedJobs.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {matchedJobs.map((job) => (
                <div
                  key={job.job_id}
                  className="p-6 border border-gray-700 rounded-lg hover:bg-gray-700 transition flex flex-col justify-between h-full"
                >
                  <div className="flex-1">
                    <p className="font-semibold text-lg">{job.company}</p>
                    <p className="text-gray-400">Role: {job.job_title}</p>
                    <p className="text-gray-400">{job.reason_for_match}</p>
                  </div>

                  <div className="mt-4 flex justify-center">
                    {appliedJobs.includes(Number(job.job_id)) ? (
                      <button
                        disabled
                        className="px-6 py-2 w-full rounded-full text-sm font-semibold bg-gray-600 cursor-not-allowed"
                      >
                        Applied
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          const token = localStorage.getItem("token");
                          if (token) {
                            handleApplyClick(job.job_id);
                          } else {
                            toast.info(
                              "To apply for job, please login first!",
                              {
                                position: "top-center",
                                autoClose: 2000,
                                transition: Bounce,
                              }
                            );
                            setTimeout(() => navigate("/signin"), 2000);
                          }
                        }}
                        className="px-6 py-2 w-full rounded-full text-sm font-semibold bg-green-600 hover:bg-green-700 text-white cursor-pointer"
                      >
                        Apply Now
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <Footer />
      <ProfileModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        user={user}
        onProfileUpdated={handleProfileUpdated}
      />
    </div>
  );
};

export default UploadResume;
