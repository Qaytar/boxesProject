import styles from "./Backdrop.module.css"

function Backdrop(props) {
    return <div className={styles.backdrop} onClick={props.onBackdropClick} />;
}

export default Backdrop;