import { useEffect, useState } from "react";
import './Comment.css';
import ImageWithToken from "./ImageWithToken.jsx";
import EditDelBtn from "./EditDelBtn.jsx";
import './EditDelBtn.css';

function Comment(props) {
  return (
    <div className="comment">
      <div className="comment-header">
        <div className="comment-info">
          <ImageWithToken CName={"image"} type={"getImage"} userinfo={props.comment.userId} token={props.token} />
          <span className="comment-username">{props.comment.userName}</span>
        </div>
        <div className="edit-del-btn">
          <EditDelBtn 
            token={props.token} 
            type={"comment"} 
            id={props.id} 
            renderFunction={props.renderFunction} 
            ownerPost={props.comment.userId} 
            userId={props.userId} 
            info={props.info} 
          />
          
   <div onClick={replyfunction}>Reply</div>
        </div>






      </div>
   
      <div className="content">
        {props.comment.content}
        {props.comment.image != null ? (
          <ImageWithToken CName={"commentImage"} type={"post/commentImage"} userinfo={props.id} token={props.token} />
        ) : null}
      </div>
    </div>
  );
}

export default Comment;
