import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import heroIMG1 from "../images/heroIMG4.jpg";
import heroIMG2 from "../images/heroIMG2.jpg";
import heroIMG4 from "../images/heroIMG7.jpg";
import heroIMG5 from "../images/heroIMG5.jpg";

const images = [heroIMG1, heroIMG2, heroIMG4, heroIMG5];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Initialize useNavigate

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 8000); // Auto-slide every 8 seconds

    return () => clearInterval(interval);
  }, [currentIndex]); // Keeps the interval in sync

  // Handle button click for navigation
  const handleExploreClick = () => {
    const authData = localStorage.getItem("authToken");
    if (authData) {
      navigate("/explore");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="relative w-full h-[50vh] sm:h-[70vh] lg:h-[85vh] overflow-hidden">
      {/* Image with zoom-in effect */}
      <motion.img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="absolute w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 7, ease: "easeOut" }} // Slower zoom-in animation
      />

      {/* Overlay div with fade-in effect */}
      <motion.div
        key={currentIndex} // Change animation every time image changes
        className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }} // Disappear smoothly before changing
        transition={{ duration: 3.5, ease: "easeOut" }} // Half the image animation time
      >
        {/* Centered Content */}
        <motion.div
          className="flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 2, ease: "easeOut" }}
        >
          <p className="text-white text-4xl font-bold tracking-wide mb-4">
            Want to Explore?
          </p>
          <motion.button
            className="px-6 py-3 bg-yellow-500 text-black text-lg font-semibold rounded-lg hover:bg-yellow-600 transition shadow-lg"
            onClick={handleExploreClick} // Use function for navigation
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 2, ease: "easeOut", delay: 0.5 }}
          >
            Explore Now
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Left Button */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 transition"
      >
        <FaChevronLeft size={24} />
      </button>

      {/* Right Button */}
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-3 rounded-full hover:bg-opacity-80 transition"
      >
        <FaChevronRight size={24} />
      </button>
    </div>
  );
};

export default Carousel;
