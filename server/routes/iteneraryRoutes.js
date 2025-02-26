const express = require("express");

const { reorderItinerary, createItinerary, addPlaceToItinerary, getItinerary, getAllItineraries } = require("../controlllers/itineraryController");
const router = express.Router();

router.post("/create", createItinerary);
router.post("/:id/add-place", addPlaceToItinerary);
router.get("/:id", getItinerary);
router.put("/:id/reorder", reorderItinerary);
router.get("/", getAllItineraries);


module.exports = router;
