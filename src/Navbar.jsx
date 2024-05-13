import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/feed">Feed</Link>
        </li>
        <li>
          <Link to="/Friends">Friends</Link>
        </li>
        <li>
          <Link to="/profile">Profile</Link>
        </li>
        <li>
          <Link to="/Notification">Notification</Link>
        </li>
        <li>
          <Link to="/Reel">Reel</Link>
        </li>
        <li>
          <Link to="/Setting">Setting</Link>
        </li>
        <li>
          <Link to="/Messages">Messages</Link>
        </li>
        <li>
          <Link to="/Likes">Likes</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
