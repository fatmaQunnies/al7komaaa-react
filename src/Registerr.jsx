import './Registerr.css';
import App from './App';
import { memo, useState, useEffect } from "react";
import Login from './Login';

function Registerr(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [goToLogin, setGoToLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const handleSignUp = async () => {
        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    username: userName,
                    password: password,
                    email: email
                })
            });

            if (response.ok) {
                setIsRegister(true);
                setErrorMessage(response.message || 'Register Done');
                handleLogin(); 
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || 'Failed to register');
            }
        } catch (error) {
            setErrorMessage('Error: ' + error.message);
        }
    };

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
                localStorage.setItem('token', userInfoData.accessToken);
            } else {
                setErrorMessage('Failed to login');
            }
        } catch (error) {
            setErrorMessage('Error: ' + error.message);
        }
    };

    if (isLoggedIn || token) {
        return <App token={token} />;
    }

    if (goToLogin) {
        return <Login />;
    }

    return (
        <div className='bodyLogout'>
            <div className="wrapper">
                <div className="form-box login">
                    <h2>Sign Up</h2>
                    <div className="input-box">
                        <span className="icon"><ion-icon name="person"></ion-icon></span>
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
                        <span className="icon"><ion-icon name="mail"></ion-icon></span>
                        <input
                            type="text"
                            required
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <label>Email</label>
                    </div>
                    <div className="input-box">
                        <span className="icon"><ion-icon name="lock-closed"></ion-icon></span>
                        <input
                            type="password"
                            required
                            name="psw"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <label htmlFor="psw">Password</label>
                    </div>
                    <div className="remember-forgot"></div>
                    <div id='dd'>{errorMessage && <p>{errorMessage}</p>}</div>
                    <button type="submit" className="btn" onClick={handleSignUp}>Sign up</button>
                    <div className="login-register">
                        <div style={{ display: "flex" }}>Do you have an account? <div className='register' onClick={() => { setGoToLogin(true) }}> Login </div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Registerr);
