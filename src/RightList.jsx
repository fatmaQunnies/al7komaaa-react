
import React, { useState } from 'react';
import './RightList.css'; 
import Profile from "./Profile.jsx";

import { BrowserRouter as Router, Route,Link } from 'react-router-dom';

function RightList(props) {
  const [isFriend, setIsFriend] = useState(false);

//   alert(link[1].href );
  const handleFriendAction = () => {
    const url = isFriend ? props.link[1].href : props.link[2].href;
    const method = isFriend ? 'DELETE' : 'POST';

    fetch(url, {
      method: method,
      headers: {
        'Authorization': 'Bearer ' +props. token
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
  const handleClick = () => {
    console.log('Redirecting to profile...');
   props.getUserId(props.info.username);
props.getUserProfile(<Profile
                        token={props.token}
                        key={props.userId}
                        userId={props.userId}
                        userIdSign={props.userIdSign}

                        userinfo={props.info}
                        userImage={props.info.image}

                    />);
                    
   
};

  return (
    <div className="right-list">
      {/* <p>{userName}</p> */}

      <div  className="username" onClick={handleClick}>
                <Link to={`/profile/${props.info.username}`} className="userNameAnchor">
                {props.userName}
                </Link>
            </div>
      <button className="add-button" onClick={handleFriendAction}>
        {isFriend ? 'Remove Friend' : 'Add Friend'}
      </button>
    </div>
  );
}

export default RightList;
