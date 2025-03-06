import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";
import LandingPage from "./pages/LandingPage.js";
import Login from "./pages/Login.js";
import About from "./pages/AboutUs.js";
import { ToastContainer } from "react-toastify";
import NavbarContainer from "./components/NavbarContainer.js";
import "react-toastify/dist/ReactToastify.css";
import { GlobalProvider } from "./utils/GlobalContext.js";
import Profile from "./pages/Profile.js";
import Signup from "./pages/Signup.js";
import Explore from "./pages/Explore.js";
import HotelBooking from "./pages/HotelBooking.js";
import ProtectedRoute from "./utils/ProtectedRoute.js";
import ItineraryDetails from "./pages/ItineraryDetails.js";
import ItineraryHome from "./pages/ItinerariesHome.js";

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <ToastContainer theme="colored" />
        <div className="bg-gray-100 dark:bg-black text-black dark:text-white min-h-screen">
          <NavbarContainer />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <Routes>
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about" element={<About />} />
              <Route path="/explore" element={<Explore />} />
              <Route
                path="/booking/:hotelName"
                element={
                  <ProtectedRoute>
                    <HotelBooking />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/itineraries"
                element={
                  <ProtectedRoute>
                    <ItineraryHome />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/itinerary/:id"
                element={
                  <ProtectedRoute>
                    <ItineraryDetails />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </motion.div>
        </div>
      </Router>
    </GlobalProvider>
  );
};

export default App;
