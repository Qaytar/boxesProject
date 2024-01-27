/**
 * HomePage.js
 * 
 * Accessed thru the root "/". It's the homepage of this react application.
 * Renders a fullscreen landing view and below, a showcase of the app (component LifeBoard) for users to explore it. Progress will be lost as it's not connected to db
 */

import { useRef, useContext, useEffect, useState } from "react";
import LifeBoard from "../components/LifeBoard/LifeBoard/LifeBoard";
import WeekMockUp from "../components/LifeBoard/LifeBoardLeft/subComponents/WeekMockUp"
import LogInMyAreaBtn from "../components/Session/LogInMyAreaBtn"
import styles from "./HomePage.module.css"
import { AuthContext } from '../contextsAndHooks/authContext';
import { useNavigate, Link } from 'react-router-dom';
import useDeviceType from '../contextsAndHooks/useDeviceType';
import screenshotApp from '../assets/screnshootAppLong.png';

function HomePage() {
    const { isDesktop } = useDeviceType();


    // Scroll to feature when 'explore btn' (.largeButton) is pressed

    // const scrollToContent = () => {
    //     secondViewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }

    // State and handler for 'explore btn' (.largeButton)
    const [isLargeButtonClicked, setisLargeButtonClicked] = useState(false);
    const secondViewRef = useRef();
    const largeButtonHandler = () => {
        setisLargeButtonClicked(isLargeButtonClicked === 'false' ? 'true' : 'true');

        setTimeout(() => {
            secondViewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 320); // Adjust the delay as needed
    };

    // State and handler for 'more btn' (.smallButton)
    const [isThirdViewOn, setisThirdViewOn] = useState(false);
    const thirdViewRef = useRef();
    const smallButtonHandler = () => {
        setisThirdViewOn(isThirdViewOn === 'false' ? 'true' : 'true');

        setTimeout(() => {
            thirdViewRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 320); // Adjust the delay as needed
    };

    // State and handle for the hotItWorks popup
    const [hotItWorksPopUp, sethotItWorksPopUp] = useState(null);     
    const handleMouseEnter = (event) => {
        sethotItWorksPopUp(true);
    };
    const handleMouseLeave = (event) => {
        sethotItWorksPopUp(false);
    };



    return (
        <div className={styles.wrapper}>
            <LogInMyAreaBtn />
            <div className={styles.landingView}>
                <button className={`${styles.largeButton} ${isLargeButtonClicked ? styles.buttonClicked : ''}`} onClick={largeButtonHandler}>Explore</button>
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

            {/* Will only be rendered in mobile */}
            {!isDesktop ?
                <div className={styles.mobileView}>
                    <div className={styles.separator} />
                    <div className={styles.sorryMessage}>
                        <p>We are sorry, at the moment our <span className={styles.highLighted}>Life Calendar</span> is not available on mobile devices</p>
                        <p>Save the link, and <span className={styles.highLighted}>come back soon with your laptop :)</span></p>
                        <p><span className={styles.highLighted}>Spoiler</span>. Here's a zoomed in screenshot of the app</p>
                        <img src={screenshotApp} alt="screenshot of the web-app"></img>
                    </div>
                </div> : null}


            {/* From here untill the end, will only be rendered in desktops */}
            <button
                className={`${styles.smallButton} ${isThirdViewOn ? styles.buttonClicked : ''}`}
                onClick={smallButtonHandler}
            >
                more
            </button>


            <div className={styles.thirdView} ref={thirdViewRef}>
                {isThirdViewOn ? <div>
                    {
                        isDesktop ? (
                            <>
                                <div className={styles.callToAction}>                                    
                                    <p className={styles.highLighted}><Link to="/login" className={styles.highLighted}>Log in</Link>  to access your own Life Calendar</p>
                                    <p className={` ${styles.comment}`}>Credit to Tim Urban since the core idea of this project is originally his (
                                        <a className={styles.timUrbanLink} href="https://waitbutwhy.com/2014/05/life-weeks.html" target="_blank" rel="noreferrer">check his blogpost from 2014</a>)
                                    </p>
                                    <p className={styles.comment}>
                                        Below you can see how it looks like.&nbsp;
                                        <span onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className={styles.quickExplanation}>
                                        And here a quick explanation.
                                        </span>
                                    </p>                                  
                                                                     
                                </div>
                                <div className={styles.lifeBoard}>
                                    <LifeBoard location={'homePage'} />
                                </div>
                            </>
                        ) : null                        
                    }
                </div> : ""}
                {hotItWorksPopUp && isThirdViewOn && isDesktop ? (
                <div className={styles.howItWorksPopup}>
                    <div className={styles.popupTitle}>How it works</div>
                    <p className={styles.tutorialText}>Simple, every circle represents a week</p>
                    <p className={styles.tutorialText}>To the right, there's a legend with the meaning of each color</p>
                    <p className={styles.tutorialText}>Placing the cursor on top of a week with an icon on it, will display the note assigned</p>
                    <p className={styles.tutorialText}>Also, placing the cursor on top of any week will tel you the date and your age</p>
                </div>
                ) : null}
            </div>
        </div>
    )
}

export default HomePage;
