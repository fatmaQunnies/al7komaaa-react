import React, { useEffect, useState } from "react";
import "./App.css";
import Post from "./Post.jsx";
import LeftList from "./LeftList.jsx";
import Notfound from "./Notfound.jsx";
import RightList from "./RightList.jsx";
import Navbar from "./Navbar.jsx";
import Friends from "./Friends.jsx";
import Profile from "./Profile.jsx";

import { Routes, Route, BrowserRouter as Router } from "react-router-dom";

function App() {

  const [user, setUser] = useState([{ username: "", image: "" }]);
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXRtYTIiLCJpYXQiOjE3MTU3MDY5ODksImV4cCI6MTcxNTc5MzM4OX0.55XneA7Hc7XEK4HULiPR_ZKo5N8N4VCl_11WupWLxRk"
  );
  useEffect(() => {
    console.log("USEEFFECT == " + userInfo.userid);
    fetch(`http://localhost:8080/count/userFriend/${userInfo.userid}`, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => response.text())
    .then(data => {
      setNumfeiend(data);
      console.log("number friend" + numfeiend)
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);
const [numfeiend,setNumfeiend]=useState();


  const [postContent, setPostContent] = useState([]);
  const [readMore, setReadMore] = useState();
  const [userName, setUserName] = useState(""); //
  const [userImage, setUserImage] = useState(""); ////
  const [userInfo, setUserinfo] = useState([]);
  const [reload, setReload] = useState(false);
  const [show, setShow] = useState(false);
  const [componentsReady, setComponentsReady] = useState(false);

  useEffect(() => {
    console.log("USEEFFECT == ");
    fetch("http://localhost:8080/myUserName", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserinfo(data);
        setComponentsReady(true);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    console.log("USEEFFECT == ");
    fetch("http://localhost:8080/getImage", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        setUserImage(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    console.log("USEEFFECT == posts");
    fetch("http://localhost:8080/post/posts/random", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setPostContent(data._embedded.posts);
        setReadMore(data);
        console.log(data._embedded.posts + "pooooood");
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
      console.log(responseData._embedded.posts, "READ MORE");
      if (response.ok) {
        const newPosts = responseData._embedded.posts.filter((newPost) => {
          return !postContent.some((oldPost) => oldPost.id === newPost.id);
        });
        setPostContent([...postContent, ...newPosts]);
        console.log("READ MORE");
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const [userfriend, setUserFriend] = useState([]);
  
  // alert(userInfo.userid);
  useEffect(() => {

    console.log("USEEFFECT == " + userInfo.userid);


    fetch(`http://localhost:8080/count/userFriend/${userInfo.userid}`, {

      headers: {

        'Authorization': 'Bearer ' + token

      }

    })

    .then(response => response.text())

    .then(data => {

      setNumfeiend(data);
// alert(numfeiend);
      console.log("number friend" + numfeiend)

    })

    .catch(error => console.error('Error fetching data:', error));

  }, []);

  
  useEffect(() => {
    console.log("USEEFFECT == ");
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
    if (componentsReady) { // Only call hideAllComponents once components are ready
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
        if (friendsElement) friendsElement.classList.remove("middle");
      }
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
          <img src={`http://localhost:8080/getImage/${userInfo.id}`} alt="User" />
        </div>
      </div>

      <div className="App">
        <LeftList className="left" key={userInfo.id} data={userInfo} token={token}></LeftList>
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
                  />
                ))}
              </div>
            }
          />

          <Route
            path="/Friends"
            element={
              <div id="Friends">
                <Friends />
              </div>
            }
          />

          <Route path="/profile" element={<Profile usernamee={userName} key={userInfo.id} userinfo={userInfo} numoffriend={numfeiend}  />} />
          <Route path="/Notification" element={<Notfound />} />
          <Route path="/Reel" element={<Notfound />} />
          <Route path="/Setting" element={<Notfound />} />
          <Route path="/Messages" element={<Notfound />} />
          <Route path="/Likes" element={<Notfound />} />
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

export default App;
