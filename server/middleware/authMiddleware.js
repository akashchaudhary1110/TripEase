// const jwt = require("jsonwebtoken");
// const User = require("../models/User");


// const authMiddleware = async (req, res, next) => {
//     try {
//         const token = req.header("Authorization");

//         if (!token) {
//             return res.status(401).json({ message: "Access denied. No token provided." });
//         }

//         const decoded = jwt.verify(token, process.env.JWT_SECRET);
//         const user = await User.findOne({ email: decoded.email });

//         if (!user) {
//             return res.status(401).json({ message: "Invalid token. User not found." });
//         }

//         req.user = user; // Attach user info to request
//         next(); // Proceed to next middleware/controller
//     } catch (error) {
//         return res.status(401).json({ message: "Invalid token." });
//     }
// };

// module.exports = authMiddleware;


const jwt = require("jsonwebtoken");
const User = require("../models/User");

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header("Authorization");
        if (!token) {
            return res.status(401).json({ message: "Access denied. No token provided." });
        }

        // Extract Bearer token
        const tokenParts = token.split(" ");
        if (tokenParts.length !== 2 || tokenParts[0] !== "Bearer") {
            return res.status(401).json({ message: "Invalid token format." });
        }

        const decoded = jwt.verify(tokenParts[1], process.env.JWT_SECRET);

        // Now find user with decoded ID (not email)
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(401).json({ message: "Invalid token. User not found." });
        }

        req.user = user; // Attach user info to request
        next(); // Proceed to next middleware/controller
    } catch (error) {
        if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired. Please login again." });
        }
        return res.status(401).json({ message: "Invalid token." });
    }
};

module.exports = authMiddleware;
