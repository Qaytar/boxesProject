/**
 * LifeBoardLeft.js
 * 
 * Renders the LEFT side of the application (where the grid/LifeBoard is)
 * 
 * FirstRow acts as a header of the 'table' displaying the months
 * Weeks accesses the LifeBoardData and renders the bulk of the application
 * 
 */

import Weeks from "./subComponents/Weeks"
import FirstRow from "./subComponents/FirstRow"
import styles from "./LifeBoardLeft.module.css"

function LifeBoardLeft() {
    return (
        <div className={styles.wrapper}>
            <FirstRow />
            <Weeks />
        </div>
    )
}

export default LifeBoardLeft;