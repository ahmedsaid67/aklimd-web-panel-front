import styles from './page.module.css';

export default function KvkkPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Üst Banner Alanı */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>KVKK Aydınlatma Metni</h1>
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
              İşbu Aydınlatma Metni, Gökhan ADIGÜZEL (“Veri Sorumlusu”) tarafından işletilen <strong>Aklımda</strong> platformu (mobil uygulamalar ve resmi web sitesi: arabamuayene.com.tr) üzerinden sunulan hizmetler kapsamında, kişisel verilerinizin 6698 sayılı Kişisel Verilerin Korunması Kanunu (“KVKK”) uyarınca işlenmesine ilişkin hususları açıklamak amacıyla hazırlanmıştır.
            </p>

            <h2>1. Veri Sorumlusunun Kimliği</h2>
            <p>
              KVKK uyarınca veri sorumlusu sıfatıyla, kişisel verileriniz aşağıda belirtilen kapsamda ve mevzuata uygun olarak işlenmektedir:
            </p>
            <p>
              <strong>Unvan / Ad Soyad:</strong> Gökhan ADIGÜZEL<br />
              <strong>İletişim E-posta:</strong> <a href="mailto:flexsoftwaretr@gmail.com" style={{ color: '#1D64F2', textDecoration: 'none' }}>flexsoftwaretr@gmail.com</a>
            </p>

            <h2>2. İşlenen Kişisel Verileriniz</h2>
            <p>
              Platformu kullanmanız, üye olmanız, araç veya hatırlatma eklemeniz ya da bizimle iletişime geçmeniz süreçlerinde aşağıdaki kişisel verileriniz işlenmektedir:
            </p>
            <p>
              • <strong>Kimlik Bilgileri:</strong> Ad, soyad.<br />
              • <strong>İletişim Bilgileri:</strong> E-posta adresi, cep telefonu numarası ve destek talepleriniz kapsamında ilettiğiniz iletişim bilgileri.<br />
              • <strong>Araç ve Hatırlatma Kayıtları:</strong> Sisteme eklediğiniz araç bilgileri (plaka, marka/model) ve oluşturduğunuz muayene, sigorta, vergi, kasko hatırlatma kayıtları.<br />
              • <strong>Finansal Bilgiler:</strong> Platform üzerinden yapılan paket satın alımlarına ilişkin sipariş ve işlem bilgileri (Kredi kartı bilgileriniz tarafımızca kesinlikle saklanmamakta olup, güvenli ödeme altyapısı üzerinden işlenmektedir).<br />
              • <strong>İşlem Güvenliği ve Teknik Veriler:</strong> IP adresleri, sistem logları, cihaz bilgileri ve uygulama/site kullanım verileri.
            </p>

            <h2>3. Kişisel Verilerinizin İşlenme Amaçları, Hukuki Sebepleri ve Saklama Süreçleri</h2>
            <p>
              Toplanan kişisel verileriniz, KVKK'nın 5. maddesinde öngörülen hukuki sebeplere dayanarak aşağıdaki amaçlarla işlenmektedir:
            </p>
            <p>
              • <strong>Üyelik ve Hesap Yönetimi:</strong> Platformun sunulması, üyelik işlemlerinin gerçekleştirilmesi ve kullanıcı hesabının yönetilmesi. <em>(Hukuki Sebep: Sözleşmenin kurulması ve ifası - KVKK m.5/2-c)</em><br />
              • <strong>Hatırlatma ve Takip Hizmetleri:</strong> Araç ve hatırlatma kayıtlarınızın oluşturulması; bu kayıtlara bağlı olarak belirttiğiniz tarihlerde sistem üzerinden SMS, e-posta ve bildirimler yoluyla hatırlatma ve bilgilendirmelerin iletilmesi süreçlerinin yürütülmesi. <em>(Hukuki Sebep: Sözleşmenin kurulması ve ifası - KVKK m.5/2-c)</em><br />
              • <strong>Satış ve Finansal Süreçler:</strong> Paket satışlarının gerçekleştirilmesi, faturalandırma ve ilgili mali/yasal yükümlülüklerin yerine getirilmesi. <em>(Hukuki Sebep: Sözleşmenin ifası ve hukuki yükümlülüklerin yerine getirilmesi - KVKK m.5/2-c, ç)</em><br />
              • <strong>Destek ve İletişim Faaliyetleri:</strong> Kullanıcılardan gelen soru, talep ve şikayetlerin çözüme kavuşturulması. <em>(Hukuki Sebep: Sözleşmenin ifası ve veri sorumlusunun meşru menfaatleri - KVKK m.5/2-c, f)</em><br />
              • <strong>Güvenlik ve Teknik Altyapı:</strong> Bilgi güvenliği süreçlerinin yürütülmesi, yetkisiz erişimlerin önlenmesi ve sistem güvenliğinin sağlanması. <em>(Hukuki Sebep: Veri sorumlusunun meşru menfaatleri - KVKK m.5/2-f)</em>
            </p>
            <p>
              Kişisel verileriniz, işlendikleri amaç için gerekli olan yasal süreler ve ilgili mevzuatta öngörülen zamanaşımı süreleri boyunca saklanmakta; bu süreler sonunda silinmekte, yok edilmekte veya anonim hale getirilmektedir.
            </p>

            <h2>4. Kişisel Verilerin Aktarıldığı Taraflar ve Aktarım Amaçları</h2>
            <p>
              Kişisel verileriniz, yukarıda belirtilen amaçların gerçekleştirilmesi doğrultusunda ve gerekli idari/teknik güvenlik önlemleri alınarak şu alıcı gruplarıyla paylaşılabilir:
            </p>
            <p>
              • <strong>Yetkili Kamu Kurum ve Kuruluşları:</strong> Yasal yükümlülüklerin yerine getirilmesi amacıyla ilgili kamu kurum ve makamlarıyla,<br />
              • <strong>Teknoloji ve Altyapı Hizmet Sağlayıcıları:</strong> Platformun barındırılması, veri tabanı yönetimi, teknik altyapının işletilmesi ve güvenliğinin sağlanması amacıyla bulut altyapı tedarikçileriyle,<br />
              • <strong>İletişim ve Bildirim Hizmet Sağlayıcıları:</strong> Hatırlatmaların ve bilgilendirmelerin iletilmesi amacıyla SMS, e-posta ve uygulama içi/push bildirim altyapısı sağlayıcılarıyla,<br />
              • <strong>Ödeme Hizmet Sağlayıcıları:</strong> Web sitesi üzerinden gerçekleştirilen paket satın alımlarında ödemelerin güvenli şekilde alınması ve yürütülmesi amacıyla ödeme kuruluşlarıyla.
            </p>

            <h2>5. Kişisel Verilerin Yurt Dışına Aktarılması</h2>
            <p>
              Platform altyapısında kullanılan bazı bulut tabanlı teknoloji, barındırma, iletişim ve bildirim hizmet sağlayıcılarının sunucularının yurt dışında bulunması veya hizmetlerini yurt dışındaki altyapılar üzerinden sunması nedeniyle; ilgili kişisel verileriniz, KVKK'nın 9. maddesinde öngörülen şartlar ve uygun güvence mekanizmaları çerçevesinde yurt dışındaki altyapı sağlayıcılarına aktarılabilmektedir.
            </p>

            <h2>6. Kişisel Verilerin Toplanma Yöntemi</h2>
            <p>
              Kişisel verileriniz; mobil uygulamalar ve web sitesi üzerinden üyelik formu doldurmanız, araç veya hatırlatma eklemeniz, destek talebi iletmeniz, satın alma işlemi gerçekleştirmeniz ve platformu aktif olarak kullanmanız sırasında elektronik ortamda otomatik veya otomatik olmayan yollarla toplanmaktadır.
            </p>

            <h2>7. KVKK Kapsamındaki Haklarınız</h2>
            <p>
              KVKK'nın 11. maddesi uyarınca, veri sahibi olarak aşağıdaki haklara sahipsiniz:
            </p>
            <p>
              • Kişisel verilerinizin işlenip işlenmediğini öğrenme,<br />
              • Kişisel verileriniz işlenmişse buna ilişkin bilgi talep etme,<br />
              • Kişisel verilerin işlenme amacını ve bunların amacına uygun kullanılıp kullanılmadığını öğrenme,<br />
              • Yurt içinde veya yurt dışında kişisel verilerinizin aktarıldığı üçüncü kişileri bilme,<br />
              • Kişisel verilerinizin eksik veya yanlış işlenmiş olması hâlinde bunların düzeltilmesini isteme,<br />
              • KVKK mevzuatında öngörülen şartlar çerçevesinde kişisel verilerinizin silinmesini veya yok edilmesini isteme,<br />
              • Yapılan düzeltme, silme ve yok edilme işlemlerinin verilerin aktarıldığı üçüncü kişilere bildirilmesini isteme,<br />
              • İşlenen verilerin münhasıran otomatik sistemler vasıtasıyla analiz edilmesi suretiyle aleyhinize bir sonucun ortaya çıkmasına itiraz etme,<br />
              • Kişisel verilerinizin kanuna aykırı olarak işlenmesi sebebiyle zarara uğramanız hâlinde zararın giderilmesini talep etme.
            </p>
            <p>
              Yukarıda belirtilen haklarınızı kullanmak ve taleplerinizi iletmek için, Veri Sorumlusuna Başvuru Usul ve Esasları Hakkında Tebliğ hükümlerine uygun olarak yazılı başvurunuzu <a href="mailto:flexsoftwaretr@gmail.com" style={{ color: '#1D64F2', textDecoration: 'none' }}>flexsoftwaretr@gmail.com</a> e-posta adresine iletebilirsiniz. Başvurularınız yasal süreler içerisinde, en geç otuz gün içinde ücretsiz olarak sonuçlandırılacaktır.
            </p>
          </div>

        </div>
      </section>
    </div>
  );
}