const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        phone: { type: String },
        address: { type: String,  },
        encryptedPassword: { type: String, required: true },
        profilePic:{type: String},
        plan: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
