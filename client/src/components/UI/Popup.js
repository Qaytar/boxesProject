/**
 * Popup.js
 * 
 * Renders a popup close to the hoverable component
 * It's used to display the boxes' comments when hovering on the commented boxes (which are the ones displaying an icon)
 */

function Popup(props) {
    return (
        <div>
            <div>
                Popup Component: renders a popup when element is hovered/tapped
            </div>
            <div>
                {props.children}
            </div>
        </div>

    )
}

export default Popup;