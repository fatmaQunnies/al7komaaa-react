import React, { useEffect, useState,useContext } from 'react';
import './Login.css';
import App from './App';
import { memo } from "react";
import Registerr from './Registerr';
import {GoogleLogin} from '@react-oauth/google'
import axios from "axios";
import LogInForm from "./AuthPage/LogInForm"

import { Context } from "./functions/context";
import { projectId } from "./functions/constants";

// import Chat from '../src/chat/Chat'
function Login(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isRegister, setIsRegister] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [errorMessage, setErrorMessage] = useState('');
    const [email, setEmail] = useState("kjknnihnokmlnmkmm@gmail.com");






    const { setUser } = useContext(Context);
    const onSubmit = () => {
        if (password !== null && password !== '') { // Use && instead of ||
          alert("S$$#%$#@%");
          const headers = {
            "Project-ID": "b5366d72-777e-46be-ae9b-5c8c8ce7d992",
            "User-Name": email,
            "User-Secret": password,
          };
    
          console.log("Headers:", headers); // Log headers for debugging
    
          axios
            .get("https://api.chatengine.io/users/me/", { headers })
            .then((r) => {
              if (r.status === 200) { // Check if response is successful
                var user = {
                  first_name: r.data.first_name,
                  last_name: r.data.last_name,
                  email: email,
                  username: email,
                  secret: password,
                  avatar: r.data.avatar,
                  custom_json: {},
                  is_online: true,
                };
                alert(JSON.stringify(user)); // Display user object
                setUser(user);
                console.log(user.secret + "34365435");
                console.log(user.username + "hjg");
              }
            })
            .catch((e) => {
              alert("Your login credentials were not correct");
              console.log("Error", e);
            });
          alert("76876");
        } else {
          alert("Password cannot be empty");
        }
      };




    useEffect(() => {
        if (token) {
            setIsLoggedIn(true);
        }
    }, [token]);

    async function handleGoogle(response) {
        // YOou should add the token in the body
        console.log(response)
        const res = await fetch('http:/localhost:8080/token', {
            
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            } 
            
        }) 
        .then((response) => console.log(response));

    }

    const handleLogin = async () => {

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
        <LogInForm emain={email} password={password}></LogInForm>
        return <App token={token} />;
    }

    if (isRegister) {
        return <Registerr />;
    }



    const handleSubmit = (event) => {
        handleLogin();
        onSubmit();
    }
    return (
        <div className='bodyLogin'>
            <div className="wrapper">
                <div className="form-box login">
                    <h2>Login</h2>
                    <form onSubmit={handleSubmit}>
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
                <GoogleLogin
                    clientId="930083034754-4m7h0a0778gqa96haqr7i3qg37bgjhf7.apps.googleusercontent.com"
                    onSuccess={(credentialResopnse) => handleGoogle(credentialResopnse)}
                    onError={(error) => console.log(error)}
                />
            </div>
        </div>


    );
}

export default memo(Login);
