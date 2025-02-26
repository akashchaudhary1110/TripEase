import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

import Navbar from "./components/Navbar.js";
import "tailwindcss/tailwind.css";
import LandingPage from "./pages/LandingPage.js";
import Login from "./pages/Login.js";
// import Signup from "./pages/Signup.js";
import About from "./pages/AboutUs.js";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "./utils/GlobalContext.js";
import Profile from "./pages/Profile.js";
import Signup from "./pages/Signup.js";
import Explore from "./pages/Explore.js";
import HotelBooking from "./pages/HotelBooking.js";


const App = () => {
  return (
    <GlobalProvider>


    <Router>
      <ToastContainer theme="colored"/>
      <div className="bg-gray-100 dark:bg-black text-black dark:text-white min-h-screen">
        <Navbar />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          // className="mt-20" // Add margin-top here
        >
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/about" element={<About />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/booking/:hotelName" element={<HotelBooking />} />
            
          </Routes>
        </motion.div>
      </div>
    </Router>
    </GlobalProvider>
  );
};

export default App;
