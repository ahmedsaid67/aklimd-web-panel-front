'use client'
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import OnBilgilendirmeFormu from '../OnBilgilendirmeFormu/page';
import MesafeliSatisSozlesmesi from '../MesafeliSatisSozlesmesi/page';
import { odemeBaslat } from "./actions";

export default function Page({ paket }) {
    const pkg = paket.data.package;
    const billing = paket.data.billing_profile;
    
    const isBillingComplete = billing?.is_complete ?? false;
    const [isChecked, setIsChecked] = useState(false);
    const [isBilgilendirmeOpen, setIsBilgilendirmeOpen] = useState(false);
    const [paytrToken, setPaytrToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const [mesafeliSatisInfo, setMesafeliSatisInfo] = useState({
        isOpen: false,
        profileType: billing?.profile_type,
        firstName: billing?.first_name,
        lastName: billing?.last_name,
        companyName: billing?.company_name,
        addressLine: billing?.address_line,
        city: billing?.city,
        country: billing?.country,
        email: billing?.email,
        phone_number: billing?.phone_number,
    });

    const handleOpenPreliminaryInfo = () => {
        setIsBilgilendirmeOpen(true);
    };

    const handleOpenDistanceSalesAgreement = () => {
        setMesafeliSatisInfo(prev => ({
            ...prev,
            isOpen: true
        }));
    };

    const onCloseSatis = () => {
        setMesafeliSatisInfo(prev => ({
            ...prev,
            isOpen: false
        }));
    };

    const handlePayment = async () => {
        setIsLoading(true);
        try {
            const result = await odemeBaslat(pkg.id);

            if (result.success) {
                setPaytrToken(result.token);
            } else {
                alert(result.message || "Ödeme başlatılamadı.");
            }
        } catch (error) {
            console.error("Ödeme hatası:", error);
            alert("Bir hata oluştu. Lütfen tekrar deneyin.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.pageWrapper}>
            <div className={styles.mainContainer}>
                
                {/* SOL TARAF: Fatura ve Ödeme Yöntemi Bilgileri Sabit Kalır */}
                <div className={styles.leftContainer}>
                    {/* Fatura Bilgileri Kartı */}
                    <div className={styles.card}>
                        <div className={styles.cardHeader}>
                            <h3>FATURA BİLGİLERİ</h3>
                            <Link href={"/panel/hesap-bilgileri?tab=fatura-bilgileri"} className={styles.editButton}>Düzenle</Link>
                        </div>

                        {!isBillingComplete ? (
                            <div className={styles.warningBox}>
                                ⚠️ Fatura bilgileriniz eksik. Ödeme yapmadan önce lütfen <Link className={styles.warningLink} href={"/panel/hesap-bilgileri?tab=fatura-bilgileri"}>fatura bilgilerinizi doldurun.</Link>
                            </div>
                        ) : (
                            <div className={styles.billingInfo}>
                                <p className={styles.billingName}>
                                    <strong>{billing.profile_type === 'corporate' ? billing.company_name : `${billing.first_name} ${billing.last_name}`}</strong>
                                </p>
                                <div className={styles.billingInlineContact}>
                                    <span>{billing.email}</span>
                                    {billing.phone_number && (
                                        <>
                                            <span>•</span>
                                            <span>{billing.phone_number.replace(/^\+90(\d{3})(\d{3})(\d{2})(\d{2})/, '0$1 $2 $3 $4')}</span>
                                        </>
                                    )}
                                </div>
                                <p className={styles.billingAddress}>{billing.address_line}</p>
                                <p className={styles.billingAddress}>{billing.country} / {billing.city} {billing.postal_code}</p>
                            </div>
                        )}
                    </div>

                    {/* Ödeme Yöntemi Kartı */}
                    <div className={styles.card}>
                        <h3>ÖDEME YÖNTEMİ</h3>
                        <div className={styles.tabContainer}>
                            <button className={styles.tabButton}>Kredi / Banka Kartı</button>
                        </div>
                        <div className={styles.paymentInfoBox}>
                            <div className={styles.paymentInfoIcon}>🔒</div>
                            <div className={styles.paymentInfoText}>
                                <strong>Güvenli Ödeme</strong>
                                <p>Ödeme, PayTR altyapısı kullanılarak alınmaktadır. <strong>&quot;Ödemeyi Tamamla&quot;</strong> butonuna bastıktan sonra güvenli ödeme penceresi açılacaktır.</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SAĞ TARAF: Sipariş Özeti ve Ödeme Butonu */}
                <div className={styles.rightContainer}>
                    <div className={styles.summaryCard}>
                        <h3>SİPARİŞ ÖZETİ</h3>
                        
                        <div className={styles.summaryRow}>
                            <span>{pkg.title || "Paket"}</span>
                            <span>{pkg.price ? `${Number(pkg.price).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺` : "4.000,00 ₺"}</span>
                        </div>

                        <div className={styles.summaryRow}>
                            <span>KDV (%20)</span>
                            <span>
                                {pkg.price && pkg.tax_included_price 
                                    ? `${Number(parseFloat(pkg.tax_included_price) - parseFloat(pkg.price)).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺` 
                                    : "0,00 ₺"}
                            </span>
                        </div>

                        <hr className={styles.divider} />

                        <div className={styles.totalRow}>
                            <span>Toplam</span>
                            <span>{pkg.tax_included_price ? `${Number(pkg.tax_included_price).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺` : "4.800,00 ₺"}</span>
                        </div>

                        {/* Sözleşme Onay Alanı */}
                        <div className={styles.agreementContainer}>
                            <input 
                                type="checkbox" 
                                className={styles.agreementCheckbox}
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                            />
                            <span className={styles.agreementLabel}>
                                <span onClick={handleOpenPreliminaryInfo} className={styles.agreementLink}>Ön Bilgilendirme Formu</span>
                                &apos;nu ve&nbsp;
                                <span onClick={handleOpenDistanceSalesAgreement} className={styles.agreementLink}>Mesafeli Satış Sözleşmesi</span>
                                &apos;ni okudum, onaylıyorum.
                            </span>
                        </div>

                        <button 
                            disabled={!isBillingComplete || !isChecked || isLoading} 
                            onClick={handlePayment}
                            className={styles.completeButton}
                        >
                            {isLoading ? "Yükleniyor..." : "Ödemeyi Tamamla"}
                        </button>
                    </div>
                    
                </div>
                
            </div>
            <div className={styles.securityBanner}>
                <img 
                    src="/paytr-logolar.png" 
                    alt="Visa, Mastercard, Troy, PayTR ve 256-bit SSL Güvenlik Sertifikası" 
                    className={styles.securityBannerImg}
                />
            </div>
            

            {/* PAYTR İFRAME MODAL (Açılır Pencere) */}
            {paytrToken && (
                <div className={styles.modalOverlay}>
                    <div className={styles.modalContainer}>
                        <div className={styles.modalHeader}>
                            <h3 className={styles.modalTitle}>Güvenli Ödeme Ekranı</h3>
                            <button 
                                onClick={() => setPaytrToken(null)}
                                className={styles.modalCloseButton}
                            >
                                ✕
                            </button>
                        </div>
                        <div className={styles.modalBody}>
                            <iframe
                                src={`https://www.paytr.com/odeme/guvenli/${paytrToken}`}
                                id="paytr-iframe"
                                className={styles.paytrIframe}
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}

            {isBilgilendirmeOpen && <OnBilgilendirmeFormu onClose={() => setIsBilgilendirmeOpen(false)} />}
            {mesafeliSatisInfo.isOpen && <MesafeliSatisSozlesmesi info={mesafeliSatisInfo} onClose={onCloseSatis} />}
        </div>
    );
}