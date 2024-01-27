/**
 * authContext.js
 * 
 * defines AuthContext and provides { user, setUser, loadingAuthCheck } to the rest of the App
 * defines and runs checkAuth() which authenticates current user and updates user state
 */


import React, { createContext, useState, useEffect } from 'react';

//creates context
export const AuthContext = createContext();

//defines provider
export const AuthProvider = ({ children }) => {
    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

    // state variable to hold user data of the currently logged user
    //.. user will be an object with 3 properties {id, name, picture} (User's picture of their Google account)
    const [user, setUser] = useState(null);

    // state variable to manage the asyncronous nature of cechkAuth()
    //.. in particulate this state is created exclusively to be used in AppPage.js. To be able to redirect users already authenticated to AppPage.js just as they hit AppPaje.js
    //.. it's needed cause otherwise by the time the HomePage.js' redirecting logic runs, the checkAuth() hasn't finished yet and authenticated users 'show up' as non-authenticated and stay in HomePage.js when they should not
    const [loadingAuthCheck, setLoadingAuthCheck] = useState(true);

    // reaches /auth/verify endpoint in the express.js server to validate (or not) credential sent within the cookies
    // the endpoint returns the content of the decoded  JWT token (user object with id, name and picture)
    // updates user state
    const checkAuth = async () => {
        try {
            setLoadingAuthCheck(true);
            // send request for express.js server to decode/look for the JWT token, decrypt it and reply with its payload content
            const response = await fetch(`${backendUrl}/auth/verify`, { credentials: 'include' });

            if (response.ok) {
                const data = await response.json();
                // update the user state with the payload content of the JWT: 
                setUser(data);
                return data;
            }
        } catch (error) {
            console.error("Error during verification:", error);
            setUser(null);
            return null;
        } finally {
            setLoadingAuthCheck(false);
        }
    };


    //run checkAuth once and only once when the app is being mounted since this context is the 'outer' component of the app
    // useEffect(() => {
    //     checkAuth();
    // }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, loadingAuthCheck }}>
            {children}
        </AuthContext.Provider>
    );
};


