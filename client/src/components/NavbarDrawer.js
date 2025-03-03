import React from 'react'
import { Link, useLocation } from 'react-router-dom';

const NavbarDrawer = ({menuRef , closeMobileMenu}) => {
    const location = useLocation();
  return (
    <div ref={menuRef} className="lg:hidden bg-white absolute top-16 left-0 w-full shadow-lg">
    <ul className="flex flex-col items-center py-4 space-y-4 font-semibold">
      {["Home", "About", "Contact", "Login", "SignUp"].map((item, index) => {
        const route = item === "Home" ? "/" : `/${item.toLowerCase()}`;
        const isActive = location.pathname === route; 

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
  )
}

export default NavbarDrawer