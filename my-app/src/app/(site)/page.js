import styles from "./page.module.css";
import Link from 'next/link';
import { ShieldAlert, FileText, ShieldCheck, Calendar, ArrowRight } from 'lucide-react';

export default function Home() {
  return (
    <div className={styles.page}>
      {/* Hero Bölümü */}
      <div className={styles.heroSection}>
        <div className={styles.heroContainer}>
          
          <h1 className={styles.heroTitle}>
            Şirket Araçlarınızın Periyodik Tarihlerini Tek Ekrandan Takip Edin, Hatırlatıcılar Oluşturun
          </h1>

          <p className={styles.heroDescription}>
            Birkaç araçlık küçük bir işletmeden, geniş bir filoya sahip kurumsal firmalara kadar şirket araçlarının muayene, sigorta, kasko ve vergi takip süreçlerini tek ekrandan yönetin. Hatırlatıcılar oluşturun; SMS ve e-posta bildirimleriyle hiçbir kritik tarihi kaçırmayın.
          </p>

          <div className={styles.buttonGroup}>
            <Link href="/kayit-ol" className={styles.primaryButton}>
              Hemen Başla 
              <ArrowRight className={styles.buttonArrowIcon} aria-hidden="true" />
            </Link>

            <Link href="/giris-yap" className={styles.secondaryButton}>
              Platforma Giriş
            </Link>
          </div>

        </div>
      </div>

      {/* Özellikler / Ne İşe Yarar Bölümü */}
      <div className={styles.featuresSection}>
        <div className={styles.container}>
          
          <div className={styles.headerWrapper}>
            <span className={styles.badge}>NE İŞE YARAR?</span>
            <h2 className={styles.mainTitle}>Şirket Araçlarının Periyodik Tarih Takibi ve Hatırlatması</h2>
            <p className={styles.subDescription}>
              Muayene, sigorta, kasko ve vergi tarihlerini tek ekranda toplayın; hatırlatıcılarla son dakika krizlerini ve cezaları önleyin.
            </p>
          </div>

          <div className={styles.gridContainer}>
            
            {/* Kart 1 */}
            <div className={styles.card}>
              <div className={styles.iconBox}>
                <FileText className={styles.cardIcon} />
              </div>
              <h3 className={styles.cardTitle}>Karmaşa ve Takip Zorluğu</h3>
              <p className={styles.cardText}>
                Çok sayıda araç olduğunda muayene, sigorta, kasko ve vergi tarihlerini akılda tutmak veya fiziki dosyalarda takip etmek zorlaşır; tüm bu süreçleri tek ekranda toplayarak karmaşaya son veriyoruz.
              </p>
            </div>

            {/* Kart 2 */}
            <div className={styles.card}>
              <div className={styles.iconBox}>
                <ShieldAlert className={styles.cardIcon} />
              </div>
              <h3 className={styles.cardTitle}>Ceza ve Operasyon Riski</h3>
              <p className={styles.cardText}>
                Gözden kaçan muayene, sigorta ve vergi tarihleri işletmenize para cezaları yükler; süresi geçen yasal zorunluluklar araçların trafikten men edilmesine yol açarak şirketinizin günlük işlerini ve saha operasyonlarını durdurur. Oluşturacağınız hatırlatıcılarla bu riskleri önlersiniz.
              </p>
            </div>

            {/* Kart 3 */}
            <div className={styles.card}>
              <div className={styles.iconBox}>
                <ShieldCheck className={styles.cardIcon} />
              </div>
              <h3 className={styles.cardTitle}>Gözden Kaçan Poliçe ve Teminat Açıkları</h3>
              <p className={styles.cardText}>
                Kasko ve trafik sigortası gibi poliçe yenileme tarihlerinin unutulması, araçların trafikte güvencesiz kalmasına yol açar. Oluşturacağınız hatırlatıcılarla tüm teminatları kesintisiz sürdürür, araçlarınızı güvence altında tutarsınız.
              </p>
            </div>

            {/* Kart 4 */}
            <div className={styles.card}>
              <div className={styles.iconBox}>
                <Calendar className={styles.cardIcon} />
              </div>
              <h3 className={styles.cardTitle}>Son Dakika Yoğunluğu ve Randevu Krizi</h3>
              <p className={styles.cardText}>
                Muayene ve sigorta işlemlerini son güne bırakmak, uygun istasyon randevusu bulamamaya ya da belgelerin yetişmemesine yol açar; oluşturacağınız hatırlatıcılarda dilediğiniz kadar hatırlatma tarihi belirleyerek erken pozisyon alırsınız. Bu sayede randevu krizlerini ve belge gecikmelerini tamamen ortadan kaldırırsınız.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Nasıl Çalışır / 4 Adımda Hazırsınız Bölümü */}
      <div className={styles.stepsSection}>
        <div className={styles.container}>
          
          <div className={styles.headerWrapper}>
            <span className={styles.badge}>NASIL ÇALIŞIR?</span>
            <h2 className={styles.mainTitle}>Dört Adımda Hazırsınız</h2>
            <p className={styles.subDescription}>
              Beklemek yok, karmaşa yok — araçlarını hemen yönet.
            </p>
          </div>

          <div className={styles.stepsGrid}>
            
            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>01</span>
                <ArrowRight className={styles.stepArrowIcon} />
              </div>
              <h3 className={styles.stepTitle}>Kayıt Ol</h3>
              <p className={styles.stepText}>
                Dakikalar içinde hesabınızı oluşturun ve platforma ilk adımınızı atın.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>02</span>
                <ArrowRight className={styles.stepArrowIcon} />
              </div>
              <h3 className={styles.stepTitle}>Hatırlatıcı Hakkı Satın Al</h3>
              <p className={styles.stepText}>
                İhtiyacınıza uygun hatırlatıcı paketini seçerek hatırlatıcı haklarınızı tanımlayın.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>03</span>
                <ArrowRight className={styles.stepArrowIcon} />
              </div>
              <h3 className={styles.stepTitle}>Araç Ekle</h3>
              <p className={styles.stepText}>
                Araçlarınızı marka, model ve plaka bilgileriyle hızlıca sisteme tanımlayın.
              </p>
            </div>

            <div className={styles.stepCard}>
              <div className={styles.stepHeader}>
                <span className={styles.stepNumber}>04</span>
              </div>
              <h3 className={styles.stepTitle}>Hatırlatıcı Oluştur</h3>
              <p className={styles.stepText}>
                Aracınızı ve hatırlatıcı türünü seçip hatırlatma tarihlerini belirleyin ve hatırlatıcı oluşturma işlemini tamamlayın.
              </p>
            </div>

          </div>

        </div>
      </div>

      {/* Koyu Renkli CTA Bölümü */}
      <div className={styles.ctaBannerSection}>
        <div className={styles.ctaContainer}>
          <h2 className={styles.ctaTitle}>İşletmenizi Bugün Dijitale Taşıyın</h2>
          <p className={styles.ctaDescription}>
            Kurulum yok, teknik bilgi gerekmez. Dakikalar içinde hesabınızı oluşturun, araçlarınızı hemen yönetmeye başlayın.
          </p>
          <div className={styles.ctaButtonWrapper}>
            <Link href="/kayit-ol" className={styles.ctaPrimaryButton}>
              Hemen Başla 
              <ArrowRight className={styles.buttonArrowIcon} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>

      

    </div>
  );
}