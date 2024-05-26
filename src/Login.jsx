import React, { useEffect, useState } from 'react';
import './Login.css';
import App from './App';
import { memo } from "react";
import Registerr from './Registerr';

function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        }
    }, [token]);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8080/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userName,
                    password: password
                })
            });

            if (response.ok) {
                const userInfoData = await response.json();
                setIsLoggedIn(true);
                setToken(userInfoData.accessToken);
                localStorage.setItem('token', userInfoData.accessToken); // Store token in localStorage
                setErrorMessage(''); // Clear any previous error messages
            } else {
                const errorData = await response.json();
                if (errorData.message === "Bad credentials") {
                    setErrorMessage("Username or Password is incorrect");
                } else {
                    setErrorMessage(errorData.message || 'Error during login');
                }
            }
        } catch (error) {
            setErrorMessage('Error: ' + error.message);
        }
    };

    if (isLoggedIn || token) {
        return <App token={token} />;
    }

    if (isRegister) {
        return <Registerr />;
    }

    return (
        <div className='bodyLogin'>
            <div className="wrapper">
                <div className="form-box login">
                    <h2>Login</h2>
                    <form onSubmit={handleLogin}>
                        <div className="input-box">
                            <span className="icon"><ion-icon name="mail"></ion-icon></span>
                            <input
                                type="text"
                                required
                                name="uname"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                            <label>User Name</label>
                        </div>
                        <div className="input-box">
                            <span className="icon"></span>
                            <input
                                type="password"
                                required
                                name="psw"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <label>Password</label>
                        </div>
                        <div className="remember-forgot">
                            <label><input type="checkbox" /> Remember me</label>
                        </div>
                        <div id='dd'>{errorMessage && <p>{errorMessage}</p>}</div>
                        <button type="submit" className="btn">Login</button>
                        <div className="login-register">
                            <div style={{ display: "flex"}}>Don't have an account? <div className='register' onClick={() => setIsRegister(true)}> Register </div></div>
                        </div>
                    </form>
                </div>
            </div>
            <div>
            With Google: <a href="http://localhost:8080/oauth2/authorization/google">click here</a>
            </div>
        </div>


    );
}

export default memo(Login);
