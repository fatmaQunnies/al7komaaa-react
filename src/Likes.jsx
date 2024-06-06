import React, { useState, useEffect } from 'react';
import './Likes.css'; 
import Post from "./Post.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';


function Likes(props) {
    const [listUserLikes, setlistUserLikes] = useState([]);
  

    useEffect(() => {
        console.log("USEEFFECT == notification" );
        fetch("http://localhost:8080/post/user/like", {
          headers: {
            'Authorization': 'Bearer ' + props.token
          }
        })
        .then(response => response.json())
        .then(data => {
            setlistUserLikes(data._embedded.posts);
            console.log(data._embedded.posts+"like post");
        })
        .catch(error => console.log(' fetching data:', error));
    }, []);

    return (
        <div className="likes">
           
            {listUserLikes.map((no,index) => (
                <div   key={index} className={"likesDiv"}>
                  
                  <Post
                    className="post"
                    key={no.id}
                    id={no.id}
                    
                    userId={props.userId}
                    token={props.token}
                    info={no}
                    userName={no.userName}
                    userImage={props.userImage}
                  />
                </div>
            ))}
        </div>
    );
}

export default Likes;


