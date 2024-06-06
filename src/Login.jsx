import React, { useState } from 'react';
import './Login.css';
import App from './App';
import { memo } from "react";
import Registerr from './Registerr';
import { GoogleLogin } from '@react-oauth/google';

function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [errorMessage, setErrorMessage] = useState('');

    async function handleGoogle(response) {
        console.log(response)
        const res = await fetch('http://localhost:8080/api/auth/token', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => console.log(response));
    }

    const handleLogin = async (e) => {
        e.preventDefault();

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
                localStorage.setItem('token', userInfoData.accessToken);
                setErrorMessage('');
            } else {
                const errorData = await response.json();
                if (errorData.message === "Bad credentials") {
                    setErrorMessage("Username or Password is incorrect");
                } else {
                    setErrorMessage(errorData.message || 'Username or Password is incorrect');
                }
            }
        } catch (error) {
            setErrorMessage('Error: Username or Password is incorrect' );
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
                            <div style={{ display: "flex" }}>Don't have an account? <div className='register' onClick={() => setIsRegister(true)}> Register </div></div>
                        </div>
                    </form>
                    <div>
                <GoogleLogin
                    onSuccess={handleGoogle}
                    onError={(error) => setErrorMessage('Google login failed: ' + error.message)}
                />
            </div>
            
                </div>
                
            </div>
           
        </div>
    );
}

export default memo(Login);
