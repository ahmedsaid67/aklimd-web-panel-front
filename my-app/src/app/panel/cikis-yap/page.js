import styles from "./page.module.css"
import CikisYapCompenent from "../../../../compenents/CikisYapCompenent/page"



export default function Page() {
    
    return (
       <div className={styles.pageContainer}>
            <div className={styles.pageTitle}>Çıkış Yap</div>
            <CikisYapCompenent />
        </div>
    )
}