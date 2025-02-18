import { useState, useEffect, useRef, useCallback } from "react";
import { FaBars, FaTimes, FaSearch, FaUser } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";
import logo from "../images/navLogo-2.png";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false); // State for profile menu toggle
  const profileMenuRef = useRef(null); // Ref for profile menu
  const menuRef = useRef(null); // Ref for mobile menu
  const location = useLocation(); // Get the current route

  // Close both profile and mobile menus when clicking outside
  const handleClickOutside = useCallback((event) => {
    // Check if the click is outside of both menus
    if (
      profileMenuRef.current && !profileMenuRef.current.contains(event.target) &&
      menuRef.current && !menuRef.current.contains(event.target)
    ) {
      setProfileMenuOpen(false); // Close profile menu
      setMenuOpen(false); // Close mobile menu
    }
  }, []);

  // Add event listener on mount and clean up on unmount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleProfileClick = () => {
    setProfileMenuOpen(!profileMenuOpen); // Toggle profile menu on click
  };

  const handleSignOut = () => {
    localStorage.removeItem("authToken"); // Remove auth token from localStorage
    window.location.reload(); // Reload the page to reflect changes
  };

  const closeMobileMenu = () => {
    setMenuOpen(false); // Close mobile menu
  };

  const closeProfileMenu = () => {
    setProfileMenuOpen(false); // Close profile menu
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-md p-4 sticky top-0 left-0 z-50">
      <div className="container mx-auto px-4 lg:px-8 flex items-center justify-between h-16">
        {/* Logo (Centered on small screens) */}
        <div className="lg:flex-1 flex justify-center lg:justify-start">
          <img src={logo} alt="Logo" className="h-32" />
        </div>

        {/* Navigation Links - Hidden on small screens */}
        <ul className="hidden lg:flex space-x-6 font-semibold">
          {["Home", "About", "Contact"].map((item, index) => {
            const route = item === "Home" ? "/" : `/${item.toLowerCase()}`;
            const isActive = location.pathname === route; // Check if the current path matches the link

            return (
              <li key={index} className={`relative ${isActive ? "text-yellow-500" : ""}`}>
                <Link to={route} onClick={closeMobileMenu}>
                  <span
                    className={`${isActive ? "relative pb-2 px-4 after:absolute after:left-0 after:bottom-[-2px] after:h-[4px] after:w-full after:bg-yellow-400" : ""}`}
                  >
                    {item}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Icons & Menu Button */}
        <div className="lg:flex-1 flex items-center justify-end space-x-4">
          <FaSearch className="text-black cursor-pointer hidden lg:block" />
          <FaUser
            className="text-black cursor-pointer hidden lg:block"
            onClick={handleProfileClick}
          />

          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-black text-2xl focus:outline-none"
          >
            {menuOpen ? <FaTimes className="text-yellow-500" /> : <FaBars className="text-yellow-500" />}
          </button>
        </div>
      </div>

      {/* Profile Menu (Drawer Options) */}
      {profileMenuOpen && (
        <div
          ref={profileMenuRef} // Attach ref to the profile menu
          className="absolute right-0 top-16 bg-white shadow-lg border rounded-md w-40 p-4"
        >
          <ul className="flex flex-col items-start py-2 space-y-2 text-black font-semibold">
            {localStorage.getItem("authToken") ? (
              <>
                <li className="hover:text-yellow-500">
                  <Link to="/profile" onClick={closeProfileMenu}>Profile</Link>
                </li>
                <li className="hover:text-yellow-500 cursor-pointer" onClick={() => { handleSignOut(); closeProfileMenu(); }}>
                  Sign Out
                </li>
              </>
            ) : (
              <>
                <li className="hover:text-white hover:font-bold rounded-md hover:bg-yellow-400 w-full p-2">
                  <Link to="/login" onClick={closeProfileMenu}>Login</Link>
                </li>
                <li className="hover:text-white hover:font-bold rounded-md hover:bg-yellow-400 w-full p-2">
                  <Link to="/signup" onClick={closeProfileMenu}>Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      )}

      {/* Mobile Menu */}
      {menuOpen && (
        <div ref={menuRef} className="lg:hidden bg-white absolute top-16 left-0 w-full shadow-lg">
          <ul className="flex flex-col items-center py-4 space-y-4 font-semibold">
            {["Home", "About", "Contact", "Login", "SignUp"].map((item, index) => {
              const route = item === "Home" ? "/" : `/${item.toLowerCase()}`;
              const isActive = location.pathname === route; // Check if the current path matches the link

              return (
                <li key={index} className={`relative ${isActive ? "text-yellow-500" : ""}`}>
                  <Link to={route} onClick={closeMobileMenu}>
                    <span
                      className={`${isActive ? "relative pb-2 px-4 after:absolute after:left-0 after:bottom-[-2px] after:h-[4px] after:w-full after:bg-yellow-400" : ""}`}
                    >
                      {item}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
