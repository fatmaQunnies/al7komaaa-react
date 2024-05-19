import { useState, useEffect } from "react"; 
import './Profile.css';
import Post from "./Post.jsx";
import ImageWithToken from "./ImageWithToken.jsx";
import ShowShare from "./ShowShare.jsx";

function Profile(props) {
    const [numberOfPosts, setNumberOfPosts] = useState(0);
    const [userPosts, setUserPosts] = useState([]);
    const [userShares, setUserShares] = useState([]);
    const [render, setRender] = useState(false);
    const [showPosts, setShowPosts] = useState(true); // State to toggle between posts and shares

    const renderFunction = () => {
        setRender(!render);
    };

    useEffect(() => {
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
    }, [render, props.token, props.userinfo.userid]);

    useEffect(() => {
        fetch(`http://localhost:8080/post/users/${props.userinfo.userid}/shares`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(response => response.json())
        .then(data => {
            setUserShares(data);
        })
        .catch(error => console.error('Error fetching data:', error));
    }, [render, props.token, props.userinfo.userid]);

    useEffect(() => {
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
            } catch (error) {
                console.error('Error fetching friends:', error);
            }
        };

        fetchFriends();
    }, [render, props.token, props.userinfo.id]);

    return (
        <div className="profile-container">
            <div className="header">
                <div className="images">
                    <ImageWithToken CName={"centered-image"} type={"getImage"} userinfo={props.userinfo.userid} token={props.token}></ImageWithToken>
                    <ImageWithToken CName={"background"} type={"backgroundImage"} userinfo={props.userinfo.userid} token={props.token}></ImageWithToken>
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
                    </div>
                </div>
            </div>

            <div className="toggle-buttons">
                <button 
                    onClick={() => setShowPosts(true)} 
                    className={showPosts ? 'active' : ''}
                >
                    Posts
                </button>
                <button 
                    onClick={() => setShowPosts(false)} 
                    className={!showPosts ? 'active' : ''}
                >
                    Shares
                </button>
            </div>

            {showPosts ? (
                <div className="posts">
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
                            userImage={props.userinfo.image}
                            renderFunction={renderFunction}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}

export default Profile;
