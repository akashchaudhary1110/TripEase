import { useState, useEffect, useRef } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Tooltip,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";
import RoutingLayer from "./RoutingLayer";
import MapContainerBOX from "./MapContainer";

const mapViews = {
  Roadmap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  Satellite: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  Terrain:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
  Hybrid: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
};

// Your existing custom marker
const customIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 40' width='32' height='40'>
      <path fill='black' stroke='#EAB308' stroke-width='2' d='M16 0C9 0 3 6 3 13c0 9.5 11.5 21 12.5 22 .5.5 1 .5 1.5 0C17.5 34 29 22.5 29 13 29 6 23 0 16 0z'/>
      <circle cx='16' cy='13' r='5' fill='#EAB308'/>
    </svg>
  `),
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -35],
});

const yellowMarkerIcon = new L.Icon({
  iconUrl:
    "data:image/svg+xml;base64," +
    btoa(`
    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 40' width='32' height='40'>
      <path fill='#EAB308' stroke='black' stroke-width='2' d='M16 0C9 0 3 6 3 13c0 9.5 11.5 21 12.5 22 .5.5 1 .5 1.5 0C17.5 34 29 22.5 29 13 29 6 23 0 16 0z'/>
      <circle cx='16' cy='13' r='5' fill='black'/>
    </svg>
  `),
  iconSize: [32, 40],
  iconAnchor: [16, 40],
  popupAnchor: [0, -35],
});

export default function MapView({
  coordinates,
  places,
  mapKey,
  directionCoordinates,
  setDirectionCoordinates,
}) {
  const [mapView, setMapView] = useState("Roadmap");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [showDirections, setRouteInstructions] = useState(); 
  useEffect(() => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setCurrentLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
        setLocationError(null);
      },
      (error) => {
        console.error("Error fetching location:", error);
        if (error.code === 1) {
          setLocationError(
            "Location access denied. Please allow it in browser settings."
          );
        } else if (error.code === 2) {
          setLocationError("Location unavailable. Try again later.");
        } else if (error.code === 3) {
          setLocationError(
            "Location request timed out. Refresh and try again."
          );
        } else {
          setLocationError("An unknown error occurred.");
        }
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  }, []);

  return (
    <div className="w-[60%] h-[80%] border relative flex flex-col">
      {/* Error Message */}
      {locationError && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white p-2 rounded-md shadow-lg z-50">
          {locationError}
        </div>
      )}

      {/* Map View Selector */}
      <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-50 bg-black p-2 bg-opacity-30 rounded-lg shadow-md">
        {Object.keys(mapViews).map((view) => (
          <button
            key={view}
            onClick={() => setMapView(view)}
            className={`px-3 py-1 m-1 rounded-lg font-semibold ${
              mapView === view
                ? "bg-yellow-500 text-black"
                : "bg-gray-200 text-black"
            } hover:bg-yellow-600`}
          >
            {view}
          </button>
        ))}
      </div>

      {directionCoordinates && (
        <button
          onClick={() => setDirectionCoordinates(null)}
          className="absolute top-4 left-4 z-50 bg-red-500 text-white px-3 py-1 rounded-md shadow-md"
        >
          ✖ Clear Directions
        </button>
      )}

      {coordinates && (
        <MapContainerBOX
          coordinates={coordinates}
          currentLocation={currentLocation}
          customIcon={customIcon}
          directionCoordinates={directionCoordinates}
          mapKey={mapKey}
          mapView={mapView}
          mapViews={mapViews}
          places={places}
          yellowMarkerIcon={yellowMarkerIcon}
        />
      )}
    </div>
  );
}
