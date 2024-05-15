import { useState, useEffect } from "react"; 
import './Profile.css';
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
            const response = await fetch(`http://localhost:8080/post/friendPosts/${props.userinfo.userid}`, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            });
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setUserPosts(data._embedded.posts);
            console.log('datamai', data._embedded.posts);
        } catch (error) {
            console.error('Error fetching friends:', error);
        }
    };

    useEffect(() => {
        fetchFriends();
    }, []);

    return(
        <div className="profile-container">
            <div className="header">
                <div className="images">
                    <img className="background" src={`http://localhost:8080/backgroundImage/${props.userinfo.userid}`} alt="background" />
                    <img className="centered-image" src={`http://localhost:8080/getImage/${props.userinfo.userid}`} alt="centered" />
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
        </div>
    );
}

export default Profile;
