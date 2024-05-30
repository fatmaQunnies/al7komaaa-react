import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
const Logout = () => {
    useEffect(() => {
        localStorage.removeItem('token'); 
        window.location.href = '/'; 
    }, []);

    return (
        <div>Logging out...</div>
    );
};

export default Logout;
