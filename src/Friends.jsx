import React, { useState, useEffect } from 'react';
import './Friends.css';

function Friends(props) {
    const [friends, setFriends] = useState([]);
    const [numFriends, setNumFriends] = useState(0);
    const [reload, setReload] = useState(false);
    const [view, setView] = useState('posts');
    const [request, setRequest] = useState([]);
    const [isRequest, setIsRequest] = useState({});
    const [id, setId] = useState({});

    useEffect(() => {
        fetchIsRequest();
    }, [props.userId, props.token]);

    useEffect(() => {
        fetchFriends();
        fetchRequest();
    }, [ props.token, reload]);

    const fetchIsRequest = () => {
        fetch(`http://localhost:8080/hasSentFriendRequest/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
            .then(data => {
                if (typeof data === 'boolean') {
                    setIsRequest(data);
                }
            })
            .catch(error => console.error('Error fetching data:', error));
    };

    const fetchFriends = () => {
        fetch(`http://localhost:8080/userFriend/${props.iduser}`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
            .then(response => response.json())
            .then(data => {
                const updatedFriends = data._embedded.users.map(friend => ({ ...friend, isFriend: true }));
                setFriends(updatedFriends);
                setNumFriends(updatedFriends.length);
            })
            .catch(error => console.error('Error fetching friends:', error));
    };

    const fetchRequest = () => {
        fetch(`http://localhost:8080/friendRequests`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
            .then(response => response.json())
            .then(data => {
                setRequest(data);
            })
            .catch(error => console.error('Error fetching requests:', error));
    };

    const handleFriendAction = (friendId, isFriend) => {
        let url;
        let method;

        if (isRequest[friendId]) {
            url = `http://localhost:8080/cancelFriendRequest/${friendId}`;
            method = 'DELETE';
        } else {
            url = isFriend ? `http://localhost:8080/deleteUserFriend/${friendId}` : `http://localhost:8080/sendFriendRequest/${friendId}`;
            method = isFriend ? 'DELETE' : 'POST';
        }
        fetch(url, {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
            .then(response => {
                if (response.ok) {
                    const updatedIsRequest = { ...isRequest, [friendId]: !isFriend && !isRequest[friendId] };
                    setIsRequest(updatedIsRequest);
                    setReload(prevReload => !prevReload);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(`Error ${isFriend ? 'removing' : 'adding'} friend!`);
            });
    };

    const handleAcceptFriend = (userid) => {
        alert("You are now friends :)");
        fetch(`http://localhost:8080/acceptFriendRequest/${userid}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        }).then(() => setReload(prevReload => !prevReload));
    };

    const handleRejectFriend = (userid) => {
        fetch(`http://localhost:8080/cancelFriendRequest/res/${userid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        }).then(() => setReload(prevReload => !prevReload));
    };

    return (
        <div>
            <div className="view-switch">
                <button onClick={() => setView('friends')} className={view === 'friends' ? 'active' : ''}>Friends</button>
                <button onClick={() => setView('request')} className={view === 'request' ? 'active' : ''}>Request Friends</button>
            </div>

            <div>
                {view === 'friends' ? (
                  <div className="post">
                        <h1>Friends List</h1>
                        <p>Number of friends: {numFriends}</p>
                        <div className="friends-list">
                        {friends.map(friend => {
  
    return (
        <div key={friend.userid} className="friend-item">
            <span>{friend.username}</span>
            <button className="add-button" onClick={() => handleFriendAction(friend.userid, friend.isFriend)}>
                {friend.isFriend ? 'Remove Friend' : isRequest[friend.userid] ? 'Cancel Request' : 'Add Friend'}
            </button>
        </div>
    );
})}
                        </div>
                    </div>
                ) : (
                    <div className="post">
                        <h1>Request Friends</h1>
                        <div className="friends-list">
                            {request.map((friend) => (
                                <div key={friend.sender.userid} className="friend-item">
                                    <p>{friend.sender.username}</p>
                                    <button className="add-button" onClick={() => handleAcceptFriend(friend.sender.userid)}>
                                        {friend.sender.accepted ? 'Remove Friend' : 'Accept Friend'}
                                    </button>
                                    <button className="add-button" onClick={() => handleRejectFriend(friend.sender.userid)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Friends;
