import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { faHome, faUserFriends, faUser, faFilm, faCog, faEnvelope, faThumbsUp } from '@fortawesome/free-solid-svg-icons';
function Navbar() {
  return (
    <div className="navbar">
      <ul>
        <li>
          <Link to="/feed">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
        </li> 
        <li>
          <Link to="/Reel">
            <FontAwesomeIcon icon={faFilm} /> Reel
          </Link>
        </li>
        
        <li>
          <Link to="/Friends">
            <FontAwesomeIcon icon={faUserFriends} /> Friends
          </Link>
        </li>
        
       
       
        <li>
          <Link to="/Messages">
            <FontAwesomeIcon icon={faEnvelope} />  Messages  
          </Link>
        </li>
        <li>
          <Link to="/Likes">
            <FontAwesomeIcon icon={faThumbsUp} /> Likes
          </Link>
        </li>

        <li>
          <Link to="/profile">
            <FontAwesomeIcon icon={faUser} />  Profile
          </Link>
        </li>
        <li>
          <Link to="/Setting">
            <FontAwesomeIcon icon={faCog} /> Setting
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Navbar;
