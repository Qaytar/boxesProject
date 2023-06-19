import LifeBoard from "../components/LifeBoard/LifeBoard"
import LogInOut from "../components/Session/LogInOut";
import styles from "./Application.module.css"

function Application() {
    return (
        <div className={styles.wrapper}>
            <LogInOut />
            <LifeBoard />

        </div>
    )
}

export default Application;