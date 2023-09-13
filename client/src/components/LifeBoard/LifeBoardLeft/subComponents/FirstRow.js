/**
 * FirstRow.js
 * 
 * Renders the 'firstRow' of the 'table' containing the months of the year
 * 
 * 
 *  
 */

import styles from "./FirstRow.module.css"

function FirstRow() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.spacer}></div>
            <div className={styles.content}>
                <span>Jan</span>
                <span>Feb</span>
                <span>Mar</span>
                <span>Apr</span>
                <span>May</span>
                <span>Jun</span>
                <span>Jul</span>
                <span>Aug</span>
                <span>Sep</span>
                <span>Oct</span>
                <span>Nov</span>
                <span>Dec</span>

            </div>
        </div>

    )
}

export default FirstRow;