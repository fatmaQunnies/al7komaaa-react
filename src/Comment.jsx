import { useEffect, useState } from "react";
import './Comment.css';

function Comment(props) {
  // const handleSend= async (input) => { // Corrected function definition
   
  //   try {
  //     const response = await fetch(props.createComment, {
  //       method: 'POST',
  //       headers: {
  //         Authorization: 'Bearer ' + props.token,
  //         'Content-Type': 'application/json'
  //       },
  //       body: JSON.stringify({content: input }) 
  //     });
      
      // Uncommented the following code block
      // if (response.ok) {
      //   const data = await response.json();
      //   setLikeId(data.likeId);
      //   setIsLiked(true); 
      //   setLikeIdFromPost(data.likeId);
      //   console.log(data);
      // } else {
      //   console.error('Error posting reaction:', response.statusText);
      // }
  //   } catch (error) {
  //     console.error('Error fetching data:', error);
  //   }
  // };

  return (
    <div className="comment">
      <div>
        {props.comment.userImage == '' || props.comment.userImage == null ? 
          <img src={require(`C:/Users/user/Documents/ProjectSoa/project-al7komaaa/${props.dufImage}`)} alt="" /> : 
          <img src={require(`C:/Users/user/Documents/ProjectSoa/project-al7komaaa/${props.comment.userImage}`)} alt="" />}
      </div>
      <div className="content">
        {props.comment.userName}
        <br />
        {props.comment.content}
      </div>
    </div>
  );
}

export default Comment;
