import React from "react";
import { FaBars, FaTimes, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

const Navbar = ({
  logo,
  closeMobileMenu,
  handleProfileClick,
  setMenuOpen,
  menuOpen,
}) => {
  const location = useLocation();

  return (
    <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
      <div className="lg:flex-1 flex justify-center lg:justify-start">
        <img src={logo} alt="Logo" className="h-32" />
      </div>

      <ul className="hidden lg:flex space-x-6 font-semibold">
        {["Home", "About", "Explore"].map((item, index) => {
          const route = item === "Home" ? "/" : `/${item.toLowerCase()}`;
          const isActive = location.pathname === route;

          return (
            <li
              key={index}
              className={`relative ${isActive ? "text-yellow-500" : ""}`}
            >
              <Link to={route} onClick={closeMobileMenu}>
                <span
                  className={`${
                    isActive
                      ? "relative pb-2 px-4 after:absolute after:left-0 after:bottom-[-2px] after:h-[4px] after:w-full after:bg-yellow-400"
                      : ""
                  }`}
                >
                  {item}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="lg:flex-1 flex items-center justify-end space-x-4">
        <FaUser
          className="text-black cursor-pointer hidden lg:block"
          onClick={handleProfileClick}
        />

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-black text-2xl focus:outline-none"
        >
          {menuOpen ? (
            <FaTimes className="text-yellow-500" />
          ) : (
            <FaBars className="text-yellow-500" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
