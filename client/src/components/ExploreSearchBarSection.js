import React, { useState, useCallback } from "react";

const ExploreSearchBarSection = ({ city, setCity, getCoordinates, openModal, navigateItineraries }) => {
  const [isSearching, setIsSearching] = useState(false);


  const handleSearch = useCallback(() => {
    if (!city.trim() || isSearching) return;

    setIsSearching(true);
    getCoordinates();

    setTimeout(() => {
      setIsSearching(false);
    }, 1000); 
  }, [city, getCoordinates, isSearching]);

  return (
    <div className="flex flex-col md:flex-row w-full justify-between p-2 rounded-lg">
      <div className="w-full md:w-[75%] p-2 flex flex-col md:flex-row items-center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
          className="w-full md:w-[80%] border p-2 rounded-lg md:rounded-l-lg text-lg"
        />
        <button
          onClick={handleSearch}
          disabled={isSearching}
          className={`px-4 py-2 w-full md:w-auto mt-2 md:mt-0 md:rounded-r-lg border border-black text-lg ${
            isSearching ? "bg-gray-400 text-gray-800 cursor-not-allowed" : "bg-black text-white"
          }`}
        >
          {isSearching ? "Searching..." : "Search"}
        </button>
      </div>

    
      <div className="flex flex-col md:flex-row justify-center p-2 md:justify-end gap-4 w-full md:w-[25%]">
        <button
          onClick={openModal}
          className="bg-yellow-500 text-black px-4 py-2 rounded-lg w-full md:w-auto text-lg"
        >
          Create Itinerary
        </button>

        <button
          onClick={navigateItineraries}
          className="bg-black text-white px-4 py-2 rounded-lg w-full md:w-auto text-lg"
        >
          Itineraries
        </button>
      </div>
    </div>
  );
};

export default ExploreSearchBarSection;
