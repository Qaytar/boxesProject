/**
 * CommentEditPanel.js
 * 
 * 
 */

import EditPanel from "./EditPanel";
import { WeekSelectionContext } from '../../../../contexts/weekSelectionContext';
import { LifeBoardDataContext } from '../../../../contexts/lifeBoardDataContext';
import React, { useContext, useState, useEffect } from 'react';
import styles from './CommentEditPanel.module.css';  // import CSS module
import { icons } from '../../../../helpers/icons'

function CommentEditPanel(props) {
    // imports from contexts
    const { selectedWeeks, deselectAllWeeks } = useContext(WeekSelectionContext);
    const { lifeBoardData, updateWeek } = useContext(LifeBoardDataContext);

    // New state variables
    const [textAreaValue, setTextAreaValue] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(null);

    // Update functions for those
    const handleTextAreaChange = (event) => setTextAreaValue(event.target.value);
    const handleIconSelect = (iconKey) => {
        if (selectedIcon && selectedIcon === iconKey) {
            setSelectedIcon(null); // deselect the icon
        } else {
            setSelectedIcon(iconKey); // select the clicked icon
        }
    };

    // Updates lifeBoardData state using updateWeek() from lifeBoardDataContext
    const handleSubmit = () => {
        // Getting the selected weeks keys (for example, `r2-2` for row 2, week 2}
        //.. selectedWeeks object looks like {r1-0: true, r1-1: true}
        const selectedWeekKey = Object.keys(selectedWeeks)[0];
        if (selectedWeekKey) {
            const [row, week] = selectedWeekKey.split("-");
            // Call updateWeek to update the selected week with the new values
            updateWeek(row, week, {
                comment: {
                    commentText: textAreaValue,
                    commentIcon: selectedIcon
                }
            });
            props.setTriggerSave(true); // saves it all in db
        }
        deselectAllWeeks(); // reset selection
    };

    // Displays the color data (name and description) in the editting panel when selecting a week that had already been modified
    useEffect(() => {
        const selectedWeekKeys = Object.keys(selectedWeeks);
        if (selectedWeekKeys.length === 1) {
            const [row, week] = selectedWeekKeys[0].split("-");
            const selectedWeek = lifeBoardData[row][week];
            if (selectedWeek.comment) {
                setTextAreaValue(selectedWeek.comment.commentText);
                setSelectedIcon(selectedWeek.comment.commentIcon);
            } else {
                setTextAreaValue('');
                setSelectedIcon("Option 1");
            }
        } else {
            setTextAreaValue('');
            setSelectedIcon("Option 1");
        }
    }, [selectedWeeks, lifeBoardData]);



    const selectedWeeksCount = Object.keys(selectedWeeks).length;


    // Only render the comment editting panel if 1 or none weeks are selected. Comment panel it's hidden if multiple weeks are selected
    return (
        selectedWeeksCount <= 1 ?
            <div className={styles.container}>
                <EditPanel>
                    <p>Comments Edit Panel</p>

                    {/* Text area */}
                    <textarea value={textAreaValue} onChange={handleTextAreaChange} />

                    {/* Icon selector */}
                    <div>
                        {Object.entries(icons).map(([key, icon]) => (
                            <div
                                key={key}
                                className={`${selectedIcon === key ? styles.selected : ''}`}
                                onClick={() => handleIconSelect(key)}
                            >
                                <img src={icon} alt={key} className={styles.icon} />
                                <span>{key}</span>
                            </div>
                        ))}
                    </div>

                    {/* Submit button */}
                    {selectedWeeksCount === 0 ? null : <button onClick={handleSubmit}>Submit</button>}
                </EditPanel>
            </div>
            : null
    )
}


export default CommentEditPanel;





