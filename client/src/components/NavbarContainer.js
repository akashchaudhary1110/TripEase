import { useState, useEffect, useRef, useCallback } from "react";
import logo from "../images/navLogo-2.png";
import ProfileMenu from "./ProfileMenu";
import NavbarDrawer from "./NavbarDrawer";
import Navbar from "./Navbar";

const NavbarContainer = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const profileMenuRef = useRef(null);
  const menuRef = useRef(null);
 

  const handleClickOutside = useCallback((event) => {
    if (
      profileMenuRef.current &&
      !profileMenuRef.current.contains(event.target) &&
      menuRef.current &&
      !menuRef.current.contains(event.target)
    ) {
      setProfileMenuOpen(false);
      setMenuOpen(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleProfileClick = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const handleSignOut = () => {
    localStorage.removeItem("authToken");
    window.location.reload();
  };

  const closeMobileMenu = () => {
    setMenuOpen(false);
  };

  const closeProfileMenu = () => {
    setProfileMenuOpen(false);
  };

  return (
    <nav className="w-full bg-white border-b border-gray-200 shadow-md p-4 sticky top-0 left-0 z-50">
      <Navbar
        closeMobileMenu={closeMobileMenu}
        handleProfileClick={handleProfileClick}
        logo={logo}
        menuOpen={menuOpen}
        setMenuOpen={setMenuOpen}
      />

      {profileMenuOpen && (
        <ProfileMenu
          profileMenuRef={profileMenuRef}
          closeProfileMenu={closeProfileMenu}
          handleSignOut={handleSignOut}
        />
      )}

      {menuOpen && (
        <NavbarDrawer closeMobileMenu={closeMobileMenu} menuRef={menuRef} />
      )}
    </nav>
  );
};

export default NavbarContainer;
