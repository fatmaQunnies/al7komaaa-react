import React, { useState, useEffect } from 'react';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import './Profile.css';
import Post from './Post.jsx';
import ImageWithToken from './ImageWithToken.jsx';
import ShowShare from './ShowShare.jsx';
import Setting from './Setting.jsx';

function Profile(props) {
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [numberOfFriends, setNumberOfFriends] = useState(0);
    const [userPosts, setUserPosts] = useState([]);
    const [userShares, setUserShares] = useState([]);
    const [render, setRender] = useState(false);
    const [accountIsPrivate, setAccountIsPrivate] = useState(props.userinfo.accountIsPrivate);
    const [view, setView] = useState('posts');
    const [isFriend, setIsFriend] = useState(false);
    const [isRequest, setIsRequest] = useState(false);
    const navigate = useNavigate();

    const renderFunction = () => {
        setRender(!render);
    };

    useEffect(() => {
        fetch(`http://localhost:8080/hasSentFriendRequest/${props.userId}`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(response => response.json())
        .then(data => {
            if (typeof data === 'boolean') {
                setIsRequest(data);
            } 
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [props.userId, props.token]);

    useEffect(() => {
        fetch(`http://localhost:8080/accountIsPrivate/${props.userId}`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(response => response.json())
        .then(data => {
            setAccountIsPrivate(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [props.userId, props.token, render]);

    useEffect(() => {
        fetch(`http://localhost:8080/count/userFriend/${props.userId}`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(response => response.json())
        .then(data => {
            setNumberOfFriends(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [props.userId, props.token, render]);

    useEffect(() => {
        fetch(`http://localhost:8080/post/number/post/${props.userId}`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(response => response.json())
        .then(data => {
            setNumberOfPosts(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [props.userId, props.token, render]);

    useEffect(() => {
        fetch(`http://localhost:8080/post/users/${props.userId}/shares`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(response => response.json())
        .then(data => {
            setUserShares(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [props.userId, props.token, render]);

    useEffect(() => {
        fetch(`http://localhost:8080/isFriend/${props.userId}`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        }) 
        .then(response => response.json())
        .then(data => {
           if (data === true || data === false) {
               setIsFriend(data);
           }
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [props.userId, props.token]);

    const fetchFriends = async () => {
        try {
            const response = await fetch(`http://localhost:8080/post/${props.userId}/user`, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            if (data._embedded && data._embedded.posts) {
                setUserPosts(data._embedded.posts);
            } else {
                setUserPosts([]);
            }
        } catch (error) {
            console.error('Error fetching friends:', error);
            setUserPosts([]);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, [props.userId, props.token, render]);

    const handleButtonClick = () => {
        let url;
        let method;

        if (isRequest) {
            url = `http://localhost:8080/cancelFriendRequest/${props.userId}`;
            method = 'DELETE';
        } else {
            url = isFriend 
                ? `http://localhost:8080/deleteUserFriend/${props.userId}`
                : `http://localhost:8080/sendFriendRequest/${props.userId}`;
            method = isFriend ? 'DELETE' : 'POST';
        }

        fetch(url, {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
        })
        .then(() => {
            if (isRequest) {
                setIsRequest(false); 
            } else if (isFriend) {
                setIsFriend(false); 
            } else {
                setIsRequest(true); 
            }
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    return (
        <div className="profile-container">
            <div className="header">
                <div className="images">
                    <ImageWithToken CName={"centered-image"} type={"getImage"} userinfo={props.userId} token={props.token}></ImageWithToken>
                    <ImageWithToken CName={"background"} type={"backgroundImage"} userinfo={props.userId} token={props.token}></ImageWithToken>
                </div>
            </div>
            <div className="user-info">
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <h1>{props.userinfo.username}</h1>
                    <FontAwesomeIcon
                        icon={faCog}
                        className="settings-icon"
                        onClick={() => navigate('/Setting')}
                        style={{ cursor: 'pointer', marginLeft: '10px' }}
                    />
                    <p className="fname"> ({props.userinfo.fullname})</p>
                </div>
                <div className="addbtn">
                    {props.userIdSign !== props.userId && (
                        <>
                            <button onClick={handleButtonClick}>
                                {isFriend ? 'Remove Friend' : isRequest ? 'Cancel Request' : 'Add Friend'}
                            </button>
                            <button>Message</button>
                        </>
                    )}
                </div>
                <p>{props.userinfo.bio}</p>
                <div className="stats">
                    <div className="stat">
                        <p>Posts</p>
                        <p>{numberOfPosts}</p>
                    </div>
                    <div className="stat">
                        <p>Friends</p>
                        <p>{numberOfFriends}</p>
                    </div>
                </div>
            </div>
            <div className="view-switch">
                <button onClick={() => setView('posts')} className={view === 'posts' ? 'active' : ''}>Posts</button>
                <button onClick={() => setView('shares')} className={view === 'shares' ? 'active' : ''}>Shares</button>
                <button onClick={() => setView('info')} className={view === 'info' ? 'active' : ''}>Info</button>
            </div>
            {accountIsPrivate === false ? (
                <div>
                    {view === 'posts' ? (
                        <div className="post">
                            {userPosts.map((post) => (
                                <Post
                                    className="post"
                                    key={post.id}
                                    id={post.id}
                                    token={props.token}
                                    info={post}
                                    userId={props.userId}
                                    userImage={props.userinfo.image}
                                    renderFunction={renderFunction}
                                    userIdSign={props.userIdSign}
                                    type={post.video != null ? "Real" : "post"}
                                />
                            ))}
                        </div>
                    ) : view === 'shares' ? (
                        <div className="shares">
                            {userShares.map((share) => (
                                <ShowShare
                                    key={share.id}
                                    postId={share.postId}
                                    token={props.token}
                                    shareContent={share.content}
                                    userImage={props.userImage}
                                    userName={props.userinfo.username}
                                    userId={props.userId}
                                    renderFunction={renderFunction}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="post">
                            <p><strong>Username:</strong> {props.userinfo.username}</p>
                            <p><strong>Full Name:</strong> {props.userinfo.fullname}</p>
                            <p><strong>Bio:</strong> {props.userinfo.bio}</p>
                            <p><strong>Email:</strong> {props.userinfo.email}</p>
                            <p><strong>Location:</strong> {props.userinfo.location}</p>
                            <p><strong>Birthdate:</strong> {props.userinfo.dateofbirth}</p>
                            <p><strong>Gender:</strong> {props.userinfo.gender}</p>
                            <p><strong>Mobile:</strong> {props.userinfo.mobile}</p>
                            <p><strong>Age:</strong> {props.userinfo.age}</p>
                        </div>
                    )}
                </div>
            ) : (
                <p>This account is private</p>
            )}
        </div>
    );
}

export default memo(Profile);
