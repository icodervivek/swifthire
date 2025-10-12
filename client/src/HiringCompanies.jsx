import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Link } from "react-router-dom";

const HiringCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Fetch companies when component loads
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("http://localhost:3000/companies");
        setCompanies(response.data.data); // because backend sends { success, data: [...] }
      } catch (error) {
        console.error("Error fetching companies:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12 tracking-wider">
        <div className="text-center bg-gray-800 p-12 rounded-xl shadow-lg mx-auto my-12">
          <p className="text-3xl font-extrabold mb-6 text-white">
            Discover Your Perfect Job with AI
          </p>
         <Link to="/find-job/upload-resume">
          <button className="bg-gradient-to-r from-[#2a7b9b] to-[#57c785] text-white font-semibold px-8 py-3 rounded-full shadow-lg hover:scale-105 transition-transform cursor-pointer">
            Check Now
          </button>
         </Link>
        </div>

        <h2 className="text-4xl font-extrabold text-center mb-10">
          Companies Ready to Hire 🏢💼
        </h2>

        {loading ? (
          <div className="text-center text-gray-600 text-lg">Loading...</div>
        ) : companies.length === 0 ? (
          <div className="text-center text-gray-600 text-lg">
            No hiring companies found.
          </div>
        ) : (
          <div className=" scroll-horizontal overflow-x-auto py-6">
            <div className="flex gap-6 min-w-max">
              {companies.map((company) => (
                <div
                  key={company.id}
                  className="bg-gray-900 text-white rounded-3xl shadow-lg p-6 min-w-[280px] hover:scale-105 transition-transform duration-300 flex-shrink-0"
                >
                  <h3 className="text-2xl font-bold mb-2">
                    {company.company_name}
                  </h3>
                  <p className="text-gray-300">
                    <strong>Industry:</strong> {company.industry}
                  </p>
                  <p className="text-gray-300">
                    <strong>City:</strong> {company.city}
                  </p>
                  <p className="text-gray-300">
                    <strong>Contact:</strong> {company.contact_email}
                  </p>
                  <p className="text-gray-300">
                    <strong>Phone:</strong> {company.phone_number}
                  </p>
                  <p className="text-gray-300">
                    <strong>Open Positions:</strong> {company.open_positions}
                  </p>
                  <p className="text-gray-300">
                    <strong>Hiring For:</strong> {company.hiring_for}
                  </p>
                  <p
                    className={`mt-3 font-semibold ${
                      company.immediate_hiring
                        ? "text-green-500"
                        : "text-yellow-400"
                    }`}
                  >
                    {company.immediate_hiring
                      ? "✅ Immediate Hiring"
                      : "⏳ Hiring Soon"}
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

export default HiringCompanies;
