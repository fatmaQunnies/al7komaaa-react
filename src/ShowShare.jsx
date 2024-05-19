import React, { useEffect } from 'react';
import Post from "./Post.jsx";


function ShowShare(props) {
    const[postContent,setPostContent]=useEffect();
    useEffect(() => {
        console.log("USEEFFECT == " );
        fetch(`http://localhost:8080/user/${props.postId}`, {
          headers: {
            'Authorization': 'Bearer ' + props.token
          }
        })
        .then(response => response.json())
        .then(data => {
            setPostContent(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [ ]);


 
 
    return (
    <div className='like'>
         {props.ShareContent}
         <div className="post">

{postContent.map((post) => (
    <Post
  className="post"
  key={post.id}
  id={post.id}
  token={props.token}
  info={post}
  userId={props.userId}
  userImage={props.userImage}
  renderFunction={props.renderFunction} 
  type={post.video != null ? "Real" : "post"}
/>

                 
                ))}
</div>
   
    </div>
  );
}

export default ShowShare;
