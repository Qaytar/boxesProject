import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

export const LifeBoardDataContext = createContext();

export const LifeBoardDataProvider = ({ children }) => {
    const [lifeBoardData, setLifeBoardData] = useState(null);
    const [usedColors, setUsedColors] = useState([]);

    const authContext = useContext(AuthContext);

    useEffect(() => {
        const fetchLifeBoard = async () => {
            const response = await fetch('http://localhost:5000/db/getLifeBoard', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    isLoggedIn: authContext.user ? true : false,
                }),
            });
            const data = await response.json();
            setLifeBoardData(data);
        };

        fetchLifeBoard();
    }, [authContext.user]);

    useEffect(() => {
        console.log('Updated color list:', usedColors);
    }, [usedColors]);

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
                    console.log(`Adding new color: ${box.color.colorName}`);
                    return [...currentUsedColors, {
                        colorName: box.color.colorName,
                        colorDescription: box.color.colorDescription
                    }];
                } else {
                    console.log('Color already exists in usedColors');
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
            body: JSON.stringify(lifeBoardData)
        });
        const data = await response.json();
        console.log('response from server after saving in db:', data)
    };

    return (
        <LifeBoardDataContext.Provider value={{ lifeBoardData, saveLifeBoard, updateBox, usedColors }}>
            {children}
        </LifeBoardDataContext.Provider>
    );
};
