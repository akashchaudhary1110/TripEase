const express = require("express");
const { createBooking, getAllBookings } = require("../controlllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();



router.post("/create", authMiddleware, createBooking); 
router.get("/all", authMiddleware, getAllBookings); 

module.exports = router;
