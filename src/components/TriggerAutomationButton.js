// src/components/TriggerAutomationButton.js
import React from 'react';
import axios from 'axios';

const TriggerAutomationButton = () => {
  const handleButtonClick = async () => {
    try {
      const authInstance = window.gapi.auth2.getAuthInstance();
      const idToken = authInstance.currentUser.get().getAuthResponse().id_token;
      const response = await axios.post('/api/trigger-automation', {}, {
        headers: {
          Authorization: `Bearer ${idToken}`,
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <button onClick={handleButtonClick}>Trigger Automation</button>
  );
};

export default TriggerAutomationButton;
