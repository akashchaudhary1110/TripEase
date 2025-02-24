import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const baseURL = "https://maps.gomaps.pro/maps/api/place/nearbysearch/json";

const categories = [
  { label: "Hotels", keyword: "hotel" },
  { label: "Restaurants", keyword: "restaurant" },
  { label: "Tourist Spots", keyword: "tourist attraction" },
  { label: "Cafes", keyword: "cafe" },
];

function NearbyPlaces({ coordinates }) {
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyWord, setKeyWord] = useState("hotel"); // Default category

  useEffect(() => {
    if (!coordinates) return;

    const fetchNearbyPlaces = async () => {
      setLoading(true);
      setError("");

      try {
        const response = await axios.get(baseURL, {
          params: {
            location: `${coordinates.lat},${coordinates.lng}`,
            radius: 3000,
            keyword: keyWord, // Searching with keyword
            key: API_KEY,
          },
        });

        if (response.data.status === "OK") {
          setPlaces(response.data.results);
        } else {
          setError(`Unable to fetch data. Please try again later.`);
          setPlaces([]);
        }
      } catch (error) {
        setError("Error fetching nearby places: " + error.message);
        setPlaces([]);
      }

      setLoading(false);
    };

    fetchNearbyPlaces();
  }, [coordinates, keyWord]); // Fetch when coordinates or keyword change

  return (
    <div className="mt-6 px-4">
      {/* Category Buttons with Motion */}
      <motion.div 
        className="flex flex-wrap gap-3 justify-center mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {categories.map((category) => (
          <motion.button
            key={category.keyword}
            onClick={() => setKeyWord(category.keyword)}
            className={`px-4 py-2 rounded-lg font-semibold transition 
              ${keyWord === category.keyword ? "bg-yellow-500 text-black" : "bg-black text-white"}
              hover:bg-yellow-600`}
            whileTap={{ scale: 0.9 }}
          >
            {category.label}
          </motion.button>
        ))}
      </motion.div>

      {/* Heading */}
      <motion.h2 
        className="text-2xl font-bold text-black text-center mb-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Nearby {keyWord.charAt(0).toUpperCase() + keyWord.slice(1)}
      </motion.h2>

      {/* Loading Indicator */}
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

      {/* Error Message */}
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

      {/* Places Grid */}
      {!loading && places.length > 0 && (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {places.map((place, index) => (
            <motion.div 
              key={place.place_id} 
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.02 }}
            >
              {/* Place Name */}
              <h3 className="text-lg font-bold text-black mb-2">{place.name}</h3>
              {/* Address */}
              <p className="text-sm text-gray-600">{place.vicinity}</p>

              {/* Navigation Button */}
              <a
                href="https://www.makemytrip.com"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-block bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg text-center hover:bg-yellow-600 transition"
              >
                Book Now
              </a>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* No Data Message */}
      {!loading && places.length === 0 && !error && (
        <motion.p 
          className="text-gray-500 text-center font-semibold mt-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          No places found. Try a different category.
        </motion.p>
      )}
    </div>
  );
}

export default NearbyPlaces;
