import React, { useState, useEffect, useRef } from "react";
import "./App.css";
import Post from "./Post.jsx";
import LeftList from "./LeftList.jsx";
import Notfound from "./Notfound.jsx";
import RightList from "./RightList.jsx";
import Navbar from "./Navbar.jsx";
import Friends from "./Friends.jsx";
import Profile from "./Profile.jsx";
import Privacy from "./Privacy.jsx"
import Notification from "./Notification.jsx";
import Likes from "./Likes.jsx";
import Setting from "./Setting.jsx";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import ChangePassword from './ChangePassword';
import Logout from "./Logout.jsx";
import EditProfileImage from './EditProfileImage.jsx';
import EditProfileBackground from './EditProfileBackground.jsx';
import ChatsPage from "./ChatsPage/index"

import EditProfile from "./EditProfile.jsx"
import Login from "./Login.jsx";
import CreatePost from "./CreatePost.jsx";
import Search from "./Search.jsx";
import CreateReal from "./CreateReal.jsx";

import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { red, teal } from '@mui/material/colors';
import Switch from '@mui/material/Switch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';


import { deepPurple, deepOrange } from '@mui/material/colors';

import { memo } from "react";
import { useTheme } from "@emotion/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import ReactDOM from "react-dom";
import ChatApp from "./ChatApp"
import "./assets/VisbyRoundCF-Regular.woff";
import { ContextProvider } from "./functions/context";


function App(props) {
    const [user, setUser] = useState([{ username: "", image: "" }]);
    const [token, setToken] = useState(props.token);
    const [numfeiend, setNumFriend] = useState();
    const [postContent, setPostContent] = useState([]);
    const [readMore, setReadMore] = useState();
    const [realContent, setRealContent] = useState([]);
    const [readMoreReal, setReadMoreReal] = useState();
    // const [userName, setUserName] = useState("");
    const [userImage, setUserImage] = useState("");
    const [userInfo, setUserinfo] = useState([]);
    const [reload, setReload] = useState(false);
    const [show, setShow] = useState(false);
    const [componentsReady, setComponentsReady] = useState(false);
    const [friends, setFriends] = useState([]);
    const [userId, setUserId] = useState(0);
    const [userfriend, setUserFriend] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [searchArray, setSearchArray] = useState([]);
    const handleInputChange = (event) => {
        setSearchTerm(event.target.value);
    };
    let count = 0;
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
                setUserId(userInfoData.id);
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
                console.log("REDEEEEMMMOOORRREEE")
            });
            setPostContent([...postContent, ...newPosts]);


        } else {
            console.error("Error:", response.statusText);
        }


    };


    const handReadMore2 = async () => {
        if (!readMoreReal._links || !readMoreReal._links["read more"] || !readMoreReal._links["read more"].href) {
            console.log("No more links available to load more posts.");
            return;
        }

        try {
            const response = await fetch(readMoreReal._links["read more"].href, {
                method: "GET",
                headers: {
                    Authorization: "Bearer " + token,
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const responseData = await response.json();

                // Check if responseData._embedded and responseData._embedded.posts exist
                if (responseData._embedded && Array.isArray(responseData._embedded.posts)) {
                    const newPosts = responseData._embedded.posts.filter((newPost) => {
                        return !realContent.some((oldPost) => oldPost.id === newPost.id);
                    });

                    if (newPosts.length > 0) {
                        setRealContent([...realContent, ...newPosts]);
                    } else {
                        console.log("No more new posts to load.");
                    }
                } else {
                    console.log("No more posts available.");
                }
            } else {
                console.error("Error:", response.statusText);
            }
        } catch (error) {
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
            .catch((error) => console.log("fetching data:"));
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
                if (userfriend != null)
                    setUserFriend(data);
                else
                    setUserFriend([]);

            }
            )
            .catch((error) => console.error("Error fetching data:", error));
    }, []);




    const [getUserIdd, setUserIdd] = useState();
    const [getUserIddd, setUserIddd] = useState();


    const getUserId = (props) => {
        if (props && props !== getUserIdd) {
            setUserIdd(props);
        }
    };
    const getUserProfile = (props) => {
        if (props && props !== getUserIddd) {

            setUserIddd(props);

        }
    };
    const handleInputChangesearch = (event) => {
        setSearchTerm(event.target.value);
    };

    const searchbtn = () => {
        fetch(`http://localhost:8080/search/${searchTerm}`, {
            headers: {
                Authorization: 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })

            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setSearchArray(data);

            })
            .catch((error) => console.error("Error fetching data:", error));
    };


    const darkTheme = createTheme({
        palette: {
            mode: 'dark',
            primary: {
                main: '#ACE1AF',
            },
            secondary: {
                main: red[500],
            },
            text: {
                primary: '#FFFFFF',
            },
            background: {
                default: '#303030',
            },
        },
    });

    const [darkMode, setDarkMode] = useState(false);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const theme = createTheme({
        palette: {
            mode: darkMode ? 'dark' : 'light',
            primary: {
                main: '#ACE1AF',
            },
            secondary: {
                main: red[500],
            },
            text: {
                primary: darkMode ? '#ffffff' : '#000000',
            },
            background: {
                default: darkMode ? '#303030' : '#f5f5f5',
            },
        },
    });


    const feedRef = useRef();
    const handleScroll = () => {
        const feedElement = feedRef.current;
        if (feedElement.scrollTop + feedElement.clientHeight >= feedElement.scrollHeight) {
            handReadMore();
            console.log("ree");
        }
    };

    const feedRef2 = useRef();


    const handleScroll2 = () => {
        const feedElement = feedRef2.current;
        if (feedElement.scrollTop + feedElement.clientHeight >= feedElement.scrollHeight) {
            handReadMore2();
            console.log("reell remoer");
        }
    };



    const [showNotifications, setShowNotifications] = useState(false);
    const containerRef = useRef(null);

    const handleToggleNotifications = () => {
        setShowNotifications(!showNotifications);
    };

    const handleClickOutside = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
            setShowNotifications(false);
        }
    };

    useEffect(() => {
        if (showNotifications) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showNotifications]);


    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <Router>
                <div className="nav">
                    <Switch checked={darkMode} onChange={toggleDarkMode} />
                    <h1 style={{ fontFamily: "Lobster, cursive" }}>UnityNet</h1>
                    <div className="search-container">
                        <input
                            type="text"
                            className="search-box"
                            placeholder="Search"
                            value={searchTerm}
                            onChange={handleInputChange}
                        />
                        <Link to={`/Search`} className="userNameAnchor">
                            <span onClick={searchbtn} className="material-symbols-outlined">
                                search
                            </span>
                        </Link>
                        {/* <Link to={`/Notifications`} className="userNameAnchor">
                    <span  onChange={Notifications} className="material-symbols-outlined">
                        notifications
                    </span>
                </Link> */}
                        <div className="notifications-wrapper" ref={containerRef}>
                            <span onClick={handleToggleNotifications} className="material-symbols-outlined notifications-icon">
                                notifications
                            </span>
                            {showNotifications && (
                                <div className="notifications-container">
                                    <Notification className="notification" token={token} />
                                </div>
                            )}
                        </div>
                    </div>

                    <div style={{ display: "flex" }}>
                        <h2>{userInfo.username}</h2>
                    </div>
                </div>
                <div className="App">
                    <div className="Allleft">
                        <LeftList className="left" key={userId} data={userInfo} token={token}></LeftList>
                        <nav className="left-down">
                            <Navbar />
                        </nav>
                    </div>
                    <Routes>
                        <Route path="/" element={<Navigate to="/feed" />} />
                        <Route
                            path="/feed"
                            element={
                                <div id="Feed" ref={feedRef} onScroll={handleScroll}>
                                    <CreatePost token={token} userInfo={userInfo} userId={userId}></CreatePost>
                                    {postContent.map((post) => (
                                        <Post
                                            className="post"
                                            key={post.id}
                                            id={post.id}
                                            token={token}
                                            info={post}
                                            userId={userId}
                                            userImage={userImage}
                                            type={"post"}
                                            userName={userInfo.username}
                                            getUserId={getUserId}
                                            getUserProfile={getUserProfile}
                                        />
                                    ))}
                                </div>
                            }
                        />
                        <Route
                            path="/Friends"
                            element={
                                <div id="Friends">
                                    <Friends numbersfriend={numfeiend} iduser={userId} token={token} />
                                </div>
                            }
                        />
                        <Route path="/profile" element={
                            <Profile key={count} userId={userId} userinfo={userInfo} numoffriend={numfeiend} token={token} userImage={userInfo.image} userIdSign={userId} />
                        } />
                        {/* <Route path="/Notification" element={<Notification className="notification" token={token} />} /> */}
                        <Route path="/Reel" element={
                            <div id="Real" ref={feedRef2} onScroll={handleScroll2}>
                                <CreateReal token={token} userInfo={userInfo} />
                                {realContent.map((post) => (
                                    <Post
                                        className="post"
                                        key={post.id}
                                        id={post.id}
                                        token={token}
                                        info={post}
                                        userId={userId}
                                        userImage={userImage}
                                        type={"Real"}
                                        userName={userInfo.username}
                                        getUserId={getUserId()}
                                        getUserProfile={getUserProfile}
                                    />
                                ))}
                            </div>
                        } />
                        <Route path="/Setting" element={<Setting token={token} />} />
                        <Route path={`/profile/${getUserIdd}`} element={getUserIddd} />
                        <Route path="/changePassword" element={<ChangePassword token={token} />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/editImage" element={<EditProfileImage token={token} userId={userId} />} />
                        <Route path="/editBackground" element={<EditProfileBackground token={token} userId={userId} />} />

                    <Route path="/editProfile" element={<EditProfile token={token} info={userInfo} />} />
                    <Route path="/ Privacy" element={< Privacy token={token} info={userInfo} />} />

                    <Route path="/Messages" element={
                    <ContextProvider>
    <ChatApp  ></ChatApp>
  </ContextProvider>

} />
                    <Route path="/Likes" element={<Likes token={token} userImage={userImage} />} />
                    <Route path="/Search" element={<Search result={searchArray} token={token} userIdSign={userId} getUserId={getUserId} getUserProfile={getUserProfile} />} />
                </Routes>
                <div className="right">
                    {userfriend && userfriend.length > 0 ? (
                        userfriend.map((fr) => (
                            <RightList 
                                key={fr.userid} 
                                userId={fr.userid}
                                token={token} 
                                info={fr}
                                userName={fr.username || 'Unknown User'} 
                                link={fr.links} 
                                userIdSign={userId}
                                getUserId={getUserId}
                                getUserProfile={getUserProfile}
                            />
                        ))
                    ) : null}
                </div>
            </div>
        </Router>
    </ThemeProvider>
);

}
export default memo(App);
