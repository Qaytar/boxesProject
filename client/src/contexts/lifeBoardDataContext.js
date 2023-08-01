/**
 * lifeBoardDataContext.js
 * 
 * defines LifeBoardDataContext and provides { lifeBoardData, saveLifeBoard, updateBox, usedColors } to the rest of the App
 *
 * lifeBoardData is the object that renders the grid of the app and holds the data of the 5200 (52 weeks times 100 years) weeks (which are represented by <box> comp.)
 */

import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

// creates context
export const LifeBoardDataContext = createContext();

// defines provider
export const LifeBoardDataProvider = ({ children }) => {
    // main state of the context: the latest version of the lifeBoard
    const [lifeBoardData, setLifeBoardData] = useState(null);

    // secondary state: It holds a unique list of all the colors used by a user. To render the legend of all colors
    // this information is contained in the lifeBoardData of every user but it'd be costy to retrieve so it's decided to keep track of it in a separate state
    const [usedColors, setUsedColors] = useState([]);

    //console.log('outside useEffect')
    // const authContext = useContext(AuthContext);
    // console.log('outside useEffect')
    // useEffect(() => {
    //     console.log('inside useEffect, but outside of async fetchLifeBoard func')
    //     const fetchLifeBoard = async () => {
    //         const response = await fetch('http://localhost:5000/db/getLifeBoard', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //             },
    //             credentials: 'include',
    //             body: JSON.stringify({
    //                 isLoggedIn: authContext.user ? true : false,
    //             }),
    //         });
    //         const data = await response.json();
    //         setLifeBoardData(data.lifeBoard);
    //         setUsedColors(data.usedColors || []);
    //     };

    //     fetchLifeBoard();
    // }, [authContext.user]);



    const updateBox = (row, week, newBoxData) => {
        let newData = { ...lifeBoardData };
        newData[row][week] = { ...newData[row][week], ...newBoxData };

        let box = newData[row][week];

        if ((box.color && (box.color.colorName || box.color.colorDescription)) || (box.comment && (box.comment.commentText || box.comment.commentIcon))) {
            box.modified = 'y';
        }

        // Check if the new color is in usedColors array
        if (box.color) {
            setUsedColors((currentUsedColors) => {
                if (!currentUsedColors.some(color => color.colorName === box.color.colorName)) {
                    //console.log(`Adding new color: ${box.color.colorName}`);
                    return [...currentUsedColors, {
                        colorName: box.color.colorName,
                        colorDescription: box.color.colorDescription
                    }];
                } else {
                    //console.log('Color already exists in usedColors');
                    return currentUsedColors;
                }
            });
        }

        setLifeBoardData(newData);
    };

    const saveLifeBoard = async () => {
        const response = await fetch('http://localhost:5000/db/saveLifeBoard', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ lifeBoardData, usedColors })
        });
        const data = await response.json();
        //console.log('response from server after saving in db:', data);
    };

    return (
        <LifeBoardDataContext.Provider value={{ lifeBoardData, saveLifeBoard, updateBox, usedColors }}>
            {children}
        </LifeBoardDataContext.Provider>
    );
};
