import { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { FaSpinner } from "react-icons/fa";
import CardIMG from "../images/cardIMG1.jpg";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix Leaflet marker issue
const customIcon = new L.Icon({
  iconUrl: "data:image/svg+xml;base64," + btoa(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 40" width="32" height="40">
      <!-- Map Pin Shape -->
      <path fill="black" stroke="#EAB308" stroke-width="2" d="M16 0C9 0 3 6 3 13c0 9.5 11.5 21 12.5 22 .5.5 1 .5 1.5 0C17.5 34 29 22.5 29 13 29 6 23 0 16 0z"/>
      <!-- Yellow Dot in Center -->
      <circle cx="16" cy="13" r="5" fill="#EAB308"/>
    </svg>
  `),
  iconSize: [32, 40], // Adjust size if needed
  iconAnchor: [16, 40], // Ensures correct placement
  popupAnchor: [0, -35],
});


const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const baseURL = "https://maps.gomaps.pro/maps/api/place/nearbysearch/json";

const categories = [
  { label: "Hotels", keyword: "hotel" },
  { label: "Restaurants", keyword: "restaurant" },
  { label: "Tourist Spots", keyword: "tourist attraction" },
  { label: "Cafes", keyword: "cafe" },
];

const mapViews = {
  Roadmap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  Satellite: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  Terrain: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
  Hybrid: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
};

function NearbyPlaces({ coordinates }) {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [keyWord, setKeyWord] = useState("hotel");
  const [mapKey, setMapKey] = useState(`${coordinates?.lat}-${coordinates?.lng}-${keyWord}`);
  const [mapView, setMapView] = useState("Roadmap");

  useEffect(() => {
    if (!coordinates) return;
    fetchNearbyPlaces();
  }, [coordinates, keyWord]);

  const fetchNearbyPlaces = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(baseURL, {
        params: {
          location: `${coordinates.lat},${coordinates.lng}`,
          radius: 3000,
          keyword: keyWord,
          key: API_KEY,
        },
      });

      if (response.data.status === "OK") {
        setPlaces(response.data.results);
        setMapKey(`${coordinates.lat}-${coordinates.lng}-${keyWord}`);
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

  return (
    <div className="flex h-[90vh] ">
      {/* Left Panel - List of Places */}
      <div className="w-[40%] h-[80%]  p-4 overflow-y-auto border border-red-500">
        {/* Category Buttons */}
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
          className="text-xl font-bold text-black text-center mb-4"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Nearby {keyWord.charAt(0).toUpperCase() + keyWord.slice(1)}
        </motion.h2>

        {/* Loading Indicator */}
        {loading && (
          <motion.div className="flex justify-center items-center h-20" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            <FaSpinner className="animate-spin text-yellow-500 text-4xl" />
          </motion.div>
        )}

        {/* Error Message */}
        {error && !loading && (
          <motion.p className="text-red-500 text-center font-semibold" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
            {error}
          </motion.p>
        )}

        {/* Places List */}
        {!loading && places.length > 0 && (
          <motion.div className="space-y-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.2 }}>
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
                <h3 className="text-lg font-bold text-black mt-2">{place.name}</h3>
                <p className="text-sm text-gray-600">{place.vicinity}</p>
                {keyWord === "hotel" && (
                  <button onClick={() => navigate(`/booking/${place?.name}`)} className="mt-3 bg-yellow-500 text-black font-semibold px-4 py-2 rounded-lg text-center hover:bg-yellow-600 transition">
                    Book Now
                  </button>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Right Panel - Map */}
      <div className="w-[60%] h-[80%] border relative flex flex-col">
  {/* Map View Selector - Fixed on Top */}
  <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black p-2 bg-opacity-30 rounded-lg shadow-md">
    {Object.keys(mapViews).map((view) => (
      <button
        key={view}
        onClick={() => setMapView(view)}
        className={`px-3 py-1 m-1 rounded-lg font-semibold ${
          mapView === view ? "bg-yellow-500 text-black" : "bg-gray-200 text-black"
        } hover:bg-yellow-600`}
      >
        {view}
      </button>
    ))}
  </div>

  {/* Map Container - Ensure it doesn't overlap */}
  {coordinates && (
    <div className="w-[100%] h-[100%] relative z-0">
      <MapContainer
        key={mapKey}
        center={[coordinates.lat, coordinates.lng]}
        zoom={14}
        className="w-full h-full"
      >
        <TileLayer url={mapViews[mapView]} />
        {places.map((place) => (
          <Marker
            key={place?.plus_code?.global_code}
            position={[place.geometry.location.lat, place.geometry.location.lng]}
            icon={customIcon}
          >
            <Popup>
              <strong>{place.name}</strong> <br />
              {place.vicinity}
            </Popup>
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              {place.name}
            </Tooltip>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )}
</div>

    </div>
  );
}

export default NearbyPlaces;
