import styles from "./Boxes.module.css"
import Box from "./Box"

function Boxes() {
    return (
        <div>
            {Array.from({ length: 100 }, (_, i) => (
                <div key={`row-${i}`} className={styles.row}>
                    {Array.from({ length: 52 }, (_, j) => (
                        <Box key={`box-${j}`} />
                    ))}
                </div>
            ))}
        </div>
    )
}

export default Boxes;