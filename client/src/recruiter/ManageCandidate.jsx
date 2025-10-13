import Footer from "../components/Footer";
import RecruiterNav from "./RecruiterNav";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ManageCandidate = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedApplicants, setExpandedApplicants] = useState({}); // track expanded rows

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        document.title = "View Candidates"
        const token = localStorage.getItem("recruiterToken");
        if (!token) return;

        const res = await axios.get(
          "http://localhost:3000/recruiter/manage-candidates",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        setJobs(res.data.jobs || []);
      } catch (err) {
        console.error(err);
        toast.error("Failed to fetch jobs");
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const toggleApplicant = (jobId, userId) => {
    setExpandedApplicants((prev) => ({
      ...prev,
      [jobId]: {
        ...prev[jobId],
        [userId]: !prev[jobId]?.[userId],
      },
    }));
  };

  return (
    <div className="flex flex-col min-h-screen font-sans text-white">
      <RecruiterNav />
      <ToastContainer />

      <main className="flex-grow px-6 sm:px-8 py-12">
        {loading ? (
          <p className="text-center text-gray-400 text-lg">Loading...</p>
        ) : jobs.length === 0 ? (
          <p className="text-center text-gray-400 text-lg">
            You haven't posted any jobs yet.
          </p>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {jobs.map((job) => (
              <motion.div
                key={job.job_id}
                className="bg-[#111]/70 backdrop-blur-md rounded-2xl p-6 shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ scale: 1.02 }}
              >
                <h3 className="text-xl mb-2">
                  Role:{" "}
                  <span className="font-bold text-[#57c785]">{job.hiring_for}</span>
                </h3>
                <p className="text-gray-300 mb-1">Company: {job.company_name}</p>
                <p className="text-gray-300 mb-1">Open Positions: {job.open_positions}</p>
                <p className="text-gray-300 mb-3">Applicants: {job.applicants_count}</p>

                {job.applicants.length > 0 && (
                  <div className="max-h-60 overflow-y-auto border-t border-gray-700 pt-2 mt-2 scrollbar-dark">
                    {job.applicants.map((user) => (
                      <div key={user.id} className="mb-2 rounded-lg bg-gray-800">
                        <div
                          className="flex justify-between p-2 cursor-pointer hover:bg-gray-700 transition"
                          onClick={() => toggleApplicant(job.job_id, user.id)}
                        >
                          <span>{user.name}</span>
                          <span className="text-gray-400 text-sm">{user.email}</span>
                        </div>

                        {expandedApplicants[job.job_id]?.[user.id] && (
                          <div className="p-2 text-gray-300 bg-gray-900 border-t border-gray-700">
                            <p><strong>Experience:</strong> {user.experience ?? 0} months</p>
                            <p><strong>Previous Job Role:</strong> {user.previous_job_role || "N/A"}</p>
                            <p><strong>Contact Number:</strong> {user.contact_number || "N/A"}</p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ManageCandidate;
