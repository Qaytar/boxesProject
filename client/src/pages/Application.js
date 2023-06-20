import LifeBoard from "../components/LifeBoard/LifeBoard"
import LogInMyAreaBtn from "../components/Session/LogInMyAreaBtn";
import styles from "./Application.module.css"

function Application() {
    return (
        <div className={styles.wrapper}>
            <LogInMyAreaBtn />
            <LifeBoard />

        </div>
    )
}

export default Application;