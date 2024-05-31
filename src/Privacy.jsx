import React, { useState } from 'react';

function Privacy(props) {
  const [isPrivate, setIsPrivate] = useState(false); // State to manage privacy status

  // Function to set privacy status
  const setPrivacy = async (isPrivate) => {
    try {
      const response = await fetch('http://localhost:8080/privacy', {
        method: 'PUT',
        
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.token}`
        },
        body: JSON.stringify({ isPrivate }) // Need to stringify the boolean value
      });

      if (response.ok) {
        console.log('Privacy set successfully');
        setIsPrivate(isPrivate); // Update state with new privacy status
      } else {
        console.error('Failed to set privacy:', response.statusText);
      }
    } catch (error) {
      console.error('Error setting privacy:', error);
    }
  };

  // Function to get privacy status
  const getPrivacy = async () => {
    try {
      const response = await fetch('http://localhost:8080/IsPrivacy');
      if (response.ok) {
        const privacy = await response.json();
        console.log('Privacy:', privacy);
        setIsPrivate(privacy); // Update state with current privacy status
      } else {
        console.error('Failed to get privacy:', response.statusText);
      }
    } catch (error) {
      console.error('Error getting privacy:', error);
    }
  };

  return (
    <div style={{ padding: '20px', borderRadius: '5px' }}>
      <h1>Privacy </h1>
      <p>Current privacy status: {isPrivate ? 'Private' : 'Public'}</p>
      <button style={{ marginRight: '10px' }} onClick={() => setPrivacy(true)}>Set Private</button>
      <button onClick={() => setPrivacy(false)}>Set Public</button>
    </div>
  );
}

export default Privacy;
