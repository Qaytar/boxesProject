import Backdrop from "./Backdrop";
import styles from "./MyArea.module.css"

function MyArea(props) {
    return (
        <div>
            <Backdrop onBackdropClick={props.onModalClick} />
            <div className={styles.modal}></div>
        </div>

    )
}

export default MyArea;
