const User = require("../models/User");

const fetchUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }
        res.json(user);
    } catch (error) {
        next(error);
    }
};


const updateUserById = async (req, res, next) => {
    try {
        const { name, email,address,phone,profilePic } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            req.params.id,
            { name, email,phone, address,profilePic },
            { new: true }
        );

        if (!updatedUser) {
            const error = new Error("User not found");
            error.statusCode = 404;
            return next(error);
        }

        res.json(updatedUser);
    } catch (error) {
        next(error);
    }
};

module.exports = { fetchUserById, updateUserById };
