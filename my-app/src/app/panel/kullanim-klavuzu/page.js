import styles from "./page.module.css";
import KullanimKlavuzuCompenent from "../../../../compenents/KullanimKlavuzuCompenent/page"

export default function Page (){


    return (
       <div className={styles.pageContainer}>
            <div className={styles.pageTitle}>Kullanım Klavuzu</div>
            <KullanimKlavuzuCompenent />
        </div>
    )
}