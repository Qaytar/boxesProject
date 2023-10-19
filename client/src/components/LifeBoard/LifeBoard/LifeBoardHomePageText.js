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

function LifeBoardHomePageText(props) {
    return (
        <div >
            <div className={styles.weeksWrapper}>
                <section>
                    <div className={`${styles.weeksContainer}`}>
                        <WeekMockUp highLighted={true} />
                    </div>
                    <p>This represents a <span className={styles.highLighted}>week</span> of your life</p>
                </section>
                <section>
                    <div className={`${styles.weeksContainer}`}>
                        <WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp highLighted={true} />
                    </div>
                    <p>Here's a <span className={styles.highLighted}>month</span></p>
                </section>
                <section>
                    <div className={`${styles.weeksContainer} ${styles.halfYear}`}>
                        <div className={`${styles.weeksContainer3months}`}>
                            <WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />&nbsp;&nbsp;<WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />&nbsp;&nbsp;<WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />
                        </div>
                        <div className={`${styles.weeksContainer3months}`}>
                            <WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />&nbsp;&nbsp;<WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />&nbsp;&nbsp;<WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp highLighted={true} />
                        </div>
                    </div>

                    <p>And this <span className={styles.highLighted}>half a year</span>.. Not that many weeks, huh?</p>
                </section>
            </div >

            <div className={styles.separator} />

            <div className={styles.text}>
                <p><span className={styles.highLighted}>Map out your life week-by-week,</span> enhanced by colors and notes, with our intuitive Life Calendar.</p>
                <p>Use it for introspection and to confront the limited time you have</p>

            </div>

            <div className={styles.separator} />

            {
                props.isDesktop ? (
                    <div className={styles.callToAction}>
                        <p>Play around with the Life Calendar below</p>
                        <p className={styles.comment}>Careful, changes won't be saved</p>
                        <p>or</p>
                        <p className={styles.highLighted}><Link to="/login" className={styles.highLighted}>Log in</Link>  to access your own</p>
                        <p className={` ${styles.comment}`}>Customize it freely and let it acompany you over the weeks and years</p>
                    </div>
                ) : null
            }

            <p className={styles.credit}>Credit to Tim Urban since the core idea of this project is originally his (check his blogpost from 2014)</p>
        </div >
    )


}

export default LifeBoardHomePageText;