import { motion } from "framer-motion";
import { FaSpinner, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import CardIMG from "../images/cardIMG1.jpg";

export default function PlacesList({
  categories,
  setKeyWord,
  keyWord,
  loading,
  places,
  error,
  openModal,
}) {
  const navigate = useNavigate();
  return (
    <div className="w-[40%] h-[80%]  p-4 overflow-y-auto border border-red-500">
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

      <motion.h2
        className="text-xl font-bold text-black text-center mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Nearby {keyWord.charAt(0).toUpperCase() + keyWord.slice(1)}
      </motion.h2>

      {loading && (
        <motion.div
          className="flex justify-center items-center h-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <FaSpinner className="animate-spin text-yellow-500 text-4xl" />
        </motion.div>
      )}

      {error && !loading && (
        <motion.p
          className="text-red-500 text-center font-semibold"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      )}

      {!loading && places.length > 0 && (
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
      )}
    </div>
  );
}
