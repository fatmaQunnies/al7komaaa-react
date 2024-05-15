import React, { useState } from 'react';
import './EditProfileImage.css';

function EditProfileImage() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch('/editImage', {
                method: 'PUT',
                body: formData,
            });

            if (response.ok) {
                // Image uploaded successfully, you can redirect or show a success message
                window.location.href = '/editProfile'; // Redirect to edit profile page
            } else {
                console.error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="edit-profile-image-container">
            <h2>Edit Profile Image</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
}

export default EditProfileImage;
