import React, { useState } from "react";
import { Upload, FileText, CheckCircle, XCircle } from "lucide-react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { useEffect } from "react";

const UploadResume = () => {

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [skills, setSkills] = useState([]);

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

      if (data.matchedJobs) {
        setMatchedJobs(data.matchedJobs);
        setSkills(data.skills || []);
      } else {
        setMatchedJobs([]);
        setSkills([]);
      }
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

  useEffect(() => {
        document.title = "Upload PDF - SwiftHire";
      }, []);

  return (
    <div className="min-h-screen flex flex-col bg-[#0b0b0b] text-white">
      <Navbar />

      {/* ===== Upload Form Container ===== */}
      <div className="flex-grow flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 py-16">
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
            <label
              htmlFor="file-upload"
              className="cursor-pointer border-2 border-dashed border-[#57c785] rounded-xl py-12 flex flex-col items-center justify-center transition-all hover:bg-[#57c785]/10"
            >
              <Upload className="w-12 h-12 text-[#57c785] mb-3" />
              <p className="text-gray-300">Click to upload or drag & drop</p>
              <p className="text-sm text-gray-500">Only PDF files allowed</p>
              <input
                id="file-upload"
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
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

          {matchedJobs.length > 0 && (
            <>
              <p className="text-gray-400 mb-6">
                Based on extracted skills: {skills.join(", ")}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matchedJobs.map((job) => (
                  <div
                    key={job.id}
                    className="p-6 border border-gray-700 rounded-lg hover:bg-gray-700 transition"
                  >
                    <p className="font-semibold text-lg">{job.company_name}</p>
                    <p className="text-gray-400">Role: {job.hiring_for}</p>
                    <p className="text-gray-400">City: {job.city}</p>
                    <p className="text-gray-400">Open Positions: {job.open_positions}</p>
                    <p className="text-gray-400">Contact: {job.contact_email}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default UploadResume;
