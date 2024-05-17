import { useState, useEffect } from "react"; 
import './Profile.css';
import Post from "./Post.jsx";
import ImageWithToken from "./ImageWithToken.jsx";

function Profile(props){
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [userPosts, setUserPosts] = useState([]);
// alert( props.userinfo.userid);
    useEffect(() => {
        console.log("USEEFFECT == " );
        fetch(`http://localhost:8080/post/number/post/${props.userinfo.userid}`, {
          headers: {
            'Authorization': 'Bearer ' + props.token
          }
        })
        .then(response => response.json())
        .then(data => {
            setNumberOfPosts(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const fetchFriends = async () => {
        try {
            const response = await fetch(`http://localhost:8080/post/${props.userinfo.id}/user`, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUserPosts(data._embedded.posts);
            console.log('datamaimami miam mia mia mia mia mia mia ', data._embedded.posts);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);
    // alert(props.userinfo.userid);
    return(
        <div className="profile-container">
            <div className="header">
                <div className="images">
                    
                    {/* <img className="background" src={`http://localhost:8080/backgroundImage/${props.userinfo.userid}`} alt="background" /> */}
                    <ImageWithToken CName={"centered-image"} type={"getImage"} userinfo={props.userinfo.userid} token={props.token}></ImageWithToken>
                    <ImageWithToken CName={"background"} type={"getImage"} userinfo={props.userinfo.userid} token={props.token}></ImageWithToken>
                </div>
            </div>
            <div className="user-info">
                <h1>{props.userinfo.username}</h1>
                <p>{props.userinfo.fullname}</p>
                <p>{props.userinfo.bio}</p>
                <div className="stats">
                    <div className="stat">
                        <p>Posts</p>
                        <p>{numberOfPosts}</p>
                    </div>
                    <div className="stat">
                        <p>Friends</p>
                        {/* <p>{props.numoffriend}</p> */}
                    </div>
                </div>
            </div>


<div className="post">

{userPosts.map((post) => (
    <Post
  className="post"
  key={post.id}
  id={post.id}
  token={props.token}
  info={post}
  userName={props.userinfo.username}
  userImage={props.userinfo.image}
  type={post.video != null ? "Real" : "post"}
/>

                 
                ))}
</div>



        </div>
    );
}

export default Profile;
