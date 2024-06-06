import React, { useState, useEffect } from 'react';
import './Friends.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell, faCog } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';


function Friends(props) {
    const [friends, setFriends] = useState([]);
    const [numFriends, setNumFriends] = useState(0);
    const [reload, setReload] = useState(false);
    const [view, setView] = useState('friends');
    const [requests, setRequests] = useState([]);
    const [friendStatuses, setFriendStatuses] = useState({});

    useEffect(() => {
        fetchFriends();
        fetchRequests();
    }, [props.token, reload]);

    const fetchIsRequest = async (id) => {
        try {
            const response = await fetch(`http://localhost:8080/hasSentFriendRequest/${id}`, {
                headers: {
                    'Authorization': 'Bearer ' + props.token
                }
            });
            const data = await response.text();
            return data === 'true';
        } catch (error) {
            console.error('Error fetching request status:', error);
            return false;
        }
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

                const statuses = {};
                updatedFriends.forEach(friend => {
                    statuses[friend.userid] = 'friend';
                });
                setFriendStatuses(statuses);
            })
            .catch(error => console.log('Error fetching friends:', error));
    };

    const fetchRequests = () => {
        fetch(`http://localhost:8080/friendRequests`, {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
            .then(response => response.json())
            .then(data => {
                setRequests(data);
            })
            .catch(error => console.error('Error fetching requests:', error));
    };

    const handleFriendAction = async (friendId) => {
        const currentStatus = friendStatuses[friendId];
        let url;
        let method;

        if (currentStatus === 'friend') {
            url = `http://localhost:8080/deleteUserFriend/${friendId}`;
            method = 'DELETE';
        } else if (currentStatus === 'sentRequest') {
            url = `http://localhost:8080/cancelFriendRequest/${friendId}`;
            method = 'DELETE';
        } else {
            url = `http://localhost:8080/sendFriendRequest/${friendId}`;
            method = 'POST';
        }

        fetch(url, {
            method: method,
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
            .then(response => {
                if (response.ok) {
                    setFriendStatuses(prevStatuses => {
                        let newStatus;
                        if (currentStatus === 'friend') {
                            newStatus = 'none';
                        } else if (currentStatus === 'sentRequest') {
                            newStatus = 'none';
                        } else {
                            newStatus = 'sentRequest';
                        }
                        return { ...prevStatuses, [friendId]: newStatus };
                    });
                    setReload(prevReload => !prevReload);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert(`Error ${currentStatus === 'friend' ? 'removing' : currentStatus === 'sentRequest' ? 'cancelling request for' : 'sending request to'} friend!`);
            });
    };

    const handleAcceptFriend = (userid) => {
        fetch(`http://localhost:8080/acceptFriendRequest/${userid}`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
        .then(response => {
            if (response.ok) {
                // Filter out the accepted friend request from the state
                setRequests(prevRequests => prevRequests.filter(request => request.sender.userid !== userid)); // تمت إضافة هذا السطر لإزالة الطلب المقبول من الشاشة
                setReload(prevReload => !prevReload); // تمت إضافة هذا السطر لإعادة تحميل البيانات
            }
        })
        .catch(error => console.error('Error accepting friend request:', error)); // تم تعديل الرسالة في حالة وجود خطأ
    };

    const handleRejectFriend = (userid) => {
        fetch(`http://localhost:8080/cancelFriendRequest/res/${userid}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        }).then(() => setReload(prevReload => !prevReload));
    };

    //////
    return (
        <div>
            <div className="view-switch">
                <button onClick={() => setView('friends')} className={view === 'friends' ? 'active' : ''}>Friends</button>
                <button onClick={() => setView('requests')} className={view === 'requests' ? 'active' : ''}>Friend Requests</button>
            </div>

            <div>
                {view === 'friends' ? (
                    <div className="posts">
                        <h1>Friends List</h1>
                        <p>Number of friends: {numFriends}</p>
                        <div className="friends-list">
                            {friends.map(friend => (
                                <div key={friend.userid} className="friend-item">
                                    <span>{friend.username}</span>
                                    <button className="add-button" onClick={() => handleFriendAction(friend.userid)}>
                                        {friendStatuses[friend.userid] === 'friend' ? 'Remove Friend' :
                                         friendStatuses[friend.userid] === 'sentRequest' ? 'Cancel Request' : 'Add Friend'}
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="posts">
                        <h1>Friend Requests</h1>
                        <div className="friends-list">
                            {requests.map(request => (
                                <div key={request.sender.userid} className="friend-item">
                                    <span>{request.sender.username}</span>
                                    <button className="add-button" onClick={() => handleAcceptFriend(request.sender.userid)}>
                                        Accept Friend
                                    </button>
                                    <button className="add-button" onClick={() => handleRejectFriend(request.sender.userid)}>
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
