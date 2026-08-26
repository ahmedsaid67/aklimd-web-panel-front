'use client';

import styles from './page.module.css';
import Link from 'next/link';
import { Zap, ArrowRight, Sparkles } from 'lucide-react'; // Sparkles ikonu dikkat çekici bir hava katar

export default function Page({ paketler }) {
    const packageList = paketler.results;

    return (
        <div className={styles.packagesWrapper}>
            
            {/* Başlık Alanı */}
            <div className={styles.headerContainer}>
                <h2 className={styles.formTitle}>Hatırlatıcı Paketleri</h2>
                <div className={styles.formExplanation}>
                    İhtiyacınıza uygun paketi seçerek hatırlatıcı hakkınızı hemen artırabilirsiniz.
                </div>
            </div>

            {/* Paketler Grid Yapısı */}
            <div className={styles.packagesGrid}>
                {packageList.map((pkg, index) => {
                    // Örneğin 3. paket (index 2) için veya senin belirleyeceğin bir kritere göre etiket ekleyebiliriz
                    const isFeatured = index === 2; // Veya pkg.id === 3 gibi kontrol edebilirsin

                    return (
                        <div key={pkg.id} className={`${styles.packageCard} ${isFeatured ? styles.featuredCard : ''}`}>
                            
                            {/* Kart Üst Kısım (İkon ve Opsiyonel Etiket) */}
                            <div className={styles.packageHeader}>
                                <div className={styles.iconBox}>
                                    <Zap className={styles.packageIcon} />
                                </div>
                                {isFeatured && (
                                    <span className={styles.badge}>
                                        <Sparkles className={styles.badgeIcon} />
                                        Profesyonel Seçim
                                    </span>
                                )}
                            </div>

                            {/* Paket Bilgileri */}
                            <div className={styles.packageInfo}>
                                <h3 className={styles.packageTitle}>{pkg.title}</h3>
                                <p className={styles.packageDescription}>{pkg.explanation}</p>
                            </div>

                            {/* Normal Fiyat Alanı */}
                            <div className={styles.priceContainer}>
                                <span className={styles.priceValue}>
                                    {Number(pkg.price).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺
                                </span>
                            </div>

                            {/* Satın Al Butonu */}
                            <Link href={`/panel/paketler/${pkg.id}`} className={styles.buyButton}>
                                Paketi Seç
                                <ArrowRight className={styles.buttonIcon} />
                            </Link>

                        </div>
                    );
                })}
            </div>

        </div>
    );
}