/**
 * CommentEditPanel.js
 * 
 * (the file structure is very similar to colorEditPanel)
 * 
 * Big file... is mainly responsible for handling input changes from the textArea and the selection of icons. And then, upon user clicking submit, update those changes to the main state lifeBoardData from its context to render changes instantly
 * 
 * Apart from that the file has bit of complexity in the useEffects, because the textArea value is used as kind of a tutorial in form of guidance texts, together with the html placeholder property. There are several state, so many combinations and textArea has a thought-of value in each, for optimal UX
 * 
 * Eventho big, the file should be readable as its broken down in different parts
 * 
 */

import EditPanel from "./EditPanel";
import { WeekSelectionContext } from '../../../../contexts/weekSelectionContext';
import { LifeBoardDataContext } from '../../../../contexts/lifeBoardDataContext';
import React, { useContext, useState, useEffect } from 'react';
import styles from './CommentEditPanel.module.css';  // import CSS module
import { icons } from '../../../../helpers/icons'

function CommentEditPanel(props) {

    /*
    * Part 1 - States and handlers
    */

    // imports from contexts
    const { selectedWeeks, deselectAllWeeks } = useContext(WeekSelectionContext);
    const { lifeBoardData, updateWeek } = useContext(LifeBoardDataContext);

    // variables that are called multiple times in the file
    const selectedWeekKey = Object.keys(selectedWeeks)[0]; //the key of the first selectedWeek
    const selectedWeeksCount = Object.keys(selectedWeeks).length;
    //console.log('selectedWeeksCount', selectedWeeksCount)
    //console.log('selectedWeekKey', selectedWeekKey)

    // state variables for inputs (textArea and selectable icons)
    const [textAreaValue, setTextAreaValue] = useState("");
    const [selectedIcon, setSelectedIcon] = useState(null);
    const [isTextAreaManuallyEdited, setTextAreaManuallyEdited] = useState(false); // a flag to track whether textArea's been modified by the user. To give those changes higher priority over the guidance texts

    /// handlers for said inputs
    const handleTextAreaChange = (event) => {
        setTextAreaValue(event.target.value);
        setTextAreaManuallyEdited(true); // sets the flag to true
    };
    const handleIconSelect = (iconKey) => {
        if (selectedIcon && selectedIcon === iconKey) {
            setSelectedIcon(null); // deselect the icon
        } else {
            setSelectedIcon(iconKey); // select the clicked icon
        }
    };

    // handleSubmit --- Simply updates main state of the app (lifeBoardData) with those weeks whose comment have been modified
    const handleSubmit = () => {
        // Getting the selected weeks keys (for example, `r2-2` for row 2, week 2}
        //.. selectedWeeks object looks like {r1-0: true, r1-1: true}
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
        setTextAreaManuallyEdited(false); //resets flag for guidance text to take over again 
    };


    /*
    * Part 2 - useEffects --- sets textAreaValue to different guidance texts
    */

    // First useEffect. This one is responsible for setting a guidance text when the textArea is disabled
    //.. the last clause (else) is messy with that extra if statement but otherwise it overwrites the second useEffect trying to set textAreaValue to the week's comment data
    useEffect(() => {
        //resets the flag if no weeks are selected
        if (selectedWeeksCount === 0) {
            setTextAreaManuallyEdited(false);
        }

        // if the flag is True, exit the useEffect. This is done to persist the typing of the user over the guidance texts
        if (isTextAreaManuallyEdited) return;

        // this is the actual logic of the guidance text based on different combintations of selections
        if (selectedWeeksCount === 0 && !selectedIcon) {
            setTextAreaValue('select a week (only one) and an Icon');
        } else if (selectedWeeksCount === 1 && !selectedIcon) {
            setTextAreaValue('select a week (only one) and an Icon');
        } else if (selectedWeeksCount === 0 && selectedIcon) {
            setTextAreaValue('select a week (only one) and an Icon');
        } else {
            if (selectedWeekKey) {
                const [row, week] = selectedWeekKey.split("-");
                const selectedWeek = lifeBoardData[row][week];
                if (selectedWeek.comment.commentIcon) {
                    return;
                }
            }
            //console.log('resetting textAreaValue inside useEffect.nothingSelected')
            setTextAreaValue('');
        }
    }, [selectedWeeksCount, selectedIcon, selectedWeeks, selectedWeekKey, lifeBoardData, isTextAreaManuallyEdited])

    //this useEffect is responsible for setting the textAreaValue and selectedIcon to the selected week's data (if it has data)
    useEffect(() => {
        //console.log('inside useEffect')
        if (selectedWeekKey) {
            const [row, week] = selectedWeekKey.split("-");
            const selectedWeek = lifeBoardData[row][week];
            if (selectedWeek.comment.commentIcon) {
                //console.log('Setting textAreaValue to commentText inside useEffect.ifComment')
                setTextAreaValue(selectedWeek.comment.commentText);
                setSelectedIcon(selectedWeek.comment.commentIcon);
            }
        }
    }, [lifeBoardData, selectedWeekKey]);

    // finally this useEffect, simply reset the icon when no weeks are selected
    useEffect(() => {
        if (selectedWeeksCount === 0) {
            setSelectedIcon();
        }
    }, [selectedWeeksCount])

    /*
    * Part 3 - JSX and relevant declarations
    */

    // Utility functions for better readability in the JSX
    const isSubmitEnabled = () => {
        return selectedWeeksCount === 1 && selectedIcon && textAreaValue;
    };
    const isTextAreaEnabled = () => {
        return selectedWeeksCount === 1 && selectedIcon;
    };

    //console.log('selectedWeeks', selectedWeeks)
    //console.log('selectedIcon', selectedIcon)
    // Only render the comment editting panel if 1 or none weeks are selected. Comment panel it's hidden if multiple weeks are selected
    return (
        selectedWeeksCount <= 1 ?
            <div className={styles.container}>
                <EditPanel>
                    <p>Comments Edit Panel</p>

                    {/* Text area */}
                    <textarea
                        value={textAreaValue}
                        onChange={handleTextAreaChange}
                        disabled={!isTextAreaEnabled()}
                        placeholder={isTextAreaEnabled() ? 'Type in a short text for your special day' : null}
                    />

                    {/* Icon selector */}
                    <div>
                        {Object.entries(icons).map(([key, icon]) => (
                            <div
                                key={key}
                                className={`${selectedIcon === key ? styles.selected : ''}`}
                                onClick={() => handleIconSelect(key)}
                            >
                                <img src={icon} alt={key} className={styles.icon} />
                                <span className={styles.unselectable}>{key}</span>
                            </div>
                        ))}
                    </div>

                    {/* Submit button */}
                    <button onClick={handleSubmit} disabled={!isSubmitEnabled()}>Submit</button>
                </EditPanel>
            </div>
            : null
    )
}
export default CommentEditPanel;