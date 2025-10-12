import React, { useState } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Bounce, toast, ToastContainer } from "react-toastify";
import axios from "axios";
import ContactSvg from "../../public/contact.svg";
import { motion } from "framer-motion";

const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/contact",
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
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <section className="flex-grow flex items-center justify-center py-12 px-4 sm:px-6 lg:px-12">
        <div className="max-w-7xl w-full flex flex-col md:flex-row items-center justify-center gap-12">
          {/* Left: Form */}
          <motion.div
            className="contact-form w-full md:w-1/2 max-w-md bg-[#4639728f] p-8 rounded-lg shadow-md"
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
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                className="p-3 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 h-32 resize-none"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
              <button
                type="submit"
                className="bg-gradient-to-r from-[#2a7b9b] via-[#57c785] to-[#eddd53] text-white px-6 py-3 rounded-full font-semibold hover:scale-105 transition-transform cursor-pointer"
              >
                Send Message
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
              src={ContactSvg}
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
