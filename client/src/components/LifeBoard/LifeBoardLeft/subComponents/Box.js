import React, { useContext } from 'react';
import styles from "./Box.module.css"
import { BoxSelectionContext } from '../../../../contexts/boxSelectionContext';

function Box(props) {
    const { selectedBoxes, selectBox, deselectBox } = useContext(BoxSelectionContext);

    const isSelected = selectedBoxes.some(box => box.row === props.row && box.week === props.week);

    const handleClick = () => {
        if (isSelected) {
            deselectBox(props.row, props.week);
        } else {
            selectBox(props.row, props.week);
        }
    }



    return (
        <div
            className={`${styles.box} ${isSelected ? styles.selectedBox : ''} ${props.mod === 'y' ? styles.modifiedBox : ''}`}
            onClick={handleClick}
        >
        </div>
    )
}

export default Box;

