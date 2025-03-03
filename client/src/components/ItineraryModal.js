import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaPlus, FaEye, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { fetchItineraries } from "../services/itineraryService"; // Import service

const ItineraryModal = ({ isOpen, onClose, onSelect }) => {
    const [itineraries, setItineraries] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        if (isOpen) {
            const loadItineraries = async () => {
                try {
                    const data = await fetchItineraries();
                    setItineraries(data);
                } catch (error) {
                    console.error("Failed to load itineraries:", error.message);
                }
            };

            loadItineraries();
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]" onClick={onClose}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white w-2/3 h-2/3 p-6 rounded-xl shadow-lg border-4 border-yellow-500 z-[10000]"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <h2 className="text-2xl font-bold text-black mb-4">Select an Itinerary</h2>
                <ul className="space-y-2">
                    {itineraries.map((itinerary) => (
                        <motion.li 
                            key={itinerary._id} 
                            className="p-3 border flex justify-between items-center text-black bg-white rounded-lg cursor-pointer transition-all"
                            whileHover={{
                                scale: 1.01, 
                                boxShadow: "0px 5px 15px rgba(0,0,0,0.2)",
                                backgroundColor: "#f3f4f6" // Light yellow background on hover
                            }}
                            transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                            <span className="font-medium">{itinerary.title}</span>
                            <span className="font-medium">{itinerary._id}</span>

                            <div className="flex gap-5 text-xl">
                                <motion.div
                                    whileHover={{ y: [-3, 3] }}
                                    transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
                                >
                                    <FaEye onClick={() => navigate(`/itinerary/${itinerary._id}` )} className="hover:text-black text-yellow-500 cursor-pointer" title="Preview" />
                                </motion.div>

                                <motion.div
                                    whileHover={{ y: [-3, 3] }}
                                    transition={{ repeat: Infinity, duration: 0.4, ease: "easeInOut" }}
                                >
                                    <FaPlus onClick={() => onSelect(itinerary._id)} className="hover:text-black text-yellow-500 cursor-pointer" title="Add" />
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
            </motion.div>
        </div>
    );
};

export default ItineraryModal;
