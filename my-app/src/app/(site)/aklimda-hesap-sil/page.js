import styles from './page.module.css';
import HesapSil from '../../../../compenents/HesapSil/page'

export const metadata = {
  title: "Aklımda -  Hesap Sil", 
};

export default function Page (){
    return(
        <div className={styles.pageContainer}>
            <HesapSil/>
        </div>
    )
}