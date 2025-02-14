const mongoose = require("mongoose");

const BookingDetailsSchema = new mongoose.Schema({
    hotelName: { type: String, required: true },
    startingTime: { type: String, required: true },
    endTime: { type: String, required: true },
    amountPaid: { type: Number, required: true },
});

module.exports = mongoose.model("BookingDetails", BookingDetailsSchema);
