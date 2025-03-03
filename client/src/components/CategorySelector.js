import React from "react";
import { motion } from "framer-motion";
const CategorySelector = ({ categories, setKeyWord, keyWord }) => {
  return (
    <motion.div
      className="flex flex-wrap gap-3 justify-center mb-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      {categories.map((category) => (
        <motion.button
          key={category.keyword}
          onClick={() => setKeyWord(category.keyword)}
          className={`px-4 py-2 rounded-lg font-semibold transition 
            ${
              keyWord === category.keyword
                ? "bg-yellow-500 text-black"
                : "bg-black text-white"
            }
            hover:bg-yellow-600`}
          whileTap={{ scale: 0.9 }}
        >
          {category.label}
        </motion.button>
      ))}
    </motion.div>
  );
};

export default CategorySelector;
