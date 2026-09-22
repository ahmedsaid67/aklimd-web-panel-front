import styles from './page.module.css';
import ForgotPasswordPage from '../../../../compenents/ForgotPasswordPage/page'

export default function Page (){
    return(
        <div className={styles.pageContainer}>
            <ForgotPasswordPage/>
        </div>
    )
}