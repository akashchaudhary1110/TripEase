const BookingDetails = require("../models/BookingDetails");


exports.createBooking = async (req, res) => {
    try {
        const { hotelName, startingTime, endTime, amountPaid, personCount } = req.body;

        if (!hotelName || !startingTime || !endTime || !amountPaid || !personCount) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newBooking = new BookingDetails({
            userID: req.user._id, // User ID from authMiddleware
            hotelName,
            startingTime,
            endTime,
            amountPaid,
            personCount
        });

        await newBooking.save();
        res.status(201).json({ message: "Booking created successfully", booking: newBooking });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


exports.getAllBookings = async (req, res) => {
    try {
        const bookings = await BookingDetails.find().populate("userID", "name email");
        res.status(200).json(bookings);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};
