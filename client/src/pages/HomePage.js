import { useRef } from "react";
import LifeBoard from "../components/LifeBoard/LifeBoard";
import LogInMyAreaBtn from "../components/Session/LogInMyAreaBtn"
import styles from "./HomePage.module.css"
import { Link } from "react-router-dom";

function HomePage() {
    const contentRef = useRef();

    const scrollToContent = () => {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return (
        <div className={styles.wrapper}>
            <LogInMyAreaBtn />
            <div className={styles.landingView}>
                <h1>Here goes Landing page full screen</h1>
                <button onClick={scrollToContent}>Explore</button>
            </div>
            <div ref={contentRef} className={styles.content}>
                <h3><Link to="/login">Log in</Link> to be able to save your changes</h3>
                <LifeBoard />
            </div>
        </div>
    )
}

export default HomePage;
