import styles from './page.module.css';

export default function IptalVeIadeKoşullariPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Üst Banner Alanı */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>İptal, İade ve Teslimat Koşulları</h1>
        </div>
      </section>

      {/* İçerik Alanı */}
      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          
          <div className={styles.storyBlock}>
            <p style={{ fontStyle: 'italic', marginBottom: '2rem' }}>
              Son Güncelleme Tarihi: 24.09.2026
            </p>
            <p>
              İşbu İptal, İade ve Teslimat Koşulları; Gökhan ADIGÜZEL (“Satıcı / Hizmet Sağlayıcı”) tarafından işletilen <strong>Aklımda</strong> resmi web sitesi (arabamuayene.com.tr) üzerinden sunulan dijital hizmetler kapsamında Alıcı'yı bilgilendirmek amacıyla hazırlanmıştır.
            </p>

            <h2>1. Dijital Teslimat Koşulları</h2>
            <p>
              <strong>1.1.</strong> Sitemiz üzerinden satışı gerçekleştirilen araç muayene, sigorta, vergi ve kasko periyotları için hatırlatıcı hakkı paketleri tamamen dijital hizmet ve yazılım niteliğindedir.
            </p>
            <p>
              <strong>1.2.</strong> Sitemizde fiziksel kargo gönderimi yapılmamaktadır. Satın alınan hatırlatıcı hakları, ödeme işleminin başarıyla tamamlanmasının ardından Alıcı’nın kullanıcı hesabına elektronik ortamda anında ve otomatik olarak tanımlanır.
            </p>

            <h2>2. İptal, Cayma Hakkı ve İade Şartları</h2>
            <p>
              <strong>2.1.</strong> 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Mesafeli Sözleşmeler Yönetmeliği hükümleri gereğince, elektronik ortamda anında ifa edilen hizmetlerde cayma hakkı istisnası uygulanmaktadır.
            </p>
            <p>
              <strong>2.2.</strong> Sitemizde periyodik bir abonelik veya otomatik yenilenen üyelik sistemi bulunmamaktadır; yalnızca tek seferlik <strong>hatırlatıcı hakkı paketleri</strong> satılmaktadır. Hizmetin elektronik ortamda anında sunulması ve hakların kullanıcı hesabına derhal tanımlanması nedeniyle, yasal düzenlemelerde öngörülen cayma hakkı istisnası kapsamında cayma hakkı kullanılamamaktadır. Bununla birlikte, aşağıda 3. maddede belirtilen mükerrer ödeme ve teknik sorunlara ilişkin istisnai durumlar saklıdır.
            </p>

            <h2>3. İstisnai Durumlar (Mükerrer Ödeme ve Teknik Hatalar)</h2>
            <p>
              <strong>3.1.</strong> Sistem kaynaklı mükerrer ödeme çekilmesi, ödeme yapılmasına rağmen satın alınan hakların hesaba tanımlanamaması veya platform kaynaklı teknik bir aksaklık yaşanması durumlarında Alıcı, aşağıda yer alan iletişim kanalları üzerinden bizimle iletişime geçebilir.
            </p>
            <p>
              <strong>3.2.</strong> Yapılan inceleme sonucunda teknik veya ödeme kaynaklı bir sorun tespit edilmesi halinde, gerekli ücret iadesi veya eksik hak tanımlaması en kısa sürede gerçekleştirilir.
            </p>

            <h2>4. İletişim Bilgileri</h2>
            <p>
              <strong>Satıcı:</strong> Gökhan ADIGÜZEL<br />
              <strong>E-posta:</strong> <a href="mailto:flexsoftwaretr@gmail.com" style={{ color: '#1D64F2', textDecoration: 'none' }}>flexsoftwaretr@gmail.com</a><br />
              <strong>Telefon:</strong> 0507 704 61 41
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}