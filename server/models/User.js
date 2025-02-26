const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String },
        address: { type: String },
        encryptedPassword: { type: String, required: true },
        profilePic: { type: String, default: "" },
        plan: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }],
        itineraries: [{ type: mongoose.Schema.Types.ObjectId, ref: "Itinerary" }] // Added field to store user-created itineraries
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
