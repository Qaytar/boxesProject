/**
 * lifeBoardDataContext.js
 * 
 * defines LifeBoardDataContext and provides { lifeBoardData, saveLifeBoard, updateWeek, usedColors, birthDate, setBirthDate, saveBirthDate } to the rest of the App
 *
 * lifeBoardData is the object that renders the grid of the app and holds the data of the 5200 (52 weeks times 100 years) weeks (which are represented by the <week> component)
 */

import { createContext, useState, useEffect } from 'react';


// creates context
export const LifeBoardDataContext = createContext();

// defines provider
export const LifeBoardDataProvider = ({ children }) => {
    // main state of the context: the lifeBoard object
    const [lifeBoardData, setLifeBoardData] = useState(null);

    // It holds a unique list of all the colors used by a user. To render the legend of all colors
    // this information is contained in the lifeBoardData of every user but it'd be costy to retrieve so it has been decided to keep track of it in a separate state
    const [usedColors, setUsedColors] = useState([]);

    // birthDate state
    const [birthDate, setBirthDate] = useState();

    // reaches out to the server and stores the data of the user (coming from db) in the states
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:5000/db/getLifeBoard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
            const data = await response.json();
            setLifeBoardData(data.lifeBoard);
            setUsedColors(data.usedColors || []);
            setBirthDate(data.birthDate || null);
        };

        fetchData();
    }, []);


    // updateWeek() is called to modify the LifeBoardData as the user modifies it by adding colors and comments to its weeks/weeks. So that the updates can be rendered before saved in the db
    // takes as arguments the coordinates of the week to be updated and the new data (color, comment, etc.)
    const updateWeek = (row, week, newWeekData) => {
        let lifeBoardDataCopy = { ...lifeBoardData };

        // Merges the existing data with the new data using spread operator
        lifeBoardDataCopy[row][week] = {
            ...lifeBoardDataCopy[row][week],
            ...newWeekData
        };

        let updatedWeek = lifeBoardDataCopy[row][week];

        // Checks if any of the properties are truthy and set the modified flag to 'y'
        if ((updatedWeek.color && updatedWeek.color.colorName) || (updatedWeek.comment && (updatedWeek.comment.commentText || updatedWeek.comment.commentIcon))) {
            updatedWeek.modified = 'y';
        }

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


    // Reaches endpoint responsible of saving changes made by the user into the db
    const saveLifeBoard = async () => {
        await fetch('http://localhost:5000/db/saveLifeBoard', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lifeBoardData, usedColors })
        });
    };

    // Reaches endpoint responsible of saving user's birthDate
    const saveBirthDate = async () => {
        await fetch('http://localhost:5000/db/saveBirthDate', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ birthDate })
        });
    };

    return (
        <LifeBoardDataContext.Provider value={{ lifeBoardData, setUsedColors, saveLifeBoard, updateWeek, addOrEditColor, usedColors, birthDate, setBirthDate, saveBirthDate }}>
            {children}
        </LifeBoardDataContext.Provider>
    );
};
