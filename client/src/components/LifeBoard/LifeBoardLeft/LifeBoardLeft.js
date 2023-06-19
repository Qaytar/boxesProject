import Box from "./subComponents/Box"
import FirstRow from "./subComponents/FirstRow"
import styles from "./LifeBoardLeft.module.css"

function LifeBoardLeft() {
    return (
        <div className={styles.wrapper}>
            <FirstRow />
            <div className={styles.boxes}>
                {Array.from({ length: 30 }, (_, i) => <Box key={i}>{i + 1}</Box>)}
            </div>

        </div>
    )
}

export default LifeBoardLeft;