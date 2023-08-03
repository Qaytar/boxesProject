/**
 * LifeBoardRight.js
 * 
 * Renders the RIGHT side of the application (where the grid/LifeBoard is)
 * 
 * Contains the editting panels, the legend panel and a toggler to swith between the two
 * 
 */

import ColorEditPanel from "./subComponents/ColorEditPanel";
import CommentEditPanel from "./subComponents/CommentEditPanel";
import Legend from "./subComponents/Legend";
import styles from "./LifeBoardRight.module.css";
import React, { useState, useContext } from "react";
import Toggle from "../../UI/Toggle"
import { BoxSelectionContext } from '../../../contexts/boxSelectionContext'
import { LifeBoardDataContext } from '../../../contexts/lifeBoardDataContext';


function LifeBoardRight() {
    // state and toggle for the edit vs legend panel
    const [isMode, setIsMode] = useState('edit');
    const toggleMode = () => {
        setIsMode(isMode === 'edit' ? 'legend' : 'edit');
    };

    // imports from contexts
    const { deselectAllBoxes, selectedBoxes } = useContext(BoxSelectionContext);
    const { saveLifeBoard, updateBox } = useContext(LifeBoardDataContext);

    // deletes all color and comment properties of selected boxes
    function resetSelectedBoxes() {
        Object.keys(selectedBoxes).forEach(key => {
            const [row, week] = key.split('-');

            updateBox(row, week, {
                modified: 'n',
                color: {
                    colorName: "",
                    colorDescription: ""
                },
                comment: {
                    commentText: "",
                    commentIcon: ""
                }
            });
        });
    }

    return (
        <div className={styles.content}>
            <Toggle
                onClickFunction={toggleMode}
                isState={isMode}
                checkState={'edit'}
                options={['legend', 'edit']}
            />
            <button onClick={deselectAllBoxes}>Deselect All Boxes</button>

            <button onClick={saveLifeBoard}>Save Changes to db</button>

            <button onClick={resetSelectedBoxes}>Delete changes to selected boxes</button>

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