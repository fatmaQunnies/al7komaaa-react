import logo from './logo.svg';
import './App.css';
import Post from './Post.jsx';
import LeftList from './LeftList.jsx';
import RightList from './RightList.jsx';


import { useEffect, useState } from "react";

function App() {
  const [user, setUser] = useState([{username:'',image:''}]);
  const [token, setToken] = useState('eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJmYXRtYTIiLCJpYXQiOjE3MTU1MjcxMTgsImV4cCI6MTcxNTYxMzUxOH0.CxALTknpaHj8LbAL916NbOC7yULU1UVrLAuKW8Bt9QM');
  const [postContent, setPostContent] = useState([]);
  const [readMore, setReadMore] = useState();
  var count=0;
 const [userName,setUserName]=useState('');//
  const [userImage,setUserImage]=useState('');//////

  const [userInfo,setUserinfo]=useState([]);


  useEffect(() => {
    console.log("USEEFFECT == " ) ;
    fetch('http://localhost:8080/myUserName', {
    headers: {
        'Authorization': 'Bearer ' + token
    }
})
.then(response => response.json())
.then(data => {
   
    setUserinfo(data);
})
      .catch(error => console.error('Error fetching data:', error));
  }, []);






  // alert(`http://localhost:8080/count/userFriend/${userInfo.id}`);

 


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
    fetch('http://localhost:8080/post/posts/random', {
      headers: {
          'Authorization': 'Bearer ' + token 
      }
    })
    .then(response => response.json())
    .then(data => {
      setPostContent(data._embedded.posts);
      setReadMore(data);
      console.log(data._embedded.posts +"pooooood");
    })
    .catch(error => console.error('Error fetching data:', error));
  }, []);// لازم نغير الديبيندنسي 

  const handReadMore = async () => {
    try {
      const response = await fetch(readMore._links["read more"].href, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer ' + token,
          'Content-Type': 'application/json'
        }
      });
      const responseData = await response.json();
      console.log(responseData._embedded.posts, "READ MORE");
      if (response.ok) {
        const newPosts = responseData._embedded.posts.filter(newPost => {
          return !postContent.some(oldPost => oldPost.id === newPost.id);
        });
        setPostContent([...postContent, ...newPosts]);
        console.log("READ MORE");
      } else {
        console.error('Error:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };
  
  // alert(userId+"ddddddd");








  const [userfriend,setUserFriend]=useState([]);
  useEffect(() => {
    console.log("USEEFFECT == " ) ;
    fetch('http://localhost:8080/friendSuggestion', {
    headers: {
        'Authorization': 'Bearer ' + token
    }
})
.then(response => response.json())
.then(data => {
   
    setUserFriend(data);
    // console.log("maiiii"+data);
})
      .catch(error => console.error('Error fetching data:', error));
  }, []);
  return (
    <div className="App">      <LeftList key={userInfo.id} data={userInfo}  token={token}></LeftList>

      <nav className="navbar">
      {/* <h1 style={{ fontFamily: "Lobster, cursive" }}>UnityNet</h1>
      <h1>{userName}</h1>  */}
      </nav>

      {postContent.map(post => (
  // <Post className="post"
  //   key={post.id}
  //   id={post.id}
  //   token={token}
  //   info={post}
  //   userName={userName}
  //   userImage={userImage}

  // />
 <></>

))}
{/* {userfriend.map(fr => (
  <RightList
    key={fr.id}
    token={token}
    userName={fr.username || 'Unknown User'}
    link={fr.links}
  />
))} */}
   {/* <a onClick={handReadMore}>Read More</a> */}
 </div>
  );
}

export default App;
