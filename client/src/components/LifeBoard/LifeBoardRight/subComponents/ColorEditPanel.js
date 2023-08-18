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
function ColorEditPanel(props) {
    /*
    * Part 1 - States and side effects
    */

    // import from contexts
    const { selectedWeeks, deselectAllWeeks } = useContext(WeekSelectionContext);
    const { updateWeek, usedColors, addOrEditColor } = useContext(LifeBoardDataContext);

    // State variables
    const [textAreaValue, setTextAreaValue] = useState("");
    const [selectedColor, setSelectedColor] = useState(null);


    // Update functions based on user input (onChange and onClick)
    const handleTextAreaChange = (event) => setTextAreaValue(event.target.value);
    // const handleColorSelect = (color) => setSelectedColor(color);
    const handleColorSelect = (colorName) => {
        if (selectedColor && selectedColor === colorName) {
            setSelectedColor(null); // deselect the color
        } else {
            setSelectedColor(colorName); // select the clicked color
        }
    };


    // Updates lifeBoardData state using updateWeek() from lifeBoardDataContext
    const handleSubmit = () => {
        // Getting the selected weeks keys (for example, `r2-2` for row 2, week 2}
        //.. selectedWeeks object looks like {r1-0: true, r1-1: true}
        const selectedWeekKeys = Object.keys(selectedWeeks);

        // Update all the selected weeks with the new color data
        selectedWeekKeys.forEach((selectedWeekKey) => {
            const [row, week] = selectedWeekKey.split("-");
            updateWeek(row, week, { color: selectedColor });
            addOrEditColor(selectedColor, textAreaValue);
        });

        deselectAllWeeks();
        props.setTriggerSave(true);
    };

    // When selecting a color setTextArea to its description for user to re use or edit
    useEffect(() => {
        if (selectedColor) {
            const matchingColor = usedColors.find(color => color.colorName === selectedColor);
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
    * Part 2 - JSX and relevant declaration
    */

    const colors = [
        { name: "Red", color: "#FF0000" },
        { name: "Blue", color: "#0000FF" },
        { name: "Green", color: "#00FF00" },
        { name: "Yellow", color: "#FFFF00" },
        { name: "Purple", color: "#800080" },
    ];

    // Utility functions for better readability in the JSX
    const isTextAreaEnabled = () => {
        return Object.keys(selectedWeeks).length > 0 && selectedColor;
    };
    const isSubmitEnabled = () => {
        return Object.keys(selectedWeeks).length > 0 && selectedColor && textAreaValue;
    };

    // For efficient lookup in the JSX, transforming usedColor's array of objects into an object like colorName: colorDescription, ..
    const colorDescriptions = {};
    usedColors.forEach(color => {
        colorDescriptions[color.colorName] = color.colorDescription;
    });

    // console.log('selectedWeeks', selectedWeeks)
    // console.log('selectedColor', selectedColor)
    // console.log('usedColors', usedColors)

    return (
        <div className={styles.container}>
            <EditPanel>
                <p>Color Edit Panel</p>

                {/* Text area */}
                <textarea
                    value={textAreaValue}
                    onChange={handleTextAreaChange}
                    disabled={!isTextAreaEnabled()}
                />

                {/* Color selector */}
                <div className={styles.colorSelector}>
                    {colors.map((colorOption) => (
                        <div
                            key={colorOption.name}
                            className={`${styles.colorOption} ${selectedColor === colorOption.color ? styles.selected : ''}`}
                            style={{ backgroundColor: colorOption.color }}
                            onClick={() => handleColorSelect(colorOption.color)}
                        >
                            {
                                /* Renders the colorDescription inside the color, only if that color is being used (hence, present in usedColors) */
                                colorDescriptions[colorOption.color] ? <span>{colorDescriptions[colorOption.color]}</span> : null
                            }
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

