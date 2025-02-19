const express = require("express");

const authMiddleware = require("../middleware/authMiddleware");
const { fetchUserById, updateUserById } = require("../controlllers/userController");

const router = express.Router();


router.get("/fetchUser/:id", authMiddleware, fetchUserById);


router.put("/updateUser/:id", authMiddleware, updateUserById);

module.exports = router;
