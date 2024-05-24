import React, { useState, useEffect } from 'react';
import './Friends.css';

function Friends(props) {
    const [friends, setFriends] = useState([]);
    const [numFriends, setNumFriends] = useState(0);
    const [reload, setReload] = useState(false);
    const [view, setView] = useState('posts');
    const[request , setRequest]=useState([]);
    const [isRequest, setIsRequest] = useState();

    

    useEffect(() => {
        fetchFriends();
        fetchRequest();
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

////
const fetchRequest = () => {
    fetch(`http://localhost:8080/friendRequests`, {
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
            //const updatedFriends = data._embedded.users.map(friend => ({ ...friend, isFriend: true }));
            setRequest(data);
        })
        .catch(error => console.error('Error fetching friends:', error));
};


/////
// useEffect(() => {
//     fetch(`http://localhost:8080/hasSentFriendRequest/${props.userId}`, {
//         headers: {
//             'Authorization': 'Bearer ' + props.token
//         }
//     })
//     .then(response => response.json())
//     .then(data => {
     
//         if (typeof data === 'boolean') {
//             setIsRequest(data);
//         } 
//     })
//     .catch(error => console.error('Error fetching data:', error));
// }, []);

const handleAcceptFriend = (userid) => {
    alert("You are Friend now :)");
    fetch(`http://localhost:8080/acceptFriendRequest/${userid}`, {
       method:'POST',
        headers: {
            'Authorization': 'Bearer ' + props.token
        }
    })
  };

  ////not compplete yet
  const handleRejectFriend = (userid) => {
    fetch(`http://localhost:8080/cancelFriendRequest/res/${userid}`, {
       method:'DELETE',
        headers: {
            'Authorization': 'Bearer ' + props.token
        }
    })
  };











    return (
        <div>
            {/* <h1>Friends List</h1>
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
            /////////////////////////////////////// */}


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
                            {friends.map(friend => (
                                <div key={friend.userid} className="friend-item">
                                    <span>{friend.username}</span>
                                    <button className="add-button" onClick={() => handleFriendAction(friend.userid, friend.isFriend)}>
                                        {friend.isFriend ? 'Remove Friend' : 'Add Friend'}
                                    </button>
                                </div>
                            ))}
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
