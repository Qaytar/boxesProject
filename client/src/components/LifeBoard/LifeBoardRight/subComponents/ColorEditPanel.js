import EditPanel from "./EditPanel";
import React, { useContext } from 'react';
import { LifeBoardDataContext } from '../../../../contexts/lifeBoardDataContext';
import { BoxSelectionContext } from '../../../../contexts/boxSelectionContext';

function ColorEditPanel() {
    const { updateModified } = useContext(LifeBoardDataContext);
    const { selectedBoxes } = useContext(BoxSelectionContext);



    return (
        <div>
            <EditPanel>
                <p>Color Edit Panel</p>
                <button onClick={() => updateModified(selectedBoxes)}>
                    Mark as modified
                </button>


            </EditPanel>
        </div>

    )
}

export default ColorEditPanel;

//unclear how EditPanel will be used but it makes sense, to reuse some aspects of both pannels into its own component