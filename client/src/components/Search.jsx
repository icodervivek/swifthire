import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const Search = ({ initialQuery = "", onSearch }) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery); // update input if prop changes
  }, [initialQuery]);

  const handleSearch = () => {
    if (onSearch) onSearch(query.trim());
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") handleSearch();
  };

  return (
    <motion.div
      className="mt-6 flex flex-col sm:flex-row justify-center items-stretch gap-2 w-full max-w-md mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, delay: 0.6 }}
    >
      <input
        type="text"
        placeholder="Search for jobs, skills or companies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={handleEnter}
        className="
          flex-1
          px-4 sm:px-5 md:px-6 
          py-3 
          rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none 
          border border-gray-300 
          focus:outline-none focus:ring-2 focus:ring-[#57c785] 
          bg-gray-800 text-white placeholder-gray-400
        "
      />
      <button
        onClick={handleSearch}
        className="
          px-6 sm:px-6 md:px-8 
          py-3 
          bg-[#0a803b] hover:bg-[#4cb377] 
          text-white font-semibold 
          rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none 
          transition-colors cursor-pointer
          flex-shrink-0
        "
      >
        Find Jobs
      </button>
    </motion.div>
  );
};

export default Search;
