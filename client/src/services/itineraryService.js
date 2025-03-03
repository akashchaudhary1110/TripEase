import API from "../utils/AxiosInterceptor";

export const fetchItineraries = async () => {
  try {
    const response = await API.get("/api/itineraries");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching itineraries:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to fetch itineraries"
    );
  }
};

export const createItinerary = async (title, userId) => {
  try {
    const response = await API.post("/api/itineraries/create", {
      title,
      user: userId,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error creating itinerary:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to create itinerary"
    );
  }
};

export const fetchItinerary = async (itineraryId) => {
  try {
    const response = await API.get(`/api/itineraries/${itineraryId}`);
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching itinerary:",
      error.response?.data || error.message
    );
  }
};

export const updateItineraryOrder = async (itineraryId, newOrder) => {
  try {
    const response = await API.put(`/api/itineraries/${itineraryId}/reorder`, {
      newOrder,
    });
    return response.data;
  } catch (error) {
    console.error(
      "Error updating itinerary order:",
      error.response?.data || error.message
    );
  }
};

export const downloadItineraryPDF = (itinerary) => {
  if (!itinerary) return;

  const jsPDF = require("jspdf");
  const autoTable = require("jspdf-autotable");

  const doc = new jsPDF();
  doc.setFont("helvetica", "bold");
  doc.setFontSize(18);
  doc.text(itinerary.title, 15, 20);

  const tableColumn = ["#", "Place Name", "Address"];
  const tableRows = itinerary.destinations.map((place, index) => [
    index + 1,
    place.placeName,
    place.address,
  ]);

  autoTable(doc, {
    head: [tableColumn],
    body: tableRows,
    startY: 30,
    theme: "grid",
    styles: { fontSize: 12 },
    headStyles: { fillColor: [255, 223, 0] },
  });

  doc.save(`${itinerary.title}.pdf`);
};

export const addPlaceToItinerary = async (itineraryId, place) => {
  try {
    const response = await API.post(
      `/api/itineraries/${itineraryId}/add-place`,
      {
        placeName: place.name,
        address: place.vicinity,
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error adding place to itinerary:",
      error.response?.data || error.message
    );
    throw new Error(
      error.response?.data?.message || "Failed to add place to itinerary"
    );
  }
};
