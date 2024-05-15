import { useEffect, useState } from "react";
import './Comment.css';

function Comment(props) {
  

  return (
    <div className="comment">
      <div>
         <img  src={`http://localhost:8080/getImage/   ${props.info.id}`} alt="" />
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
