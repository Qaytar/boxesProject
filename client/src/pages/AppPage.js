/**
 * AppPage.js
 * 
 * Accessed by users thru the route /app
 * Protected page (must be logged in)
 * Renders the Lifeboard of that specific user with the editting pannels and capabilities to save progress in db
 */

import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LifeBoard from "../components/LifeBoard/LifeBoard/LifeBoard";
import LogInMyAreaBtn from "../components/Session/LogInMyAreaBtn";
import styles from "./AppPage.module.css";
import { AuthContext } from '../contextsAndHooks/authContext';
import questionIcon from '../assets/icons/others/interrogation.png'
import useDeviceType from '../contextsAndHooks/useDeviceType';

function AppPage() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [displayTutorial, setDisplayTutorial] = useState(null);

    const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

    // Protects this page from non-authenticated users. Redirecting those non-identified to /login (AuthPage.js)
    // Can't use the user state (and instead a new check is done) because most of the times this page is reached from succesful Google Auth BUT there isn't a chance to update user state before users hit this page so it's done now even if redundant)
    useEffect(() => {
        const checkAuthAndNavigate = async () => {
            try {
                // send request for express.js server to decode/look for the JWT token, decrypt it and reply with its payload content
                const response = await fetch(`${backendUrl}/auth/verify`, { credentials: 'include' });

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


    //mouse handlers for tutorial popup
    const handleMouseEnter = (event) => {
        setDisplayTutorial(true);
    };
    const handleMouseLeave = (event) => {
        setDisplayTutorial(false);
    };

    return (
        <div className={styles.wrapper}>
            <LogInMyAreaBtn />
            <div className={styles.tutorial}>
                <img className={styles.icon} src={questionIcon} alt="question mark icon"></img>
                <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                    tutorial
                </span>
            </div>

            {displayTutorial ?
                <div className={`${styles.tutorialPopup} ${styles.unselectable}`}>
                    <div className={styles.tutorialContainer}>
                        <p className={styles.tutorialTitle}>How to select multiple weeks at once</p>
                        <p className={styles.tutorialText}>Click on a week to select it, then use Shift+Click on a second week to select all weeks in between</p>
                    </div>
                    <div className={styles.tutorialContainer}>
                        <p className={styles.tutorialTitle}>Select all weeks of a given color</p>
                        <p className={styles.tutorialText}>Double Click on a color to select all weeks using that color. Then you can edit the description or choose a new color</p>
                    </div>


                </div>
                : null}
            <LifeBoard location={'appPage'} />
        </div>
    );
}

export default AppPage;
