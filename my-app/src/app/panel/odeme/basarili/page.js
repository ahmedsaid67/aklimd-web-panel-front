import Link from 'next/link';
import styles from './page.module.css'; // İsteğe bağlı kendi stil dosyanız

export default function OdemeBasariliPage() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.icon}>🎉</div>
                <h1>Ödemeniz Başarıyla Gerçekleşti!</h1>
                <p>Paket satın alma işleminiz başarıyla tamamlanmıştır. Kredileriniz hesabınıza yüklenmiştir.</p>
                
                <div className={styles.buttonGroup}>
                    <Link href="/panel" className={styles.primaryButton}>
                        Panele Git
                    </Link>
                </div>
            </div>
        </div>
    );
}