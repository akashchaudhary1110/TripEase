import React from 'react'
import { motion } from "framer-motion";
import { FaSpinner, FaPlus } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

const PlaceListCard = ({places,CardIMG, setDirectionCoordinates, keyWord,openModal

}) => {

    const navigate = useNavigate();
  return (
    <motion.div
          className="space-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {places.map((place) => (
            <motion.div
              key={place.place_id}
              className="bg-white rounded-xl shadow-md p-3 flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ scale: 1.01 }}
            >
              <div className="overflow-hidden rounded-lg">
                <motion.img
                  src={CardIMG}
                  alt={place.name}
                  className="w-full h-32 object-cover rounded-lg hover:scale-110 border"
                />
              </div>
              <h3 className="text-lg font-bold text-black mt-2">
                {place.name}
              </h3>
              <p className="text-sm text-gray-600">{place.vicinity}</p>
              <button onClick={() => {
    console.log(place.geometry.location, "place");
    setDirectionCoordinates(place.geometry.location);
}}>
    Directions
</button>

              {keyWord === "hotel" && (
                <button
                  onClick={() => navigate(`/booking/${place?.name}`)}
                  className="mt-3 bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg text-center hover:bg-yellow-600 transition"
                >
                  Book Now
                </button>
              )}
              {keyWord === "tourist attraction" && (
                <button
                  onClick={() => openModal(place)}
                  className="bg-green-500 text-white px-4 py-2 flex items-center"
                >
                  <FaPlus className="mr-2" /> Add
                </button>
              )}
            </motion.div>
          ))}
        </motion.div>
  )
}

export default PlaceListCard