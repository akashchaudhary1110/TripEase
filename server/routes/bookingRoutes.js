const express = require("express");
const { createBooking, getAllBookings, getUserBookings } = require("../controlllers/bookingController");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();



router.post("/create", authMiddleware, createBooking); 
router.get("/all", authMiddleware, getAllBookings); 
router.get("/userBookings", authMiddleware, getUserBookings);

module.exports = router;
