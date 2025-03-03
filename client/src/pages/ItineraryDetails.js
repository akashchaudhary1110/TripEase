import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useParams } from "react-router-dom";
import {
  fetchItinerary,
  updateItineraryOrder,
  downloadItineraryPDF,
} from "../services/itineraryService";

const ItineraryDetails = () => {
  const [itinerary, setItinerary] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const loadItinerary = async () => {
      const data = await fetchItinerary(id);
      setItinerary(data);
    };
    loadItinerary();
  }, [id]);

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const updatedItems = Array.from(itinerary.destinations);
    const [movedItem] = updatedItems.splice(result.source.index, 1);
    updatedItems.splice(result.destination.index, 0, movedItem);

    setItinerary({ ...itinerary, destinations: updatedItems });

    await updateItineraryOrder(id, updatedItems);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">
          {itinerary?.title || "Loading..."}
        </h2>
        {itinerary && (
          <button
            onClick={() => downloadItineraryPDF(itinerary)}
            className="bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-4 py-2 rounded-md shadow-md transition"
          >
            Download PDF
          </button>
        )}
      </div>

      {itinerary ? (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="itinerary">
            {(provided) => (
              <ul
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="mt-4"
              >
                {itinerary.destinations.map((place, index) => (
                  <Draggable
                    key={place._id}
                    draggableId={place._id}
                    index={index}
                  >
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className="p-2 border my-2 bg-white shadow-md cursor-pointer"
                      >
                        {place.placeName} - {place.address}
                      </li>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </ul>
            )}
          </Droppable>
        </DragDropContext>
      ) : (
        <p>Loading itinerary...</p>
      )}
    </div>
  );
};

export default ItineraryDetails;
