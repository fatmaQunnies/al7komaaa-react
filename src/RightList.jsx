// RightList.jsx

import React, { useState } from 'react';
import './RightList.css'; 

function RightList({ userName, link, token }) {
  const [isFriend, setIsFriend] = useState(false);

//   alert(link[1].href );
  const handleFriendAction = () => {
    const url = isFriend ? link[1].href : link[2].href;
    const method = isFriend ? 'DELETE' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => {
      if (response.ok) {
        setIsFriend(!isFriend);
        alert(`Friend ${isFriend ? 'removed' : 'added'} successfully!`);
      } else {
        alert(`Error ${isFriend ? 'removing' : 'adding'} friend!`);
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert(`Error ${isFriend ? 'removing' : 'adding'} friend!`);
    });
  };

  return (
    <div className="right-list">
      <p className="username">{userName}</p>
      <button className="add-button" onClick={handleFriendAction}>
        {isFriend ? 'Remove Friend' : 'Add Friend'}
      </button>
    </div>
  );
}

export default RightList;
