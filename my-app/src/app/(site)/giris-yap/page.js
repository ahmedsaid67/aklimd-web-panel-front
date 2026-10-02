import styles from './page.module.css';
import LoginFormCompenent from '../../../../compenents/LoginFormCompenent/page'

export const metadata = {
  title: "Aklımda -  Giriş Yap", 
};

export default function Page (){
    return(
        <div className={styles.pageContainer}>
            <LoginFormCompenent/>
        </div>
    )
}