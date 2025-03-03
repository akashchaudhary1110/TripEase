import { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";

const CreateItineraryModal = ({ isOpen, onClose }) => {
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleCreateItinerary = async () => {
        if (!title.trim()) {
            setError("Itinerary title is required.");
            return;
        }

        setLoading(true);
        try {
            const userId = "user123"; // Replace with actual logged-in user ID
            await axios.post("http://localhost:5000/api/itineraries/create", { title, user: userId });
            setLoading(false);
            onClose(); // Close modal on success
        } catch (err) {
            setError("Failed to create itinerary.");
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-[9999]" onClick={onClose}>
            <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="bg-white w-1/3 p-6 rounded-xl shadow-lg border-4 border-yellow-500 z-[10000]"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            >
                <h2 className="text-2xl font-bold text-black mb-4">Create New Itinerary</h2>
                
                {error && <p className="text-red-500 mb-2">{error}</p>}

                <input 
                    type="text" 
                    value={title} 
                    onChange={(e) => setTitle(e.target.value)} 
                    placeholder="Enter itinerary title" 
                    className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />

                <button 
                    onClick={handleCreateItinerary} 
                    disabled={loading} 
                    className="bg-yellow-500 text-black px-4 py-2 rounded-lg w-full"
                >
                    {loading ? "Creating..." : "Create Itinerary"}
                </button>
            </motion.div>
        </div>
    );
};

export default CreateItineraryModal;
