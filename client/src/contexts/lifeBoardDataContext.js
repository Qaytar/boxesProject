import { createContext, useState, useEffect, useContext } from 'react';
import { AuthContext } from '../contexts/authContext';




export const LifeBoardDataContext = createContext();

export const LifeBoardDataProvider = ({ children }) => {
    const [lifeBoardData, setLifeBoardData] = useState(null);
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

    const updateBox = (row, week, newBoxData) => {
        let newData = { ...lifeBoardData };
        newData[row][week] = { ...newData[row][week], ...newBoxData };
        let box = newData[row][week];
        if ((box.color && (box.color.colorName || box.color.colorDescription)) || (box.comment && (box.comment.commentText || box.comment.commentIcon))) {
            box.modified = 'y';
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
        <LifeBoardDataContext.Provider value={{ lifeBoardData, saveLifeBoard, updateBox }}>
            {children}
        </LifeBoardDataContext.Provider>
    );
};
