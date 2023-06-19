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