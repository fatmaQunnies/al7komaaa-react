import React from 'react';
import './LeftList.css';
import { useEffect, useState } from "react";
import { Routes, Route, Link, BrowserRouter as Router } from 'react-router-dom'; 
import Notfound from './Notfound.jsx';
import Navbar from './Navbar.jsx';
import ImageWithToken from "./ImageWithToken.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function LeftList(props) {
  const [numfeiend, setNumfeiend] = useState();
  const [id, setId] = useState(props.data.userid);

  useEffect(() => {

    fetch(`http://localhost:8080/count/userFriend/${props.data.userid}`, {
      headers: {
        'Authorization': 'Bearer ' + props.token
      }
    })
      .then(response => response.text())
      .then(data => {
        setNumfeiend(data);
        console.log("number friend" + numfeiend)
      })

  }, [props.reload]);

  return (
    <div className="left-list">

      <ImageWithToken CName={"centered-image"} type={"getImage"} userinfo={props.data.userid} token={props.token} ></ImageWithToken>

      <Link to={`/profile`} className="userNameAnchor">
        <h2> {props.data.username}</h2>
      </Link>
      <p className="bio2">{props.data.bio}</p>

    </div>
  );
}

export default LeftList;
