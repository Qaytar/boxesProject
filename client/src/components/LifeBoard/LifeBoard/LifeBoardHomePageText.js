/**
 * LifeBoardHomePageText.js
 * 
 * Simply renders text to introduce the project in HomePage
 * 
 * Only used in the component <LifeBoard> if props.location='homePage'
 *  
 */

import styles from "./LifeBoardHomePageText.module.css";
import WeekMockUp from "../LifeBoardLeft/subComponents/WeekMockUp"
import { Link } from "react-router-dom";
import useDeviceType from '../../../contextsAndHooks/useDeviceType'

function LifeBoardHomePageText() {
    const { isDesktop } = useDeviceType();

    // const contentRef = useRef();

    // const scrollToContent = () => {
    //     contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // }


    return (
        <div className={styles.wrapper}>
            <div className={styles.secondLandingView}>
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
            <button className={styles.smallButton}>more</button>

            <div className={styles.separator} />

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
        </div >
    )


}

export default LifeBoardHomePageText;