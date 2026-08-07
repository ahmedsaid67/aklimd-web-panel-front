import styles from './page.module.css'
import BizeUlasinCompenent from "../../../../compenents/BizeUlasinCompenent/page"

export default function Page (){
    return(
        <div className={styles.pageContainer}>
            <div className={styles.pageTitle}>Bize Ulaşın</div>
            <BizeUlasinCompenent />
        </div>
    )
}