import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";

// import SearchPage from "./pages/SearchPage";
// import ResultsPage from "./pages/ResultsPage";
import Navbar from "./components/Navbar.js";
// import Footer from "./components/Footer";
// import SearchBar from "./components/SearchBar";
// import PlaceCard from "./components/PlaceCard";
// import LoadingSpinner from "./components/LoadingSpinner";
import "tailwindcss/tailwind.css";
import LandingPage from "./pages/LandingPage.js";

const App = () => {
  return (
    <Router>
      <div className="bg-white dark:bg-black text-black dark:text-white min-h-screen">
        <Navbar />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* <Route path="/search" element={<SearchPage />} /> */}
            {/* <Route path="/results" element={<ResultsPage />} /> */}
          </Routes>
        </motion.div>
        {/* <Footer /> */}
      </div>
    </Router>
  );
};

export default App;
