import styles from './page.module.css';

export default function Page () {
    return(
        <div className={styles.loadingContainer}>
            <div className={styles.spinner}></div>
        </div>
    )
}