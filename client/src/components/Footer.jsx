import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaX } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="w-full bg-[#08090a] text-gray-300 px-6 py-10 mt-20 border-t border-white/10 relative overflow-hidden font-sans">
      {/* Glow effect */}
      <div className="absolute -bottom-[120px] -left-[120px] w-[500px] h-[500px] rounded-full bg-[#57c785]/10 blur-3xl pointer-events-none"></div>

      {/* Main content */}
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
        {/* Brand */}
        <div className="text-center md:text-left">
          <h2 className="text-2xl font-extrabold tracking-tight text-white">
            Swift<span className="text-[#57c785]">Hire</span>
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Find jobs, hire workers, and grow your business — all in one place.
          </p>
        </div>

        {/* Links */}
        <div className="flex space-x-4 text-gray-400 text-lg">
          <a
            href="https://github.com/icodervivek/swifthire"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:text-[#57c785] hover:border-[#57c785]/40 transition-colors duration-300"
            aria-label="Github"
          >
            <FaGithub />
          </a>
          <a
            href="https://www.linkedin.com/in/vivekpramanik/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:text-[#57c785] hover:border-[#57c785]/40 transition-colors duration-300"
            aria-label="Linkedin"
          >
            <FaLinkedinIn />
          </a>
          <a
            href="https://x.com/icodervivek"
            target="_blank"
            rel="noopener noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/10 hover:text-[#57c785] hover:border-[#57c785]/40 transition-colors duration-300"
            aria-label="X"
          >
            <FaX />
          </a>
        </div>
      </div>

      {/* Bottom */}
      <div className="text-center text-gray-500 text-sm mt-8 pt-6 border-t border-white/5 relative z-10">
        © {new Date().getFullYear()} SwiftHire. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
