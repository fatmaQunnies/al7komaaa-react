import { useEffect, useState } from "react";
import './Comment.css';
import ImageWithToken from "./ImageWithToken.jsx";

function Comment(props) {
  
// alert(props.info.id);
  return (
    <div className="comment">
      <div>
      <ImageWithToken CName={"image"} type={"getImage"} userinfo={props.info.id} token={props.token}></ImageWithToken>

         {/* <img  src={`http://localhost:8080/getImage/   ${props.info.id}`} alt="" /> */}
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
