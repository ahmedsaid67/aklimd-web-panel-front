import styles from "./page.module.css";

export default function Page({ paket }) {
    // API'den gelen verinin yapısına göre güvenli okuma (Gelen JSON yapın: paket.data.package vb.)
    const pkg = paket?.data?.package || {};
    const billing = paket?.data?.billing_profile || {};
    const savedCards = paket?.data?.saved_cards || [];
    
    // Fatura eksik mi kontrolü modelden gelen is_complete ile yapılıyor
    const isBillingComplete = billing?.is_complete ?? false;

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.mainContainer}>
                
                {/* SOL TARAF: Fatura Bilgileri ve Ödeme Yöntemi */}
                <div className={styles.leftContainer}>
                    
                    {/* Fatura Bilgileri Kartı */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3>FATURA BİLGİLERİ</h3>
                            <button className={styles.editButton}>Düzenle</button>
                        </div>

                        {!isBillingComplete ? (
                            <div className={styles.warningBox}>
                                ⚠️ Fatura bilgileriniz eksik. Ödeme yapmadan önce lütfen <span>fatura bilgilerinizi doldurun.</span>
                            </div>
                        ) : (
                            <div style={{ fontSize: "0.9rem", color: "#334155", lineHeight: "1.5" }}>
                                <p><strong>{billing.profile_type === 'corporate' ? billing.company_name : `${billing.first_name} ${billing.last_name}`}</strong></p>
                                <p>{billing.address_line}, {billing.city} / {billing.country}</p>
                            </div>
                        )}
                    </div>

                    {/* Ödeme Yöntemi Kartı (EFT kaldırıldı, tek tip kart alanı) */}
                    <div className={styles.card}>
                        <h3>ÖDEME YÖNTEMİ</h3>
                        <div className={styles.tabContainer}>
                            <button className={`${styles.tabButton} ${styles.active}`}>
                                Kredi / Banka Kartı
                            </button>
                        </div>

                        {savedCards.length === 0 ? (
                            <div className={styles.noCardText}>
                                Kayıtlı kartınız bulunmuyor.
                            </div>
                        ) : (
                            <div>Kayıtlı kartlar listelenecek...</div>
                        )}

                        <button className={styles.addCardButton}>
                            + Kart Ekle
                        </button>
                    </div>
                </div>

                {/* SAĞ TARAF: Sipariş Özeti ve Ödeme Butonu */}
                <div className={styles.rightContainer}>
                    <div className={styles.summaryCard}>
                        <h3>SİPARİŞ ÖZETİ</h3>
                        
                        <div className={styles.summaryRow}>
                            <span>{pkg.title || "Paket"}</span>
                            <span>{pkg.price ? `${pkg.price} ₺` : "2500.00 ₺"}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>Ödeme tipi</span>
                            <span>Aylık (Tek Çekim)</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>KDV (%20)</span>
                            <span>{pkg.price && pkg.tax_included_price ? (parseFloat(pkg.tax_included_price) - parseFloat(pkg.price)).toFixed(2) : "500.00"} ₺</span>
                        </div>

                        <hr className={styles.divider} />

                        <div className={styles.totalRow}>
                            <span>Toplam</span>
                            <span>{pkg.tax_included_price ? `${pkg.tax_included_price} ₺` : "3000.00 ₺"}</span>
                        </div>

                        <div className={styles.agreementContainer}>
                            <input type="checkbox" id="agreement" />
                            <label htmlFor="agreement">
                                <span>Mesafeli Satış ve Sözleşmesi</span>'ni okudum, onaylıyorum.
                            </label>
                        </div>

                        <button className={styles.completeButton}>
                            Ödemeyi Tamamla
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}