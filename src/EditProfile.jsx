import React, { useState } from 'react';
import './EditProfile.css';

function EditProfile(props) {
    const [newEmail, setNewEmail] = useState('');
    const [newLocation, setNewLocation] = useState('');
    const [newBio, setNewBio] = useState('');
    const [newMobile, setNewMobile] = useState('');
    const [newGender, setNewGender] = useState('');
    const [newDateOfBirth, setNewDateOfBirth] = useState('');
    const [newFirstname, setNewFirstname] = useState('');
    const [newLastname, setNewLastname] = useState('');
    const [message, setMessage] = useState('');

    const handleEditProfile = async () => {
        const data = {
            firstname: newFirstname,
            lastname: newLastname,
            email: newEmail,
            location: newLocation,
            bio: newBio,
            mobile: newMobile,
            gender: newGender,
            dateofbirth: newDateOfBirth // Ensure this matches the Java field name
        };

        console.log('Sending data:', data);

        try {
            const response = await fetch('http://localhost:8080/editProfile', {
                method: 'PUT',
                headers: {
                    Authorization: 'Bearer ' + props.token,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({data})
            });
        
            if (response.ok) {
                setMessage("تم حفظ المعلومات");
            } else {
                const errorData = await response.json();
                console.error('Failed to update profile:', errorData);
                setMessage("Failed to update profile");
            }
        } catch (error) {
            console.error('Error:', error);
            setMessage("Error occurred while updating profile");
        }
    };

    return (
        <div className="edit-profile-container">
            <h2>Edit Profile</h2>
            <label>Firstname:</label>
            <input type="text" value={newFirstname} onChange={(e) => setNewFirstname(e.target.value)} />
            <label>Lastname:</label>
            <input type="text" value={newLastname} onChange={(e) => setNewLastname(e.target.value)} />
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
            {message && <p>{message}</p>}
        </div>
    );
}

export default EditProfile;
