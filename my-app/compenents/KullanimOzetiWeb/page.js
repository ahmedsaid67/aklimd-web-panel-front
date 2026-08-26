'use client';

import styles from './page.module.css';
import Link from 'next/link';
import { Bell, FileText, Zap, Car, ArrowRight } from 'lucide-react';

export default function KullanimOzeti({ info }) {
  return (
    <div className={styles.profileWrapper}>
      <section className={styles.formSection}>
        <div className={styles.headerContainer}>
          <h2 className={styles.formTitle}>Kullanım Özeti</h2>
          <div className={styles.formExplanation}>
            Faaliyet özetinizi ve kullanım detaylarınızı buradan inceleyebilirsiniz.
          </div>
        </div>

        {/* İstatistik Kartları Grid Yapısı */}
        <div className={styles.statsGrid}>
          
          {/* Aktif Hatırlatıcı */}
          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Aktif Hatırlatıcı</span>
              <span className={styles.statValue}>{info?.aktif_hatirlatici ?? 0}</span>
            </div>
            <div className={styles.iconBox}>
              <Bell className={styles.statIcon} />
            </div>
          </div>

          {/* Toplam Oluşturulan Hatırlatıcı */}
          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Toplam Oluşturulan Hatırlatıcı</span>
              <span className={styles.statValue}>{info?.toplam_olusturulan_hatirlatici ?? 0}</span>
            </div>
            <div className={styles.iconBox}>
              <FileText className={styles.statIcon} />
            </div>
          </div>

          {/* Kalan Hatırlatıcı Hakkı (Credit) */}
          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Kalan Hatırlatıcı Hakkı</span>
              <span className={styles.statValue}>{info?.credit ?? 0}</span>
            </div>
            <div className={styles.iconBox}>
              <Zap className={styles.statIcon} />
            </div>
          </div>

          {/* Toplam Araç */}
          <div className={styles.statCard}>
            <div className={styles.statInfo}>
              <span className={styles.statLabel}>Toplam Araç</span>
              <span className={styles.statValue}>{info?.toplam_arac ?? 0}</span>
            </div>
            <div className={styles.iconBox}>
              <Car className={styles.statIcon} />
            </div>
          </div>

        </div>

        {/* Hatırlatıcı Hakkınızı Artırın CTA Konteyneri */}
        <div className={styles.ctaContainer}>
          <div className={styles.ctaContent}>
            <h3 className={styles.ctaTitle}>Hatırlatıcı Hakkınızı Artırın</h3>
            <p className={styles.ctaDescription}>
              Hatırlatıcı oluşturma hakkını dilediğiniz zaman yükselterek daha fazla hatırlatıcı ekleyebilirsiniz.
            </p>
          </div>
          <Link href="/panel/paketler" className={styles.ctaButton}>
            Paketleri İncele
            <ArrowRight className={styles.ctaButtonIcon} />
          </Link>
        </div>

      </section>
    </div>
  );
}