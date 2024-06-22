// src/App.js
import React, { useState } from 'react';
import { GoogleOAuthProvider, GoogleLogin, googleLogout } from '@react-oauth/google';
import {jwtDecode} from 'jwt-decode';
import InvoiceList from './components/InvoiceList';
import TriggerAutomationButton from './components/TriggerAutomationButton';
import './App.css';

const clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID;

const App = () => {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    console.log('Login Success:', credentialResponse);
    const userObject = jwtDecode(credentialResponse.credential);
    console.log('Decoded User Object:', userObject);
    setUser(userObject);
  };

  const handleLoginFailure = (error) => {
    console.error('Login Failed:', error);
  };

  const handleLogoutSuccess = () => {
    setUser(null);
    console.log('Logout Successful');
  };

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className="container">
        <h1>Invoice App</h1>
        {!user ? (
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginFailure}
          />
        ) : (
          <div>
            <h2>Welcome, {user.name}</h2>
            <p>Email: {user.email}</p>
            <button onClick={() => googleLogout(handleLogoutSuccess)}>Logout</button>
            <InvoiceList />
            <TriggerAutomationButton />
          </div>
        )}
      </div>
    </GoogleOAuthProvider>
  );
};

export default App;
