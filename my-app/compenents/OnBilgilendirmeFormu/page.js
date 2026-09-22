'use client'
import styles from './page.module.css';

export default function Page({ onClose }) {


    return (
        <div className={styles.overlay} onClick={onClose}>
            {/* Modal boyutunu form için biraz daha geniş ve ferah tutuyoruz */}
            <div className={styles.modalLarge} onClick={(e) => e.stopPropagation()}>
                <div className={styles.contentLarge}>
                    
                    {/* Başlık ve Kapatma Çarpısı */}
                    <div className={styles.modalHeader}>
                        <h2 className={styles.title}>Ön Bilgilendirme Formu</h2>
                        <button className={styles.closeIconButton} onClick={onClose}>✕</button>
                    </div>

                    {/* Kaydırma Çubuğu Olan Metin Alanı */}
                    <div className={styles.scrollableTextContent}>
                        <p className={styles.updateDate}><strong>Son Güncelleme Tarihi:</strong> 18.09.2026</p>
                        
                        <p>
                            İşbu Ön Bilgilendirme Formu; Gökhan ADIGÜZEL (“Hizmet Sağlayıcı”) tarafından işletilen Aklımda resmi web sitesi (arabamuayene.com.tr) üzerinden sunulan hizmetler kapsamında Alıcı&apos;yı bilgilendirmek amacıyla hazırlanmıştır.
                        </p>

                        <h3>1. Satıcı Bilgileri</h3>
                        <ul>
                            <li><strong>Ünvan:</strong> Gökhan ADIGÜZEL</li>
                            <li><strong>Vergi Dairesi / No:</strong> Karadeniz Ereğli Vergi Dairesi Müdürlüğü / 0080536432</li>
                            <li><strong>Adres:</strong> Kepez Mah. Ali Paşa Sk. No: 29 İç Kapı No: 5 Ereğli/Zonguldak</li>
                            <li><strong>E-posta:</strong> flexsoftwaretr@gmail.com</li>
                            <li><strong>Telefon:</strong> 0507 704 61 41</li>
                        </ul>

                        <h3>2. Hizmetin Niteliği ve Temel Özellikleri</h3>
                        <p>
                            İşbu ön bilgilendirme konusu hizmet; “Aklımda” platformu üzerinden araçlara ait muayene, sigorta, vergi ve kasko periyotları için dijital ortamda hatırlatıcı oluşturulmasını sağlayan hatırlatıcı hakkı paketleridir. Satın alınan hatırlatıcı hakları, yeni bir hatırlatıcı oluşturulduğunda kullanılır ve satın alınan haklar kullanılıncaya kadar geçerliliğini korur.
                        </p>

                        <h3>3. Ürün/Hizmet Fiyatı ve Ödeme Bilgileri</h3>
                        <p>
                            Satın alınacak paketin adı, KDV hariç fiyatı, KDV oranı ve KDV dahil toplam satış bedeli, ödeme ekranında Alıcı&apos;ya açık ve net şekilde gösterilir. Ödeme, ödeme ekranında sunulan geçerli ödeme yöntemleri aracılığıyla elektronik ortamda gerçekleştirilir.
                        </p>

                        <h3>4. Hizmetin Sunulması</h3>
                        <p>
                            Satın alınan hatırlatıcı hakları, ödeme işleminin başarıyla tamamlanmasının ardından Alıcı&apos;nın hesabına elektronik ortamda anında tanımlanır.
                        </p>

                        <h3>5. Cayma Hakkı</h3>
                        <p>
                            Mesafeli Sözleşmeler Yönetmeliği&apos;nin 15. maddesinin birinci fıkrasının (ğ) bendi uyarınca, elektronik ortamda anında ifa edilen hizmetlere ilişkin sözleşmelerde cayma hakkı uygulanmaz. Mükerrer ödeme, satın alınan hakların hesaba tanımlanmaması veya Satıcı kaynaklı hizmet ifasını engelleyen teknik sorunlar gibi durumlarda Alıcı&apos;nın yürürlükteki mevzuat kapsamındaki hakları saklıdır.
                        </p>

                        <h3>6. Uyuşmazlıkların Çözümü</h3>
                        <p>
                            Uyuşmazlıklarda, yürürlükteki mevzuat kapsamında belirlenen parasal sınırlar dahilinde Tüketici Hakem Heyetleri ve Tüketici Mahkemeleri yetkilidir.
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