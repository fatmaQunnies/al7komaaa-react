import React, { useState, useEffect } from 'react';
import './Friends.css';

function Friends(props) {
    const [friends, setFriends] = useState([]);
    const [numFriends, setNumFriends] = useState(0);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetchFriends();
    }, []);
    

    const fetchFriends = () => {
        fetch(`http://localhost:8080/userFriend/${props.iduser}`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const updatedFriends = data._embedded.users.map(friend => ({ ...friend, isFriend: true }));
            setFriends(updatedFriends);
            setNumFriends(updatedFriends.length);
        })
        .catch(error => console.error('Error fetching friends:', error));
    };

    const removeFriend = (friendId) => {
        fetch(`http://localhost:8080/deleteUserFriend/${friendId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            setReload(!reload);
        })
        .catch(error => console.error('Error removing friend:', error));
    };

    const toggleFriendship = (friendId) => {
        const updatedFriends = friends.map(friend => {
            if (friend.userid === friendId) {
                return { ...friend, isFriend: !friend.isFriend };
            }
            return friend;
        });
        setFriends(updatedFriends);
    };

    const handleFriendAction = (friendId, isFriend) => {
        const url = isFriend ? `http://localhost:8080/deleteUserFriend/${friendId}` : `http://localhost:8080/addUserFriend/${friendId}`;
        const method = isFriend ? 'DELETE' : 'POST';

        fetch(url, {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(response => {
            if (response.ok) {
                toggleFriendship(friendId);
                setReload(!reload);
                alert(`Friend ${isFriend ? 'removed' : 'added'} successfully!`);
            } else {
                alert(`Error ${isFriend ? 'removing' : 'adding'} friend!`);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert(`Error ${isFriend ? 'removing' : 'adding'} friend!`);
        });
    };

    return (
        <div>
            <h1>Friends List</h1>
            <p>Number of friends: {numFriends}</p>
            <ul>
                {friends.map(friend => (
                    <li key={friend.userid}>
                        {friend.username}{' '}
                        <button className="add-button" onClick={() => handleFriendAction(friend.userid, friend.isFriend)}>
                            {friend.isFriend ? 'Remove Friend' : 'Add Friend'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Friends;
