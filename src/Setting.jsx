import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Setting.css';

function Setting(props) {
    const [isDarkMode, setIsDarkMode] = useState(false);
    const toggleMode = () => {
        // Update the state to toggle between dark and light modes
        setIsDarkMode(prevMode => !prevMode);
    
        // Make an API call to update the mode on the server
        fetch('http://localhost:8080/editMode', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + props.token
    },
})
.then(response => {
    if (!response.ok) {
        throw new Error('Failed to update mode on the server');
    }
    // Parse the response body as JSON
    return response.json();
})
.then(data => {
    // Access the boolean value returned by the server
    console.log('Mode updated successfully. New mode:', data);
    setIsDarkMode(data);
})
.catch(error => {
    console.error('Error updating mode:', error);
    // You can handle errors appropriately, such as displaying an error message
});

    };
    
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

            <button onClick={toggleMode}>Toggle Mode</button>
        </div>
    );
}

export default Setting;
