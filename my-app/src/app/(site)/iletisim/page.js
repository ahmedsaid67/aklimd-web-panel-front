import styles from './page.module.css';

export default function IletisimPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Üst Banner Alanı */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>İletişim</h1>
        </div>
      </section>

      {/* İçerik Alanı */}
      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          
          <div className={styles.gridBlock}>
            {/* Sol Kolon: Doğrudan İletişim ve Adres */}
            <div className={styles.card}>
              <h3>İletişim ve Adres</h3>
              
              <div className={styles.contactList}>
                <div className={styles.contactItem}>
                  <strong>Telefon 1:</strong> <a href="tel:+905077046141">(+90) 507 704 6141</a>
                </div>
                <div className={styles.contactItem}>
                  <strong>Telefon 2:</strong> <a href="tel:+905319183467">(+90) 531 918 3467</a>
                </div>
                <div className={styles.contactItem}>
                  <strong>E-posta:</strong> <a href="mailto:flexsoftwaretr@gmail.com">flexsoftwaretr@gmail.com</a>
                </div>
                <div className={styles.contactItem}>
                  <strong>Adres:</strong> <span>Kepez Mah. Ali Paşa Sk. No: 29 İç Kapı No: 5 Ereğli/Zonguldak</span>
                </div>
              </div>
            </div>

            {/* Sağ Kolon: Destek ve Bilgi (Aynen korundu) */}
            <div className={styles.card}>
              <h3>Destek ve Bilgi</h3>
              <p style={{ marginBottom: '1rem' }}>
                Sistemimizle ilgili her türlü soru, öneri ve destek talebiniz için ekibimizle hızlıca iletişim kurabilirsiniz.
              </p>
              <p>
                İhtiyacınız olan her konuda e-posta veya telefon yoluyla bize ulaşabilir, en kısa sürede detaylı yanıt alabilirsiniz.
              </p>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}