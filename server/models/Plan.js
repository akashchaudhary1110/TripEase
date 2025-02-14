const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({
    destinationName: { type: String, required: true },
    hotelBookingDetails: { type: mongoose.Schema.Types.ObjectId, ref: "BookingDetails" },
    hasBookedHotel: { type: Boolean, default: false },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
});

module.exports = mongoose.model("Plan", PlanSchema);
