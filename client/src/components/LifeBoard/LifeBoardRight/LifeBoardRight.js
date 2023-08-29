/**
 * LifeBoardRight.js
 * 
 * Renders the RIGHT side of the application (where the editting panels are)
 * 
 * Contains the editting panels, the legend panel and a toggler to switch between the two, as well as other buttons
 * 
 */

import ColorEditPanel from "./subComponents/ColorEditPanel";
import CommentEditPanel from "./subComponents/CommentEditPanel";
import Legend from "./subComponents/Legend";
import styles from "./LifeBoardRight.module.css";
import React, { useState, useContext, useEffect } from "react";
import Toggle from "../../UI/Toggle"
import { WeekSelectionContext } from '../../../contexts/weekSelectionContext'
import { LifeBoardDataContext } from '../../../contexts/lifeBoardDataContext';
import { saveData } from '../../../helpers/databaseOpsHelper';

function LifeBoardRight() {
    // state and toggle for the edit vs legend panel
    const [isMode, setIsMode] = useState('edit');
    const toggleMode = () => {
        setIsMode(isMode === 'edit' ? 'legend' : 'edit');
    };

    // imports from contexts and hooks
    const { deselectAllWeeks, selectedWeeks } = useContext(WeekSelectionContext);
    const { updateWeek, lifeBoardData, usedColors } = useContext(LifeBoardDataContext);


    // defines flag-state to handle saving in db from different components
    //.. the trigger is connected to onClicks of user submitting changes to the lifeBoard
    const [triggerSave, setTriggerSave] = useState(false);

    // Saves everything to db when, both, triggerSave changes and is True
    useEffect(() => {
        if (triggerSave) {
            saveData(lifeBoardData, usedColors);
            setTriggerSave(false); // Reset the flag
        }
    }, [triggerSave, usedColors, lifeBoardData]);

    //A the bottom of the JSX, conditionally renders either legend or editting panels (depending on the toggle position)
    return (
        <div className={styles.content}>
            <Toggle
                onClickFunction={toggleMode}
                isState={isMode}
                checkState={'edit'}
                options={['legend', 'edit']}
            />
            <button onClick={deselectAllWeeks}>Deselect All Weeks</button>

            <button onClick={() => {
                updateWeek(selectedWeeks, {
                    color: "",
                    comment: {
                        commentText: "",
                        commentIcon: ""
                    }
                }, undefined, deselectAllWeeks)

                setTriggerSave(true);
            }}>
                Delete changes to selected weeks
            </button>

            {
                isMode === 'edit' ? (
                    <div>
                        <ColorEditPanel setTriggerSave={setTriggerSave} />
                        <CommentEditPanel setTriggerSave={setTriggerSave} />
                    </div>
                ) : (
                    <Legend />
                )
            }
        </div >

    )
}

export default LifeBoardRight;