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
    // it also updates the state usedColors, keeping track of every new color used + it updates the modified 'flag'
    const updateWeek = (row, week, newWeekData) => {
        /*Updates the week with the new data */
        let lifeBoardDataCopy = { ...lifeBoardData };
        lifeBoardDataCopy[row][week] = { ...lifeBoardDataCopy[row][week], ...newWeekData };
        setLifeBoardData(lifeBoardDataCopy);

        let updatedWeek = lifeBoardDataCopy[row][week];

        /*If any property is truthy sets the modified flag to yes */
        if ((updatedWeek.color && (updatedWeek.color.colorName || updatedWeek.color.colorDescription)) || (updatedWeek.comment && (updatedWeek.comment.commentText || updatedWeek.comment.commentIcon))) {
            updatedWeek.modified = 'y';
        }

        /*Keeps track and updates state usedColors */
        if (updatedWeek.color) {
            setUsedColors((currentUsedColors) => {
                if (!currentUsedColors.some(color => color.colorName === updatedWeek.color.colorName)) {
                    //console.log(`Adding new color: ${week.color.colorName}`);
                    return [...currentUsedColors, {
                        colorName: updatedWeek.color.colorName,
                        colorDescription: updatedWeek.color.colorDescription
                    }];
                } else {
                    //console.log('Color already exists in usedColors');
                    return currentUsedColors;
                }
            });
        }


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
        <LifeBoardDataContext.Provider value={{ lifeBoardData, saveLifeBoard, updateWeek, usedColors, birthDate, setBirthDate, saveBirthDate }}>
            {children}
        </LifeBoardDataContext.Provider>
    );
};
