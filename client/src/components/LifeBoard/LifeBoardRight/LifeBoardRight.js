import ColorEditPanel from "./subComponents/ColorEditPanel";
import CommentEditPanel from "./subComponents/CommentEditPanel";
import Legend from "./subComponents/Legend";
import styles from "./LifeBoardRight.module.css";
import React, { useState, useContext } from "react";
import Toggle from "../../UI/Toggle"
import { BoxSelectionContext } from '../../../contexts/boxSelectionContext'
import { LifeBoardDataContext } from '../../../contexts/lifeBoardDataContext';


function LifeBoardRight() {
    // Tracks the current mode
    const [isMode, setIsMode] = useState('edit');

    // Toggles the grading system when clicked
    const toggleMode = () => {
        setIsMode(isMode === 'edit' ? 'legend' : 'edit');
    };
    const { deselectAllBoxes } = useContext(BoxSelectionContext);
    const { saveLifeBoard } = useContext(LifeBoardDataContext);
    return (
        <div className={styles.content}>
            <Toggle
                onClickFunction={toggleMode}
                isState={isMode}
                checkState={'edit'}
                options={['legend', 'edit']}
            />
            <button onClick={deselectAllBoxes}>
                Deselect All Boxes
            </button>
            <button onClick={saveLifeBoard}>
                Save Changes to db
            </button>
            {isMode === 'edit' ? (
                <div>
                    <ColorEditPanel />
                    <CommentEditPanel />
                </div>
            ) : (
                <Legend />
            )}
        </div>

    )
}

export default LifeBoardRight;