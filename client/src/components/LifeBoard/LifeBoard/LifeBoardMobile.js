/**
 * LifeBoardMobile.js
 * 
 * Simply renders text to introduce the project in HomePage
 * 
 * Only used in the component <LifeBoard> if props.location='homePage'
 *  
 */

import styles from "./LifeBoardMobile.module.css";


function LifeBoardMobile() {
    return (
        <div className={styles.wrapper}>
            <p>We are sorry, the interactive part of this website isn't available for mobile devices</p>
            <p>INSERT HERE COOL IMAGE</p>
        </div>
    )


}

export default LifeBoardMobile;