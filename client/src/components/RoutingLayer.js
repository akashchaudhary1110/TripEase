import { useEffect, useRef } from 'react'
import { useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet-routing-machine";

const RoutingLayer = ({ start, end, directionCoordinates ,yellowMarkerIcon }) => {
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

export default RoutingLayer