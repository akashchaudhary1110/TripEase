import { useState, useEffect } from "react";
import axios from "axios";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Ensure this is set in .env
const baseURL = "https://maps.gomaps.pro/maps/api/place/nearbysearch/json";

function NearbyPlaces({ coordinates }) {
    const [places, setPlaces] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        if (!coordinates) return;

        const fetchNearbyPlaces = async () => {
            try {
                const response = await axios.get(baseURL, {
                    params: {
                        location: `${coordinates.lat},${coordinates.lng}`,
                        radius: 2000,
                        name: "Hotels", // You can change this to hotels, cafes, etc.
                        key: API_KEY
                    }
                });

                if (response.data.status === "OK") {
                    setPlaces(response.data.results);
                    setError("");
                } else {
                    setError(`Error: ${response.data.status}`);
                }
            } catch (error) {
                setError("Error fetching nearby places: " + error.message);
            }
        };

        fetchNearbyPlaces();
    }, [coordinates]);

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold">Nearby Restaurants</h2>
            {error && <p className="text-red-500">{error}</p>}
            <ul>
                {places.map((place) => (
                    <li key={place.place_id} className="border p-2 my-2">
                        <strong>{place.name}</strong> - {place.vicinity}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default NearbyPlaces;
