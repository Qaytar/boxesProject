/**
 * Backdrop.js
 * 
 * Renders a background when the MyArea model is opened
 * Use in MyArea component
 */

import styles from "./Backdrop.module.css"

function Backdrop(props) {
    return <div className={styles.backdrop} onClick={props.onBackdropClick} />;
}

export default Backdrop;