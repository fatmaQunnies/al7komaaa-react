import React, { useState, useEffect } from "react";
import "./App.css";
import Post from "./Post.jsx";
import LeftList from "./LeftList.jsx";
import Notfound from "./Notfound.jsx";
import RightList from "./RightList.jsx";
import Navbar from "./Navbar.jsx";
import Friends from "./Friends.jsx";
import Profile from "./Profile.jsx";
import Notification from "./Notification.jsx";
import Likes from "./Likes.jsx";
import Setting from "./Setting.jsx";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import ChangePassword from './ChangePassword';
import Logout from "./Logout.jsx";
import EditProfileImage from './EditProfileImage.jsx'; 
import EditProfile from "./EditProfile.jsx"
import Login from "./Login.jsx";

import { memo } from "react";

function App(props) {
    const [user, setUser] = useState([{ username: "", image: "" }]);
    const [token, setToken] = useState(props.token);
    const [numfeiend, setNumFriend] = useState();
    const [postContent, setPostContent] = useState([]);
    const [readMore, setReadMore] = useState();
    const [realContent, setRealContent] = useState([]);
    const [readMoreReal, setReadMoreReal] = useState();
    const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [userInfo, setUserinfo] = useState([]);
    const [reload, setReload] = useState(false);
    const [show, setShow] = useState(false);
    const [componentsReady, setComponentsReady] = useState(false);
    const [friends, setFriends] = useState([]);
    const [userId, setUserId] = useState(0);
    const [userfriend, setUserFriend] = useState([]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userInfoResponse = await fetch("http://localhost:8080/myUserName", {
                    headers: {
                        Authorization: "Bearer " + token,
                    },
                });

                if (!userInfoResponse.ok) {
                    throw new Error('Error fetching user info');
                }

                const userInfoData = await userInfoResponse.json();
                setUserinfo(userInfoData);
                setUserId(userInfoData.userid);
                setComponentsReady(true);

                const userFriendResponse = await fetch("http://localhost:8080/count/userFriend/" + userInfoData.userid, {
                    headers: {
                        'Authorization': 'Bearer ' + token
                    }
                });

                if (!userFriendResponse.ok) {
                    throw new Error('Error fetching user friend count');
                }

                const userFriendData = await userFriendResponse.text();
                setNumFriend(userFriendData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchUserData();
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/getImage", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((response) => response.text())
        .then((data) => {
            setUserImage(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/post/posts/random", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setPostContent(data._embedded.posts);
            setReadMore(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, [reload]);

    const handReadMore = async () => {
        try {
            const response = await fetch(readMore._links["read more"].href, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            const responseData = await response.json();
            if (response.ok) {
                const newPosts = responseData._embedded.posts.filter((newPost) => {
                    return !postContent.some((oldPost) => oldPost.id === newPost.id);
                });
                setPostContent([...postContent, ...newPosts]);
            } else {
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetch("http://localhost:8080/post/reels", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setRealContent(data._embedded.posts);
            setReadMoreReal(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, [reload]);

    const handReadMoreReal = async () => {
        try {
            const response = await fetch(readMore._links["read more"].href, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });
            const responseData = await response.json();
            if (response.ok) {
                const newPosts = responseData._embedded.posts.filter((newPost) => {
                    return !realContent.some((oldPost) => oldPost.id === newPost.id);
                });
                setRealContent([...realContent, ...newPosts]);
            } else {
                console.error("Error:", response.statusText);
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetch("http://localhost:8080/friendSuggestion", {
            headers: {
                Authorization: "Bearer " + token,
            },
        })
        .then((response) => response.json())
        .then((data) => {
            setUserFriend(data);
        })
        .catch((error) => console.error("Error fetching data:", error));
    }, []);

    useEffect(() => {
        fetch("http://localhost:8080/count/userFriend/" + userId, {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(response => response.text())
        .then(data => {
            setNumFriend(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [userId]);

    useEffect(() => {
        if (componentsReady) {
            hideAllComponents("Feed");
        }
    }, [componentsReady]);

    const hideAllComponents = (commName) => {
        const element = document.getElementById(commName);
        if (element) {
            element.classList.add("middle");
            if (commName !== "Feed") {
                const feedElement = document.getElementById("Feed");
                if (feedElement) feedElement.classList.remove("middle");
            } else if (commName !== "Friends") {
                const friendsElement = document.getElementById("Friends");
                if (friendsElement)
                    friendsElement.classList.remove("middle");
            }
        } else if (commName !== "Profile") {
            const friendsElement = document.getElementById("Profile");
            if (friendsElement)
                friendsElement.classList.remove("middle");
        } else if (commName !== "Reel") {
            const friendsElement = document.getElementById("Reel");
            if (friendsElement)
                friendsElement.classList.remove("middle");
        } else if (commName !== "Setting") {
            const friendsElement = document.getElementById("Setting");
            if (friendsElement)
                friendsElement.classList.remove("middle");
        } else if (commName !== "Likes") {
            const friendsElement = document.getElementById("Likes");
            if (friendsElement)
                friendsElement.classList.remove("middle");
        } else if (commName !== "Messages") {
            const friendsElement = document.getElementById("Messages");
            if (friendsElement)
                friendsElement.classList.remove("middle");
        }
    };

    return (
        <Router>
            <div className="nav">
                <h1 style={{ fontFamily: "Lobster, cursive" }}>UnityNet</h1>
                <div className="search-container">
                    <input type="text" className="search-box" placeholder="Search" />
                </div>
                <div style={{ display: "flex" }}>
                    <h1>{userInfo.username}</h1>
                </div>
            </div>

            <div className="App">
                <LeftList className="left" key={userId} data={userInfo} token={token}></LeftList>
                <nav className="left-down">
                    <Navbar />
                </nav>
                <Routes>
                    <Route
                        path="/feed"
                        element={
                            <div id="Feed">
                                {postContent.map((post) => (
                                    <Post
                                        className="post"
                                        key={post.id}
                                        id={post.id}
                                        token={token}
                                        info={post}
                                        userName={userName}
                                        userImage={userImage}
                                        type={"post"}
                                    />
                                ))}
                            </div>
                        }
                    />
                    <Route
                        path="/Friends"
                        element={
                            <div id="Friends">
                                <Friends numbersfriend={numfeiend} iduser={userInfo.userid} token={token} />
                            </div>
                        }
                    />
                    <Route path="/profile" element={<Profile usernamee={userName} key={userInfo.id} userinfo={userInfo} numoffriend={numfeiend} token={token} />} />
                    <Route path="/Notification" element={<Notification className="notification" token={token} />} />
                    <Route path="/Reel" element={<div id="Real">
                        {realContent.map((post) => (
                            <Post
                                className="post"
                                key={post.id}
                                id={post.id}
                                token={token}
                                info={post}
                                userName={userName}
                                userImage={userImage}
                                type={"Real"}
                            />
                        ))}
                    </div>} />
                    <Route path="/Setting" element={<Setting token={token} />} />
                    <Route path="/changePassword" element={<ChangePassword token={token} />} />
                    <Route path="/logout" element={<Logout />} />
                    <Route path="/editImage" element={<EditProfileImage />} />
                    <Route path="/editProfile" element={<EditProfile />} />
                    <Route path="/Messages" element={<Notfound />} />
                    <Route path="/Likes" element={<Likes token={token} userImage={userImage} />} />
                </Routes>

                <div className="right">
                    {userfriend.map((fr) => (
                        <RightList key={fr.id} token={token} userName={fr.username || 'Unknown User'} link={fr.links} />
                    ))}
                </div>
            </div>
        </Router>
    );
}
export default memo(App);
