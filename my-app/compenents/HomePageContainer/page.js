import Link from 'next/link';
import styles from './page.module.css';

export default function Page({ usageSummary }) {
  // Varsayılan veriler (prop gelmediği durumlar için fallback)
  const data = usageSummary;

  return (
    <div className={styles.container}>

      {/* İSTATİSTİK KUTULARI */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Aktif Hatırlatıcı</span>
          <span className={styles.statValue}>{data.aktif_hatirlatici}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Toplam Oluşturulan Hatırlatıcı</span>
          <span className={styles.statValue}>{data.toplam_olusturulan_hatirlatici}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Kalan Hatırlatıcı Hakkı</span>
          <span className={styles.statValue}>{data.credit}</span>
        </div>
        <div className={styles.statCard}>
          <span className={styles.statLabel}>Toplam Araç</span>
          <span className={styles.statValue}>{data.toplam_arac}</span>
        </div>
      </div>

      {/* ORTA KISIM: PAKET YÜKSELTME BANNER'I */}
      <div className={styles.bannerCard}>
        <div className={styles.bannerInfo}>
          <h3>Hatırlatıcı Hakkınızı Artırın</h3>
          <p>Hatırlatıcı oluşturma hakkını dilediğiniz zaman yükselterek daha fazla hatırlatıcı ekleyebilirsiniz.</p>
        </div>
        <Link href="/panel/paketler" className={styles.bannerButton}>
          Paketleri incele
        </Link>
      </div>

      {/* İKİSİ YAN YANA BÖLÜM: KULLANIM KILAVUZU & S.S.S. */}
      <div className={styles.twoColumnGrid}>
        {/* Kullanım Kılavuzu Kartı */}
        <div className={styles.contentCard}>
          <div className={styles.cardHeaderFlex}>
            <h3>Kullanım Kılavuzu</h3>
            <Link href="/panel/kullanim-klavuzu" className={styles.linkText}>Tümünü Gör →</Link>
          </div>
          <div className={styles.videoPreviewBox}>
            <div className={styles.playIconCircle}>▶</div>
            <span>AKLIMDA Kullanım Kılavuzu Videosu</span>
          </div>
          <Link href="/panel/kullanim-klavuzu" className={styles.outlineButton}>
            İzlemek İçin Tıklayın
          </Link>
        </div>

        {/* Sıkça Sorulan Sorular Kartı */}
        <div className={styles.contentCard}>
          <div className={styles.cardHeaderFlex}>
            <h3>Sıkça Sorulan Sorular</h3>
            <Link href="/panel/sikca-sorulan-sorular" className={styles.linkText}>Tümünü Gör →</Link>
          </div>
          <ul className={styles.faqList}>
            <li>"Aklımda" tam olarak ne işe yarar?</li>
            <li>Araç takibinde yaşanan sorunlara Aklımda nasıl çözüm sunar?</li>
            <li>Hatırlatıcı paketi bittiğinde ne yapmam gerekir?</li>
          </ul>
          <Link href="/panel/sikca-sorulan-sorular" className={styles.outlineButton}>
            Tüm Soruları İncele
          </Link>
        </div>
      </div>

{/* MOBİL UYGULAMA TANITIM TEK KART */}
      <div className={styles.appPromoCard}>
        <div className={styles.panoHeader}>
          <h3>Her An, Her Yerden Kontrol Sizin Elinizde</h3>
          <p className={styles.cardDesc}>
            Web platformundaki üyeliğinizle mobil uygulamamıza da kolayca giriş yapabilir; araçlarınızı ve tüm hatırlatıcılarınızı eşzamanlı yönetebilirsiniz
          </p>
        </div>

        {/* Mağaza Butonları Alanı */}
        <div className={styles.appStoreButtons}>
          <a 
            href="https://play.google.com/store/apps/details?id=com.aklimda&hl=tr" 
            target="_blank" 
            rel="noopener noreferrer" 
            className={styles.storeButton}
          >
            Google Play'den İndir
          </a>
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

      
      {/* ALT KISIM: BİZE ULAŞIN VE BİLGİLENDİRME PANO Kutusu */}
      <div className={styles.bottomGrid}>
        {/* Bize Ulaşın */}
        <div className={styles.contentCard}>
          <div>
            <h3>Bize Ulaşın</h3>
            <p className={styles.cardDesc}>Sorun, öneri veya destek talepleriniz için bize her zaman ulaşabilirsiniz.</p>
          </div>
          <Link href="/panel/bize-ulasin" className={styles.primaryButton}>
            Destek Talebi Oluştur
          </Link>
        </div>

        {/* Bilgilendirme / Gönderici Panosu */}
        <div className={styles.infoPanoCard}>
           <div className={styles.panoHeader}>
            <h3>Bildirim Gönderim Bilgileri</h3>
            <p className={styles.cardDesc}>Hatırlatma bildirimlerini gönderdiğimiz e-posta adresi ve SMS başlığı:</p>
          </div>
          
          <div className={styles.infoRow}>
            <span className={styles.infoTitle}>E-Posta:</span>
            <span className={styles.infoValue}>flexsoftwaretr@gmail.com</span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoTitle}>SMS Başlık:</span>
            <span className={styles.infoValue}>GADGZL</span>
          </div>
        </div>
      </div>

    </div>
  );
}