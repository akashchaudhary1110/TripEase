import React from 'react'
import { Link } from 'react-router-dom';

const ProfileMenu = ({profileMenuRef , closeProfileMenu, handleSignOut}) => {
  return (
    <div
    ref={profileMenuRef}
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
  )
}

export default ProfileMenu