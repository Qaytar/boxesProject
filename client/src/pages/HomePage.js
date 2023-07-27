/**
 * HomePage.js
 * 
 * Accessed thru the root "/". It's the homepage of this react application.
 * Renders a fullscreen landing view and below, a showcase of the app (component LifeBoard) for users to explore it. Progress will be lost as it's not connected to db
 */

import { useRef } from "react";
import LifeBoard from "../components/LifeBoard/LifeBoard";
import LogInMyAreaBtn from "../components/Session/LogInMyAreaBtn"
import styles from "./HomePage.module.css"
import { Link } from "react-router-dom";

function HomePage() {
    // Creates a userRef to be able to assign it to the <div> to be scrolled to (when clicking the button Explore)
    const contentRef = useRef();

    // onClick function of Explore button: Scrolls down to the content of the page, below the 'landing view'
    const scrollToContent = () => {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return (
        <div className={styles.wrapper}>
            <LogInMyAreaBtn />
            <div className={styles.landingView}>
                <h1>Here goes Landing page full screen</h1>
                <button onClick={scrollToContent}>Explore</button>
            </div>
            <div ref={contentRef} className={styles.content}>
                <h3><Link to="/login">Log in</Link> to be able to save your changes</h3>
                <LifeBoard />
            </div>
        </div>
    )
}

export default HomePage;
