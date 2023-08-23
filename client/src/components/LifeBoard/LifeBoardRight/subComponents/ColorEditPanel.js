/**
 * ColorEditPanel.js
 * 
 * Contains states for the selecting colors and the textArea. Both needed as arguments of updateWeek() which is the main purpose of the component
 * 
 */

import EditPanel from "./EditPanel";
import { WeekSelectionContext } from '../../../../contexts/weekSelectionContext';
import { LifeBoardDataContext } from '../../../../contexts/lifeBoardDataContext';
import React, { useContext, useState, useEffect } from 'react';
import styles from './ColorEditPanel.module.css';
import { colors } from './../../../../helpers/colors'


function ColorEditPanel(props) {
    /*
    * Part 1 - States and side effects
    */

    // import from contexts
    const { selectedWeeks, deselectAllWeeks } = useContext(WeekSelectionContext);
    const { updateWeek, usedColors, addOrEditColor } = useContext(LifeBoardDataContext);

    // State variables for input user
    const [textAreaValue, setTextAreaValue] = useState("");
    const [selectedColor, setSelectedColor] = useState(null);

    // Update functions for those states (onChange and onClick)
    const handleTextAreaChange = (event) => setTextAreaValue(event.target.value);
    // const handleColorSelect = (color) => setSelectedColor(color);
    const handleColorSelect = (c) => {
        if (selectedColor && selectedColor === c) {
            setSelectedColor(null); // deselect the color
        } else {
            setSelectedColor(c); // select the clicked color
        }
    };


    // Upon user submitting changes, updates lifeBoardData state using updateWeek() from lifeBoardDataContext
    const handleSubmit = () => {
        // Getting the selected weeks keys (for example, `r2-2` for row 2, week 2}
        //.. selectedWeeks object looks like {r1-0: true, r1-1: true}
        const selectedWeekKeys = Object.keys(selectedWeeks);

        // Update all the selected weeks with the new color and updates usedColors thru 'addOrEditColor'
        selectedWeekKeys.forEach((selectedWeekKey) => {
            const [row, week] = selectedWeekKey.split("-");
            updateWeek(row, week, { color: selectedColor });
            addOrEditColor(selectedColor, textAreaValue);
        });

        deselectAllWeeks(); //reset selection
        setSelectedColor(null); // deselect the color
        props.setTriggerSave(true); //saves it all in db
    };

    // When selecting a color, setTextArea to its description for user to easily edit
    useEffect(() => {
        if (selectedColor) {
            const matchingColor = usedColors.find(usedColor => usedColor.colorName === selectedColor);
            if (matchingColor) {
                setTextAreaValue(matchingColor.colorDescription);
            } else {
                setTextAreaValue("");
            }
        } else {
            setTextAreaValue("")
        }
    }, [selectedColor, usedColors]);


    /*
    * Part 2 - JSX and relevant declarations
    */

    // Utility functions for better readability in the JSX
    const isTextAreaEnabled = () => {
        return Object.keys(selectedWeeks).length > 0 && selectedColor;
    };
    const isSubmitEnabled = () => {
        return Object.keys(selectedWeeks).length > 0 && selectedColor && textAreaValue;
    };

    // For efficient lookup in the JSX, transforming usedColor's array of objects into an object like colorName: colorDescription, ..
    const colorDescriptions = {};
    usedColors.forEach(usedColor => {
        colorDescriptions[usedColor.colorName] = usedColor.colorDescription;
    });

    // console.log('selectedWeeks', selectedWeeks)
    //console.log('selectedColor', selectedColor)
    //console.log('usedColors', usedColors)

    return (
        <div className={styles.container}>
            <EditPanel>
                <p>Color Edit Panel</p>
                <textarea
                    value={textAreaValue}
                    onChange={handleTextAreaChange}
                    disabled={!isTextAreaEnabled()}
                />
                {/* Color selector */}
                <div className={styles.colorSelector}>
                    {Object.keys(colors).map(paletteName => (
                        <div className={styles.paletteGroup} key={paletteName}>
                            {Object.keys(colors[paletteName]).map(colorName => (
                                <div
                                    key={colorName}
                                    className={`${styles.colorOption} ${selectedColor === colors[paletteName][colorName] ? styles.selected : ''}`}
                                    style={{ backgroundColor: colors[paletteName][colorName] }}
                                    onClick={() => handleColorSelect(colors[paletteName][colorName])}
                                >
                                    {
                                        colorDescriptions[colors[paletteName][colorName]] ? <span>{colorDescriptions[colors[paletteName][colorName]]}</span> : null
                                    }
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Submit button */}
                <button onClick={handleSubmit} disabled={!isSubmitEnabled()}>Submit</button>
            </EditPanel>
        </div>
    )
}
export default ColorEditPanel;

