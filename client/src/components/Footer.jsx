import React from "react";
import { Bounce, ToastContainer, toast } from "react-toastify";

const Footer = () => {
  const notify = () =>
    toast(
      "✅ You're all set! Stay tuned for upcoming job alerts and career tips."
    );
  return (
    <footer className="bg-[#090b11] text-white py-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Column 1 - Brand */}
        <div>
          <h2 className="text-2xl font-bold mb-3">SwiftHire</h2>
          <p className="text-gray-400 text-sm">
            Find jobs, hire workers, and grow your business — all in one place.
          </p>
        </div>

        {/* Column 2 - Links */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li className="hover:text-[#57c785] cursor-pointer">About Us</li>
            <li className="hover:text-[#57c785] cursor-pointer">Contact</li>
            <li className="hover:text-[#57c785] cursor-pointer">Jobs</li>
            <li className="hover:text-[#57c785] cursor-pointer">
              Terms & Privacy
            </li>
          </ul>
        </div>

        {/* Column 3 - Newsletter or Socials */}
        <div>
          <h3 className="text-xl font-semibold mb-3">Stay Updated</h3>
          <p className="text-gray-400 text-sm mb-3">
            Subscribe to get job alerts and updates.
          </p>

          <form
            action=""
            onSubmit={(e) => {
              e.preventDefault();
              notify();
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="p-2 rounded w-full sm:w-auto focus:text-white focus:outline-none focus:border-yellow-200 text-white bg-transparent border border-gray-500"
              required
            />
            <button
              type="submit"
              className="bg-[#57c785] cursor-pointer text-black px-4 py-2 rounded hover:bg-[#44a66b]"
            >
              Subscribe
            </button>
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
          </form>
        </div>
      </div>

      {/* Bottom line */}
      <div className="text-center text-gray-500 text-sm mt-10">
        &copy; {new Date().getFullYear()} SwiftHire. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
