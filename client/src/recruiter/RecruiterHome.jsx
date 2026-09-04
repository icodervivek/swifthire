import { Link } from "react-router-dom";
import Footer from "../components/Footer";
import RecruiterNav from "./RecruiterNav";
import { useState, useEffect } from "react";
import axios from "axios";

const RecruiterHome = () => {
  const [jobs, setJobs] = useState([]);


  
  // Fetch recruiter jobs on component mount
  useEffect(() => {
    document.title = "Recruiter Dashboard"
    const fetchJobs = async () => {
      try {
        const token = localStorage.getItem("recruiterToken");
        if (!token) return;

        const res = await axios.get(`${import.meta.env.VITE_API_URL}/recruiter/jobs`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        setJobs(res.data.data || []);
      } catch (err) {
        console.error(
          "Error fetching jobs:",
          err.response?.data || err.message
        );
      }
    };

    fetchJobs();
  }, []);

  return (
    <div className="flex flex-col min-h-screen text-white">
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
            <p className="text-gray-400">
              Manage your job postings, review applicants, and find the perfect
              candidates faster with{" "}
              <span className="font-semibold text-white">SwiftHire</span>.
            </p>
          </section>

          {/* Quick Actions */}
          <section className="grid md:grid-cols-3 gap-6 mb-10">
            <div className="glass-card rounded-2xl p-6 hover:border-[#8b5cf6]/30 transition">
              <h3 className="text-xl font-semibold mb-3 text-white">
                📢 Post a New Job
              </h3>
              <p className="text-gray-400 mb-4">
                Create a new job listing and start receiving qualified
                candidates.
              </p>
              <Link to="/recruiter/post-job">
                <button className="btn-recruiter cursor-pointer px-5 py-2">
                  Post Job
                </button>
              </Link>
            </div>

            <div className="glass-card rounded-2xl p-6 hover:border-[#8b5cf6]/30 transition">
              <h3 className="text-xl font-semibold mb-3 text-white">
                👥 Manage Candidates
              </h3>
              <p className="text-gray-400 mb-4">
                View and track applications, shortlist potential hires, and
                manage interviews.
              </p>
              <Link to="/recruiter/manage-candidate">
                <button className="btn-recruiter px-5 py-2 cursor-pointer">
                  View Candidates
                </button>
              </Link>
            </div>

            <div className="glass-card rounded-2xl p-6 hover:border-[#8b5cf6]/30 transition">
              <h3 className="text-xl font-semibold mb-3 text-white">
                📈 Job Analytics
              </h3>
              <p className="text-gray-400 mb-4">
                Track job post performance — views, applications, and conversion
                stats.
              </p>
              <Link to="/recruiter/job-analytics">
                <button className="btn-recruiter px-5 cursor-pointer py-2">
                  View Insights
                </button>
              </Link>
            </div>
          </section>

          {/* Recent Job Listings */}
          <section className="mb-10 text-center">
            <h3 className="text-2xl font-semibold mb-4 text-white">
              🧾 Your Recent Job Posts
            </h3>
            <div className="space-y-4">
              {jobs.length === 0 ? (
                <p className="text-gray-400">
                  You have not posted any jobs yet.
                </p>
              ) : (
                jobs.map((job) => (
                  <div
                    key={job.job_id}
                    className="glass-card rounded-xl p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between hover:bg-white/[0.07] transition text-left"
                  >
                    <div>
                      <h4 className="text-lg font-semibold text-white">
                        {job.hiring_for}
                      </h4>
                      <p className="text-gray-400 text-sm">
                        Posted on{" "}
                        {new Date(job.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <p className="text-sm text-gray-300 mt-2 sm:mt-0">
                      Open Positions:{" "}
                      <span className="font-semibold text-white">
                        {job.open_positions}
                      </span>
                    </p>
                  </div>
                ))
              )}
            </div>
          </section>

          {/* Call to Action */}
          <section className="text-center glass-card text-white py-10 rounded-2xl">
            <h3 className="text-2xl font-semibold mb-2">
              Ready to hire your next star?
            </h3>
            <p className="mb-5 text-gray-400">
              Post a job and connect with top talent across the country.
            </p>
            <Link to="/recruiter/post-job">
            <button className="btn-recruiter cursor-pointer px-8 py-3">
              Create Job Posting
            </button>
            </Link>
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default RecruiterHome;
