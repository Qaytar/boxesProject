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
import { sortUsedColors } from '../../../helpers/updateWeekHelper'

function LifeBoardRight() {
    // state and toggle for the edit vs legend panel
    const [isMode, setIsMode] = useState('edit');
    const toggleMode = () => {
        setIsMode(isMode === 'edit' ? 'legend' : 'edit');
    };

    // imports from contexts and hooks
    const { deselectAllWeeks, selectedWeeks } = useContext(WeekSelectionContext);
    const { updateWeek, lifeBoardData, usedColors, setUsedColors } = useContext(LifeBoardDataContext);


    // defines flag-state to handle saving in db from different components
    //.. the trigger is connected to onClicks of user submitting changes to the lifeBoard
    const [triggerSave, setTriggerSave] = useState(false);

    // Saves everything to db when, both, triggerSave changes and is True
    useEffect(() => {
        if (triggerSave) {
            const sortedColors = sortUsedColors(lifeBoardData, usedColors); // Returns sorted data (this set up calls sortUsedColors on every save which will be innefficient some times e.g. comment editting). I was having difficulty having a place to run sortUsedColors andn ot bump into React state stale versions issues, since it should run close after several states change and itself, changes some of those states, so I think this is a clever walkaround (it used to use setUsedColors in the function but that caused the problems) so like this it works..
            saveData(lifeBoardData, sortedColors); // Use sorted data
            setUsedColors(sortedColors); // Update state
            setTriggerSave(false); // Reset the flag
        }
    }, [triggerSave, usedColors, lifeBoardData, setUsedColors]);


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