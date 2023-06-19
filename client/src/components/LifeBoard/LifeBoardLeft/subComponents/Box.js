import styles from "./Box.module.css"

function Box(props) {
    return (
        <div className={styles.box}>{props.children}</div>
    )
}

export default Box;