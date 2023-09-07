/**
 * LifeBoardHomePageText.js
 * 
 * Simply renders text to introduce the project in HomePage
 * 
 * Only used in the component <LifeBoard> if props.location='homePage'
 *  
 */

import styles from "./LifeBoardLeft/subComponents/Week.module.css";
import WeekMockUp from "./LifeBoardLeft/subComponents/WeekMockUp"

function LifeBoardHomePageText(props) {
    return (
        <div className={styles.text}>
            <div>
                <section>
                    <div className={styles.weeksContainer}>
                        <WeekMockUp />
                    </div>
                    <p>This represents a week of your life</p>
                </section>
                <section>
                    <div className={styles.weeksContainer}>
                        <WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />
                    </div>
                    <p>Here's a month</p>
                </section>
                <section>
                    <div className={styles.weeksContainer}>
                        <WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />
                        <WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />
                        <WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />
                        <WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />
                        <WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />
                        <WeekMockUp /><WeekMockUp /><WeekMockUp /><WeekMockUp />
                    </div>
                    <p>And this is 6 months or half a year.. Not that many weeks, huh?</p>
                    <div>
                        <p>Weeks pass by REALLY quick.. We do have several of them available to us, but not THAT many</p>
                        <p>This simple App invites you to pause, contemplate and customize your Weekly Life Calendar</p>
                        <p>Let it acompany you over the weeks and years, as a tool to examine your life and remember that time is limited</p>
                    </div>
                </section>
            </div>
            {props.isDesktop ? (
                <div>
                    <p>Play around with the sample 100 years' Life Calendar below</p>
                    <p>Careful, changes won't be saved</p>
                    <p>or</p>
                    <p><span>Log in</span>  to access your own</p>
                    <p>Customize it freely and let it acompany you over the weeks and years</p>
                </div>
            ) : null}

            <p>PS - Credit to Tim Urban since the core idea of this project is originally his (check his blogpost from 2014)</p>
        </div>
    )


}

export default LifeBoardHomePageText;