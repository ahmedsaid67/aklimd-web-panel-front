import styles from './page.module.css';
import RegisterFormCompenent from '../../../../compenents/RegisterFormCompenent/page'

export const metadata = {
  title: "Aklımda -  Kayıt Ol", 
};

export default function Page (){
    return(
        <div className={styles.pageContainer}>
            <RegisterFormCompenent/>
        </div>
    )
}