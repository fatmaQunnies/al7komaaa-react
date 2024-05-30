import React, { useState } from 'react';
import './EditProfile.css';
import { json } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

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

    const token = props.token;

    const handleEditProfile = async () => {
        try {
            if (newFirstname) {
                await fetch('http://localhost:8080/editFirstName', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body:newFirstname
                });
            }

            if (newLastname) {
                await fetch('http://localhost:8080/editLastName', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body:newLastname
                });
            }

            if (newEmail) {
                await fetch('http://localhost:8080/editEmail', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: newEmail
                });
            }

            if (newLocation) {
                await fetch('http://localhost:8080/editLocation', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: newLocation
                });
            }

            if (newBio) {
                await fetch('http://localhost:8080/editBio', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: newBio
                });
            }

            if (newMobile) {
                await fetch('http://localhost:8080/editMobile', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: newMobile
                });
            }

            if (newGender) {
                await fetch('http://localhost:8080/editGender', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body:newGender
                });
            }

            if (newDateOfBirth) {
                await fetch('http://localhost:8080/editDof', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(newDateOfBirth)
                });
            }

            // تعيين رسالة النجاح
            setMessage('Profile updated successfully');
        } catch (error) {
            // تعيين رسالة الخطأ في حالة وجود أي خطأ أثناء تحديث الملف الشخصي
            setMessage('Error updating profile');
        }
    };

    return (
        <div className="edit-profile-container">
            <div className="post">
                <h1>Edit Profile</h1>
                
                <div className="edit-profile-item">
                    <label>Firstname:</label>
                    <input type="text" value={newFirstname} onChange={(e) => setNewFirstname(e.target.value)} />
                </div>
                <div className="edit-profile-item">
                    <label>Lastname:</label>
                    <input type="text" value={newLastname} onChange={(e) => setNewLastname(e.target.value)} />
                </div>
                <div className="edit-profile-item">
                    <label>Email:</label>
                    <input type="text" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
                </div>
                <div className="edit-profile-item">
                    <label>Location:</label>
                    <input type="text" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
                </div>
                <div className="edit-profile-item">
                    <label>Bio:</label>
                    <textarea value={newBio} onChange={(e) => setNewBio(e.target.value)}></textarea>
                </div>
                <div className="edit-profile-item">
                    <label>Mobile:</label>
                    <input type="text" value={newMobile} onChange={(e) => setNewMobile(e.target.value)} />
                </div>
                <div className="edit-profile-item">
                    <label>Gender:</label>
                    <select value={newGender} onChange={(e) => setNewGender(e.target.value)}>
                    <option value={"\"MALE\""}>MALE</option>
                <option value={"\"FEMALE\""}>FEMALE</option>
                    </select>
                </div>
                <div className="edit-profile-item">
                    <label>Date of Birth:</label>
                    <input type="date" value={newDateOfBirth} onChange={(e) => setNewDateOfBirth(e.target.value)} />
                </div>

                <button onClick={handleEditProfile}>Save Changes</button>
                {message && <p>{message}</p>}
            </div>
        </div>
    );
}

export default EditProfile;