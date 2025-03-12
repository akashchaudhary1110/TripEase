const mongoose = require("mongoose");

const PersonSchema = new mongoose.Schema({
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    aadhar: { type: String, default: "" },
    gender: { type: String, enum: ["Male", "Female", "Other"], default: "Male" } 
});


const BookingDetailsSchema = new mongoose.Schema({
    userID: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    hotelName: { type: String, required: true },
    startingTime: { type: String, required: true },
    endTime: { type: String, required: true },
    amountPaid: { type: Number, required: true },
    personCount: { type: Number, required: true },
    personsDetail: { type: [PersonSchema], required: true, default: [] } // 👈 Ensure a default empty array
});

module.exports = mongoose.model("BookingDetails", BookingDetailsSchema);
