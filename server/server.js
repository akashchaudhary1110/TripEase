const express = require("express")
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
const errorHandler = require("./middleware/errorMiddleware.js");
const uploadRoutes = require("./routes/imageUploadRoutes.js")
const bookingRoutes = require("./routes/bookingRoutes.js")
const itinerariesRoutes = require("./routes/iteneraryRoutes.js")

dotenv.config();


connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/itineraries", itinerariesRoutes);


app.get("/", (req, res) => {
    res.send(`<div>
        <h1>Hello , tripEase api is loading.......</h1>
        <button onClick = {alert("clicked")}>Click me </button>
    </div>`);
});




app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
