import React, { useState } from 'react';
import './EditProfile.css';

function EditProfile({ onSave }) {
    const [newEmail, setNewEmail] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newBio, setNewBio] = useState('');
    const [newMobile, setNewMobile] = useState('');
    const [newGender, setNewGender] = useState('');
    const [newDateOfBirth, setNewDateOfBirth] = useState('');

    const handleEditProfile = async () => {
        try {
            const response = await fetch('/editProfile', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: newEmail,
                    location: newLocation,
                    bio: newBio,
                    mobile: newMobile,
                    gender: newGender,
                    dateOfBirth: newDateOfBirth
                })
            });

            if (response.ok) {
         
                onSave();
            } else {
                console.error('Failed to update profile');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <label>Email:</label>
            <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            <label>Location:</label>
            <input type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
            <label>Bio:</label>
            <textarea value={newBio} onChange={(e) => setNewBio(e.target.value)}></textarea>
            <label>Mobile:</label>
            <input type="text" value={newMobile} onChange={(e) => setNewMobile(e.target.value)} />
            <label>Gender:</label>
            <select value={newGender} onChange={(e) => setNewGender(e.target.value)}>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
            </select>
            <label>Date of Birth:</label>
            <input type="date" value={newDateOfBirth} onChange={(e) => setNewDateOfBirth(e.target.value)} />
            <button onClick={handleEditProfile}>Save Changes</button>
        </div>
    );
}

export default EditProfile;
