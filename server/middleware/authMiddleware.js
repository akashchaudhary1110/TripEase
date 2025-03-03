


const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        console.log(token,"token from the backend auth middleware")
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        const tokenParts = token.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(401).json({ message: "Invalid token format." });
        }

        const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);

        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Invalid token. User not found." });
        }

        req.user = user; 
        next(); 
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please login again." });
        }
        return res.status(401).json({ message: "Invalid token." });
    }
};

module.exports = authMiddleware;
