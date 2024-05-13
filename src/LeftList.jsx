import React from 'react';
import './LeftList.css'; 
import { useEffect, useState } from "react";
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom'; // Import Router from react-router-dom
import Notfound from './Notfound.jsx';
import Navbar from './Navbar.jsx';


function LeftList(props) {
   
  const [numfeiend,setNumfeiend]=useState();
  const [id, setId] = useState(props.data.id);

  

  useEffect(() => {
    console.log("USEEFFECT == " + props.data.id);
    fetch(`http://localhost:8080/count/userFriend/${props.data.id}`, {
      headers: {
        'Authorization': 'Bearer ' + props.token
      }
    })
    .then(response => response.text())
    .then(data => {
      setNumfeiend(data);
      console.log("number friend" + numfeiend)
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);
  
  return (
    <div className="left-list">
        
      <img src={`http://localhost:8080/getImage/${props.data.id}`} alt="User" />
      <h1>{props.data.username}</h1>
      <p>{props.data.bio}</p>
      <p>{numfeiend}</p>

      {/* <Router>
        <Navbar />
        <Routes>
          <Route index element={<Notfound />} />
          <Route path="Friends" element={<Notfound />} />
          <Route path="profile" element={<Notfound />} />
          <Route path="Notification" element={<Notfound />} />
          <Route path="Reel" element={<Notfound />} />
          <Route path="Setting" element={<Notfound />} />
          <Route path="Messages" element={<Notfound />} />
          <Route path="Likes" element={<Notfound />} />
        </Routes>
      </Router> */}
    </div>
  );
}

export default LeftList;
