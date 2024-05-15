import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Setting.css';

function Setting(props) {
   

    return (
        <div className="setting-container">
            <Link to="/changePassword">
                <button>Change Password</button>
            </Link>
            <Link to="/editProfile">
                <button>Edit Profile</button>
            </Link>
            <Link to="/editImage">
                <button>Edit Profile Image</button>
            </Link>
            <Link to="/logout">
                <button>Log Out</button>
            </Link>
        </div>
    );
}

export default Setting;
