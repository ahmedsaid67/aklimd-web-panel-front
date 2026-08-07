import styles from "./page.module.css"
import SikcaSorulanSorularCompenent from "../../../../compenents/SikcaSorulanSorularCompenent/page"



export default function Page() {
    
    return (
       <div className={styles.pageContainer}>
            <div className={styles.pageTitle}>Sıkça Sorulan Sorular</div>
            <SikcaSorulanSorularCompenent />
        </div>
    )
}