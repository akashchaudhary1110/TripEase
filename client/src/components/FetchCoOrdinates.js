import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import exploreVideo from "../images/explore_hero.mp4";
import useCheckAndProceed from "../hooks/useCheckAndProceed";
import ExploreSearchBarSection from "./ExploreSearchBarSection";
import ExploreHeroSection from "./ExploreHeroSection";

const API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
const baseURL = "https://maps.gomaps.pro/maps/api/geocode/json";

function CityCoordinates() {
  const [city, setCity] = useState("");
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();
  const checkAndProceed = useCheckAndProceed();

  const getCoordinates = async () => {
    if (!city) return;

    try {
      const response = await axios.get(baseURL, {
        params: { address: city, key: API_KEY },
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

  const openModal = () => {
    checkAndProceed(() => setIsModalOpen(true));
  };

  const navigateItineraries = () => {
    checkAndProceed(() => navigate("/itineraries"));
  };

  return (
    <>
      <div className=" overflow-hidden flex flex-col items-center bg-white">
        <ExploreSearchBarSection
          city={city}
          getCoordinates={getCoordinates}
          navigateItineraries={navigateItineraries}
          openModal={openModal}
          setCity={setCity}
        />
        <ExploreHeroSection
          coordinates={coordinates}
          error={error}
          exploreVideo={exploreVideo}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      </div>
    </>
  );
}

export default CityCoordinates;
