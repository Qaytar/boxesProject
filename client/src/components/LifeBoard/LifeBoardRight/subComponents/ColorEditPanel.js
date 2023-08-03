/**
 * ColorEditPanel.js
 * 
 * 
 */

import EditPanel from "./EditPanel";
import { BoxSelectionContext } from '../../../../contexts/boxSelectionContext';
import { LifeBoardDataContext } from '../../../../contexts/lifeBoardDataContext';
import React, { useContext, useState, useEffect } from 'react';
import styles from './ColorEditPanel.module.css';
function ColorEditPanel() {
    // impot from contexts
    const { selectedBoxes, deselectAllBoxes } = useContext(BoxSelectionContext);
    const { lifeBoardData, updateBox } = useContext(LifeBoardDataContext);

    // State variables
    const [textAreaValue, setTextAreaValue] = useState("");
    const [selectedColor, setSelectedColor] = useState("");

    // Update functions
    const handleTextAreaChange = (event) => setTextAreaValue(event.target.value);
    const handleColorSelect = (color) => setSelectedColor(color);

    // Updates lifeBoardData state using updateBox() from lifeBoardDataContext
    const handleSubmit = () => {
        // Getting the selected boxes keys in the form of {r2-2} for row 2, week 2
        const selectedBoxKeys = Object.keys(selectedBoxes);

        // Update all the selected boxes with the new color data
        selectedBoxKeys.forEach((selectedBoxKey) => {
            const [row, week] = selectedBoxKey.split("-");
            updateBox(row, week, {
                color: {
                    colorName: selectedColor,
                    colorDescription: textAreaValue
                }
            });
        });
        deselectAllBoxes();
    };

    // Displays the color data (name and description) in the editting panel when selecting a box that had already been modified
    useEffect(() => {
        //console.log('inside usEffect')
        if (selectedBoxes && Object.keys(selectedBoxes).length > 0) {
            // Get the color data from the first selected box (it will display the color data from the first box selected only)
            const [row, week] = Object.keys(selectedBoxes)[0].split("-");
            const selectedBox = lifeBoardData[row][week];
            if (selectedBox.color) {
                setTextAreaValue(selectedBox.color.colorDescription);
                setSelectedColor(selectedBox.color.colorName);
            } else {
                setTextAreaValue('');
                setSelectedColor("");
            }
        } else {
            // If no boxes are selected, reset the state
            setTextAreaValue('');
            setSelectedColor("");
        }
    }, [selectedBoxes, lifeBoardData]);

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
                {Object.keys(selectedBoxes).length > 0 && <button onClick={handleSubmit}>Submit</button>}
            </EditPanel>
        </div>
    )
}

export default ColorEditPanel;
