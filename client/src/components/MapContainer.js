import React from 'react';
import { TileLayer, Marker, Popup, Tooltip,  MapContainer } from "react-leaflet";
import RoutingLayer from './RoutingLayer';


const MapContainerBOX = ({mapKey, coordinates, currentLocation ,mapViews, mapView,directionCoordinates, customIcon, places, yellowMarkerIcon}) => {
  return (
    <div className="w-[100%] h-[100%] relative z-0">
    <MapContainer key={mapKey} center={[coordinates.lat, coordinates.lng]} zoom={14} className="w-full h-full">
      <TileLayer url={mapViews[mapView]} />

      {/* User's Current Location */}
      {currentLocation && (
        <Marker position={[currentLocation.lat, currentLocation.lng]} icon={customIcon}>
          <Popup>Your Location</Popup>
        </Marker>
      )}

     
      {!directionCoordinates &&
        places.map((place) => (
          <Marker
            key={place?.plus_code?.global_code}
            position={[place.geometry.location.lat, place.geometry.location.lng]}
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

      
      {currentLocation && directionCoordinates && (
        <RoutingLayer start={currentLocation} end={directionCoordinates} directionCoordinates={directionCoordinates} yellowMarkerIcon={yellowMarkerIcon} />
      )}
    </MapContainer>
  </div>
  )
}

export default MapContainerBOX;