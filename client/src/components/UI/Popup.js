/**
 * Popup.js
 * 
 * Renders a popup related to a hoverable component
 * It's used to display the weeks' comments when hovering on the commented weeks (which are the ones displaying an icon)
 */
import styles from './Popup.module.css';

function Popup(props) {


    const handleMouseEnter = (event) => {
        console.log('Mouse Enter');
        const popup = event.target.querySelector(`.${styles.popup}`);
        if (popup) {
            console.log('Popup Found on Mouse Enter');
            popup.style.display = 'block';
            console.log(`Popup Display after Mouse Enter: ${popup.style.display}`);
        }
    };
    const handleMouseLeave = (event) => {
        console.log('Mouse Leave');
        const popup = event.target.querySelector(`.${styles.popup}`);
        if (popup) {
            console.log('Popup Found on Mouse Leave');
            popup.style.display = 'none';
            console.log(`Popup Display after Mouse Leave: ${popup.style.display}`);
        }
    };

    return (
        <span
            className={styles.hoverableSpan}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {props.children}

            {/* //Displays a popup with the content if there is any */}
            {props.popupContent && (<span className={styles.popup}>{props.popupContent}</span>)}
        </span>
    )
}


export default Popup;