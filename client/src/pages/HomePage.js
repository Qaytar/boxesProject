/**
 * HomePage.js
 * 
 * Accessed thru the root "/". It's the homepage of this react application.
 * Renders a fullscreen landing view and below, a showcase of the app (component LifeBoard) for users to explore it. Progress will be lost as it's not connected to db
 */

import { useRef, useContext, useEffect, useState } from "react";
import LifeBoard from "../components/LifeBoard/LifeBoard/LifeBoard";
import LifeBoardMobile from "../components/LifeBoard/LifeBoard/LifeBoardMobile";
import WeekMockUp from "../components/LifeBoard/LifeBoardLeft/subComponents/WeekMockUp"
import LogInMyAreaBtn from "../components/Session/LogInMyAreaBtn"
import styles from "./HomePage.module.css"
import { AuthContext } from '../contextsAndHooks/authContext';
import { useNavigate, Link } from 'react-router-dom';
import useDeviceType from '../contextsAndHooks/useDeviceType'

function HomePage() {
    const { isDesktop } = useDeviceType();

    // State and handler for 'more btn' (.smallButton)
    const [isThirdViewOn, setisThirdViewOn] = useState(false);
    const thirdViewRef = useRef();
    const smallButtonHandler = () => {
        setisThirdViewOn(isThirdViewOn === 'false' ? 'true' : 'true');

        setTimeout(() => {
            thirdViewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 10); // Adjust the delay as needed
    };




    // Scroll to feature when 'explore btn' (.largeButton) is pressed
    const secondViewRef = useRef();
    const scrollToContent = () => {
        secondViewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
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
                <button className={styles.largeButton} onClick={scrollToContent}>Explore</button>
            </div>

            <div className={styles.secondView} ref={secondViewRef}>
                <div className={styles.text}>
                    <p><span className={styles.highLighted}>Map out your life</span> with vibrant colors and personal notes</p>
                    <p>Use it for introspection and to confront the <span className={styles.highLighted}>limited time</span> you have</p>
                </div>

                <div className={styles.separator} />

                <div className={styles.weeksWrapper}>
                    <section>
                        <div className={`${styles.weeks}`}>
                            <WeekMockUp highLighted={true} />
                        </div>
                        <p>This represents a week of your life</p>
                    </section>
                    <section>
                        <div className={`${styles.weeks}`}>
                            <WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp highLighted={true} />
                        </div>
                        <p>A month</p>
                    </section>
                    <section>
                        <div className={`${styles.weeks} ${styles.halfYear}`}>
                            <div className={`${styles.weeks3months}`}>
                                <WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />&nbsp;&nbsp;<WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />&nbsp;&nbsp;<WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />
                            </div>
                            <div className={`${styles.weeks3months}`}>
                                <WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />&nbsp;&nbsp;<WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />&nbsp;&nbsp;<WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp highLighted={true} />
                            </div>
                        </div>

                        <p><span className={styles.highLighted}>Not that many weeks</span> in half a year huh?</p>
                    </section>
                </div >
            </div>

            <button className={styles.smallButton} onClick={smallButtonHandler} >more</button>

            <div className={styles.thirdView} ref={thirdViewRef}>
                {isThirdViewOn ? <div>
                    {
                        isDesktop ? (
                            <div className={styles.callToAction}>
                                <p>Play around with the demo Life Calendar below</p>
                                <p className={styles.comment}>Careful, changes won't be saved</p>
                                <p>or</p>
                                <p className={styles.highLighted}><Link to="/login" className={styles.highLighted}>Log in</Link>  to access your own</p>
                                <p className={` ${styles.comment}`}>Credit to Tim Urban since the core idea of this project is originally his (
                                    <a className={styles.timUrbanLink} href="https://waitbutwhy.com/2014/05/life-weeks.html" target="_blank" rel="noreferrer">check his blogpost from 2014</a>)
                                </p>
                            </div>
                        ) : null
                    }

                    <div className={styles.lifeBoard}>
                        {isDesktop ?
                            <LifeBoard location={'homePage'} />
                            : <LifeBoardMobile />}
                    </div>
                </div> : ""}
            </div>
        </div>
    )
}

export default HomePage;
