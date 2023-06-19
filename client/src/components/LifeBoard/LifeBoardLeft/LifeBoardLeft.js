import Boxes from "./subComponents/Boxes"
import FirstRow from "./subComponents/FirstRow"
import styles from "./LifeBoardLeft.module.css"

function LifeBoardLeft() {
    return (
        <div className={styles.wrapper}>
            <FirstRow />
            <Boxes />
        </div>
    )
}

export default LifeBoardLeft;