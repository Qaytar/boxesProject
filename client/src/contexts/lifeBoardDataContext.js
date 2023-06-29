import { createContext, useState, useEffect } from 'react';

export const LifeBoardDataContext = createContext();

export const LifeBoardDataProvider = ({ children }) => {
    const [lifeBoardData, setLifeBoardData] = useState(null);

    useEffect(() => {
        const fetchLifeBoard = async () => {
            const response = await fetch('http://localhost:5000/db/getLifeBoard', { credentials: 'include' });
            const data = await response.json();
            setLifeBoardData(data);
        };

        fetchLifeBoard();
    }, []);

    const updateModified = (selectedBoxes) => {
        let newData = { ...lifeBoardData };
        selectedBoxes.forEach(box => {
            newData[box.row][box.week].modified = 'y';
        });
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
        <LifeBoardDataContext.Provider value={{ lifeBoardData, updateModified, saveLifeBoard }}>
            {children}
        </LifeBoardDataContext.Provider>
    );
};
