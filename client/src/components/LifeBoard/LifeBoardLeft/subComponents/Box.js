import styles from "./Box.module.css"

function Box(props) {


    return (
        <div className={styles.box}>{`${props.row} - ${props.week}`}</div>
    )
}

export default Box;