import React, { useState ,useEffect} from "react";
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


function App() {

  const [user, setUser] = useState([{ username: "", image: "" }]);
  const [token, setToken] = useState(
    "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXRtYTIiLCJpYXQiOjE3MTU4Njg2NzAsImV4cCI6MTcxNTk1NTA3MH0.XRJFR1Vx1kNfA4bWc7ykNa3N1ldKTrVm2dGuHa1Fu7o"
  );
  const [numfeiend,setNumFriend]=useState();
  const [postContent, setPostContent] = useState([]);
  const [readMore, setReadMore] = useState();
  const [realContent, setRealContent] = useState([]);
  const [readMoreReal, setReadMoreReal] = useState();
  const [userName, setUserName] = useState(""); //
  const [userImage, setUserImage] = useState(""); ////
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
        // Fetch the user info first
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
        // alert(userInfoData.userid);
        setComponentsReady(true);

        // Now fetch the user friend count
        console.log("USEEFFECT ==3333333333333 " + userInfoData.userid);

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
        console.log("number friend " + userFriendData);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchUserData();
  }, []);
  
  // useEffect(() => {
  //   console.log("USEEFFECT == ");
  //   fetch("http://localhost:8080/myUserName", {
  //     headers: {
  //       Authorization: "Bearer " + token,
  //     },
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       setUserinfo(data);
  //       setuserId(data.userid);
  //       // console.log("fatmaaaa"+data.userid);
  //       setComponentsReady(true);
  //     })
  //     .catch((error) => console.error("Error fetching data:", error));
  // }, []);

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








  useEffect(() => {
    console.log("USEEFFECT == Reals");
    fetch("http://localhost:8080/post/reels", {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setRealContent(data._embedded.posts);
        setReadMoreReal(data);
        console.log(data._embedded.posts + "pooooood");
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
      console.log(responseData._embedded.posts, "READ MORE Reals");
      if (response.ok) {
        const newPosts = responseData._embedded.posts.filter((newPost) => {
          return !realContent.some((oldPost) => oldPost.id === newPost.id);
        });
        setRealContent([...realContent, ...newPosts]);
        console.log("READ MORE REAL");
      } else {
        console.error("Error:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

















  
//   // alert(userInfo.userid);
//   useEffect(() => {

//     console.log("USEEFFECT ==3333333333333 " + userId);


//     fetch("http://localhost:8080/count/userFriend/"+userId, {

//       headers: {

//         'Authorization': 'Bearer ' + token

//       }

//     })

//     .then(response => response.text())

//     .then(data => {

//       setNumfeiend(data);
// // alert(numfeiend);
//       console.log("number friend" + numfeiend)

//     })

//     .catch(error => console.error('Error fetching data:', error));

//   }, []);

  
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

////imprtanttttt
  useEffect(() => {
    console.log("USEEFFECT == " + userInfo.id);
    fetch("http://localhost:8080/count/userFriend/"+userId, {
      headers: {
        'Authorization': 'Bearer ' + token
      }
    })
    .then(response => response.text())
    .then(data => {
      setNumFriend(data);
      console.log("number friend" + numfeiend)
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);





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
    }else if (commName !== "Reel") {
      const friendsElement = document.getElementById("Reel");
      if (friendsElement)
         friendsElement.classList.remove("middle");
    }else if (commName !== "Setting") {
      const friendsElement = document.getElementById("Setting");
      if (friendsElement)
         friendsElement.classList.remove("middle");
    }else if (commName !== "Likes") {
      const friendsElement = document.getElementById("Likes");
      if (friendsElement)
         friendsElement.classList.remove("middle");
    }else if (commName !== "Messages") {
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
          {/* <img src={http://localhost:8080/getImage/${userInfo.id}} alt="User" /> */}
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
                <Friends numbersfriend={numfeiend}  iduser={userInfo.userid} token={token} />
              </div>
            }
          />

          <Route path="/profile" element={<Profile usernamee={userName} key={userInfo.id} userinfo={userInfo} numoffriend={numfeiend} token={token} />} />
          <Route path="/Notification" element={<Notification className="notification" token={token}  />} />
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
          <Route path="/Setting" element={<Setting  token={token} />} />
          <Route path="/changePassword" element={<ChangePassword  token={token}/>} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/editImage" element={<EditProfileImage />} />
          <Route path="/editProfile" element={<EditProfile />} />


          <Route path="/Messages" element={<Notfound />} />
          <Route path="/Likes" element={<Likes token={token}  userImage={userImage}/>} />
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