import { useState } from "react";
import { FaBars, FaTimes, FaSearch, FaUser } from "react-icons/fa";
import logo from "../images/navLogo-2.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-md p-4">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
        {/* Logo (Centered on small screens) */}
        <div className="lg:flex-1 flex justify-center lg:justify-start">
          <img src={logo} alt="Logo" className="h-32" />
        </div>

        {/* Navigation Links - Hidden on small screens */}
        <ul className="hidden lg:flex space-x-6 text-black font-semibold">
          {["Home", "Pages", "Destinations", "Tours", "Blog", "Shop", "Elements"].map((item, index) => (
            <li key={index} className="hover:text-yellow-500 relative">
              {item === "Home" ? (
                <span className="text-black relative after:absolute after:left-0 after:bottom-[-2px] after:h-[4px] after:w-full after:bg-yellow-400">
                  {item}
                </span>
              ) : (
                <span>{item}</span>
              )}
            </li>
          ))}
        </ul>

        {/* Icons & Menu Button */}
        <div className="lg:flex-1 flex items-center justify-end space-x-4">
          <FaSearch className="text-black cursor-pointer hidden lg:block" />
          <FaUser className="text-black cursor-pointer hidden lg:block" />

          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-black text-2xl focus:outline-none"
          >
            {menuOpen ? <FaTimes className="text-yellow-500" /> : <FaBars className="text-yellow-500" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="lg:hidden bg-white absolute top-16 left-0 w-full shadow-lg">
          <ul className="flex flex-col items-center py-4 space-y-4 text-black font-semibold">
            {["Home", "Pages", "Destinations", "Tours", "Blog", "Shop", "Elements"].map((item, index) => (
              <li key={index} className="hover:text-yellow-500">
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
