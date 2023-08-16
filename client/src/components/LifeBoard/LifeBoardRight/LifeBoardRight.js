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
import { WeekSelectionContext } from '../../../contexts/weekSelectionContext'
import { LifeBoardDataContext } from '../../../contexts/lifeBoardDataContext';
import { resetSelectedWeeksV2 } from './LifeBoardRightHelper'


function LifeBoardRight() {
    // state and toggle for the edit vs legend panel
    const [isMode, setIsMode] = useState('edit');
    const toggleMode = () => {
        setIsMode(isMode === 'edit' ? 'legend' : 'edit');
    };

    // imports from contexts
    const { deselectAllWeeks, selectedWeeks } = useContext(WeekSelectionContext);
    const { saveLifeBoard, updateWeek, lifeBoardData, setUsedColors, usedColors } = useContext(LifeBoardDataContext);


    return (
        <div className={styles.content}>
            <Toggle
                onClickFunction={toggleMode}
                isState={isMode}
                checkState={'edit'}
                options={['legend', 'edit']}
            />
            <button onClick={deselectAllWeeks}>Deselect All Weeks</button>

            <button onClick={saveLifeBoard}>Save Changes to db</button>

            <button onClick={() => resetSelectedWeeksV2(selectedWeeks, lifeBoardData, setUsedColors, updateWeek, deselectAllWeeks, usedColors)}>
                Delete changes to selected weeks
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