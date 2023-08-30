/**
 * ColorEditPanel.js
 * 
 * (the file structure is very similar to colorEditPanel)
 * 
 * Big file... is mainly responsible for handling input changes from the textArea and the selection of colors. And then, upon user clicking submit, update those changes to the main state lifeBoardData from its context to render changes instantly
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
import styles from './ColorEditPanel.module.css';
import { colors } from './../../../../helpers/colors'


function ColorEditPanel(props) {
    /*
    * Part 1 - States and handlers
    */

    // import from contexts
    const { selectedWeeks, deselectAllWeeks } = useContext(WeekSelectionContext);
    const { updateWeek, usedColors } = useContext(LifeBoardDataContext);

    // state variables for inputs (textArea and selectable colors)
    const [textAreaValue, setTextAreaValue] = useState("");
    const [selectedColor, setSelectedColor] = useState(null);
    const [isTextAreaManuallyEdited, setTextAreaManuallyEdited] = useState(false);

    // handlers for said inputs
    const handleTextAreaChange = (event) => {
        setTextAreaValue(event.target.value);
        setTextAreaManuallyEdited(true);
    };
    const handleColorSelect = (c) => {
        if (selectedColor && selectedColor === c) {
            setSelectedColor(null); // deselect the color
        } else {
            setSelectedColor(c); // select the clicked color
        }
    };

    // handleSubmit --- Simply updates main state of the app (lifeBoardData) with those weeks whose color have been modified
    const handleSubmit = () => {

        updateWeek(selectedWeeks, { color: selectedColor }, textAreaValue);

        deselectAllWeeks(); //reset selection
        setSelectedColor(null); // deselect the color
        setTextAreaManuallyEdited(false); //resets flag for guidance text to take over again
        props.setTriggerSave(true); //saves it all in db
    };


    /*
    * Part 2 - useEffects
    */

    // useEffect --- sets textAreaValue to different guidance texts
    const selectedWeeksCount = Object.keys(selectedWeeks).length;
    useEffect(() => {
        //resets the flag if no weeks are selected
        if (selectedWeeksCount === 0) {
            setTextAreaManuallyEdited(false);
        }

        // if the flag is True, exit the useEffect. This is done to persist the typing of the user over the guidance texts
        if (isTextAreaManuallyEdited) return;

        // this is the actual logic of the different guidance texts based on different combintations of selections
        const matchingColor = usedColors.find(usedColor => usedColor.colorName === selectedColor);
        if (selectedColor) {
            // console.log('length of selectedWeeks:', selectedWeeksCount)
            // console.log('matchingColor', matchingColor)
            if (selectedWeeksCount <= 0) {
                setTextAreaValue("Select any number of weeks and a color")
            }
            else if (matchingColor && selectedWeeksCount <= 0) {
                setTextAreaValue("Select any number of weeks and a color")
            }
            else if (matchingColor) {
                setTextAreaValue(matchingColor.colorDescription);
            }
            else {
                setTextAreaValue('')
            }
        } else {
            setTextAreaValue('Select any number of weeks and a color')
        }
    }, [selectedColor, usedColors, selectedWeeks, isTextAreaManuallyEdited, selectedWeeksCount]);

    // deselects color when no weeks are selected
    useEffect(() => {
        if (selectedWeeksCount === 0) {
            setSelectedColor();
        }
    }, [selectedWeeksCount])



    /*
    * Part 3 - JSX and relevant declarations
    */

    // Utility variables
    const isTextAreaEnabled = selectedWeeksCount > 0 && selectedColor;
    const isSubmitEnabled = selectedWeeksCount > 0 && selectedColor && textAreaValue;

    // For efficient lookup in the JSX, transforming usedColor's array of objects into an object like colorName: colorDescription, ..
    const colorDescriptions = {};
    usedColors.forEach(usedColor => {
        colorDescriptions[usedColor.colorName] = usedColor.colorDescription;
    });

    //console.log('selectedWeeks', selectedWeeks)
    //console.log('selectedColor', selectedColor)
    console.log('usedColors', JSON.stringify(usedColors))

    return (
        <div className={styles.container}>
            <EditPanel>
                <p>Color Edit Panel</p>
                <textarea
                    value={textAreaValue}
                    onChange={handleTextAreaChange}
                    disabled={!isTextAreaEnabled}
                    placeholder={isTextAreaEnabled ? 'What do yo want this color to represent in your life?' : null}
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
                                        colorDescriptions[colors[paletteName][colorName]] ? <span className={styles.unselectable}>{colorDescriptions[colors[paletteName][colorName]]}</span> : null
                                    }
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {/* Submit button */}
                <button onClick={handleSubmit} disabled={!isSubmitEnabled}>Submit</button>
            </EditPanel>
        </div>
    )
}
export default ColorEditPanel;

