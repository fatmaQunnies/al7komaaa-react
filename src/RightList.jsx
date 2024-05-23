import React, { useState, useEffect } from 'react';
import './RightList.css'; 
import Profile from "./Profile.jsx";

import { BrowserRouter as Router, Route,Link } from 'react-router-dom';

function RightList(props) {
  const [isFriend, setIsFriend] = useState(false);
  const [isRequest, setIsRequest] = useState();


  useEffect(() => {
    fetch(`http://localhost:8080/hasSentFriendRequest/${props.userId}`, {
        headers: {
            'Authorization': 'Bearer ' + props.token
        }
    })
    .then(response => response.json())
    .then(data => {

        if (typeof data === 'boolean') {
            setIsRequest(data);
        } 
    })
    .catch(error => console.error('Error fetching data:', error));
}, []);



useEffect(() => {
  fetch(`http://localhost:8080/isFriend/${props.userId}`, {
      headers: {
          'Authorization': 'Bearer ' + props.token
      }
  })
 
  .then(data => {
     if(data==true||data== false) {setIsFriend(data);}
  })
  .catch(error => console.error('Error fetching data:', error));
}, []);


const handleButtonClick = () => {
  let url;
  let method;

  if (isRequest) {
      url = `http://localhost:8080/cancelFriendRequest/${props.userId}`;
      method = 'DELETE';
  } else {
      url = isFriend 
          ? `http://localhost:8080/deleteUserFriend/${props.userId}`
          : `http://localhost:8080/sendFriendRequest/${props.userId}`;
      method = isFriend ? 'DELETE' : 'POST';
  }

  fetch(url, {
      method: method,
      headers: {
          'Authorization': 'Bearer ' + props.token
      }
  })
  .then(response => {
      if (!response.ok) {
          throw new Error('Network response was not ok');
      }
     
  })
  .then(() => {
      if (isRequest) {
          setIsRequest(false); 
      } else if (isFriend) {
          setIsFriend(false); 
      } else {
          setIsRequest(true); 
      }
  })
  .catch(error => console.error('Error fetching data:', error));
};

//   alert(link[1].href );
  // const handleFriendAction = () => {
  //   const url = isFriend ? props.link[1].href : props.link[2].href;
  //   const method = isFriend ? 'DELETE' : 'POST';

  //   fetch(url, {
  //     method: method,
  //     headers: {
  //       'Authorization': 'Bearer ' +props. token
  //     }
  //   })
  //   .then(response => {
  //     if (response.ok) {
  //       setIsFriend(!isFriend);
  //       alert(`Friend ${isFriend ? 'removed' : 'added'} successfully!`);
  //     } else {
  //       alert(`Error ${isFriend ? 'removing' : 'adding'} friend!`);
  //     }
  //   })
  //   .catch(error => {
  //     console.error('Error:', error);
  //     alert(`Error ${isFriend ? 'removing' : 'adding'} friend!`);
  //   });
  // };
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

      <div  className="username" onClick={handleClick}>
                <Link to={`/profile/${props.info.username}`} className="userNameAnchor">
                {props.userName}
                </Link>
            </div>
            <button onClick={handleButtonClick}>
            {isFriend ? 'Remove Friend' : isRequest ? 'Cancel Request' : 'Add Friend'}
        </button>
    </div>
  );
}

export default RightList;
