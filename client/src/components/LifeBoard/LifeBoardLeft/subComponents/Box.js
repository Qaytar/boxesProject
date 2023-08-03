/**
 * Box.js
 * 
 * Renders an empty rounded div representing a week (or box)
 * 
 * Here is one of the main uses of the BoxSelectionContext provider
 *  
 */

import React, { useContext } from 'react';
import styles from "./Box.module.css";
import { BoxSelectionContext } from '../../../../contexts/boxSelectionContext';

function Box(props) {
    const { selectedBoxes, selectBox, deselectBox } = useContext(BoxSelectionContext);

    // Within the array containing all selectedBoxes, tries to access the 'current' box. Meaning if it can access it, it's already selected, other wise it's not
    const isSelected = selectedBoxes[`${props.row}-${props.week}`];

    // calls selectBox and deselectBox onClick
    const handleClick = (event) => {
        if (isSelected) {
            deselectBox(props.row, props.week);
        } else {
            selectBox(props.row, props.week, event.shiftKey);
        }
    };


    // renders an icon if it's been commented and a color if it's been colored
    return (
        <div
            className={`${styles.box} ${isSelected ? styles.selectedBox : ''}`}
            style={{ backgroundColor: props.color?.colorName || 'transparent' }}
            onClick={handleClick}
        >
            {props.comment.commentIcon && (
                <img src={props.comment.commentIcon} alt="icon" className={styles.commentIcon} />
            )}
        </div>
    );
}

export default Box;


