// src/components/GoogleLoginButton.js
import React from 'react';
import { GoogleLogin } from 'react-google-login';

const clientId = clientId = process.env.REACT_APP_GOOGLE_CLIENT_ID; // Replace with your actual Client ID

const GoogleLoginButton = ({ onLoginSuccess, onLoginFailure }) => {
  return (
    <GoogleLogin
      clientId={clientId}
      buttonText="Login with Google"
      onSuccess={onLoginSuccess}
      onFailure={onLoginFailure}
      cookiePolicy={'single_host_origin'}
    />
  );
};

export default GoogleLoginButton;
