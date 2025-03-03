const Itinerary = require("../models/Itenerary");

// Get all itineraries
exports.getAllItineraries = async (req, res) => {
    try {
        const itineraries = await Itinerary.find().populate("user", "name email"); // Populate user details
        res.json(itineraries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create a new itinerary
exports.createItinerary = async (req, res) => {
    try {
        const { title } = req.body;
        const userId = req.user.id; // Extract userId from req.user

        if (!title) {
            return res.status(400).json({ message: "Title is required" });
        }

        const newItinerary = new Itinerary({ title, user: userId });
        await newItinerary.save();

        res.status(201).json(newItinerary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


// Add a place to an itinerary
exports.addPlaceToItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (!itinerary) return res.status(404).json({ message: "Itinerary not found" });

        if (!req.body.placeName || !req.body.address) {
            return res.status(400).json({ message: "Place name and address are required" });
        }

        itinerary.destinations.push({
            placeName: req.body.placeName,
            address: req.body.address
        });

        await itinerary.save();
        res.json(itinerary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get a specific itinerary
exports.getItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id).populate("user", "name email");
        if (!itinerary) return res.status(404).json({ message: "Itinerary not found" });

        res.json(itinerary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update itinerary order
exports.reorderItinerary = async (req, res) => {
    try {
        const { newOrder } = req.body;
        const itinerary = await Itinerary.findById(req.params.id);
        if (!itinerary) return res.status(404).json({ message: "Itinerary not found" });

        itinerary.destinations = newOrder;
        await itinerary.save();
        res.json(itinerary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete an itinerary
exports.deleteItinerary = async (req, res) => {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (!itinerary) {
            return res.status(404).json({ message: "Itinerary not found" });
        }

        // Ensure only the owner can delete their itinerary
        if (itinerary.user.toString() !== req.user.id) {
            return res.status(403).json({ message: "Not authorized to delete this itinerary" });
        }

        await Itinerary.findByIdAndDelete(req.params.id);
        res.json({ message: "Itinerary deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
