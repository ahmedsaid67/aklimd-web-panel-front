import styles from './page.module.css';
import LoginFormCompenent from '../../../../compenents/LoginFormCompenent/page'

export default function Page (){
    return(
        <div className={styles.pageContainer}>
            <LoginFormCompenent/>
        </div>
    )
}