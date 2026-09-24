import styles from './page.module.css';

export default function GizlilikPolitikasiPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Üst Banner Alanı */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Gizlilik Politikası</h1>
        </div>
      </section>

      {/* İçerik Alanı */}
      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          
          <div className={styles.storyBlock}>
            <p style={{ fontStyle: 'italic', marginBottom: '2rem' }}>
              Son güncelleme: 24.09.2026
            </p>
            <p>
              İşbu Gizlilik Politikası, Gökhan ADIGÜZEL (“Hizmet Sağlayıcı”) tarafından işletilen <strong>Aklımda</strong> mobil uygulamaları ve resmi web sitesi (arabamuayene.com.tr) üzerinden sunulan hizmetler kapsamında toplanan ve işlenen verilerin kullanım esaslarını düzenler.
            </p>

            <h2>1. Toplanan Veriler</h2>
            <p>
              Platformun işleyişi kapsamında kullanıcıdan ve sistem akışından elde edilen veriler şu şekildedir:
            </p>
            <p>
              <strong>Hesap Bilgileri:</strong> Ad, soyad, e-posta adresiniz, telefon numaranız ve parolanız.
            </p>
            <p>
              <strong>Araç ve Hatırlatma Kayıtları:</strong> Sisteme eklediğiniz araç bilgileri (plaka, marka/model) ve oluşturduğunuz muayene, sigorta, vergi ve kasko hatırlatma kayıtları.
            </p>
            <p>
              <strong>Fatura ve Ödeme Bilgileri (Yalnızca Web):</strong> Web üzerinden gerçekleştirilen satın alma işlemlerinde, tercih ettiğiniz fatura türüne (bireysel veya kurumsal) bağlı olarak paylaşılan fatura ve vergi/kimlik bilgileri, açık adres, iletişim bilgileri ile sipariş ve işlem detayları. (Not: Hassas ödeme ve kredi kartı bilgileriniz tarafımızca asla saklanmaz).
            </p>
            <p>
              <strong>Destek Talebi Verileri:</strong> Destek talebi oluşturmanız durumunda paylaştığınız mesaj içerikleri ve iletişim bilgileri.
            </p>
            <p>
              <strong>Teknik ve İşlem Logları:</strong> IP adresi, tarayıcı/cihaz bilgileri, oturum verileri, güvenlik ve işlem logları.
            </p>

            <h2>2. Verilerin İşlenme Amaçları</h2>
            <p>
              Toplanan verileriniz şu amaçlarla işlenir:
            </p>
            <p>
              • Araç muayene, sigorta, vergi ve kasko hatırlatma hizmetlerinin eksiksiz sunulması,<br />
              • Kullanıcı hesaplarının yönetilmesi, yetkilendirilmesi ve sistem güvenliğinin sağlanması,<br />
              • Web sitesi üzerinden yapılan satışların mali mevzuata uygun olarak faturalandırılması ve yasal saklama yükümlülüklerinin yerine getirilmesi,<br />
              • Destek süreçlerinin yürütülmesi ve platform performansının artırılması.
            </p>

            <h2>3. Üçüncü Taraf Altyapılar ve Entegrasyonlar</h2>
            <p>
              Hizmet kalitesini artırmak, yasal yükümlülükleri yerine getirmek, hatırlatma, iletişim, bildirim, reklam ve analitik faaliyetlerini yürütmek amacıyla kullanılan üçüncü taraf altyapılar şunlardır:
            </p>
            <p>
              <strong>Ödeme Altyapıları:</strong> Web üzerinden yapılan alışverişlerde güvenli ödeme işlemleri için PayTR ödeme altyapısı kullanılır.
            </p>
            <p>
              <strong>İletişim ve Hatırlatma Servisleri:</strong> Kullanıcılara araç hatırlatmaları, bilgilendirmeler ve operasyonel mesajlar iletmek amacıyla e-posta gönderim altyapıları, SMS sağlayıcıları ve OneSignal bildirim altyapısı kullanılır.
            </p>
            <p>
              <strong>Mobil Entegrasyonlar, Analitik ve Reklam Altyapıları:</strong> Platformda performans ölçümü, analiz ve reklam dönüşüm takibi amacıyla Google Analytics, Google Ads, Firebase ve Meta Ads altyapıları kullanılır.
            </p>
            <p>
              <strong>Yasal Zorunluluklar:</strong> Yetkili mahkemeler ve kamu kurumları tarafından usulüne uygun olarak talep edilmesi halinde veriler yasal mercilerle paylaşılabilir.
            </p>

            <h2>4. Yurt Dışına Veri Aktarımı</h2>
            <p>
              Kullanılan bazı üçüncü taraf hizmet sağlayıcılarının altyapılarının yurt dışında bulunabilmesi nedeniyle, platformun teknik işleyişi, iletişim, analitik ve reklam süreçleri kapsamında işlenen bazı veriler, ilgili mevzuatta öngörülen şartlara uygun olarak yurt dışına aktarılabilir.
            </p>

            <h2>5. Çerezler (Cookies) ve Web İzleme Teknolojileri</h2>
            <p>
              Web sitemizde siteyi işlevsel kılmak ve analiz/reklam faaliyetlerini yürütmek amacıyla çerezler kullanılmaktadır:
            </p>
            <p>
              <strong>Zorunlu Çerezler:</strong> Sitenin düzgün çalışması, oturum yönetimi ve güvenlik için teknik olarak zorunludur; onay gerektirmez.
            </p>
            <p>
              <strong>Analitik ve Reklam Çerezleri (Google Analytics ve Google Ads):</strong> Web sitesi ziyaretçi hareketlerini analiz etmek ve Google Arama reklamlarının performansını ölçmek amacıyla kullanılır. Bu çerezler yalnızca web sitesine ilk girişinizde karşınıza çıkan çerez onay banner'ı üzerinden onay vermeniz durumunda aktif hale gelir. Dilediğiniz zaman tarayıcı ayarlarından veya site içi çerez tercihlerinizden ayarlarınızı güncelleyebilirsiniz.
            </p>

            <h2>6. Veri Saklama ve Güvenlik</h2>
            <p>
              Kullanıcılar, web sitesindeki ilgili sayfa üzerinden hesaplarını diledikleri zaman silebilirler. Hesap silindiğinde hesap kapsamında tutulan profil, araç ve hatırlatma verileriniz sistemimizden silinir.
            </p>
            <p>
              Ancak Türk Vergi Kanunları, Ticaret Kanunu ve ilgili mali mevzuat gereği, web üzerinden yapılan satışlara ait fatura kayıtları, sipariş ve ödeme işlem kayıtları ile mevzuat kapsamında saklanması gereken zorunlu teknik kayıtlar yasal saklama süreleri boyunca güvenle muhafaza edilir.
            </p>
            <p>
              Kişisel verilerinizin güvenliğini sağlamak amacıyla gerekli teknik ve idari güvenlik tedbirleri uygulanmakta olup, olası veri güvenliği ihlallerine karşı ilgili mevzuat kapsamında gerekli süreçler işletilir.
            </p>

            <h2>7. Kullanıcı Hakları</h2>
            <p>
              KVKK'nın 11. maddesi ve ilgili mevzuat uyarınca; verilerinizin işlenip işlenmediğini öğrenme, bilgi talep etme, düzeltilmesini, silinmesini veya yok edilmesini isteme haklarına sahipsiniz. Başvurularınızı ve taleplerinizi aşağıdaki iletişim adresi üzerinden iletebilirsiniz.
            </p>

            <h2>8. Politika Değişiklikleri</h2>
            <p>
              Hizmet Sağlayıcı, işbu Gizlilik Politikası'nı dilediği zaman güncelleme hakkını saklı tutar. Yapılan güncellemeler platformda yayınlandığı andan itibaren geçerlilik kazanır.
            </p>

            <h2>9. İletişim</h2>
            <p>
              İşbu politika ile ilgili her türlü soru ve bildiriminiz için <a href="mailto:flexsoftwaretr@gmail.com" style={{ color: '#1D64F2', textDecoration: 'none' }}>flexsoftwaretr@gmail.com</a> adresinden bizimle iletişime geçebilirsiniz.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}