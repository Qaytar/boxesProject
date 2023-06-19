import StickyTop from "../../Others/StickyTop";
import styles from "./EditPanel.module.css"

function EditPanel(props) {
    return (
        <div className={styles.panel}>
            <StickyTop />
            {props.children}
        </div>

    )
}

export default EditPanel;