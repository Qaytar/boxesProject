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

function AppPage() {
    const { setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const [displayTutorial, setDisplayTutorial] = useState(null);

    const backendUrl = process.env.REACT_APP_BACKEND_URL || 'http://localhost:5000';

    // Protects this page from non-authenticated users. Redirecting those non-identified to /login (AuthPage.js)    
    useEffect(() => {
        const checkAuthAndNavigate = async () => {
            try {
                // send request for express.js server to decode/look for the JWT token, decrypt it and reply with its payload content
                const token = localStorage.getItem('token');
                const response = await fetch(`${backendUrl}/auth/verify`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                });

                // If unauthorized, set user to null and navigate to login
                if (response.status === 401 || response.status === 400) {
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
    }, [setUser, navigate, backendUrl]);


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
                        <p className={styles.firstTutorialTitle}>General flow of the app</p>
                        <p className={styles.tutorialText}>Add your birthdate if you haven't. In the My Area button on the top right corner</p>
                        <p className={styles.tutorialText}>Select weeks by clicking on them, then add colors and notes</p>
                    </div>
                    <div className={styles.tutorialContainer}>
                        <p className={styles.tutorialTitle}>How to select weeks</p>
                        <p className={styles.tutorialText}>Just click on a week to select it (it'll turn into a square), click again to unselect</p>
                        <p className={styles.tutorialText}>To select multiple weeks, click on a week, then while pressing SHIFT, select a second week. You'll select all the weeks in between</p>
                        <p className={styles.tutorialText}>To unselect multiple weeks, use the button 'unselect weeks'</p>
                        <p className={styles.tutorialText}>To select all weeks using a given color, on the right panel, double click on a color you are using. Then, you could pick a new color or edit the description</p>
                    </div>
                    <div className={styles.tutorialContainer}>
                        <p className={styles.tutorialTitle}>How to customize your weeks</p>
                        <p className={styles.tutorialText}>Make sure you are on the editting panel. If you are not, click on 'switch to edit'</p>
                        <p className={styles.tutorialText}>To add a color, select one or multiple weeks and simply pick a color and write a description, then click on submit</p>
                        <p className={styles.tutorialText}>To add a note, select one (only one!!!) week and simply pick an icon and write your note, then click on submit</p>                       
                        <p className={styles.tutorialText}>To delete changes on any selection of weeks, use the button 'delete changes'</p>                       
                    </div>
                    <div className={styles.tutorialContainer}>
                        <p className={styles.tutorialTitle}>How to visualize your life calendar</p>
                        <p className={styles.tutorialText}>To read your notes, simply hover (place your mouse over) a week with an icon</p>
                        <p className={styles.tutorialText}>Click on 'switch to legend' to hide the editting panels and bring up a legend of the used colors</p>
                    </div>                  


                </div>

                
                : null}
            <LifeBoard location={'appPage'} />
        </div>
    );
}

export default AppPage;
