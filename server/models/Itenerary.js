const mongoose = require("mongoose");

const itinerarySchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    destinations: [
        {
            placeName: String,
            address: String,
            addedAt: { type: Date, default: Date.now },
        }
    ],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Itinerary", itinerarySchema);
