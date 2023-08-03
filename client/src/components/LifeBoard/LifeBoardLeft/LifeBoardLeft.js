/**
 * LifeBoardLeft.js
 * 
 * Renders the LEFT side of the application (where the grid/LifeBoard is)
 * 
 * FirstRow acts as a header of the 'table' displaying the months
 * Boxes accesses the LifeBoardData and renders the bulk of the application
 * 
 */

import Boxes from "./subComponents/Boxes"
import FirstRow from "./subComponents/FirstRow"
import styles from "./LifeBoardLeft.module.css"

function LifeBoardLeft() {
    return (
        <div className={styles.wrapper}>
            <FirstRow />
            <Boxes />
        </div>
    )
}

export default LifeBoardLeft;