import { useState, useEffect } from "react"; 
import './Profile.css';
import Post from "./Post.jsx";
import ImageWithToken from "./ImageWithToken.jsx";
import ShowShare from "./ShowShare.jsx";
import { memo } from "react";
function Profile(props){
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [userPosts, setUserPosts] = useState([]);
    const [userShares, setUserShares] = useState([]);
    const [render, setRender] = useState(false);
    const [view, setView] = useState('posts');
    const [id, setId] = useState(props.userinfo.id);
    // useEffect(() => {
    //     if (props.type === "user") {
    //       setId(props.userinfo.userid);
    //     } else {
    //       setId(props.userinfo.id);
    //     }
    //   }, [props.type, props.userinfo.userid, props.userinfo.id]);
    
// alert(props.userinfo.userid+""+props.userinfo.id); 



    const renderFunction = () => {
        setRender(!render);
    };

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
    }, [render]);

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
    }, [render]);

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
            setUserPosts(data._embedded.posts);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, [render]);
 
    return (
        <div className="profile-container">
            <div className="header">
                <div className="images">
                    <ImageWithToken CName={"centered-image"} type={"getImage"} userinfo={props.userId} token={props.token}></ImageWithToken>
                    <ImageWithToken CName={"background"} type={"backgroundImage"} userinfo={props.userId} token={props.token}></ImageWithToken>
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

            <div className="view-switch">
                <button onClick={() => setView('posts')} className={view === 'posts' ? 'active' : ''}>Posts</button>
                <button onClick={() => setView('shares')} className={view === 'shares' ? 'active' : ''}>Shares</button>
            </div>

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
            ) : (
                <div className="shares">
                    {userShares.map((share) => (
                        <ShowShare
                            key={share.id}
                            postId={share.postId}
                            token={props.token}
                            shareContent={share.content}
                            userImage={props.userImage}////
                            userName={props.userinfo.username}
                            userId={props.userId}
                            renderFunction={renderFunction}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default memo(Profile);