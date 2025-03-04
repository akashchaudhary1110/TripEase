import React from "react";
import { motion } from "framer-motion";
import { FaRoute, FaHotel,  FaClipboardList, } from "react-icons/fa";

import { useNavigate } from "react-router-dom";
import useCheckAndProceed from "../hooks/useCheckAndProceed";

const PlaceListCard = ({ places, CardIMG, setDirectionCoordinates, keyWord, openModal }) => {
  const navigate = useNavigate();
  const checkAndProceed = useCheckAndProceed();

  const handleBooking = (place) => {
    checkAndProceed(() => {
      navigate(`/booking/${place?.name}`);
    });
  };

  return (
    <motion.div
      className="grid grid-cols-1 gap-6 w-full"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
    >
      {places.map((place) => (
        <motion.div
          key={place.place_id}
          className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between border border-gray-200 hover:shadow-xl transition-all w-full"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="overflow-hidden rounded-lg">
            <motion.img
              src={CardIMG}
              alt={place.name}
              className="w-full h-48 object-cover rounded-lg hover:scale-105 transition"
            />
          </div>

          <div className="mt-3 text-center">
            <h3 className="text-xl font-bold text-gray-900">{place.name}</h3>
            <p className="text-sm text-gray-600">{place.vicinity}</p>
          </div>

          <div className="mt-4 flex justify-center items-center gap-10 border-t pt-3">
            <FaRoute
              className="text-blue-600 text-3xl cursor-pointer hover:text-blue-800 transition"
              title="Get Directions"
              onClick={() => setDirectionCoordinates(place.geometry.location)}
            />

            {keyWord === "hotel" && (
              <FaHotel
                className="text-yellow-500 text-3xl cursor-pointer hover:text-yellow-600 transition"
                title="Book Hotel"
                onClick={() => handleBooking(place)}
              />
            )}
            {keyWord === "tourist attraction" && (
             <FaClipboardList
             className="text-green-500 text-3xl cursor-pointer hover:text-green-600 transition"
             title="Add to Itinerary"
             onClick={() => openModal(place)}
           />
            )}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default PlaceListCard;
