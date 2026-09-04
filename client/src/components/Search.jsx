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
          field
          flex-1
          rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none
        "
      />
      <button
        onClick={handleSearch}
        className="btn-primary px-6 sm:px-6 md:px-8 py-3 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none cursor-pointer flex-shrink-0"
      >
        Find Jobs
      </button>
    </motion.div>
  );
};

export default Search;
