import styles from './page.module.css';

export default function OnBilgilendirmePage() {
  return (
    <div className={styles.aboutPage}>
      {/* Üst Banner Alanı */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Ön Bilgilendirme Formu</h1>
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
              İşbu Ön Bilgilendirme Formu; Gökhan ADIGÜZEL (“Hizmet Sağlayıcı”) tarafından işletilen <strong>Aklımda</strong> resmi web sitesi (arabamuayene.com.tr) üzerinden sunulan hizmetler kapsamında Alıcı'yı bilgilendirmek amacıyla hazırlanmıştır.
            </p>

            <h2>1. Satıcı Bilgileri</h2>
            <p>
              <strong>Ünvan:</strong> Gökhan ADIGÜZEL<br />
              <strong>Vergi Dairesi / No:</strong> Karadeniz Ereğli Vergi Dairesi Müdürlüğü / 0080536432<br />
              <strong>Adres:</strong> Kepez Mah. Ali Paşa Sk. No: 29 İç Kapı No: 5 Ereğli/Zonguldak<br />
              <strong>E-posta:</strong> <a href="mailto:flexsoftwaretr@gmail.com" style={{ color: '#1D64F2', textDecoration: 'none' }}>flexsoftwaretr@gmail.com</a><br />
              <strong>Telefon:</strong> 0507 704 61 41
            </p>

            <h2>2. Hizmetin Niteliği ve Temel Özellikleri</h2>
            <p>
              İşbu ön bilgilendirme konusu hizmet; “Aklımda” platformu üzerinden araçlara ait muayene, sigorta, vergi ve kasko periyotları için dijital ortamda hatırlatıcı oluşturulmasını sağlayan hatırlatıcı hakkı paketleridir. Satın alınan hatırlatıcı hakları, yeni bir hatırlatıcı oluşturulduğunda kullanılır ve satın alınan haklar kullanılıncaya kadar geçerliliğini korur.
            </p>

            <h2>3. Ürün/Hizmet Fiyatı ve Ödeme Bilgileri</h2>
            <p>
              Satın alınacak paketin adı, KDV hariç fiyatı, KDV oranı ve KDV dahil toplam satış bedeli, ödeme ekranında Alıcı'ya açık ve net şekilde gösterilir. Ödeme, ödeme ekranında sunulan geçerli ödeme yöntemleri aracılığıyla elektronik ortamda gerçekleştirilir.
            </p>

            <h2>4. Hizmetin Sunulması</h2>
            <p>
              Satın alınan hatırlatıcı hakları, ödeme işleminin başarıyla tamamlanmasının ardından Alıcı'nın hesabına elektronik ortamda anında tanımlanır.
            </p>

            <h2>5. Cayma Hakkı</h2>
            <p>
              Mesafeli Sözleşmeler Yönetmeliği'nin 15. maddesinin birinci fıkrasının (ğ) bendi uyarınca, elektronik ortamda anında ifa edilen hizmetlere ilişkin sözleşmelerde cayma hakkı uygulanmaz. Mükerrer ödeme, satın alınan hakların hesaba tanımlanmaması veya Satıcı kaynaklı hizmet ifasını engelleyen teknik sorunlar gibi durumlarda Alıcı'nın yürürlükteki mevzuat kapsamındaki hakları saklıdır.
            </p>

            <h2>6. Uyuşmazlıkların Çözümü</h2>
            <p>
              Uyuşmazlıklarda, yürürlükteki mevzuat kapsamında belirlenen parasal sınırlar dahilinde Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}