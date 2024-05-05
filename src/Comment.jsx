import { useEffect, useState } from "react";
import './Comment.css';


function Comment(props) {
    return (
      <div className="comment">
   <div > {props.comment.userImage == ''||props.comment.userImage == null ? <img src={require(`C:/Users/fatim/Desktop/SOA-AdvWEB/project-al7komaaa/${props.dufImage}`)} alt="" />: <img  src={require(`C:/Users/fatim/Desktop/SOA-AdvWEB/project-al7komaaa/${props.comment.userImage}`)} alt="" />}
</div><div className="content">
  {props.comment.userName}
  <br />
  {props.comment.content}
</div>


      </div>
    );
  }
  
  export default Comment;