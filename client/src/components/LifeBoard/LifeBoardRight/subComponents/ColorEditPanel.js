/**
 * ColorEditPanel.js
 * 
 * 
 */

import EditPanel from "./EditPanel";
import { WeekSelectionContext } from '../../../../contexts/weekSelectionContext';
import { LifeBoardDataContext } from '../../../../contexts/lifeBoardDataContext';
import React, { useContext, useState, useEffect } from 'react';
import styles from './ColorEditPanel.module.css';
function ColorEditPanel() {
    // impot from contexts
    const { selectedWeeks, deselectAllWeeks } = useContext(WeekSelectionContext);
    const { lifeBoardData, updateWeek } = useContext(LifeBoardDataContext);

    // State variables
    const [textAreaValue, setTextAreaValue] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    // Update functions
    const handleTextAreaChange = (event) => setTextAreaValue(event.target.value);
    const handleColorSelect = (color) => setSelectedColor(color);

    // Updates lifeBoardData state using updateWeek() from lifeBoardDataContext
    const handleSubmit = () => {
        // Getting the selected weeks keys in the form of {r2-2} for row 2, week 2
        const selectedWeekKeys = Object.keys(selectedWeeks);

        // Update all the selected weeks with the new color data
        selectedWeekKeys.forEach((selectedWeekKey) => {
            const [row, week] = selectedWeekKey.split("-");
            updateWeek(row, week, {
                color: {
                    colorName: selectedColor,
                    colorDescription: textAreaValue
                }
            });
        });
        deselectAllWeeks();
    };

    // Displays the color data (name and description) in the editting panel when selecting a week that had already been modified
    useEffect(() => {
        //console.log('inside usEffect')
        if (selectedWeeks && Object.keys(selectedWeeks).length > 0) {
            // Get the color data from the first selected week (it will display the color data from the first week selected only)
            const [row, week] = Object.keys(selectedWeeks)[0].split("-");
            const selectedWeek = lifeBoardData[row][week];
            if (selectedWeek.color) {
                setTextAreaValue(selectedWeek.color.colorDescription);
                setSelectedColor(selectedWeek.color.colorName);
            } else {
                setTextAreaValue('');
                setSelectedColor("");
            }
        } else {
            // If no weeks are selected, reset the state
            setTextAreaValue('');
            setSelectedColor("");
        }
    }, [selectedWeeks, lifeBoardData]);

    const colors = [
        { name: "Red", color: "#FF0000" },
        { name: "Blue", color: "#0000FF" },
        { name: "Green", color: "#00FF00" },
        { name: "Yellow", color: "#FFFF00" },
        { name: "Purple", color: "#800080" },
    ];

    return (
        <div className={styles.container}>
            <EditPanel>
                <p>Color Edit Panel</p>

                {/* Text area */}
                <textarea value={textAreaValue} onChange={handleTextAreaChange} />

                {/* Color selector */}
                <div className={styles.colorSelector}>
                    {colors.map((colorOption) => (
                        <div
                            key={colorOption.name}
                            className={`${styles.colorOption} ${selectedColor === colorOption.color ? styles.selected : ''}`}
                            style={{ backgroundColor: colorOption.color }}
                            onClick={() => handleColorSelect(colorOption.color)}
                        />
                    ))}
                </div>

                {/* Submit button */}
                {Object.keys(selectedWeeks).length > 0 && <button onClick={handleSubmit}>Submit</button>}
            </EditPanel>
        </div>
    )
}

export default ColorEditPanel;
