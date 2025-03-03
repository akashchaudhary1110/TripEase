import { useState } from "react";
import axios from "axios";
import NearbyPlaces from "./NearbyFetch";
import CreateItineraryModal from "./CreateItineraryModal"; // Import modal component

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const baseURL = "https://maps.gomaps.pro/maps/api/geocode/json";

function CityCoordinates() {
    const [city, setCity] = useState("");
    const [coordinates, setCoordinates] = useState(null);
    const [error, setError] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false); // Modal State

    const getCoordinates = async () => {
        if (!city) return;

        try {
            const response = await axios.get(baseURL, {
                params: { address: city, key: API_KEY }
            });

            if (response.data.status === "OK") {
                const location = response.data.results[0].geometry.location;
                setCoordinates(location);
                setError("");
            } else {
                setError(`Error: ${response.data.status}`);
            }
        } catch (error) {
            setError("Error fetching data: " + error.message);
        }
    };

    return (
        <div className="p-4 overflow-hidden">
            <div className="flex w-full justify-between">
                <div>
                    <input type="text" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter city name" className="border p-2 mr-2"/>
                    <button onClick={getCoordinates} className="bg-blue-500 text-white px-4 py-2">Get Coordinates</button>
                    {coordinates && <p className="mt-2">Coordinates: Lat: {coordinates.lat}, Lng: {coordinates.lng}</p>}
                </div>
                <div className="flex justify-between">
                    {/* Open Modal Button */}
                    {coordinates && 
                    
                    <button onClick={() => setIsModalOpen(true)} className="bg-yellow-500 text-black px-4 py-2 mt-2">
                        Create Itinerary
                    </button>

                    }
                </div>
            </div>

            {error && <p className="text-red-500">{error}</p>}

            {coordinates && <NearbyPlaces coordinates={coordinates} />}

            {/* Modal Component */}
            {isModalOpen && <CreateItineraryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />}
        </div>
    );
}

export default CityCoordinates;
