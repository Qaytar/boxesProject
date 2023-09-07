/**
 * WeekMockUp.js
 * 
 * Renders an empty rounded div representing a week - WITHOUT all associated logic and props
 * 
 * Only used in the HomePage to render week-like objects for the 'explanation', without causing undefined errors
 *  
 */

import styles from "./Week.module.css";

function WeekMockUp() {
    return (
        <div className={styles.week} />
    )


}

export default WeekMockUp;