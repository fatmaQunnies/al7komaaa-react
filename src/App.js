import logo from './logo.svg';
import './App.css';
import Post from './Post.jsx';

import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState([{username:'',image:''}]);
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXRtYTIiLCJpYXQiOjE3MTQ1ODI4NzQsImV4cCI6MTcxNDY2OTI3NH0.YjRKp00mEIr90fa6pez42CiZwc-V8M-B_Wmm9VhC2M8');

  const [postContent, setPostContent] = useState([]);
      
          const [userName,setUserName]=useState('');
         
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
    console.log("USEEFFECT == posts" ) ;
    fetch('http://localhost:8080/post/posts', {
      headers: {
          'Authorization': 'Bearer ' + token 
      }
    })
    .then(response => response.json()) // تحويل البيانات إلى JSON
    .then(data => {
      setPostContent(data._embedded.posts);
      console.log(postContent);
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
  <Post
    key={post.id}
    // username={post.userName}
    // content={post.content}
    // image={post.image}
    info={post}
  />
))}
      
    </div>
  );
}

export default App;
