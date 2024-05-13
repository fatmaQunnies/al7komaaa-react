import React from 'react';
import './LeftList.css'; 
import { useEffect, useState } from "react";

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
      
    </div>
  );
}

export default LeftList;
