import Link from 'next/link';
import styles from './page.module.css';

export default function OdemeBasariliPage() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.icon}>🎉</div>
                <h1>Ödemeniz Başarıyla Gerçekleşti!</h1>
                <p>Ödemeniz onaylanmıştır. Satın aldığınız paket kapsamındaki hatırlatıcı haklarınız hesabınıza tanımlanmıştır.</p>
                
                <div className={styles.buttonGroup}>
                    <Link href="/panel/hatirlaticilar-ekle" className={styles.primaryButton}>
                        Hatırlatıcı Oluştur
                    </Link>
                    <Link href="/panel/araclar/ekle" className={styles.secondaryButton}>
                        Araç Ekle
                    </Link>
                </div>
            </div>
        </div>
    );
}