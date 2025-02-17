import { useState } from "react";
import axios from "axios";
import NearbyPlaces from "./NearbyFetch";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY; // Ensure this is set in .env
const baseURL = "https://maps.gomaps.pro/maps/api/geocode/json";

function CityCoordinates() {
    const [city, setCity] = useState("");
    const [coordinates, setCoordinates] = useState(null);
    const [error, setError] = useState("");

    const getCoordinates = async () => {
        console.log(API_KEY, "API Key");

        if (!city) return;

        try {
            const response = await axios.get(baseURL, {
                params: { address: city, key: API_KEY }
            });

            if (response.data.status === "OK") {
                console.log(response.data, "Data");
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
        <div className="p-4">
            <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="Enter city name"
                className="border p-2 mr-2"
            />
            <button onClick={getCoordinates} className="bg-blue-500 text-white px-4 py-2">
                Get Coordinates
            </button>

            {coordinates && (
                <p className="mt-2">Coordinates: Lat: {coordinates.lat}, Lng: {coordinates.lng}</p>
            )}
            {error && <p className="text-red-500">{error}</p>}

            {/* Pass coordinates to NearbyPlaces component */}
            {coordinates && <NearbyPlaces coordinates={coordinates} />}
        </div>
    );
}

export default CityCoordinates;






// import axios from "axios";

// async function getCoordinates(place) {
//     const API_KEY = process.env.GOOGLE_MAPS_API_KEY;
//     const baseURL = 'https://maps.gomaps.pro/maps/api/geocode/json';
    
//     try {
//         const response = await axios.get(baseURL, {
//             params: {
//                 address: place,
//                 key: API_KEY
//             }
//         });

//         if (response.data.status === "OK") {
//             const location = response.data.results[0].geometry.location;
//             console.log(`Coordinates for ${place}: Lat: ${location.lat}, Lng: ${location.lng}`);
//         } else {
//             console.log(`Error: ${response.data.status}`);
//         }
//     } catch (error) {
//         console.error('Error fetching data:', error.message);
//     }
// }

// export default getCoordinates;

// // Example usage with user input
// // const userInput = "Agra, India";
// // getCoordinates(userInput);
