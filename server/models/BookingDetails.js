const mongoose = require("mongoose");

const BookingDetailsSchema = new mongoose.Schema({
     userID: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    hotelName: { type: String, required: true },
    startingTime: { type: String, required: true },
    endTime: { type: String, required: true },
    amountPaid: { type: Number, required: true },
    personCount:{type:String,},
});

module.exports = mongoose.model("BookingDetails", BookingDetailsSchema);
