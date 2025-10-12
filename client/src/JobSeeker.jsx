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

      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {seekers.map((seeker) => (
              <div
                key={seeker.id}
                className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-2xl font-bold text-[#1E4633] mb-2">
                  {seeker.full_name}
                </h3>
                <p className="text-gray-700">
                  <strong>Age:</strong> {seeker.age}
                </p>
                <p className="text-gray-700">
                  <strong>City:</strong> {seeker.city}
                </p>
                <p className="text-gray-700">
                  <strong>Mobile:</strong> {seeker.mobile_number}
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> {seeker.email_address}
                </p>
                <p className="text-gray-700">
                  <strong>Experience:</strong> {seeker.work_experience}
                </p>
                <p className="text-gray-700">
                  <strong>Designation:</strong> {seeker.designation}
                </p>
                <p
                  className={`mt-3 font-semibold ${
                    seeker.immediate_joiner ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {seeker.immediate_joiner
                    ? "✅ Immediate Joiner"
                    : "⏳ Not Immediate"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default JobSeeker;
