import React, { useState } from 'react';
import './EditProfileImage.css';

function EditProfileImage(props) {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            const response = await fetch(`http://localhost:8080/editImage`, {
                method: 'PUT', 
                headers: {
                    'Authorization': 'Bearer ' + props.token
                  },
                body: formData,
            });

            if (response.ok) {
              
                console.log("Image uploaded:", response);
            } else {
                console.error('Failed to upload image');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="edit-profile-image-containerr">
            <h2>Edit Profile Image</h2>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload Image</button>
        </div>
    );
}

export default EditProfileImage;
