import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Setting.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

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
    


    const [themeMode, setThemeMode] = useState('dark'); // Default theme mode is dark

    const toggleThemeMode = () => {
        setThemeMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark')); // Toggle between dark and light mode
    };
    return (
        <div className="setting-container">
        {/* <div className='post' style={{ display: 'flex'}}>
      <div className='bett'>
      <div className='post'> changePassword</div> <Link to="/changePassword">
            <button>Change Password</button>
        </Link></div> </div> */}





<div className="c2">
                    <div className="c3">
                        <div className="c4">
                        Change Password
                        </div>
                        <div className="c5">
                            <div className="c6"></div>
                            <div className="c7"></div>
                        </div>
                    </div>
                    <Link to="/changePassword">
            <button>Change Password</button>
        </Link>
                </div>
           






                



                


<div className="c2">
                    <div className="c3">
                        <div className="c4">
                        Edit Profile Image
                        </div>
                        <div className="c5">
                            <div className="c6"></div>
                            <div className="c7"></div>
                        </div>
                    </div>
                    <Link to="/editImage">
            <button>Edit Profile Image</button>
        </Link>
                </div>



                <div className="c2">
                    <div className="c3">
                        <div className="c4">
                        Edit Background Image
                        </div>
                        <div className="c5">
                            <div className="c6"></div>
                            <div className="c7"></div>
                        </div>
                    </div>
                    <Link to="/editBackground">
            <button>Edit Background Image</button>
        </Link>
                </div>


                


<div className="c2">
                    <div className="c3">
                        <div className="c4">
                        Edit Profile
                        </div>
                        <div className="c5">
                            <div className="c6"></div>
                            <div className="c7"></div>
                        </div>
                    </div>
                    <Link to="/editProfile">
            <button>Edit Profile</button>
        </Link>
                </div>

                <div className="c2">
                    <div className="c3">
                        <div className="c4">
                        Log Out
                        </div>
                        <div className="c5">
                            <div className="c6"></div>
                            <div className="c7"></div>
                        </div>
                    </div>
                    <Link to="/logout">
            <button>Log Out</button>
        </Link>
                </div>
        {/* <Link to="/editProfile">
            <button>Edit Profile</button>
        </Link>
        <Link to="/editImage">
            <button>Edit Profile Image</button>
        </Link>
        <Link to="/logout">
            <button>Log Out</button>
        </Link> */}
    </div>
    );
}

export default Setting;
