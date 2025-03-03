import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const mapViews = {
  Roadmap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  Satellite: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  Terrain:
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
  Hybrid: "https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}",
};

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

export default function MapView({ coordinates, places, mapKey }) {
  const [mapView, setMapView] = useState("Roadmap");

  return (
    <div className="w-[60%] h-[80%] border relative flex flex-col">
      {/* Map View Selector - Fixed on Top */}
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

      {/* Map Container - Ensure it doesn't overlap */}
      {coordinates && (
        <div className="w-[100%] h-[100%] relative z-0">
          <MapContainer
            key={mapKey}
            center={[coordinates.lat, coordinates.lng]}
            zoom={14}
            className="w-full h-full"
          >
            <TileLayer url={mapViews[mapView]} />
            {places.map((place) => (
              <Marker
                key={place?.plus_code?.global_code}
                position={[
                  place.geometry.location.lat,
                  place.geometry.location.lng,
                ]}
                icon={customIcon}
              >
                <Popup>
                  <strong>{place.name}</strong> <br />
                  {place.vicinity}
                </Popup>
                <Tooltip direction="top" offset={[0, -10]} opacity={1}>
                  {place.name}
                </Tooltip>
              </Marker>
            ))}
          </MapContainer>
        </div>
      )}
    </div>
  );
}
