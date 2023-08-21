/**
 * lifeBoardDataContext.js
 * 
 * defines LifeBoardDataContext and provides several key functions and states to the rest of the App
 *
 * lifeBoardData is the object that renders the grid of the app and holds the data of the 5200 (52 weeks times 100 years) weeks (which are represented by the <week> component)
 */

import { createContext, useState, useEffect } from 'react';
import { fetchData } from '../helpers/databaseOpsHelper';

// creates context
export const LifeBoardDataContext = createContext();

// defines provider
export const LifeBoardDataProvider = ({ children }) => {
    /*
    *
    * States
    *
    */

    // main state of the context: the lifeBoard object
    const [lifeBoardData, setLifeBoardData] = useState(null);

    // It holds a unique list of all the colors used by a user. To render the legend of all colors
    // this information is contained in the lifeBoardData of every user but it'd be costy to retrieve so it has been decided to keep track of it in a separate state as colors are added and removed from the board
    const [usedColors, setUsedColors] = useState([]);

    // user's birth date to personalize its lifeBoard and add dates to each week
    const [birthDate, setBirthDate] = useState();

    /*
    *
    * App side effecte - load states from db
    *
    */


    // When app mounts, reaches out to the server and stores the data of the user (coming from db) in the main states.
    //..This context is pretty global so essentially this useEffect runs very early on when the app is mounted
    useEffect(() => {
        fetchData(setLifeBoardData, setUsedColors, setBirthDate);
    }, []);

    /*
    *
    * Functions to update states
    *
    */

    // updateWeek() is called to modify the LifeBoardData as the user adds colors and comments to its weeks. So that the updates can be rendered before saved in the db
    // takes as arguments the coordinates of the week to be updated and the new data (color, comment, etc.)
    const updateWeek = (row, week, newWeekData) => {
        let lifeBoardDataCopy = { ...lifeBoardData };

        // Merges the existing data with the new data using spread operator
        lifeBoardDataCopy[row][week] = {
            ...lifeBoardDataCopy[row][week],
            ...newWeekData
        };

        setLifeBoardData(lifeBoardDataCopy);
    };



    // Updates the state usedColors, keeping track of every new color used
    const addOrEditColor = (colorName, colorDescription) => {
        setUsedColors((currentUsedColors) => {
            // Check if the color name exists in currentUsedColors
            const matchingColor = currentUsedColors.find(color => color.colorName === colorName);

            if (colorName && !matchingColor) {
                // If colorName is new, just add it
                return [...currentUsedColors, {
                    colorName,
                    colorDescription
                }];
            }
            else if (matchingColor && matchingColor.colorDescription !== colorDescription) {
                // If colorName exists but the description is different, update the description
                return currentUsedColors.map(color => {
                    if (color.colorName === colorName) {
                        return {
                            ...color,
                            colorDescription
                        };
                    }
                    // If colorDescription is the same, do nothing
                    return color;
                });
            }
            // If color already exists and its description matches, do nothing
            return currentUsedColors;
        });
    };

    return (
        <LifeBoardDataContext.Provider value={{ lifeBoardData, usedColors, setUsedColors, birthDate, setBirthDate, updateWeek, addOrEditColor }}>
            {children}
        </LifeBoardDataContext.Provider>
    );
};
