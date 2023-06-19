import LifeBoardLeft from "./LifeBoardLeft/LifeBoardLeft";
import LifeBoardRight from "./LifeBoardRight/LifeBoardRight";
import styles from "./LifeBoard.module.css"

function LifeBoard() {
    return (
        <div className={styles.wrapper}>
            <div className={styles.lifeBoard}>
                <div className={styles.left}><LifeBoardLeft /></div>
                <div className={styles.right}><LifeBoardRight /></div>
            </div>
        </div>


    )
}

export default LifeBoard;