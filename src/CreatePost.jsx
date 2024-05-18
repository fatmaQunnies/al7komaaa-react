import { useEffect, useState } from "react";
import './Post.css';

import ImageWithToken from "./ImageWithToken.jsx";

function CreatePost(props){
  const [userInfo, setUserInfo] = useState({username: '', userid: 0});
  const [dufImage, setDufImage] = useState('49e40f05-46ad-42b6-a2f3-6270d67cb6df_download.jpeg');
  const [input, setInput] = useState('');
  const [idPost, setIdPost] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);

  const addContent = async (input) => {
    try {
      const response = await fetch("http://localhost:8080/post/create", {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + props.token,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: input }) 
      });

      if (response.ok) {
        const data = await response.text();
       
    
        console.log("Content added:", data);
        return setIdPost(data); 
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async (id) => {
    if (!idPost) {
      console.error('Post ID is not set. Image upload aborted.');
      return;
    }

    if (!selectedFile) {
      console.error('No file selected for upload.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await fetch("http://localhost:8080/post/"+{id}+"/create/image", {
        method: 'POST',
        headers: {
          Authorization: 'Bearer ' + props.token,
        },
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        console.log("Image uploaded:", data);
      } else {
        console.error('Failed to upload image:', response.statusText);
      }
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  };

  const functionCreate = async () => {
  const id=  await addContent(input);
  
    if (selectedFile) {
      await handleUpload(id);
    }
  };

  useEffect(() => {
    // You can use this useEffect for any initial setup if needed
  }, []);

  return (
    <div className="post">
      <div className="userNameImage">
        {/* <ImageWithToken CName={"image"} type={"getImage"} userinfo={userInfo.id} token={props.token}></ImageWithToken> */}
        {/* <img src={`http://localhost:8080/getImage/${userInfo.userid}`} alt="" /> */}
        <a className="userNameAnchor" href="/Profile">{userInfo.username}</a>
        {/* <div><p className="postDate">{props.info.timestamp}</p></div> */}
        {/* <div className="edit-del-btn">
          <EditDelBtn token={props.token} id={props.id} renderFunction={props.renderFunction} ownerPost={userInfo.userid} userId={props.userId}/>
        </div> */}
      </div>

      <input
        className="postContent"
        placeholder="write the post content"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <div className="edit-profile-image-container">
        <input type="file" onChange={handleFileChange} />
      </div>
      <button onClick={functionCreate}>Create Post</button>
    </div>
  );
}

export default CreatePost;
