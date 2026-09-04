import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Bounce, toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // ✅ Loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // ✅ Start spinner

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/contact`,
        { name, email, message },
        { withCredentials: true }
      );

      toast.success(response.data.message || "Message sent successfully!", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });

      setName("");
      setEmail("");
      setMessage("");
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send message", {
        position: "top-center",
        autoClose: 2000,
        transition: Bounce,
      });
    } finally {
      setLoading(false); // ✅ Stop spinner
    }
  };

  useEffect(() => {
    document.title = "Contact Us - SwiftHire";
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex- mt-15 grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Left: Form */}
          <motion.div
            className="glass-card contact-form w-full md:w-1/2 max-w-md p-8 rounded-3xl shadow-xl"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mb-6 text-center">
              Contact Us
            </h2>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                className="field rounded-xl"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="field rounded-xl"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="field rounded-xl h-32 resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button
                type="submit"
                className="btn-primary px-6 py-3 hover:scale-[1.02] transition-transform cursor-pointer flex justify-center items-center gap-2"
                disabled={loading} // ✅ Disable button while sending
              >
                {loading ? (
                  <>
                    <svg
                      className="animate-spin h-5 w-5 text-[#06110a]"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                      ></path>
                    </svg>
                    Sending...
                  </>
                ) : (
                  "Send Message"
                )}
              </button>
              <ToastContainer />
            </form>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            className="contact-image w-full md:w-1/2 flex justify-center mt-10 md:mt-0"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <img
              src="contact.svg"
              alt="Contact Us"
              className="w-50 sm:w-80 md:mt-30 max-w-sm md:max-w-md"
            />
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
