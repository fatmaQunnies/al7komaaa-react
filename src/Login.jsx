import React, { useState, useEffect } from 'react';
import './Friends.css';

function Login(props) {
    const [friends, setFriends] = useState([]);
    const [numFriends, setNumFriends] = useState(0);
    const [reload, setReload] = useState(false);

    useEffect(() => {
        fetchFriends();
    }, []);

    
return (
<div>
    
</div>
);
}

export default Friends;
