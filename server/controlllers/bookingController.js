const BookingDetails = require("../models/BookingDetails");


exports.createBooking = async (req, res) => {
    try {
        const { hotelName, startingTime, endTime, amountPaid, personCount,personsDetail } = req.body;

        if (!hotelName || !startingTime || !endTime || !amountPaid || !personCount) {
            return res.status(400).json({ message: "All fields are required." });
        }

        const newBooking = new BookingDetails({
            userID: req.user._id, 
            hotelName,
            startingTime,
            endTime,
            amountPaid,
            personCount,
            personsDetail
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


exports.getUserBookings = async (req, res) => {
    try {
        const userId = req.user._id;

        const bookings = await BookingDetails.find({ userID: userId })
            .sort({ createdAt: -1 }) 
            .lean();

        if (!bookings.length) {
            return res.status(200).json({ message: "No bookings found.", bookings: [] });
        }


        res.status(200).json({ bookings });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


