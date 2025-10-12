import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

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

      <div className="flex-grow container mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {companies.map((company) => (
              <div
                key={company.id}
                className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200 hover:shadow-2xl transition duration-300"
              >
                <h3 className="text-2xl font-bold text-[#73248b] mb-2">
                  {company.company_name}
                </h3>
                <p className="text-gray-700">
                  <strong>Industry:</strong> {company.industry}
                </p>
                <p className="text-gray-700">
                  <strong>City:</strong> {company.city}
                </p>
                <p className="text-gray-700">
                  <strong>Contact:</strong> {company.contact_email}
                </p>
                <p className="text-gray-700">
                  <strong>Phone:</strong> {company.phone_number}
                </p>
                <p className="text-gray-700">
                  <strong>Open Positions:</strong> {company.open_positions}
                </p>
                <p className="text-gray-700">
                  <strong>Hiring For:</strong> {company.hiring_for}
                </p>
                <p
                  className={`mt-3 font-semibold ${
                    company.immediate_hiring ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {company.immediate_hiring
                    ? "✅ Immediate Hiring"
                    : "⏳ Hiring Soon"}
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

export default HiringCompanies;
