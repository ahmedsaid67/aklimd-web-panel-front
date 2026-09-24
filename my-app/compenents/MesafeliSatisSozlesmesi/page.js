'use client'
import styles from './page.module.css';

export default function MesafeliSatisSozlesmesi({ info, onClose }) {
    if (!info?.isOpen) return null;

    // Alıcı bilgilerini dinamik ve güvenli olarak belirle
    const aliciAdiUnvani = info.profileType === 'corporate'
            ? (info.companyName || '[Ünvan]')
            : (`${info.firstName || ''} ${info.lastName || ''}`.trim() || '[Ad / Soyad]');

    // Adres satırı, şehir ve ülkenin HEPSİNİN dolu olup olmadığını kontrol et
    const isAddressComplete = 
        info.addressLine && info.addressLine !== 'null' && info.addressLine !== 'undefined' && info.addressLine.trim() !== '' &&
        info.city && info.city !== 'null' && info.city !== 'undefined' && info.city.trim() !== '' &&
        info.country && info.country !== 'null' && info.country !== 'undefined' && info.country.trim() !== '';

    // Hepsi tamamsa birleştir, herhangi biri eksikse [Adres] yaz
    const aliciAdres = isAddressComplete 
        ? `${info.addressLine}, ${info.country} / ${info.city}` 
        : '[Adres]';

    const aliciTelefon = info.phone_number 
            ? info.phone_number.replace(/^\+90(\d{3})(\d{3})(\d{2})(\d{2})/, '0$1 $2 $3 $4') 
            : '[Telefon Numarası]';
        
    const aliciEposta = info.email || '[E-posta Adresi]';

    return (
        <div className={styles.overlay} onClick={onClose}>
            {/* Ön Bilgilendirme Formu ile birebir aynı standart modal yapısı */}
            <div className={styles.modalLarge} onClick={(e) => e.stopPropagation()}>
                <div className={styles.contentLarge}>
                    
                    {/* Başlık ve Kapatma Çarpısı */}
                    <div className={styles.modalHeader}>
                        <h2 className={styles.title}>Mesafeli Satış Sözleşmesi</h2>
                        <button className={styles.closeIconButton} onClick={onClose}>✕</button>
                    </div>

                    {/* Kaydırma Çubuğu Olan Metin Alanı */}
                    <div className={styles.scrollableTextContent}>
                        <p className={styles.updateDate}><strong>Son Güncelleme Tarihi:</strong> 24.09.2026</p>
                        
                        <p>
                            İşbu Mesafeli Satış Sözleşmesi; Gökhan ADIGÜZEL (“Satıcı / Hizmet Sağlayıcı”) tarafından işletilen Aklımda resmi web sitesi (arabamuayene.com.tr) üzerinden sunulan hizmetler kapsamında Alıcı&apos;yı bilgilendirmek ve tarafların hak ve yükümlülüklerini belirlemek amacıyla hazırlanmıştır.
                        </p>

                        <h3>1. Taraflar</h3>
                        <p><strong>1.1. Satıcı (Hizmeti Sunan)</strong></p>
                        <ul>
                            <li><strong>Ünvan:</strong> Gökhan ADIGÜZEL</li>
                            <li><strong>Vergi Dairesi / No:</strong> Karadeniz Ereğli Vergi Dairesi Müdürlüğü / 0080536432</li>
                            <li><strong>Adres:</strong> Kepez Mah. Ali Paşa Sk. No: 29 İç Kapı No: 5 Ereğli/Zonguldak</li>
                            <li><strong>E-posta:</strong> flexsoftwaretr@gmail.com</li>
                            <li><strong>Telefon:</strong> 0507 704 61 41</li>
                        </ul>

                        <p><strong>1.2. Alıcı (Kullanıcı)</strong></p>
                        <ul>
                            <li><strong>{info.profileType === 'corporate' ? 'Ünvan:' : 'Ad / Soyad:'}</strong> {aliciAdiUnvani}</li>
                            <li><strong>Adres:</strong> {aliciAdres}</li>
                            <li><strong>Telefon:</strong> {aliciTelefon}</li>
                            <li><strong>E-posta:</strong> {aliciEposta}</li>
                        </ul>

                        <h3>2. Sözleşmenin Konusu</h3>
                        <p>
                            <strong>2.1.</strong> İşbu Sözleşme&apos;nin konusu; mülkiyeti, fikri ve sınai hakları Satıcı&apos;ya ait olan Aklımda platformu (arabamuayene.com.tr) üzerinden, araçlara ait muayene, sigorta, vergi ve kasko periyotları için hatırlatıcı oluşturulması amacıyla satışı yapılan hatırlatıcı hakkı paketlerinin elektronik ortamda sunulması ve satışı ile ilgili olarak Taraflar&apos;ın hak ve yükümlülüklerinin düzenlenmesidir.
                        </p>
                        <p>
                            <strong>2.2.</strong> İşbu Sözleşme ile Satıcı seçilen hatırlatıcı hakkı paketini sunmayı; Alıcı ise bu paket karşılığında sözleşmede kararlaştırılan bedeli ödemeyi kabul ettiğini beyan eder.
                        </p>
                        <p>
                            <strong>2.3.</strong> Hizmet kapsamı; platform üzerindeki araç ve bilgi yönetimi altyapısı ile satın alınan haklar dahilinde hatırlatıcı oluşturulması ve bildirimlerin gönderilmesini içerir. Sisteme girilen tarihlerin veya araç bilgilerinin doğruluğuna ilişkin sorumluluk tamamen Alıcı&apos;ya aittir.
                        </p>

                        <h3>3. Hizmetin Niteliği ve Kapsamı</h3>
                        <p>
                            <strong>3.1.</strong> Satıcı, Alıcı&apos;ya platformu kullanma imkanı sunarken; araçların muayene, sigorta, vergi ve kasko süreleri için hatırlatıcı oluşturabilmesi amacıyla platform üzerinden ücretli hatırlatıcı hakkı paketleri yükleme imkanı sağlayacaktır. Hatırlatıcı hakkı yalnızca yeni hatırlatıcı oluşturma aşamasında düşülür.
                        </p>
                        <p>
                            <strong>3.2.</strong> Kullanıcıya tanınan hak, münhasır olmayan, devredilemeyen, alt lisans verilemeyen, yalnızca satın alınan hak adedi ve işbu Sözleşme koşulları çerçevesinde hatırlatıcı oluşturulması amacıyla kullanılabilen sınırlı bir kullanım hakkıdır.
                        </p>
                        <p>
                            <strong>3.3.</strong> Alıcı; yazılımı kopyalayamaz, çoğaltamaz, tersine mühendislik yapamaz, kaynak kodunu elde etmeye çalışamaz, üçüncü kişilere devredemez veya ticari olarak yeniden pazarlayamaz.
                        </p>

                        <h3>4. Hizmetin Sunulma Şekli ve Destek</h3>
                        <p>
                            <strong>4.1.</strong> Satıcı, platformu internet tabanlı erişim yöntemi ile sunacaktır. Satın alınan hatırlatıcı hakları ödemenin ardından anında Alıcı hesabına tanımlanır.
                        </p>
                        <p>
                            <strong>4.2.</strong> Satıcı, sistemin çalışır halde tutulmasına yönelik bakım faaliyetlerini yürütür; Alıcı ise karşılaşabileceği teknik sorunları veya talepleri platform üzerindeki destek sayfası veya e-posta yoluyla iletebilir.
                        </p>

                        <h3>5. Taraflar&apos;ın Hak ve Yükümlülükleri</h3>
                        <p><strong>5.1. Alıcı&apos;nın Yükümlülükleri:</strong></p>
                        <ul>
                            <li>Platformu hukuka ve işbu Sözleşme&apos;ye uygun kullanmak,</li>
                            <li>Sisteme girdiği araç plakaları ve takip tarihlerinin doğruluğundan bizzat sorumlu olmak,</li>
                            <li>Kullanıcı adı ve şifre bilgilerini gizli tutmak,</li>
                            <li>Satın almak istediği hatırlatıcı hakkı paketinin ödemesini ilgili ödeme adımları üzerinden tamamlamak.</li>
                        </ul>

                        <h3>6. Bedel, Ödeme ve Sözleşmenin Kurulması</h3>
                        <p>
                            <strong>6.1.</strong> İşbu Sözleşme kapsamındaki hatırlatıcı hakkı paketinin bedeli; ödeme sayfasında belirtilen ara toplam ile yasal KDV tutarının toplamından oluşan genel toplam tutardır.
                        </p>
                        <p>
                            <strong>6.2.</strong> Alıcı, ödeme ekranında işbu Sözleşme&apos;yi onaylayıp ödemeyi tamamladığı anda sözleşme elektronik ortamda kurulmuş olur. Ödemenin başarıyla gerçekleşmesiyle birlikte satın alınan haklar Alıcı hesabına anında tanımlanır.
                        </p>

                        <h3>7. Cayma Hakkı ve Dijital Hizmet</h3>
                        <p>
                            <strong>7.1.</strong> Sözleşme konusu hatırlatıcı hakkı paketleri, ödeme işleminin başarıyla tamamlanmasının ardından Alıcı&apos;nın hesabına elektronik ortamda anında tanımlanmakta ve hizmet bu şekilde ifa edilmektedir.
                        </p>
                        <p>
                            <strong>7.2.</strong> Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15. maddesinin birinci fıkrasının (ğ) bendi gereğince, elektronik ortamda anında ifa edilen hizmetlere ilişkin sözleşmelerde cayma hakkı istisnası uygulanmaktadır.
                        </p>
                        <p>
                            <strong>7.3.</strong> Mükerrer ödeme yapılması, ödeme alınmasına rağmen satın alınan hakların Alıcı hesabına tanımlanmaması veya Satıcı&apos;dan kaynaklanan ve hizmetin ifasını engelleyen teknik bir durumun meydana gelmesi gibi hallerde Alıcı&apos;nın mevzuattan doğan hakları saklıdır.
                        </p>

                        <h3>8. Teknik Kesintiler</h3>
                        <p>
                            Platform üzerinde periyodik bakım çalışmaları, altyapı güncellemeleri veya üçüncü taraf servis kaynaklı geçici aksaklıklar yaşanabilir. Bu tür geçici kesintilerden dolayı Satıcı&apos;nın sorumluluğu, yürürlükteki mevzuat hükümleri çerçevesinde değerlendirilir.
                        </p>

                        <h3>9. Mücbir Sebepler</h3>
                        <p>
                            Doğal afetler, yangın, sel, savaş, genel salgın hastalıklar, siber saldırılar, altyapı çöküşleri ve yasal düzenlemeler gibi Tarafların kontrolü dışında gelişen ve öngörülemeyen mücbir sebep hallerinde Tarafların sözleşmeden doğan yükümlülükleri bu durum süresince askıya alınır.
                        </p>

                        <h3>10. Fikri Mülkiyet Hakları</h3>
                        <p>
                            Platformun yazılım mimarisi, kaynak kodu, arayüzü, tasarımı ve tüm fikri hakları Satıcı&apos;ya aittir. İzinsiz kopyalanamaz ve kullanılamaz.
                        </p>

                        <h3>11. Sorumluluk Sınırı</h3>
                        <p>
                            Satıcı&apos;nın sorumluluğu, yürürlükteki mevzuat kapsamında belirlenen yükümlülüklerle sınırlıdır. Alıcı, platforma girdiği verilerin, araç plakalarının ve hatırlatıcı tarihlerinin doğruluğundan bizzat sorumludur.
                        </p>

                        <h3>12. Uygulanacak Hukuk ve Uyuşmazlıkların Çözümü</h3>
                        <p>
                            İşbu Sözleşme&apos;nin uygulanmasında Türk Hukuku geçerlidir. Tüketici işlemlerinden doğabilecek uyuşmazlıklarda, yürürlükteki mevzuatta belirlenen parasal sınırlar ve görev kuralları çerçevesinde Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.
                        </p>

                        <h3>13. Yürürlük</h3>
                        <p>
                            İşbu Sözleşme, Alıcı tarafından elektronik ortamda onaylandığı anda yürürlüğe girer.
                        </p>
                    </div>

                    {/* Alt Kapatma Butonu */}
                    <button 
                        className={styles.buttonClose} 
                        onClick={onClose}
                    >
                        Anladım / Kapat
                    </button>
                </div>
            </div>
        </div>
    );
}