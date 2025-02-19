const express = require("express");
const multer = require("multer");
const { uploadImage } = require("../controlllers/imageUploadController");


const router = express.Router();

// Multer storage (temporary)
const upload = multer({ dest: "uploads/" });

// Upload Image Route
router.post("/", upload.single("image"), uploadImage);

module.exports = router;
