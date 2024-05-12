import React from 'react';
import './LeftList.css'; 

function LeftList(props) {
   
  return (
    <div className="left-list">
        
      <img src={`http://localhost:8080/getImage/${props.data.id}`} alt="User" />
      <h1>{props.data.username}</h1>
      <p>{props.data.bio}</p>
      <p>{props.numfeiend}</p>
    </div>
  );
}

export default LeftList;
