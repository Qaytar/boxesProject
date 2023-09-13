/**
 * Toggle.js
 * 
 * Renders a toggle to go from editting mode to display the legend.
 * It's used in LifeBoardRight component
 */

import styles from './Toggle.module.css';
function Toggle(props) {
    return (
        <div className={styles.wrapper}>
            <div className={styles.toggle}>
                <label className={styles.switch}>
                    <input onClick={props.onClickFunction} type="checkbox" />
                    <span className={styles.slider}></span>
                </label>
            </div>
            <div className={styles.toggleLabel}>
                <label>
                    <i> switch to {props.isState === props.checkState ? props.options[0] : props.options[1]}</i>
                </label>
            </div>
        </div>
    )
}

export default Toggle;