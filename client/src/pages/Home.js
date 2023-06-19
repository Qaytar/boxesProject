import { useRef } from "react";
import LifeBoard from "../components/LifeBoard/LifeBoard";
import LogInOut from "../components/Session/LogInOut"
import styles from "./Home.module.css"
import { Link } from "react-router-dom";

function Home() {
    const contentRef = useRef();

    const scrollToContent = () => {
        contentRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    return (
        <div className={styles.wrapper}>
            <LogInOut />
            <div className={styles.landingView}>
                <h1>Here goes Landing page full screen</h1>
                <button onClick={scrollToContent}>Explore</button>
            </div>
            <div ref={contentRef} className={styles.content}>
                <h3><Link to="/registration">Log in</Link> to be able to save your changes</h3>
                <LifeBoard />
            </div>
        </div>
    )
}

export default Home;
