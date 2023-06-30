import EditPanel from "./EditPanel";
import { BoxSelectionContext } from '../../../../contexts/boxSelectionContext'
import React, { useContext } from 'react';

function CommentEditPanel() {
    const { selectedBoxes } = useContext(BoxSelectionContext);

    const selectedBoxesCount = Object.keys(selectedBoxes).length;

    return (
        selectedBoxesCount <= 1 ?
            <div>
                <EditPanel>Comments Edit Panel</EditPanel>
            </div>
            : null
    )
}

export default CommentEditPanel;
