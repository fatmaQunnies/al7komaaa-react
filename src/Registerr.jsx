import './Registerr.css';
import App from './App';
import { memo, useState, useEffect,useContext } from "react";
import Login from './Login';
import axios from "axios";
import { useIsMobile } from "./functions/isMobile";
import { Context } from "./functions/context";
import { privateKey } from "./functions/constants";
function Registerr(props) {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [isRegister, setIsRegister] = useState(false);
    const [goToLogin, setGoToLogin] = useState(false);
    const [token, setToken] = useState(localStorage.getItem('token') || '');

    const [avatar, setAvatar] = useState(undefined);
    const { setUser } = useContext(Context);

const isMobile = useIsMobile();
const [isLoade, setIsLoade] = useState(true);




    const onSubmit = () => {

        console.log("sss");
        const userJson = {
          email: email,
          username: userName,
          first_name: userName,
          last_name: userName,
          secret: password,
          avatar: null,
          custom_json: {},
          is_online: true,
        };
    
        let formData = new FormData();
        formData.append("email", email);
        formData.append("username", email);
        formData.append("first_name", userName);
        formData.append("last_name", userName);
        formData.append("secret", password);
        if (avatar) {
          formData.append("avatar", avatar, avatar.name);
        }
    
        const headers = { "Private-Key": privateKey };
    
        axios
          .post("https://api.chatengine.io/users/", formData, {
            headers,
          })
          .then((r) => {
            if (r.status === 201) {
              userJson.avatar = r.data.avatar;
              setUser(userJson);
            }
          })
          .catch((e) => console.log("Error", e));
      };
    
    
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
                // <SignUpForm  userName={userName} password={password} email={email}/>
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
                    <button type="submit" className="btn" onClick={() => { handleSignUp(); onSubmit(); }}>Sign up</button>
                    <div className="login-register">
                        <div style={{ display: "flex" }}>Do you have an account? <div className='register' onClick={() => { setGoToLogin(true) }}> Login </div></div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default memo(Registerr);
