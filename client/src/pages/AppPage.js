/**
 * AppPage.js
 * 
 * Accessed by users thru the route /app
 * Protected page (must be logged in)
 * Renders the Lifeboard of that specific user with the editting pannels and capabilities to save progress in db
 */

import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LifeBoard from "../components/LifeBoard/LifeBoard";
import LogInMyAreaBtn from "../components/Session/LogInMyAreaBtn";
import styles from "./AppPage.module.css";
import { AuthContext } from '../contexts/authContext';

function AppPage() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();

    // Protects this page from non-authenticated users. Redirecting those non-identified to /login (AuthPage.js)
    // Can't use the user state (and instead a new check is done) because most of the times this page is reached from succesful Google Auth BUT there isn't a chance to update user state before users hit this page so it's done now even if redundant)
    useEffect(() => {
        const checkAuthAndNavigate = async () => {
            try {
                // send request for express.js server to decode/look for the JWT token, decrypt it and reply with its payload content
                const response = await fetch('http://localhost:5000/auth/verify', { credentials: 'include' });

                // If unauthorized, set user to null and navigate to login
                if (response.status === 401) {
                    setUser(null);
                    navigate('/login');
                    return;
                }

                // If authorized, update user state and render page normally
                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error during verification:", error);
                setUser(null);
            }
        };

        // Calling function and setting dependencies for good practice
        checkAuthAndNavigate();
    }, [setUser, navigate]);



    return (
        <div className={styles.wrapper}>
            <LogInMyAreaBtn />
            <LifeBoard />
        </div>
    );
}

export default AppPage;
