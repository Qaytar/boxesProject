/**
 * OAuth2Callback.js
 * 
 * Acts as a frontend 'endpoint' for Google's REDIRECT_URI after user is been authenticated
 * Main purpose is to send a request to backend's endpoint responsible for handling Google's code, set the JWT, etc.
 */
import React, { useEffect } from 'react';


const OAuth2Callback = () => {    

    useEffect(() => {
        // Extract the code from URL query
        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');

        if (code) {
            // Send the code to backend
            fetch('https://boxesproject-server.vercel.app/auth/google/callback', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ code }),
                credentials: 'include'
            }).catch(error => {
                console.error('Error:', error);
            });
        }
    }, []);

    return (
        <div></div> 
    );
};

export default OAuth2Callback;
