import { useState, useEffect } from "react";
import "./Notification.css";

function Notification(props) {
    const [listNotification, setlistNotification] = useState([]);

    useEffect(() => {
        console.log("USEEFFECT == notification");
        fetch("http://localhost:8080/notifications", {
            headers: {
                'Authorization': 'Bearer ' + props.token
            }
        })
            .then(response => response.json())
            .then(data => {
                setlistNotification(data);
                console.log([...data] + "yyyyyyyyyyy");
            })
            .catch(error => console.error('Error fetching data:', error));
    }, [props.token]);

    const markAsRead = (notificationId) => {
        fetch(`http://localhost:8080/notifications/${notificationId}/mark-as-read`, {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + props.token,
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                if (response.ok) {
                    setlistNotification(prevNotifications =>
                        prevNotifications.map(notification =>
                            notification.id === notificationId
                                ? { ...notification, read: true }
                                : notification
                        )
                    );
                    console.log("Notification marked as read");
                } else {
                    console.error('Failed to mark notification as read');
                }
            })
            .catch(error => console.error('Error updating notification:', error));
    };

    return (
        <div className="notification">
            {listNotification.map((no) => (
                <div
                    key={no.id}
                    className={`notificationDiv ${no.read ? 'isRead' : ''}`}
                    onClick={() => markAsRead(no.id)}
                >
                    <p>{no.senderUserName}</p>
                    <p>{no.message}</p>
                    <p>{no.timestamp}</p>
                    <p>{no.read ? 'Read' : 'Unread'}</p>
                </div>
            ))}
        </div>
    );
}

export default Notification;
