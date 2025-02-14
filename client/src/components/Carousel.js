import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import heroIMG1 from "../images/heroIMG4.jpg";
import heroIMG2 from "../images/heroIMG2.jpg";
// import heroIMG3 from "../images/heroIMG6.jpg";
import heroIMG4 from "../images/heroIMG7.jpg";
import heroIMG5 from "../images/heroIMG5.jpg";

const images = [heroIMG1, heroIMG2, heroIMG4,heroIMG5];

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

    return () => clearInterval(interval); // Cleanup on unmount
  }, [currentIndex]); // Add dependency to keep it in sync

  return (
    <div className="w-full h-[50vh] sm:h-[70vh] lg:h-[85vh] relative overflow-hidden">
      <motion.img
        key={currentIndex}
        src={images[currentIndex]}
        alt={`Slide ${currentIndex + 1}`}
        className="absolute w-full h-full object-cover"
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 7, ease: "easeOut" }} // Slower zoom-in animation
      />

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
