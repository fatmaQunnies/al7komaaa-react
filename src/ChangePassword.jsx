// ChangePassword.jsx
import React, { useState } from 'react';
import './ChangePassword.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';


function ChangePassword(props) {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [error, setError] = useState('');

    const handleChangePassword = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/changePassword', {
                method: 'PUT',
                                  headers: {
                        Authorization: 'Bearer ' + props.token,
                        'Content-Type': 'application/json'
                      },
                body: JSON.stringify({
                    oldPassword: oldPassword,
                    newPassword: newPassword
                })
            });

            const responseData = await response.json();

            if (!response.ok) {
           
                throw new Error(responseData.message || 'Failed to change password');
            }

            alert(responseData.message);
         
            setOldPassword('');
            setNewPassword('');
            setError('');
        } catch (error) {
            console.error('Error:', error.message);
            setError(error.message);
        }
    ;

    };

    return (
        <div className="change-password-container">
            <h2>Change Password</h2>
            <input
                type="password"
                placeholder="Old Password"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
            />
            <input
                type="password"
                placeholder="New Password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            {error && <p className="error-message">{error}</p>}
            <button onClick={handleChangePassword}>Change Password</button>
        </div>
    );

}
export default ChangePassword;
