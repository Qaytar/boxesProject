/**
 * HomePage.js
 * 
 * Accessed thru the root "/". It's the homepage of this react application.
 * Renders a fullscreen landing view and below, a showcase of the app (component LifeBoard) for users to explore it. Progress will be lost as it's not connected to db
 */

import { useRef, useContext, useEffect } from "react";
import LifeBoard from "../components/LifeBoard/LifeBoard/LifeBoard";
import LogInMyAreaBtn from "../components/Session/LogInMyAreaBtn"
import styles from "./HomePage.module.css"
import { AuthContext } from '../contextsAndHooks/authContext';
import { useNavigate } from 'react-router-dom';

function HomePage() {
    // Creates a userRef to be able to assign it to the <div> to be scrolled to (when clicking the button Explore)
    const contentRef = useRef();

    // onClick function of Explore button: Scrolls down to the content of the page, below the 'landing view'
    const scrollToContent = () => {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // this code 'protects' the homepage from authenticaded users (better for them to skip it and go straigh to the application itself)
    const { user, loadingAuthCheck } = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(() => {
        // If the checkAuth() from authContext has already finished running (loadingAuthCheck is False) 
        //..and the user has resulted authenticated, navigate to /app and skip the homepage
        if (!loadingAuthCheck && user) {
            navigate('/app');
        }
    }, [loadingAuthCheck, user, navigate]);


    return (
        <div className={styles.wrapper}>
            <LogInMyAreaBtn />
            <div className={styles.landingView}>
                <button className={styles.mainButton} onClick={scrollToContent}>Explore</button>
            </div>
            <div ref={contentRef} className={styles.content}>
                <LifeBoard location={'homePage'} />
            </div>
        </div>
    )
}

export default HomePage;
