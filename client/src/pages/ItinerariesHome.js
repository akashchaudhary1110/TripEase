import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchItineraries } from "../services/itineraryService"; // Import service
import ItineraryList from "../components/ItineraryList";

const ItineraryHome = () => {
  const [itineraries, setItineraries] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const loadItineraries = async () => {
      try {
        const data = await fetchItineraries();
        setItineraries(data);
      } catch (error) {
        console.error("Failed to load itineraries:", error.message);
      }
    };

    loadItineraries();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-[90%] px-4">
      <div className="w-full max-w-md md:max-w-xl lg:max-w-5xl mt-4 min-h-[80vh] flex flex-col items-center bg-white p-4 md:p-6 rounded-xl shadow-lg border">
        <h2 className="text-xl md:text-2xl font-bold text-black mb-4">
          Select an Itinerary
        </h2>

  
     <ItineraryList itineraries={itineraries} />  
      </div>
    </div>
  );
};

export default ItineraryHome;
