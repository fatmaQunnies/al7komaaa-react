import React from 'react';
import ImageWithToken from "./ImageWithToken.jsx";
import './Search.css';
import Profile from "./Profile.jsx";
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

function Search(props) {
  
    const handleClick = (data) => {
        console.log(data.username);
        props.getUserId(data.username);
        props.getUserProfile(<Profile
            token={props.token}
            key={data.userid}
            userId={data.userid}
            userIdSign={props.userIdSign}
            userinfo={data}
            userImage={data.image}
        />);
    }

    return (
        <div className="c1">
            {props.result.map((user) => (
                <div className="c2" key={user.id}>
                    <div className="c3">
                        <div className="c4">
                            <ImageWithToken
                                CName={"centered-image"}
                                type={"getImage"}
                                userinfo={user.userid}
                                token={props.token}
                            />
                        </div>
                        <div className="c5">
                            <div className="c6">{user.username}</div>
                            <div className="c7">{user.fullname}</div>
                        </div>
                    </div>
                    <Link to={`/profile/${user.username}`} className="userNameAnchor">
                        <button className="c8" onClick={() => handleClick(user)}>View Profile</button>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Search;
