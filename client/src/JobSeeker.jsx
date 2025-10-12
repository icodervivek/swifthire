import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

const JobSeeker = () => {
  const [seekers, setSeekers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch job seekers when component loads
  useEffect(() => {
    const fetchSeekers = async () => {
      try {
        const response = await axios.get("http://localhost:3000/job-seekers");
        setSeekers(response.data);
      } catch (error) {
        console.error("Error fetching job seekers:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSeekers();
  }, []);

  return (
   <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 tracking-wider">
        <div className="text-center bg-gray-100 p-12 rounded-xl shadow-lg mx-auto my-12">
          <p className="text-3xl font-extrabold mb-6 text-gray-800">
            Explore Top Talent Instantly
          </p>
          <p className="text-gray-800 mb-6">
            Browse skilled professionals ready to join your team immediately.
          </p>
          {/* <button className="bg-gradient-to-r from-[#2a7b9b] to-[#57c785] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer">
            Find Talent
          </button> */}
        </div>

        <h2 className="text-4xl font-extrabold text-center mb-10">
          Available Job Seekers 👩‍💼👨‍🔧
        </h2>

        {loading ? (
          <div className="text-center text-gray-600 text-lg">Loading...</div>
        ) : seekers.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No job seekers found.
          </div>
        ) : (
          <div className="scroll-horizontal overflow-x-auto py-6">
            <div className="flex gap-6 min-w-max">
              {seekers.map((seeker) => (
                <div
                  key={seeker.id}
                  className="bg-gray-900 text-white rounded-3xl shadow-lg p-6 min-w-[280px] hover:scale-105 transition-transform duration-300 flex-shrink-0"
                >
                  <h3 className="text-2xl font-bold mb-2">{seeker.full_name}</h3>
                  <p className="text-gray-300">
                    <strong>Age:</strong> {seeker.age}
                  </p>
                  <p className="text-gray-300">
                    <strong>City:</strong> {seeker.city}
                  </p>
                  <p className="text-gray-300">
                    <strong>Mobile:</strong> {seeker.mobile_number}
                  </p>
                  <p className="text-gray-300">
                    <strong>Email:</strong> {seeker.email_address}
                  </p>
                  <p className="text-gray-300">
                    <strong>Experience:</strong> {seeker.work_experience}
                  </p>
                  <p className="text-gray-300">
                    <strong>Designation:</strong> {seeker.designation}
                  </p>
                  <p
                    className={`mt-3 font-semibold ${
                      seeker.immediate_joiner ? "text-green-500" : "text-yellow-400"
                    }`}
                  >
                    {seeker.immediate_joiner
                      ? "✅ Immediate Joiner"
                      : "⏳ Not Immediate"}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default JobSeeker;
