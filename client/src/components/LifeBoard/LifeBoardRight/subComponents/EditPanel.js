/**
 * EditPanel.js
 * 
 * Provides styles to Color and Comment editting panels 
 */

import styles from "./EditPanel.module.css"

function EditPanel(props) {
    return (
        <div className={styles.panel}>
            {props.children}
        </div>

    )
}

export default EditPanel;