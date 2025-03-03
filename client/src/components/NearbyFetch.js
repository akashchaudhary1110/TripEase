import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "leaflet/dist/leaflet.css";
import ItineraryModal from "./ItineraryModal";
import MapView from "./MapView";
import PlacesList from "./PlacesList";
import { addPlaceToItinerary } from "../services/itineraryService";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const baseURL = "https://maps.gomaps.pro/maps/api/place/nearbysearch/json";

const categories = [
  { label: "Hotels", keyword: "hotel" },
  { label: "Restaurants", keyword: "restaurant" },
  { label: "Tourist Spots", keyword: "tourist attraction" },
  { label: "Cafes", keyword: "cafe" },
];

function NearbyPlaces({ coordinates }) {
  const navigate = useNavigate();
  const [places, setPlaces] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [directionCoordinates , setDirectionCoordinates] = useState();
  const [keyWord, setKeyWord] = useState("hotel");
  const [mapKey, setMapKey] = useState(
    `${coordinates?.lat}-${coordinates?.lng}-${keyWord}`
  );
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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

  const addToItinerary = async (itineraryId) => {
    if (!selectedPlace) return;

    try {
        await addPlaceToItinerary(itineraryId, selectedPlace);
        setModalIsOpen(false);
        alert("Place added to itinerary!");
    } catch (error) {
        alert(error.message);
    }
};

  const openModal = (place) => {
    setSelectedPlace(place);
    setModalIsOpen(true);
  };

  return (
    <div className="flex h-[90vh] overflow-hidden">
      <PlacesList
        categories={categories}
        error={error}
        keyWord={keyWord}
        loading={loading}
        openModal={openModal}
        places={places}
        setKeyWord={setKeyWord}
        setDirectionCoordinates = {setDirectionCoordinates}
      />

      <MapView coordinates={coordinates} places={places} mapKey={mapKey} directionCoordinates={directionCoordinates} setDirectionCoordinates = {setDirectionCoordinates} />
      <ItineraryModal
        isOpen={modalIsOpen}
        onClose={() => setModalIsOpen(false)}
        onSelect={addToItinerary}
      />
    </div>
  );
}

export default NearbyPlaces;
