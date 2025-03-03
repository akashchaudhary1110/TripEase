import React from 'react'
import { motion } from "framer-motion";
import { FaPlus, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
const ItineraryList = ({itineraries, }) => {

    const navigate = useNavigate();
  return (
    <>
     <ul className="space-y-3 w-full flex-1 overflow-auto">
          {itineraries.map((itinerary) => (
            <motion.li
              key={itinerary._id}
              className="p-3 border flex flex-col sm:flex-row items-center text-black bg-white rounded-lg cursor-pointer transition-all"
              whileHover={{
                scale: 1.02,
                boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                backgroundColor: "#f3f4f6",
              }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <span className="font-medium text-left flex-1 text-sm sm:text-base">
                {itinerary.title}
              </span>
              <span className="font-medium text-gray-500 text-xs sm:text-sm">
                {itinerary._id}
              </span>

              {/* Icons */}
              <div className="flex gap-3 text-lg sm:text-xl mt-2 sm:mt-0">
                <motion.div
                  whileHover={{ y: [-3, 3] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                >
                  <FaEye
                    onClick={() => navigate(`/itinerary/${itinerary._id}`)}
                    className="hover:text-black text-yellow-500 cursor-pointer"
                    title="Preview"
                  />
                </motion.div>
                <motion.div
                  whileHover={{ y: [-3, 3] }}
                  transition={{
                    repeat: Infinity,
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                >
                  <FaTrash
                    className="hover:text-black text-yellow-500 cursor-pointer"
                    title="Delete"
                  />
                </motion.div>
              </div>
            </motion.li>
          ))}
        </ul>
    
    </>
  )
}

export default ItineraryList