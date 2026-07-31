import styles from './page.module.css';
import AracEkleWeb from '../../../../../compenents/AracEkleWeb/page';
import AracEkleMobil from '../../../../../compenents/AracEkleMobil/page';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react'; // İkonu import et

export default function Page() {
    return (
        <div className={styles.pageContainer}>
            <div className={styles.headerWrapper}>
                <div className={styles.pageTitle}>Araç Ekle</div>
                <Link href="/panel/araclar" className={styles.backButton}>
                    <ArrowLeft size={18} />
                    <div>Araçlara Dön</div>
                </Link>
            </div>
            <div className={styles.webCompenet}>
                <AracEkleWeb />
            </div>
            <div className={styles.mobilCompenet}>
                <AracEkleMobil />
            </div>
        </div>
    )
}