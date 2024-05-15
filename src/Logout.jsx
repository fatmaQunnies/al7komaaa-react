import React from 'react';
import './Logout.css';

function Logout(props) {
    const handleLogout = async () => {
        try {
            const response = await fetch('/logout', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            if (response.ok) {
                // Logout successful, you can redirect the user to a login page for example
                props.history.push('/login');
            } else {
                console.error('Failed to logout');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="logout-container">
            <h2>Are you sure you want to logout?</h2>
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
}

export default Logout;
