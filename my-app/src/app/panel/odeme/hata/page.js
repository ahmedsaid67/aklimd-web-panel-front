import Link from 'next/link';
import styles from './page.module.css';

export default function OdemeHataPage() {
    return (
        <div className={styles.container}>
            <div className={styles.card}>
                <div className={styles.icon}>⚠️</div>
                <h1>Ödeme İşlemi Gerçekleştirilemedi</h1>
                <p>İşleminiz sırasında bir hata oluştu veya banka onay vermedi. Satın alma işlemini güvenle tekrarlayabilir veya paket seçimine geri dönebilirsiniz.</p>
                
                <div className={styles.buttonGroup}>
                    <Link href="/panel/paketler" className={styles.primaryButton}>
                        Paketlere Geri Dön
                    </Link>
                </div>
            </div>
        </div>
    );
}