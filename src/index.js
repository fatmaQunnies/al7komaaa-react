import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Login from './Login';
import reportWebVitals from './reportWebVitals';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
                    <GoogleOAuthProvider clientId="930083034754-4m7h0a0778gqa96haqr7i3qg37bgjhf7.apps.googleusercontent.com">
                      
        <Login/>  
                    </GoogleOAuthProvider>
  </React.StrictMode>
);

reportWebVitals();