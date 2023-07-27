/**
 * AppPage.js
 * 
 * Accessed thru the route /app
 * Protected page (must be logged in)
 * Renders the app: the Lifeboard of that specific user with the editting pannels and capabilities to save progress in db
 */

import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LifeBoard from "../components/LifeBoard/LifeBoard";
import LogInMyAreaBtn from "../components/Session/LogInMyAreaBtn";
import styles from "./AppPage.module.css";
import { AuthContext } from '../contexts/authContext';

function AppPage() {
    const { checkAuth } = useContext(AuthContext);
    const navigate = useNavigate();

    // Protects this page from non-authenticated users. Redirecting those non-identified to /login (AuthPage)
    // Calls checkAuth from authContext which in turn, reaches the /auth/verify endpoint in the Express.js server
    useEffect(() => {
        const verifyAuth = async () => {
            const userData = await checkAuth();
            // If the endpoint doesn't reply with data containing user details, means the user isn't logged in so it's navigated away from this protected
            if (!userData) {
                navigate('/login');
            }
        };

        verifyAuth();
    }, [checkAuth, navigate]);


    return (
        <div className={styles.wrapper}>
            <LogInMyAreaBtn />
            <LifeBoard />
        </div>
    );
}

export default AppPage;
