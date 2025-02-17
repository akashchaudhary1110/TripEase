import React from "react";
import { motion } from "framer-motion";
import heroIMG1 from "../images/heroIMG1.jpg";
import heroIMG2 from "../images/heroIMG2.jpg";
import heroIMG3 from "../images/heroIMG3.jpg";
import heroIMG4 from "../images/heroIMG4.jpg";
import heroIMG5 from "../images/heroIMG5.jpg";
import heroIMG6 from "../images/heroIMG6.jpg";
import heroIMG7 from "../images/heroIMG7.jpg";
import bgIMG from "../images/bgIMG2.jpg";

const About = () => {
  return (
    <div 
      className="about pb-4 relative text-black overflow-hidden w-full bg-cover bg-center min-h-screen"
      style={{ backgroundImage: `url(${bgIMG})` }}
    >
      <motion.h2
        whileInView={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -100 }}
        transition={{ duration: 0.5 }}
        className="my-20 text-center text-5xl font-bold px-4"
      >
        About Us
      </motion.h2>
      <div className="absolute inset-0 bg-yellow-500/50 backdrop-blur-md -z-10"></div>
      <div className="max-w-7xl mx-auto px-4 py-12 bg-white/60 rounded-xl shadow-lg relative">
        {[heroIMG1,heroIMG2,heroIMG3, heroIMG4, heroIMG5,heroIMG6,heroIMG7].map((image, index) => (
          <div key={index} className="about-section mb-12 flex flex-wrap items-center">
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -100 }}
              transition={{ duration: 1 }}
              className="w-full md:w-1/2 flex justify-center px-4"
            >
              <img
                src={image}
                alt={`About Section ${index + 1}`}
                className="mb-6 rounded-xl w-full max-w-lg h-auto shadow-xl"
              />
            </motion.div>
            <motion.div
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: 100 }}
              transition={{ duration: 1 }}
              className="w-full md:w-1/2 p-6"
            >
              <h3 className="mb-4 font-extrabold text-4xl text-black text-center md:text-left">Heading {index + 1}</h3>
              <p className="mb-6 text-lg text-stone-800 text-center md:text-left">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque nisi est, facilisis ac tellus ac, egestas hendrerit magna. Donec imperdiet maximus felis, eu tempor est lacinia sed.
              </p>
            </motion.div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;
