import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { FaPlus, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ItineraryHome = () => {
    const [itineraries, setItineraries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchItineraries();
    }, []);

    const fetchItineraries = async () => {
        const { data } = await axios.get("http://localhost:5000/api/itineraries");
        setItineraries(data);
    };

    return (
        <div className="flex items-center justify-center min-h-[90%] px-4">
            <div className="w-full max-w-md md:max-w-xl lg:max-w-5xl mt-4 min-h-[80vh] flex flex-col items-center bg-white p-4 md:p-6 rounded-xl shadow-lg border">
                <h2 className="text-xl md:text-2xl font-bold text-black mb-4">Select an Itinerary</h2>

                {/* Itinerary List */}
                <ul className="space-y-3 w-full flex-1 overflow-auto">
                    {itineraries.map((itinerary) => (
                        <motion.li 
                            key={itinerary._id} 
                            className="p-3 border flex flex-col sm:flex-row items-center text-black bg-white rounded-lg cursor-pointer transition-all"
                            whileHover={{
                                scale: 1.02, 
                                boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                                backgroundColor: "#f3f4f6"
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <span className="font-medium text-left flex-1 text-sm sm:text-base">{itinerary.title}</span>
                            <span className="font-medium text-gray-500 text-xs sm:text-sm">{itinerary._id}</span>

                            {/* Icons */}
                            <div className="flex gap-3 text-lg sm:text-xl mt-2 sm:mt-0">
                                <motion.div
                                    whileHover={{ y: [-3, 3] }}
                                    transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
                                >
                                    <FaEye 
                                        onClick={() => navigate(`/itinerary/${itinerary._id}`)} 
                                        className="hover:text-black text-yellow-500 cursor-pointer" 
                                        title="Preview" 
                                    />
                                </motion.div>
                                <motion.div
                                    whileHover={{ y: [-3, 3] }}
                                    transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
                                >
                                    <FaTrash className="hover:text-black text-yellow-500 cursor-pointer" title="Delete" />
                                </motion.div>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ItineraryHome;
