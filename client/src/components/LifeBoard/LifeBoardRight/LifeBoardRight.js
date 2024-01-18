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
import { LifeBoardDataContext } from '../../../contextsAndHooks/lifeBoardDataContext';
import { saveData } from '../../../helpers/databaseOpsHelper';
import { sortUsedColors } from '../../../helpers/updateWeekHelper'

function LifeBoardRight(props) {
    // state and toggle for the edit vs legend panel
    const [isMode, setIsMode] = useState('edit');
    const toggleMode = () => {
        setIsMode(isMode === 'edit' ? 'legend' : 'edit');
    };

    // imports from contexts and hooks    
    const { lifeBoardData, usedColors, setUsedColors } = useContext(LifeBoardDataContext);


    // defines flag-state to handle saving in db from different components
    //.. the trigger is connected to onClicks of user submitting changes to the lifeBoard
    const [triggerSave, setTriggerSave] = useState(false);

    // Saves everything to db when the trigger is true. Notice that when the 'location' of the <LifeBoard> is the HomePage, this code won't run (since user isn't logged in)
    useEffect(() => {
        if (triggerSave && props.location === 'appPage') {
            // Sorts usedColors, then saves them to db, finally updates the state. This is done to avoid stale version react issues
            //.. sorting colors here will often be completely unnecessary (e.g. when this code is triggerd by a comment type of edit)
            const sortedColors = sortUsedColors(lifeBoardData, usedColors);
            saveData(lifeBoardData, sortedColors);
            setUsedColors(sortedColors);

            // Reset the flag
            setTriggerSave(false);
        }
    }, [triggerSave, usedColors, lifeBoardData, setUsedColors, props.location]);


    //A the bottom of the JSX, conditionally renders either legend or editting panels (depending on the toggle position)
    return (
        <div className={styles.wrapper}>
            {props.location === 'appPage' ? (<Toggle
                onClickFunction={toggleMode}
                isState={isMode}
                checkState={'edit'}
                options={['legend', 'edit']}
            />) : null}
            


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