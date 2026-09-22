import styles from './page.module.css';
import PasswordResetPage from '../../../../../compenents/PasswordResetPage/page'

export default function Page (){
    return(
        <div className={styles.pageContainer}>
            <PasswordResetPage/>
        </div>
    )
}