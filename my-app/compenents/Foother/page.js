'use client';

import styles from "../../src/app/(site)/page.module.css";
import Link from 'next/link';

export default function Footer() {
  const handleOpenCookieSettings = () => {
    window.dispatchEvent(new CustomEvent('openCookieSettingsModal'));
  };

  return (
      <footer className={styles.footer}>
        <div className={styles.footerContainer}>
          <div className={styles.footerBrand}>
            <span className={styles.footerLogo}>Aklımda</span>
            <p className={styles.footerText}>
              Şirket araçlarınızın periyodik takip ve hatırlatma platformu.
            </p>
          </div>
          <div className={styles.footerLinks}>
            <Link href="/hakkimizda" className={styles.footerLink}>Hakkımızda</Link>
            <Link href="/mobil-uygulama" className={styles.footerLink}>Mobil Uygulama</Link>
            <Link href="/sikca-sorulan-sorular" className={styles.footerLink}>S.S.S</Link>
            <Link href="/iletisim" className={styles.footerLink}>İletişim</Link>
          </div>
        </div>

        <div className={styles.footerBottom}>
          <ul className={styles.footerLegalList}>
            <li><Link href="/mesafeli-satis-sozlesmesi" className={styles.footerLegalLink}>Mesafeli Satış Sözleşmesi</Link></li>
            <li><Link href="/on-bilgilendirme-formu" className={styles.footerLegalLink}>Ön Bilgilendirme Formu</Link></li>
            <li><Link href="/privacy-policy" className={styles.footerLegalLink}>Gizlilik Politikası</Link></li>
            <li><Link href="/cerez-politikasi" className={styles.footerLegalLink}>Çerez Politikası</Link></li>
            <li><Link href="/kvkk-aydinlatma-metni" className={styles.footerLegalLink}>KVKK Aydınlatma Metni</Link></li>
            <li><Link href="/terms-and-conditions" className={styles.footerLegalLink}>Kullanım Koşulları</Link></li>
            <li>
              <button 
                onClick={handleOpenCookieSettings} 
                className={styles.footerLegalLink}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, font: 'inherit' }}
              >
                Çerez Ayarları
              </button>
            </li>
          </ul>
          <p>&copy; 2026 Aklımda. Tüm hakları saklıdır.</p>
        </div>
      </footer>
  );
}