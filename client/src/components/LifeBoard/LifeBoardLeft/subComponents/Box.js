import React, { useContext } from 'react';
import styles from "./Box.module.css";
import { BoxSelectionContext } from '../../../../contexts/boxSelectionContext';

function Box(props) {
    const { selectedBoxes, selectBox, deselectBox } = useContext(BoxSelectionContext);

    // checks if clicked box is already selected or not
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
            {props.comment.commentIcon && (
                <img src={props.comment.commentIcon} alt="icon" className={styles.commentIcon} />
            )}
        </div>
    );
}

export default Box;


