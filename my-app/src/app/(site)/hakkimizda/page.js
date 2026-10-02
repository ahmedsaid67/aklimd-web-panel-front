import styles from './page.module.css';

export const metadata = {
  title: "Aklımda - Hakkımızda",
  description: "Araç muayene, sigorta, kasko ve vergi tarihlerini tek merkezden takip edin; SMS ve e-posta hatırlatıcılarıyla hiçbirini unutmayın.",
};

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
              Birden fazla araca sahip işletmelerde; sigorta, muayene, kasko ve vergi tarihlerini takip etmek ciddi bir mesaidir. Araç sayısı arttıkça takip edilecek tarih yükü de fazlalaşır; bu yoğunlukta bazı tarihler unutulabilir, gözden kaçabilir ve yapılması gereken işlemler aksayabilir. 
            </p>

            <p>
              Özellikle muayene gibi randevu gerektiren süreçlerde son dakikaya kalındığında uygun randevu bulunamayabilir ve yasal süreler kaçırılabilir. <strong>Gözden kaçan veya zamanında planlanmayan işlemler ise para cezalarına, araçların kullanımında aksamalara ve işletmelerin operasyonlarında zaman ve iş kaybına yol açabilir.</strong>
            </p>

            <p>
              <strong>İşte Aklımda, bu ihtiyaca bir çözüm sunmak için ortaya çıktı.</strong>{' '}
              İşletmelerin araçlarına ait tarihleri tek bir merkezden takip
              edebilmesini, bu tarihler için hatırlatmalar planlayabilmesini ve
              işlemlerini son dakikaya bırakmadan yönetebilmesini sağlamak üzere
              tasarlandı.
            </p>

            <p>
              Aklımda ile sigorta, muayene, kasko ve vergi tarihleri için dilediğiniz kadar erken hatırlatma tarihi belirleyebilir; 
              araçlarınızı ve hatırlatıcılarınızı yönetim paneli üzerinden kolayca yönetebilirsiniz. 
              Belirlediğiniz tarihlerde SMS ve e-posta bildirimleri alarak gerekli işlemler için zamanında harekete geçebilirsiniz.
            </p>
          </div>

          <div className={styles.gridBlock}>
            <div className={styles.card}>
              <h3>Güvenli ve Kararlı Altyapı</h3>
              <p>
                Kullanıcı dostu arayüzün arkasında, verilerinizin güvenliğini ve
                bildirimlerin zamanında iletilmesini sağlayan kusursuz, kesintisiz
                bir sistem mimarisi yer alır.
              </p>
            </div>

            <div className={styles.card}>
              <h3>Odaklı ve Yerli Yaklaşım</h3>
              <p>
                Bireysel araç sahiplerinden küçük, orta ve büyük ölçekli filolara
                kadar herkese nokta atışı, ölçeklenebilir ve tamamen ihtiyaç
                odaklı çözümler sunuyoruz.
              </p>
            </div>
          </div>

          <div className={styles.visionBlock}>
            <h2>Neyi Hedefliyoruz?</h2>

            <p>
              Amacımız; Türkiye'deki tüm araç sahiplerinin ve küçük, orta ve
              büyük ölçekli filoların omuzundaki sigorta, muayene, kasko ve vergi
              takip yükünü tamamen almak; unutkanlıktan doğan cezaları ve saha
              operasyonlarınızı durduran trafikten men risklerini ortadan
              kaldırmaktır.
            </p>

            <p>
              <strong>Aklımda</strong>; araçların sigorta, muayene, kasko ve
              vergi tarihlerini SMS ve e-posta hatırlatıcılarıyla eksiksiz
              yöneten, alanındaki en odaklı ve kesintisiz takip altyapısıdır.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}