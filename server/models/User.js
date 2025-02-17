const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true, unique: true },
        encryptedPassword: { type: String, required: true },
        plan: [{ type: mongoose.Schema.Types.ObjectId, ref: "Plan" }],
    },
    { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
