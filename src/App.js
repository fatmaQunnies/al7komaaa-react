import logo from './logo.svg';
import './App.css';
import Post from './Post.jsx';

import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState([{username:'',image:''}]);
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXRtYTIiLCJpYXQiOjE3MTQ5MjM5NzgsImV4cCI6MTcxNTAxMDM3OH0.50pZiQo0zQl7-grNDE8-DBOF-GyS0xzX_NWkFyuBdaY');

  const [postContent, setPostContent] = useState([]);

          const [userName,setUserName]=useState('');
          const [userImage,setUserImage]=useState('');

  useEffect(() => {
    console.log("USEEFFECT == " ) ;
    fetch('http://localhost:8080/myUserName', {
    headers: {
        'Authorization': 'Bearer ' + token
    }
})
.then(response => response.text())
.then(data => {
    console.log(data);
    setUserName(data);
})
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  useEffect(() => {
    console.log("USEEFFECT == " ) ;
    fetch('http://localhost:8080/getImage', {
    headers: {
        'Authorization': 'Bearer ' + token
    }
})
.then(response => response.text())
.then(data => {
    console.log(data);
    setUserImage(data);
})
      .catch(error => console.error('Error fetching data:', error));
  }, []);


  useEffect(() => {
    console.log("USEEFFECT == posts" ) ;
    fetch('http://localhost:8080/post/posts', {
      headers: {
          'Authorization': 'Bearer ' + token 
      }
    })
    .then(response => response.json())
    .then(data => {
      setPostContent(data._embedded.posts);
      console.log(data._embedded.posts +"pooooood");
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);// لازم نغير الديبيندنسي 



  

  return (
    <div className="App">
      <nav className="navbar">
      {/* <h1 style={{ fontFamily: "Lobster, cursive" }}>UnityNet</h1>
      <h1>{userName}</h1>  */}
      </nav>
      {postContent.map(post => (
  <Post className="post"
    key={post.id}
    id={post.id}
    token={token}
    info={post}
    userName={userName}
    userImage={userImage}
  />
))}
      
    </div>
  );
}

export default App;
