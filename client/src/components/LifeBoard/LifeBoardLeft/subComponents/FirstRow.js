import StickyTop from "../../Others/StickyTop";
import styles from "./FirstRow.module.css"

function FirstRow() {
    return (
        <div className={styles.content}>
            <StickyTop>
                -- Header (months) --
            </StickyTop>
        </div>
    )
}

export default FirstRow;