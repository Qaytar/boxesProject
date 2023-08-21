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

function CommentEditPanel(props) {
    // imports from contexts
    const { selectedWeeks, deselectAllWeeks } = useContext(WeekSelectionContext);
    const { lifeBoardData, updateWeek } = useContext(LifeBoardDataContext);

    // New state variables
    const [textAreaValue, setTextAreaValue] = useState("");
    const [radioValue, setRadioValue] = useState("https://cdn-icons-png.flaticon.com/512/105/105220.png");

    // Update functions
    const handleTextAreaChange = (event) => setTextAreaValue(event.target.value);
    const handleRadioChange = (event) => setRadioValue(event.target.value);

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
                    commentIcon: radioValue
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
                setRadioValue(selectedWeek.comment.commentIcon);
            } else {
                setTextAreaValue('');
                setRadioValue("Option 1");
            }
        } else {
            setTextAreaValue('');
            setRadioValue("Option 1");
        }
    }, [selectedWeeks, lifeBoardData]);



    const selectedWeeksCount = Object.keys(selectedWeeks).length;
    const options = [
        { name: "Travel", icon: "https://cdn-icons-png.flaticon.com/512/105/105220.png" },
        { name: "Housing", icon: "https://cdn-icons-png.flaticon.com/512/105/105220.png" },
        { name: "Love", icon: "https://cdn-icons-png.flaticon.com/512/105/105220.png" },
        { name: "Work", icon: "https://cdn-icons-png.flaticon.com/512/105/105220.png" },
        { name: "Others", icon: "https://cdn-icons-png.flaticon.com/512/105/105220.png" },
    ];

    // Only render the comment editting panel if 1 or none weeks are selected. Comment panel it's hidden if multiple weeks are selected
    return (
        selectedWeeksCount <= 1 ?
            <div className={styles.container}>
                <EditPanel>
                    <p>Comments Edit Panel</p>

                    {/* Text area */}
                    <textarea value={textAreaValue} onChange={handleTextAreaChange} />

                    {/* Radio buttons */}
                    <div className={styles.radioGroup}>
                        {options.map(option => (
                            <div key={option.name}>
                                <input type="radio" id={option.name} name="radioGroup" value={option.icon}
                                    checked={radioValue === option.icon}
                                    onChange={handleRadioChange} />
                                <label htmlFor={option.name}>{option.name}</label>
                                <img src={option.icon} alt={option.name} className={styles.icon} />
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





