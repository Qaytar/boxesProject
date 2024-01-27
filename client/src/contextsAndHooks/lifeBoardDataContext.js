/**
 * lifeBoardDataContext.js
 * 
 * defines LifeBoardDataContext and provides several key functions and states to the rest of the App
 *
 * lifeBoardData is the object that renders the grid of the app and holds the data of the 5200 (52 weeks times 100 years) weeks (which are represented by the <week> component)
 */

import { createContext, useState, useEffect } from 'react';
import { fetchData } from '../helpers/databaseOpsHelper';
import { getSelectedWeeksColorsCount, updateUsedColors, editColorDescription } from '../helpers/updateWeekHelper';

// creates context
export const LifeBoardDataContext = createContext();

// defines provider
export const LifeBoardDataProvider = ({ children }) => {
    /*
    *
    * States (the three states of the app that are saved in the db)
    *
    */

    // main state of the context: the lifeBoard object
    const [lifeBoardData, setLifeBoardData] = useState(null);

    // a unique list of all the colors used by a user. It's an array of objects with properties colorName, colorDescription and count (of how many weeks are using that color, so they can be deleted when is 0)
    const [usedColors, setUsedColors] = useState([]);

    // user's birth date to personalize its lifeBoard
    const [birthDate, setBirthDate] = useState();

    /*
    *
    * App side effect - load states from db
    *
    */

    // When app mounts, stores the data of the user (from db) in the 3 states.
    //..This context is pretty global so essentially this useEffect runs very early on when the app is mounted
    // useEffect(() => {
    //     fetchData(setLifeBoardData, setUsedColors, setBirthDate);
    // }, []);


    /*
    *
    * Main function to update key states
    *
    */

    // Updates states lifeBoardData and usedColors as the user interacts with the app so that the updates can be rendered before saved in the db
    //..called from 3 places: colorEditting, commentEditting and 'reset week button' (3rd and 4th argument are optional, only used in some of three cases/calls)    
    const updateWeek = (selectedWeeks, newWeekData, colorDescription, deselectAllWeeks) => {

        // 1) handles calls coming from 'reset weeks button' (both color and comment are passed empty).
        if ('color' in newWeekData && 'comment' in newWeekData) {

            // for the selection of weeks where content will be eliminated, list already existing colors and count its weeks (prior the change takes effect)
            const selectedWeeksColorsCount = getSelectedWeeksColorsCount(lifeBoardData, selectedWeeks);

            // updates usedColor's count property by substracting color counts of about-to-be-resetted weeks
            updateUsedColors(setUsedColors, usedColors, selectedWeeksColorsCount);

            deselectAllWeeks() // resets selection

        } else if ('color' in newWeekData) { // 2) handles calls coming from user adding a color to the selectedWeeks

            /*
            * Declare variables
            */

            // the color that the user added to selectedWeeks
            const colorName = newWeekData.color

            // for the color that's being used in the update, count how many weeks will it be applied to
            const updatingColorCount = {
                colorName: colorName,
                count: Object.keys(selectedWeeks).filter(key => selectedWeeks[key]).length
            };
            // for the selection of weeks where it will be applied to, list already existing colors and count its weeks (prior the change takes effect)
            const selectedWeeksColorsCount = getSelectedWeeksColorsCount(lifeBoardData, selectedWeeks);

            /*
            * Call functions
            */

            // updates usedColor state. Add's new color if needed and keeps count property of each color updated
            updateUsedColors(setUsedColors, usedColors, selectedWeeksColorsCount, updatingColorCount);

            // for the color being used, edits color description if required
            editColorDescription(colorName, colorDescription, setUsedColors)

        }

        // 3) finally handles the simplest case (commentEditting calls). Tho colorEditting and resetWeeks calls also need to update the lifeBoardData and logic is re-used
        let lifeBoardDataCopy = { ...lifeBoardData };

        for (const selectedWeekKey of Object.keys(selectedWeeks)) {
            if (selectedWeeks[selectedWeekKey]) { // Check if the week is actually selected
                const [row, week] = selectedWeekKey.split("-");

                // Merges the existing data with the new data using the spread operator
                lifeBoardDataCopy[row][week] = {
                    ...lifeBoardDataCopy[row][week],
                    ...newWeekData
                };
            }
        }
        setLifeBoardData(lifeBoardDataCopy);

    };

    return (
        <LifeBoardDataContext.Provider value={{ setLifeBoardData, lifeBoardData, usedColors, setUsedColors, birthDate, setBirthDate, updateWeek }}>
            {children}
        </LifeBoardDataContext.Provider>
    );
};
