import { useEffect, useState } from "react";
import './Comment.css';
import ImageWithToken from "./ImageWithToken.jsx";
import EditDelBtn from "./EditDelBtn.jsx"

function Comment(props) {
  
//alert( props.info.userid);
  return (
    <div className="comment">
      <div>
      <ImageWithToken CName={"image"} type={"getImage"} userinfo={props.info.id} token={props.token}></ImageWithToken>
      <EditDelBtn token={props.token} type={"comment"} id={props.comment.id} renderFunction={props.renderFunction} ownerPost={props.comment.userId} userId={props.userId} info={props.info}/>

       
       
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
