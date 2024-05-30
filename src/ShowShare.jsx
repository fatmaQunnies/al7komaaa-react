import React, { useEffect, useState } from 'react';
import Post from "./Post.jsx";
import ImageWithToken from './ImageWithToken.jsx';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function ShowShare(props) {
    const [postContent, setPostContent] = useState(null);

    useEffect(() => {
        console.log("USEEFFECT == ");
        fetch(`http://localhost:8080/post/posts/${props.postId}`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(response => response.json())
        .then(data => {
            setPostContent(data);
      
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [props.postId, props.token]);

    return (
        <div className='like'>
          
            <div className="post"> 
            <div className='sharee' > 
            <ImageWithToken CName={"imageShare"} type={"getImage"} userinfo={props.userId} token={props.token} />
            {props.userName}</div>
           <div className='content'> {props.shareContent}</div>
                {postContent && (
                    <Post
                        className="post"
                        key={postContent.id}
                        id={postContent.id}
                        token={props.token}
                        info={postContent}
                        userId={props.userId}
                        userImage={props.userImage}
                        renderFunction={props.renderFunction}
                        type={postContent.video != null ? "Real" : "post"}
                    />
                )}
            </div>
        </div>
    );
}

export default ShowShare;
