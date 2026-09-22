import styles from './page.module.css';

export default function CerezPolitikasiPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Üst Banner Alanı */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Çerez Politikası</h1>
        </div>
      </section>

      {/* İçerik Alanı */}
      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          
          <div className={styles.storyBlock}>
            <p style={{ fontStyle: 'italic', marginBottom: '2rem' }}>
              Son Güncelleme Tarihi: 18.09.2026
            </p>
            <p>
              İşbu Çerez Politikası; Gökhan ADIGÜZEL (“Veri Sorumlusu”) tarafından işletilen <strong>Aklımda</strong> resmi web sitesi (arabamuayene.com.tr) üzerinden ziyaretçilere sunulan çerez kullanımına ilişkin hususları açıklamak amacıyla hazırlanmıştır.
            </p>

            <h2>1. Çerez Nedir?</h2>
            <p>
              Çerezler, bir web sitesini ziyaret ettiğinizde tarayıcınıza kaydedilen küçük metin dosyalarıdır. Web sitesinin düzgün çalışması, kullanıcı deneyiminin iyileştirilmesi, oturum güvenliğinin sağlanması ve site kullanım istatistiklerinin oluşturulması amacıyla kullanılmaktadır.
            </p>

            <h2>2. Platformumuzda Kullanılan Çerez Türleri</h2>
            <p>
              Aklımda web sitesinde platformun işlevselliğine ve kullanım amacına bağlı olarak aşağıdaki kategorilerde çerezler kullanılabilmektedir:
            </p>
            <p>
              • <strong>Zorunlu Çerezler:</strong> Platformun teknik olarak çalışabilmesi, üye girişi yapabilmeniz, oturumunuzun güvenli bir şekilde sürdürülmesi ve çerez tercihlerinizin hatırlanması için zorunlu olan çerezlerdir. Bu çerezler onayınıza tabi olmayıp, kapatılması durumunda platformun temel işlevleri çalışmayacaktır.<br /><br />
              • <strong>Analitik / Performans Çerezleri (Google Analytics):</strong> Kullanıcıların web sitesini nasıl kullandığını analiz etmemize ve site performansını iyileştirmemize yardımcı olan çerezlerdir. Bu kapsamda Google Analytics çerezleri kullanılmakta olup, yalnızca açık rızanızla etkinleştirilir.<br /><br />
              • <strong>Hedefleme / Pazarlama Çerezleri (Google Ads):</strong> Platformumuzun tanıtımını yapmak, reklam kampanyalarının etkinliğini ölçmek ve ilgi alanlarınıza uygun reklamlar gösterebilmek amacıyla kullanılan çerezlerdir. Bu kapsamda Google Ads çerezleri aracılığıyla elde edilen veriler reklam ve pazarlama faaliyetleri için işlenebilir; bu çerezler yalnızca açık rızanızla yüklenir.
            </p>

            <h2>3. Çerez Tercihlerini Yönetme</h2>
            <p>
              Siteye ilk girişinizde gösterilen çerez bildiriminden "Ayarları Yönet" ile analitik ve pazarlama çerezlerini ayrı ayrı açıp kapatabilirsiniz. Açık rızanızı vermediğiniz sürece bu çerezler yüklenmez. Ayrıca tarayıcınızın ayarlarından mevcut çerezleri silebilir veya çerezleri tümüyle engelleyebilirsiniz; ancak zorunlu çerezlerin engellenmesi bazı özelliklerin çalışmamasına yol açabilir.
            </p>

            <h2>4. Üçüncü Taraf Çerezleri ve Hizmetler</h2>
            <p>
              Platformumuz üzerinde, site trafiğinin analizi amacıyla Google Analytics ve reklam/pazarlama faaliyetlerinin yürütülmesi amacıyla Google Ads hizmetleri kullanılmaktadır. Bu sağlayıcılar kendi çerezlerini yerleştirebilir ve elde edilen verileri kendi gizlilik politikaları kapsamında işleyerek yurt dışındaki sunucularına aktarabilir. İlgili kategoriye açık rızanızı vermediğiniz takdirde bu çerezler yüklenmez.
            </p>

            <h2>5. Politikada Değişiklikler</h2>
            <p>
              İşbu Çerez Politikası, yasal düzenlemelerdeki değişiklikler veya platformumuzdaki teknolojik güncellemeler doğrultusunda zaman zaman güncellenebilir. Güncel politika metni her zaman bu sayfada yayımlanacaktır.
            </p>

            <h2>6. İletişim</h2>
            <p>
              Her türlü soru ve bildirim için: <a href="mailto:flexsoftwaretr@gmail.com" style={{ color: '#1D64F2', textDecoration: 'none' }}>flexsoftwaretr@gmail.com</a> adresinden bizimle iletişime geçebilirsiniz.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}