import React from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";
import { motion } from "framer-motion";

const Footer = () => {
  const notify = () =>
    toast(
      "✅ You're all set! Stay tuned for upcoming job alerts and career tips."
    );

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.6, ease: "easeOut" },
    }),
    hover: { scale: 1.05, color: "#57c785", transition: { duration: 0.3 } },
  };

  return (
    <motion.footer
      className="bg-[#090b11] text-white py-10 px-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1 - Brand */}
        <motion.div variants={itemVariants} custom={0}>
          <h2 className="text-2xl font-bold mb-3">SwiftHire</h2>
          <p className="text-gray-400 text-sm">
            Find jobs, hire workers, and grow your business — all in one place.
          </p>
        </motion.div>

        {/* Column 2 - Links */}
        <motion.div variants={itemVariants} custom={1}>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            {["About Us", "Contact", "Jobs", "Terms & Privacy"].map(
              (link, index) => (
                <motion.li
                  key={index}
                  className="cursor-pointer"
                  variants={itemVariants}
                  whileHover="hover"
                  custom={index}
                >
                  {link}
                </motion.li>
              )
            )}
          </ul>
        </motion.div>

        {/* Column 3 - Newsletter */}
        <motion.div variants={itemVariants} custom={2}>
          <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-3">
            Subscribe to get job alerts and updates.
          </p>

          <motion.form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              notify();
            }}
            className="flex flex-col sm:flex-row gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded w-full sm:w-auto focus:text-white focus:outline-none focus:border-yellow-200 text-white bg-transparent border border-gray-500"
              required
            />
            <motion.button
              type="submit"
              className="bg-[#57c785] cursor-pointer text-black px-4 py-2 rounded hover:bg-[#44a66b]"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Subscribe
            </motion.button>
            <ToastContainer
              position="top-right"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="dark"
              transition={Bounce}
            />
          </motion.form>
        </motion.div>
      </motion.div>

      {/* Bottom line */}
      <motion.div
        className="text-center text-gray-500 text-sm mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.8 }}
      >
        &copy; {new Date().getFullYear()} SwiftHire. All rights reserved.
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
