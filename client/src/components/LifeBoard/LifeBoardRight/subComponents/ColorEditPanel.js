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
    const { lifeBoardData, updateWeek, usedColors } = useContext(LifeBoardDataContext);

    // State variables
    const [textAreaValue, setTextAreaValue] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    // Update functions
    const handleTextAreaChange = (event) => setTextAreaValue(event.target.value);
    const handleColorSelect = (color) => setSelectedColor(color);

    // Updates lifeBoardData state using updateWeek() from lifeBoardDataContext
    const handleSubmit = () => {
        // Getting the selected weeks keys (for example, {r2-2} for row 2, week 2}
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

    // Displays the color description in the editting panel when selecting a week that has already been modified
    //..Only works if only one week is selected (otherwise it could have to selct two colors at once which isn't possible)
    useEffect(() => {
        //console.log('inside usEffect')
        if (selectedWeeks && Object.keys(selectedWeeks).length === 1) {
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
        }
        if (Object.keys(selectedWeeks).length < 1 && !selectedColor) {
            setTextAreaValue('Select a week and a color')
        }
        else if (!selectedColor) {
            setTextAreaValue('Select a color')
        }
        else if (Object.keys(selectedWeeks).length < 1) {
            setTextAreaValue('Select a week')
        }

    }, [selectedWeeks, lifeBoardData, selectedColor]);

    const colors = [
        { name: "Red", color: "#FF0000" },
        { name: "Blue", color: "#0000FF" },
        { name: "Green", color: "#00FF00" },
        { name: "Yellow", color: "#FFFF00" },
        { name: "Purple", color: "#800080" },
    ];


    console.log('selectedWeeks', selectedWeeks)
    console.log('selectedColor', selectedColor)
    console.log('usedColors', usedColors)
    return (
        <div className={styles.container}>
            <EditPanel>
                <p>Color Edit Panel</p>

                {/* Text area */}
                <textarea value={textAreaValue} onChange={handleTextAreaChange} disabled={Object.keys(selectedWeeks).length > 0 && selectedColor ? false : true} />

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
                                usedColors.find(obj => Object.values(obj).includes(colorOption.color))
                                    ? <span>{usedColors.find(obj => Object.values(obj).includes(colorOption.color)).colorDescription}</span>
                                    : null
                            }

                        </div>
                    ))}
                </div>

                {/* Submit button */}
                <button onClick={handleSubmit} disabled={Object.keys(selectedWeeks).length > 0 && selectedColor && textAreaValue ? false : true}>Submit</button>
            </EditPanel>
        </div>
    )
}

export default ColorEditPanel;
