import React from 'react';
import './ShowPostLikes.css'; 

function ShowPostLikes(props) {
  return (
    <div className='like'>
      <p>{props.type}</p>
      <p>{props.userName}</p>
    </div>
  );
}

export default ShowPostLikes;
