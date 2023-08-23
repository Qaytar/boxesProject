/**
 * Popup.js
 * 
 * Renders a popup related to a hoverable component
 * It's used to display the weeks' comments when hovering on the commented weeks (which are the ones displaying an icon)
 */
import styles from './Popup.module.css';
import { useState } from 'react';

function Popup(props) {
    const [showPopup, setShowPopup] = useState(false);

    const handleMouseEnter = () => {
        setShowPopup(true);
    };

    const handleMouseLeave = () => {
        setShowPopup(false);
    };

    return (
        <span
            className={styles.hoverableSpan}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {props.children}
            {/* Using the state to control the visibility */}
            {showPopup && props.popupContent && (<span className={styles.popup}>{props.popupContent}</span>)}
        </span>
    );
}

export default Popup;






