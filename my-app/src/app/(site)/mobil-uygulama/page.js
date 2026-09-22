import styles from './page.module.css';

export default function MobilUygulamaPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Üst Banner Alanı */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Mobil Uygulama</h1>
        </div>
      </section>

      {/* İçerik Alanı */}
      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          
          <div className={styles.storyBlock}>
            <h2>Her An, Her Yerden Kontrol Sizin Elinizde</h2>
            <p>
              Araçlarınızın sigorta, muayene, kasko ve vergi gibi kritik tarihlerini yönetmek için bilgisayar başında olmanıza gerek yok. <strong>Aklımda</strong> mobil uygulaması ile bireysel aracınızı ya da tüm filonuzu cebinizden yönetebilirsiniz.
            </p>
            <p>
              Web platformumuzda kullandığınız hesabınızla mobil uygulamaya da kolayca giriş yapabilir; her iki tarafta oluşturduğunuz tüm araçları ve hatırlatıcıları ortak bir yapıda eşzamanlı olarak yönetebilirsiniz. Dilediğiniz cihazdan mağazalardan uygulamamızı hemen indirebilir, takibinizi kesintisiz sürdürebilirsiniz.
            </p>
          </div>

          <div className={styles.gridBlock}>
            {/* Google Play Kartı */}
            <div className={styles.card}>
              <h3>Android Cihazlar İçin</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Google Play Store üzerinden Aklımda uygulamasını hemen indirin, Android cihazınızda hatırlatıcılarınızı yönetmeye başlayın.
              </p>
              <a 
                href="https://play.google.com/store/apps/details?id=com.aklimda&hl=tr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.storeButton}
              >
                Google Play'den İndir
              </a>
            </div>

            {/* App Store Kartı */}
            <div className={styles.card}>
              <h3>iOS Cihazlar İçin</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                App Store üzerinden Aklımda - Araç Muayene Hatırla uygulamasını cihazınıza yükleyin, iOS deneyimini keşfedin.
              </p>
              <a 
                href="https://apps.apple.com/tr/app/akl%C4%B1mda-ara%C3%A7-muayene-hat%C4%B1rla/id6762555253?l=tr" 
                target="_blank" 
                rel="noopener noreferrer" 
                className={styles.storeButton}
              >
                App Store'dan İndir
              </a>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}