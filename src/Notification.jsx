import { useState, useEffect } from "react"; 
import "./Notification.css";

function Notification(props) {
    const [listNotification, setlistNotification] = useState([]);
    const [isRead, setisRead] = useState(0);

    useEffect(() => {
        console.log("USEEFFECT == notification" );
        fetch("http://localhost:8080/notifications", {
          headers: {
            'Authorization': 'Bearer ' + props.token
          }
        })
        .then(response => response.json())
        .then(data => {
            setlistNotification(data);
            console.log([...data]+"yyyyyyyyyyy");
        })
        .catch(error => console.error('Error fetching data:', error));
    }, []);

    const makeIsRead = () => {
        setisRead(1);
        const className = "notificationDiv " + (isRead ? "isread" : "");
        console.log("notification Is Read ");
        console.log(className);
    };
    
 const indix=0;
    return (
        <div className="notification">
           
            {listNotification.map((no) => (
                <div  id={indix} className={"notificationDiv" + (isRead==1 ? "1" : "")} onClick={makeIsRead}>
                    <p>{no.senderUserName}</p>
                    <p>{no.message}</p>
                    <p>{no.timestamp}</p>
                    <p>{no.read}</p>

                    {isRead ==1 ? 'Read' : 'UnRead'}

                </div>
            ))}
        </div>
    );
}

export default Notification;
