import styles from './Toggle.module.css';
function Toggle(props) {
    return (
        <section className={styles.gradeToggler} readOnly>
            <div className={styles.toggle} readOnly>
                <label className={styles.switch} readOnly>
                    <input onClick={props.onClickFunction} type="checkbox" readOnly />
                    <span className={styles.slider} readOnly></span>
                </label>
            </div>
            <div className={styles.toggleLabel} readOnly>
                <label readOnly>
                    <i readOnly> switch to {props.isState === props.checkState ? props.options[0] : props.options[1]}</i>
                </label>
            </div>
        </section>
    )
}

export default Toggle;