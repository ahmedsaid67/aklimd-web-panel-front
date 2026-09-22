import styles from './page.module.css';

export default function HakkimizdaPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Üst Banner Alanı */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Hakkımızda</h1>
        </div>
      </section>

      {/* İçerik Alanı */}
      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          
          <div className={styles.storyBlock}>
            <h2>Hikayemiz Nasıl Başladı?</h2>
            <p>
              Araçların sigorta, muayene, kasko ve vergi gibi kritik tarihlerini kâğıt üzerinde ya da hafızada takip etmeye çalışmanın ne denli riskli ve zorlu bir süreç olduğunu bizzat gözlemledik. Çok sayıda araç söz konusu olduğunda bu süreçlerin takibi kaçınılmaz bir karmaşaya yol açar; gözden kaçan bir muayene tarihi ya da unutulan bir vergi dönemi işletmelere ağır para cezaları yükler, araçların trafikten men edilmesine ve kritik saha operasyonlarının durmasına neden olur. <strong>Aklımda</strong>, tam olarak bu operasyonel riskleri ve son dakika randevu krizlerini ortadan kaldırmak için doğdu.
            </p>
            <p>
              Kasko ve trafik sigortası gibi poliçe yenileme tarihlerinin unutulması araçları trafikte güvencesiz bırakırken, işlemlerin son güne bırakılması uygun istasyon randevusu bulamamaya veya belge gecikmelerine yol açar. Biz; dilediğiniz kadar erken hatırlatma tarihi belirleyerek, SMS ve e-posta hatırlatıcıları sayesinde bu süreçlerde hep bir adım önde olmanızı; sigorta, muayene, kasko ve vergi takibinizi tek bir ekrandan yöneterek teminatlarınızı kesintisiz sürdürmenizi sağlıyoruz.
            </p>
          </div>

          <div className={styles.gridBlock}>
            <div className={styles.card}>
              <h3>Güvenli ve Kararlı Altyapı</h3>
              <p>
                Kullanıcı dostu arayüzün arkasında, verilerinizin güvenliğini ve bildirimlerin zamanında iletilmesini sağlayan kusursuz, kesintisiz bir sistem mimarisi yer alır.
              </p>
            </div>
            <div className={styles.card}>
              <h3>Odaklı ve Yerli Yaklaşım</h3>
              <p>
                Bireysel araç sahiplerinden küçük, orta ve büyük ölçekli filolara kadar herkese nokta atışı, ölçeklenebilir ve tamamen ihtiyaç odaklı çözümler sunuyoruz.
              </p>
            </div>
          </div>

          <div className={styles.visionBlock}>
            <h2>Neyi Hedefliyoruz?</h2>
            <p>
              Amacımız; Türkiye'deki tüm araç sahiplerinin ve küçük, orta ve büyük ölçekli filoların omuzundaki sigorta, muayene, kasko ve vergi takip yükünü tamamen almak; unutkanlıktan doğan cezaları ve saha operasyonlarınızı durduran trafikten men risklerini ortadan kaldırmaktır.
            </p>
            <p>
              <strong>Aklımda</strong>; araçların sigorta, muayene, kasko ve vergi tarihlerini SMS ve e-posta hatırlatıcılarıyla eksiksiz yöneten, alanındaki en odaklı ve kesintisiz takip altyapısıdır.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}