const express = require("express");
const {
    reorderItinerary,
    createItinerary,
    addPlaceToItinerary,
    getItinerary,
    getAllItineraries,
    deleteItinerary,
} = require("../controlllers/itineraryController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Apply authMiddleware to all routes
router.post("/create", authMiddleware, createItinerary);
router.post("/:id/add-place", authMiddleware, addPlaceToItinerary);
router.get("/:id", authMiddleware, getItinerary);
router.put("/:id/reorder", authMiddleware, reorderItinerary);
router.get("/", authMiddleware, getAllItineraries);
router.delete("/delete/:id", authMiddleware, deleteItinerary);

module.exports = router;
