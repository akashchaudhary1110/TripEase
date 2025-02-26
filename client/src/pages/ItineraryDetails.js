import { useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import axios from "axios";
import { useParams } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const ItineraryDetails = () => {
    const [itinerary, setItinerary] = useState(null);
    const { id } = useParams();
    const itineraryId = id;

    useEffect(() => {
        fetchItinerary();
    }, [itineraryId]);

    const fetchItinerary = async () => {
        try {
            const { data } = await axios.get(`http://localhost:5000/api/itineraries/${itineraryId}`);
            setItinerary(data);
        } catch (error) {
            console.error("Error fetching itinerary:", error);
        }
    };

    const handleDragEnd = async (result) => {
        if (!result.destination) return;

        const updatedItems = Array.from(itinerary.destinations);
        const [movedItem] = updatedItems.splice(result.source.index, 1);
        updatedItems.splice(result.destination.index, 0, movedItem);

        setItinerary({ ...itinerary, destinations: updatedItems });

        try {
            await axios.put(`http://localhost:5000/api/itineraries/${itineraryId}/reorder`, {
                newOrder: updatedItems,
            });
        } catch (error) {
            console.error("Error updating itinerary order:", error);
        }
    };

    const downloadPDF = () => {
        if (!itinerary) return;
    
        const doc = new jsPDF();
        doc.setFont("helvetica", "bold");
        doc.setFontSize(18);
        doc.text(itinerary.title, 15, 20); // Title at the top
    
        const tableColumn = ["#", "Place Name", "Address"];
        const tableRows = itinerary.destinations.map((place, index) => [
            index + 1,
            place.placeName,
            place.address,
        ]);
    
        // Correct way to use autoTable
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30, // Position below title
            theme: "grid",
            styles: { fontSize: 12 },
            headStyles: { fillColor: [255, 223, 0] }, // Yellow header
        });
    
        doc.save(`${itinerary.title}.pdf`);
    };
    
    

    return (
        <div className="p-4">
            <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold">{itinerary?.title || "Loading..."}</h2>
                {itinerary && (
                    <button
                        onClick={downloadPDF}
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
                            <ul {...provided.droppableProps} ref={provided.innerRef} className="mt-4">
                                {itinerary.destinations.map((place, index) => (
                                    <Draggable key={place._id} draggableId={place._id} index={index}>
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
