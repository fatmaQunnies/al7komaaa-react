import { useEffect, useState } from "react";
import './CreatePost.css';
import ImageWithToken from "./ImageWithToken.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function CreateReal(props) {
  const [input, setInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUpload, setShowUpload] = useState(false);

  const addContent = async (input,id) => {
    try {
      const response = await fetch(`http://localhost:8080/post/${id}/reals/create/content`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + props.token,
          'Content-Type': 'application/json'
        },
        body:  input 
      });

      if (response.ok) {
        // const data = await response.text();
        console.log("Content added:", response);
        // return data;
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
    // return null;
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (id) => {
    if (!selectedFile) {
      console.error('No file selected for upload.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch(`http://localhost:8080/post/reals/create`, {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + props.token,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.text();
        console.log("Content added:", response);
        return data;
      } else {
        console.error('Failed to upload image:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const functionCreate = async () => {
  
    if (selectedFile) {
        var id =    await handleUpload();  }
 if (id && input) {
      
        await addContent(input,id);
    }

    toast.success('Reel created successfully', {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false, 
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored"
    });
  };

  return (
    <div className="post">
      <div className="userNameImage">
        <ImageWithToken CName={"centered-image"} type={"getImage"} userinfo={props.userId} token={props.token}></ImageWithToken>
        <a className="userNameAnchor" href="/Profile">{props.userInfo.username}</a>
      </div>
  
      <textarea
        className="postContent"
        placeholder="Write the post content"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
  
      <div className={`edit-profile-image-container ${showUpload ? 'show-upload' : ''}`}>
        <p>Please upload an video</p>
        <input type="file" onChange={handleFileChange} />
      </div>
  
      <div className="buttons">
        <button id="upload-button" onClick={() => setShowUpload(!showUpload)}>
          {showUpload ? "Cancel Upload" : "Upload video"}
        </button>
        <button onClick={functionCreate}>Create Reel</button>
      </div>
  
      <ToastContainer />
    </div>
  );
  
}

export default CreateReal;
