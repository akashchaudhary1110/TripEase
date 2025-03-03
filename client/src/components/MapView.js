
import { useState, useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

const mapViews = {
  Roadmap: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  Satellite: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
  Terrain: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}",
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

export default function MapView({ coordinates, places, mapKey, directionCoordinates, setDirectionCoordinates }) {
  const [mapView, setMapView] = useState("Roadmap");
  const [currentLocation, setCurrentLocation] = useState(null);
  const [locationError, setLocationError] = useState(null);
  const [showDirections, setRouteInstructions ] = useState(); // ✅ Controls visibility of route text

  // Fetch user's current location using geolocation
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
          setLocationError("Location access denied. Please allow it in browser settings.");
        } else if (error.code === 2) {
          setLocationError("Location unavailable. Try again later.");
        } else if (error.code === 3) {
          setLocationError("Location request timed out. Refresh and try again.");
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
              mapView === view ? "bg-yellow-500 text-black" : "bg-gray-200 text-black"
            } hover:bg-yellow-600`}
          >
            {view}
          </button>
        ))}
      </div>

   
      
      {/* Clear Directions Button */}
      {directionCoordinates && (
        <button
          onClick={() => setDirectionCoordinates(null)}
          className="absolute top-4 left-4 z-50 bg-red-500 text-white px-3 py-1 rounded-md shadow-md"
        >
          ✖ Clear Directions
        </button>
      )}

      {/* Map Container */}
      {coordinates && (
        <div className="w-[100%] h-[100%] relative z-0">
          <MapContainer key={mapKey} center={[coordinates.lat, coordinates.lng]} zoom={14} className="w-full h-full">
            <TileLayer url={mapViews[mapView]} />

            {/* User's Current Location */}
            {currentLocation && (
              <Marker position={[currentLocation.lat, currentLocation.lng]} icon={customIcon}>
                <Popup>Your Location</Popup>
              </Marker>
            )}

            {/* Show Place Markers if No Directions are Active */}
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

            {/* Show Route if directionCoordinates Exist */}
            {currentLocation && directionCoordinates && (
              <RoutingLayer start={currentLocation} end={directionCoordinates} directionCoordinates={directionCoordinates} />
            )}
          </MapContainer>
        </div>
      )}
    </div>
  );
}

// Routing Component for Directions with directions and the error is remove
// const RoutingLayer = ({ start, end }) => {
//   const map = useMap();
//   const routingControlRef = useRef(null);

//   useEffect(() => {
//     if (!map || !start || !end) return;

//     // ✅ Remove previous routing control safely
//     if (routingControlRef.current) {
//       try {
//         map.removeControl(routingControlRef.current);
//         routingControlRef.current.getPlan().setWaypoints([]); // ✅ Remove waypoints
//       } catch (error) {
//         console.error("Error removing existing route:", error);
//       }
//       routingControlRef.current = null;
//     }

//     // ✅ Ensure the map has layers before adding a new route
//     setTimeout(() => {
//       try {
//         routingControlRef.current = L.Routing.control({
//           waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
//           routeWhileDragging: false,
//           lineOptions: { styles: [{ color: "#EAB308", weight: 5 }] }, // ✅ Yellow Route
//           createMarker: (i, waypoint) => L.marker(waypoint.latLng, { icon: yellowMarkerIcon }), // ✅ Custom Yellow Marker
//           addWaypoints: false,
//           draggableWaypoints: false,
//           fitSelectedRoutes: true,
//           altLineOptions: { styles: [{ opacity: 0 }] },
//           router: L.Routing.osrmv1({ serviceUrl: "https://router.project-osrm.org/route/v1" }),
//           show: false, // ✅ Hide text-based directions
//         })
//           .on("routesfound", function (e) {
//             const instructions = e.routes[0].instructions.map((instr) => instr.text); // ✅ Extract Directions
//             // setRouteInstructions(instructions); // ✅ Save in State
//           })
//           .addTo(map);
//       } catch (error) {
//         console.error("Error creating new route:", error);
//       }
//     }, 100);

//     setTimeout(() => {
//       const instructionsUI = document.querySelector(".leaflet-routing-container");
//       if (instructionsUI) instructionsUI.style.display = "none";
//     }, 100);

//     // ✅ Cleanup function to remove route properly on unmount
//     return () => {
//       if (routingControlRef.current && map) {
//         try {
//           map.removeControl(routingControlRef.current);
//           routingControlRef.current.getPlan().setWaypoints([]); // ✅ Ensure route is cleared
//         } catch (error) {
//           console.error("Error cleaning up route:", error);
//         }
//         routingControlRef.current = null;
//       }
//     };
//   }, [map, start, end]);

//   return null;
// };


// with error but the directions are remove
// const RoutingLayer = ({ start, end }) => {
//   const map = useMap();
//   const routingControlRef = useRef(null);

//   useEffect(() => {
//     if (!map || !start || !end) return;

//     // ✅ Remove previous route (only if exists)
//     if (routingControlRef.current) {
//       map.removeControl(routingControlRef.current);
//       routingControlRef.current = null; // Prevents stale reference
//     }

//     // ✅ Create Routing Control (No Directions)
//     routingControlRef.current = L.Routing.control({
//       waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
//       routeWhileDragging: false,
//       lineOptions: { styles: [{ color: "#EAB308", weight: 5 }] }, // ✅ Yellow Route
//       createMarker: (i, waypoint) => L.marker(waypoint.latLng, { icon: yellowMarkerIcon }), // ✅ Custom Yellow Marker
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       altLineOptions: { styles: [{ opacity: 0 }] },
//       router: L.Routing.osrmv1({ serviceUrl: "https://router.project-osrm.org/route/v1" }),
//       show: false, // ✅ Hide text-based directions
//       routeWhileDragging: false, // ✅ Prevents manual dragging of route
//       formatter: new L.Routing.Formatter({ show: false }), // ✅ Ensure no text instructions
//     }).addTo(map);

//     // ✅ Remove route instructions UI
//     setTimeout(() => {
//       document.querySelectorAll(".leaflet-routing-container").forEach((el) => el.remove());
//     }, 100);

//     return () => {
//       if (routingControlRef.current) {
//         map.removeControl(routingControlRef.current);
//         routingControlRef.current = null;
//       }
//     };
//   }, [map, start, end]);

//   return null;
// };

//with both the error and the directions removed but the route is not getting cleared when we close the map 
// const RoutingLayer = ({ start, end }) => {
//   const map = useMap();
//   const routingControlRef = useRef(null);

//   useEffect(() => {
//     if (!map || !start || !end) return;

//     // ✅ Remove previous route safely
//     if (routingControlRef.current && map.hasLayer(routingControlRef.current)) {
//       try {
//         map.removeControl(routingControlRef.current);
//         routingControlRef.current = null;
//       } catch (error) {
//         console.warn("Error removing previous routing control:", error);
//       }
//     }

//     // ✅ Create New Routing Control (No Directions)
//     routingControlRef.current = L.Routing.control({
//       waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
//       routeWhileDragging: false,
//       lineOptions: { styles: [{ color: "#EAB308", weight: 5 }] }, // ✅ Yellow Route
//       createMarker: (i, waypoint) => L.marker(waypoint.latLng, { icon: yellowMarkerIcon }), // ✅ Custom Yellow Marker
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       altLineOptions: { styles: [{ opacity: 0 }] },
//       router: L.Routing.osrmv1({ serviceUrl: "https://router.project-osrm.org/route/v1" }),
//       show: false, // ✅ Hide text-based directions
//       routeWhileDragging: false, // ✅ Prevents manual dragging of route
//       formatter: new L.Routing.Formatter({ show: false }), // ✅ Ensure no text instructions
//     }).addTo(map);

//     // ✅ Remove route instructions UI
//     setTimeout(() => {
//       document.querySelectorAll(".leaflet-routing-container").forEach((el) => el.remove());
//     }, 100);

//     return () => {
//       if (routingControlRef.current && map.hasLayer(routingControlRef.current)) {
//         try {
//           map.removeControl(routingControlRef.current);
//           routingControlRef.current = null;
//         } catch (error) {
//           console.warn("Error removing routing control:", error);
//         }
//       }
//     };
//   }, [map, start, end]);

//   return null;
// };


// routes is getting removed and no error but when we zoom in and zoom out then the map shows all the old routes that were sent 
// const RoutingLayer = ({ start, end, directionCoordinates }) => {
//   const map = useMap();
//   const routingControlRef = useRef(null);

//   useEffect(() => {
//     if (!map || !start || !end) return;

//     // ✅ Remove previous route safely
//     if (routingControlRef.current) {
//       try {
//         if (map.hasLayer(routingControlRef.current)) {
//           map.removeControl(routingControlRef.current);
//         }
//         routingControlRef.current = null;
//       } catch (error) {
//         console.warn("Error removing previous routing control:", error);
//       }
//     }

//     // ✅ If directionCoordinates is null, remove any remaining route
//     if (!directionCoordinates) {
//       map.eachLayer((layer) => {
//         if (layer instanceof L.Polyline || layer.options?.waypoints) {
//           map.removeLayer(layer);
//         }
//       });
//       return;
//     }

//     // ✅ Create New Routing Control
//     routingControlRef.current = L.Routing.control({
//       waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
//       routeWhileDragging: false,
//       lineOptions: { styles: [{ color: "#EAB308", weight: 5 }] }, // ✅ Yellow Route
//       createMarker: (i, waypoint) => L.marker(waypoint.latLng, { icon: yellowMarkerIcon }), // ✅ Custom Yellow Marker
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       altLineOptions: { styles: [{ opacity: 0 }] },
//       router: L.Routing.osrmv1({ serviceUrl: "https://router.project-osrm.org/route/v1" }),
//       show: false, // ✅ Hide text-based directions
//       routeWhileDragging: false, // ✅ Prevents manual dragging of route
//       formatter: new L.Routing.Formatter({ show: false }), // ✅ Ensure no text instructions
//     }).addTo(map);

//     // ✅ Remove route instructions UI
//     setTimeout(() => {
//       document.querySelectorAll(".leaflet-routing-container").forEach((el) => el.remove());
//     }, 100);

//     return () => {
//       if (routingControlRef.current) {
//         try {
//           if (map.hasLayer(routingControlRef.current)) {
//             map.removeControl(routingControlRef.current);
//           }
//           routingControlRef.current = null;
//         } catch (error) {
//           console.warn("Error removing routing control:", error);
//         }
//       }

//       // ✅ Clean up leftover route layers (both control & polyline)
//       map.eachLayer((layer) => {
//         if (layer instanceof L.Polyline || layer.options?.waypoints) {
//           map.removeLayer(layer);
//         }
//       });
//     };
//   }, [map, start, end, directionCoordinates]);

//   return null;
// };



// const RoutingLayer = ({ start, end, directionCoordinates }) => {
//   const map = useMap();
//   const routingControlRef = useRef(null);

//   useEffect(() => {
//     if (!map || !start || !end) return;

//     // ✅ Remove previous route safely
//     if (routingControlRef.current) {
//       try {
//         if (map.hasLayer(routingControlRef.current)) {
//           map.removeControl(routingControlRef.current);
//         }
//         routingControlRef.current = null;
//       } catch (error) {
//         console.warn("Error removing previous routing control:", error);
//       }
//     }

//     // ✅ If directionCoordinates is null, remove any remaining route
//     if (!directionCoordinates) {
//       map.eachLayer((layer) => {
//         if (layer instanceof L.Polyline || layer.options?.waypoints) {
//           map.removeLayer(layer);
//         }
//       });
//       return;
//     }

//     // ✅ Create New Routing Control
//     routingControlRef.current = L.Routing.control({
//       waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
//       routeWhileDragging: false,
//       lineOptions: { styles: [{ color: "#EAB308", weight: 5 }] }, // ✅ Yellow Route
//       createMarker: (i, waypoint) => L.marker(waypoint.latLng, { icon: yellowMarkerIcon }), // ✅ Custom Yellow Marker
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       altLineOptions: { styles: [{ opacity: 0 }] },
//       router: L.Routing.osrmv1({ serviceUrl: "https://router.project-osrm.org/route/v1" }),
//       show: false, // ✅ Hide text-based directions
//       routeWhileDragging: false, // ✅ Prevents manual dragging of route
//       formatter: new L.Routing.Formatter({ show: false }), // ✅ Ensure no text instructions
//     }).addTo(map);

//     // ✅ Remove route instructions UI
//     setTimeout(() => {
//       document.querySelectorAll(".leaflet-routing-container").forEach((el) => el.remove());
//     }, 100);

//     // ✅ Handle Zoom Reset: Remove Old Routes on Zoom Change
//     const handleZoomChange = () => {
//       map.eachLayer((layer) => {
//         if (layer instanceof L.Polyline || layer.options?.waypoints) {
//           map.removeLayer(layer);
//         }
//       });
//     };
//     map.on("zoomend", handleZoomChange);

//     return () => {
//       if (routingControlRef.current) {
//         try {
//           if (map.hasLayer(routingControlRef.current)) {
//             map.removeControl(routingControlRef.current);
//           }
//           routingControlRef.current = null;
//         } catch (error) {
//           console.warn("Error removing routing control:", error);
//         }
//       }

//       // ✅ Clean up old route layers
//       map.eachLayer((layer) => {
//         if (layer instanceof L.Polyline || layer.options?.waypoints) {
//           map.removeLayer(layer);
//         }
//       });

//       // ✅ Remove zoom event listener when component unmounts
//       map.off("zoomend", handleZoomChange);
//     };
//   }, [map, start, end, directionCoordinates]);

//   return null;
// };


//stays route after zooming in 
// const RoutingLayer = ({ start, end, directionCoordinates }) => {
//   const map = useMap();
//   const routingControlRef = useRef(null);

//   useEffect(() => {
//     if (!map || !start || !end) return;

//     // ✅ Remove previous route safely
//     if (routingControlRef.current) {
//       try {
//         if (map.hasLayer(routingControlRef.current)) {
//           map.removeControl(routingControlRef.current);
//         }
//         routingControlRef.current = null;
//       } catch (error) {
//         console.warn("Error removing previous routing control:", error);
//       }
//     }

//     // ✅ Remove old routes only if no directionCoordinates are set
//     if (!directionCoordinates) {
//       map.eachLayer((layer) => {
//         if (layer instanceof L.Polyline || layer.options?.waypoints) {
//           map.removeLayer(layer);
//         }
//       });
//       return;
//     }

//     // ✅ Create New Routing Control
//     routingControlRef.current = L.Routing.control({
//       waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
//       routeWhileDragging: false,
//       lineOptions: { styles: [{ color: "#EAB308", weight: 5 }] }, // ✅ Yellow Route
//       createMarker: (i, waypoint) => L.marker(waypoint.latLng, { icon: yellowMarkerIcon }), // ✅ Custom Yellow Marker
//       addWaypoints: false,
//       draggableWaypoints: false,
//       fitSelectedRoutes: true,
//       altLineOptions: { styles: [{ opacity: 0 }] },
//       router: L.Routing.osrmv1({ serviceUrl: "https://router.project-osrm.org/route/v1" }),
//       show: false, // ✅ Hide text-based directions
//       routeWhileDragging: false, // ✅ Prevents manual dragging of route
//       formatter: new L.Routing.Formatter({ show: false }), // ✅ Ensure no text instructions
//     }).addTo(map);

//     // ✅ Remove route instructions UI
//     setTimeout(() => {
//       document.querySelectorAll(".leaflet-routing-container").forEach((el) => el.remove());
//     }, 100);

//     // ✅ Handle Zoom Reset: Only Remove Stale Routes if No Directions Are Active
//     const handleZoomChange = () => {
//       if (!directionCoordinates) {
//         map.eachLayer((layer) => {
//           if (layer instanceof L.Polyline || layer.options?.waypoints) {
//             map.removeLayer(layer);
//           }
//         });
//       }
//     };
//     map.on("zoomend", handleZoomChange);

//     return () => {
//       if (routingControlRef.current) {
//         try {
//           if (map.hasLayer(routingControlRef.current)) {
//             map.removeControl(routingControlRef.current);
//           }
//           routingControlRef.current = null;
//         } catch (error) {
//           console.warn("Error removing routing control:", error);
//         }
//       }

//       // ✅ Remove zoom event listener when component unmounts
//       map.off("zoomend", handleZoomChange);
//     };
//   }, [map, start, end, directionCoordinates]);

//   return null;
// };


const RoutingLayer = ({ start, end, directionCoordinates }) => {
  const map = useMap();
  const routingControlRef = useRef(null);

  useEffect(() => {
    if (!map || !start || !end) return;

    // ✅ Remove previous routing control
    if (routingControlRef.current) {
      try {
        routingControlRef.current.getPlan().setWaypoints([]);
        map.removeControl(routingControlRef.current);
        routingControlRef.current = null;
      } catch (error) {
        console.warn("Error removing previous routing control:", error);
      }
    }

    // ✅ If directionCoordinates exist, create a new route
    if (directionCoordinates) {
      routingControlRef.current = L.Routing.control({
        waypoints: [L.latLng(start.lat, start.lng), L.latLng(end.lat, end.lng)],
        routeWhileDragging: false,
        lineOptions: { styles: [{ color: "#EAB308", weight: 5 }] }, // ✅ Yellow Route
        createMarker: (i, waypoint) => L.marker(waypoint.latLng, { icon: yellowMarkerIcon }), // ✅ Custom Yellow Marker
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: true,
        altLineOptions: { styles: [{ opacity: 0 }] },
        router: L.Routing.osrmv1({ serviceUrl: "https://router.project-osrm.org/route/v1" }),
        show: false, // ✅ Hide text-based directions
        routeWhileDragging: false, // ✅ Prevents manual dragging of route
        formatter: new L.Routing.Formatter({ show: false }), // ✅ Ensure no text instructions
      }).addTo(map);

      // ✅ Remove route instructions UI
      setTimeout(() => {
        document.querySelectorAll(".leaflet-routing-container").forEach((el) => el.remove());
      }, 100);
    }

    return () => {
      if (routingControlRef.current) {
        try {
          routingControlRef.current.getPlan().setWaypoints([]);
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        } catch (error) {
          console.warn("Error removing routing control:", error);
        }
      }
    };
  }, [map, start, end, directionCoordinates]);

  // ✅ Extra Cleanup: Remove Route When `directionCoordinates` Becomes Null
  useEffect(() => {
    if (!directionCoordinates) {
      // ✅ Remove all polylines related to routing
      map.eachLayer((layer) => {
        if (layer instanceof L.Polyline || layer.options?.waypoints) {
          try {
            map.removeLayer(layer);
          } catch (error) {
            console.warn("Error removing leftover route layer:", error);
          }
        }
      });

      // ✅ Remove route control manually if still present
      if (routingControlRef.current) {
        try {
          routingControlRef.current.getPlan().setWaypoints([]);
          map.removeControl(routingControlRef.current);
          routingControlRef.current = null;
        } catch (error) {
          console.warn("Error removing final routing control:", error);
        }
      }
    }
  }, [directionCoordinates, map]);

  return null;
};











