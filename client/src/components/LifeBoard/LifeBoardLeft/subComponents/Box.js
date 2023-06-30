// Box.js:

import React, { useContext } from 'react';
import styles from "./Box.module.css"
import { BoxSelectionContext } from '../../../../contexts/boxSelectionContext';

function Box(props) {
    const { selectedBoxes, selectBox, deselectBox } = useContext(BoxSelectionContext);

    const isSelected = selectedBoxes[`${props.row}-${props.week}`];

    const handleClick = (event) => {
        if (isSelected) {
            deselectBox(props.row, props.week);

        } else {
            selectBox(props.row, props.week, event.shiftKey);
        }
    };

    return (
        <div
            className={`${styles.box} ${isSelected ? styles.selectedBox : ''} ${props.mod === 'y' ? styles.modifiedBox : ''}`}
            onClick={handleClick}
        >
        </div>
    )
}

export default Box;


