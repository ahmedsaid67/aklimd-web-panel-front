import styles from './page.module.css';

const sssListesi = [
    {
        id: 1,
        soru: "\"Aklımda\" tam olarak ne işe yarar?",
        cevap: "Aklımda, araçlarınızı tek bir panel üzerinden kolayca yönetmenizi sağlayan bir araç takip ve hatırlatma sistemidir. Araçlarınızı sisteme ekledikten sonra muayene, trafik sigortası, kasko ve vergi için hatırlatıcı oluşturabilirsiniz. Her hatırlatıcı için son tarihi ve size bildirim gönderilmesini istediğiniz bir veya birden fazla hatırlatma tarihi belirleyebilirsiniz. Sistem, belirlediğiniz hatırlatma tarihlerinde size SMS ve e-posta yoluyla bildirim göndererek işlemlerinizi zamanında gerçekleştirmenize yardımcı olur."
    },
    {
        id: 2,
        soru: "Uygulama üzerinden araç muayene randevusu alabilir miyim veya muayene tarihimi öğrenebilir miyim?",
        cevap: "Hayır. Aklımda, resmi kurumlarla entegre çalışan bir sistem değildir ve araçlarınıza ait muayene, sigorta, kasko veya vergi bilgilerini otomatik olarak sorgulamaz ya da görüntülemez. Bu nedenle muayene randevusu oluşturamaz ve mevcut bitiş tarihlerinizi öğrenemezsiniz. İlgili tarihleri panele siz girersiniz. Belirlediğiniz hatırlatma tarihlerinde ise sistemimiz size SMS ve e-posta yoluyla bildirim göndererek yaklaşan işlemlerinizi hatırlatır."
    },
    {
        id: 3,
        soru: "Hatırlatıcı hakkı / paketleri nedir ve nasıl çalışır?",
        cevap: "Sistemimizde hatırlatıcı oluşturabilmek için hesabınızda hatırlatıcı hakkı bulunması gerekir. Bunu bir kullanım kotası gibi düşünebilirsiniz:\n• İhtiyacınıza göre 20 adet, 60 adet veya 180 adet hatırlatıcı hakkı içeren farklı paketler satın alabilirsiniz.\n• Oluşturduğunuz her yeni hatırlatıcı, hesabınızdaki toplam haktan düşer."
    },
    {
        id: 4,
        soru: "Hangi bildirim türlerini alabilirim?",
        cevap: "Hatırlatmalarınız için hem e-posta hem de SMS bildirimleri alırsınız. Bildirimler her iki kanal üzerinden de kesintisiz olarak size ulaştırılır."
    },
    {
        id: 5,
        soru: "Araç takibinde yaşanan sorunlara Aklımda nasıl çözüm sunar?",
        cevap: "Araçlara ait muayene, trafik sigortası, kasko ve vergi gibi işlemlerin zamanında yerine getirilmemesi; cezai yaptırımlara, ek maliyetlere ve araçların kullanılamaması nedeniyle iş süreçlerinin aksamasına neden olabilir. Özellikle birden fazla araca sahip işletmeler için bu işlemlere ait tarihleri düzenli olarak takip etmek zaman alıcı ve karmaşık bir süreçtir. Aklımda, tüm araçlarınızı ve hatırlatıcılarınızı tek bir panel üzerinden yönetmenizi sağlar. Her hatırlatıcı için son tarihi ve dilediğiniz sayıda hatırlatma tarihi belirleyebilirsiniz. Belirlediğiniz hatırlatma tarihlerinde sistem tarafından SMS ve e-posta bildirimleri gönderilir. Böylece kâğıt notlar veya farklı takip yöntemleri yerine tüm araçlarınızı tek bir sistem üzerinden düzenli ve pratik bir şekilde yönetebilir, önemli tarihleri gözden kaçırma riskinizi azaltabilirsiniz."
    },
    {
        id: 6,
        soru: "Hatırlatıcı paketim bittiğinde ne yapmam gerekir?",
        cevap: "Hesabınızdaki hatırlatıcı hakları tükentiğinde yeni bir hatırlatıcı ekleyebilmek için paneliniz üzerinden dilediğiniz zaman ihtiyacınıza uygun yeni bir hatırlatıcı paketi satın alarak haklarınızı güncelleyebilirsiniz. (Not: Sistemimize dilediğiniz kadar araç ekleyebilirsiniz; araç ekleme işleminde herhangi bir kota veya sayı kısıtlaması bulunmamaktadır, hak tüketimi yalnızca hatırlatıcı oluştururken geçerlidir.)"
    },
    {
        id: 7,
        soru: "Satın aldığım hatırlatıcı haklarının (paketlerin) bir son kullanma tarihi var mı?",
        cevap: "Hayır, yoktur. Satın aldığınız hatırlatıcı haklarının belirli bir kullanım süresi veya son kullanma tarihi bulunmaz. Haklarınızı tamamen kendi araç ve tarih planınıza göre tükenene kadar özgürce kullanabilirsiniz."
    },
    {
        id: 8,
        soru: "Şifremi veya hesap bilgilerimi unuttum, nasıl sıfırlayabilirim?",
        cevap: "Giriş ekranında yer alan \"Şifremi Unuttum\" seçeneğini kullanarak kayıtlı e-posta adresinize sıfırlama bağlantısı gönderebilir ve şifrenizi hızlıca yenileyerek panelinize kolayca tekrar giriş yapabilirsiniz."
    }
];

export default function HakkimizdaPage() {
  return (
    <div className={styles.aboutPage}>
      {/* Üst Banner Alanı */}
      <section className={styles.heroSection}>
        <div className={styles.heroContainer}>
          <h1 className={styles.heroTitle}>Sıkça Sorulan Sorular</h1>
        </div>
      </section>

      {/* İçerik Alanı */}
      <section className={styles.contentSection}>
        <div className={styles.contentContainer}>
          
          <div className={styles.faqGrid}>
            {sssListesi.map((item) => (
              <div key={item.id} className={styles.card}>
                <h3>{item.soru}</h3>
                <p style={{ whiteSpace: 'pre-line' }}>{item.cevap}</p>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}