const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadImage = async (req, res) => {
    try {
        const file = req.file;
        if (!file) return res.status(400).json({ error: "No file uploaded" });

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(file.path, {
            folder: "profile_pictures", // Save inside Cloudinary folder
        });

        // Delete the file from the server after upload
        fs.unlinkSync(file.path);

        res.json({ imageUrl: result.secure_url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Image upload failed" });
    }
};

module.exports = { uploadImage };
