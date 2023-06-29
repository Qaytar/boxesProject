import { createContext, useState } from 'react';

export const BoxSelectionContext = createContext();

export const BoxSelectionProvider = ({ children }) => {
    const [selectedBoxes, setSelectedBoxes] = useState([]);

    const selectBox = (row, week) => {
        setSelectedBoxes(prev => [...prev, { row, week }]);
    };

    const deselectBox = (row, week) => {
        setSelectedBoxes(prev => prev.filter(box => box.row !== row || box.week !== week));
    };

    return (
        <BoxSelectionContext.Provider value={{ selectedBoxes, selectBox, deselectBox }}>
            {children}
        </BoxSelectionContext.Provider>
    );
};