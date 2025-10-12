import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import RecruiterNav from "./RecruiterNav";
import { useState, useEffect } from "react";
import axios from "axios";

const RecruiterHome = () => {
  const [jobs, setJobs] = useState([]);

  // Fetch recruiter jobs on component mount
  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("recruiterToken");
        if (!token) return;

        const res = await axios.get("http://localhost:3000/recruiter/post-details", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setJobs(res.data.jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err.response?.data || err.message);
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen tracking-tightest">
      {/* Navbar */}
      <RecruiterNav />

      {/* Main Content */}
      <main className="flex-grow w-full px-4 sm:px-6 lg:px-8 py-10">
        <div className="max-w-7xl mx-auto">
          {/* Welcome Section */}
          <section className="text-center mb-10">
            <h2 className="text-3xl sm:text-4xl font-bold mb-2">
              Welcome Back, Recruiter 👋
            </h2>
            <p>
              Manage your job postings, review applicants, and find the perfect
              candidates faster with <span className="font-semibold">SwiftHire</span>.
            </p>
          </section>

          {/* Quick Actions */}
          <section className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-[#1E4633]">
                📢 Post a New Job
              </h3>
              <p className="text-gray-600 mb-4">
                Create a new job listing and start receiving qualified candidates.
              </p>
             <Link to="/recruiter/post-job">
              <button className="bg-[#1E4633] cursor-pointer text-white px-5 py-2 rounded-full hover:bg-[#20362c] transition">
                Post Job
              </button>
             </Link>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-[#73248b]">
                👥 Manage Candidates
              </h3>
              <p className="text-gray-600 mb-4">
                View and track applications, shortlist potential hires, and manage interviews.
              </p>
              <button className="bg-[#73248b] text-white px-5 py-2 rounded-full hover:bg-[#402947] transition">
                View Candidates
              </button>
            </div>

            <div className="bg-white shadow-md rounded-2xl p-6 hover:shadow-lg transition">
              <h3 className="text-xl font-semibold mb-3 text-[#1E4633]">
                📈 Job Analytics
              </h3>
              <p className="text-gray-600 mb-4">
                Track job post performance — views, applications, and conversion stats.
              </p>
              <button className="bg-[#1E4633] text-white px-5 py-2 rounded-full hover:bg-[#20362c] transition">
                View Insights
              </button>
            </div>
          </section>

          {/* Recent Job Listings */}
          <section className="mb-10 text-center">
            <h3 className="text-2xl font-semibold mb-4">
              🧾 Your Recent Job Posts
            </h3>
            <div className="space-y-4">
              {jobs.length === 0 ? (
                <p className="text-gray-600">You have not posted any jobs yet.</p>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job.job_id}
                    className="bg-white shadow-sm rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:shadow-md transition"
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-[#1E4633]">{job.hiring_for}</h4>
                      <p className="text-gray-600 text-sm">Posted on {new Date(job.created_at).toLocaleDateString()}</p>
                    </div>
                    <p className="text-sm text-gray-700 mt-2 sm:mt-0">
                      Open Positions: <span className="font-semibold">{job.open_positions}</span>
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center bg-[#1E4633] text-white py-10 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-2">Ready to hire your next star?</h3>
            <p className="mb-5 text-gray-200">
              Post a job and connect with top talent across the country.
            </p>
            <button className="bg-[#73248b] text-white px-8 py-3 rounded-full hover:bg-[#402947] transition">
              Create Job Posting
            </button>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RecruiterHome;
