'use client'
import { useState } from "react";
import styles from "./page.module.css";
import Link from "next/link";
import OnBilgilendirmeFormu from '../OnBilgilendirmeFormu/page';
import MesafeliSatisSozlesmesi from '../MesafeliSatisSozlesmesi/page';
import { odemeBaslat } from "./actions";
import ErrorRes from "../ErrorRes/page";

export default function Page({ paket }) {
    const pkg = paket.data.package;
    const billing = paket.data.billing_profile;
    
    const isBillingComplete = billing?.is_complete ?? false;
    const [isChecked, setIsChecked] = useState(false);
    const [isBilgilendirmeOpen, setIsBilgilendirmeOpen] = useState(false);
    const [paytrToken, setPaytrToken] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorRes,setErrorRes] = useState(null)

    const [mesafeliSatisInfo, setMesafeliSatisInfo] = useState({
        isOpen: false,
        profileType: billing.profile_type,
        firstName: billing.first_name,
        lastName: billing.last_name,
        companyName: billing.company_name,
        addressLine: billing.address_line,
        city: billing.city,
        country: billing.country,
        email: billing.email,
        phone_number: billing.phone_number,
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

        const result = await odemeBaslat(pkg.id);

        if (result.success) {
            setPaytrToken(result.token);
            setIsLoading(false);
        } else {
            setErrorRes(result.message);
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
                                <div className={styles.billingName}>
                                    <strong>{billing.profile_type === 'corporate' ? billing.company_name : `${billing.first_name} ${billing.last_name}`}</strong>
                                </div>
                                <div className={styles.billingInlineContact}>
                                    <div>{billing.email}</div>
                                    {billing.phone_number && (
                                        <>
                                            <div>•</div>
                                            <div>{billing.phone_number.replace(/^\+90(\d{3})(\d{3})(\d{2})(\d{2})/, '0$1 $2 $3 $4')}</div>
                                        </>
                                    )}
                                </div>
                                <div className={styles.billingAddress}>{billing.address_line}</div>
                                <div className={styles.billingAddress}>{billing.country} / {billing.city} {billing.postal_code}</div>
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
                                <div>Ödeme, PayTR altyapısı kullanılarak alınmaktadır. <strong>&quot;Ödemeyi Tamamla&quot;</strong> butonuna bastıktan sonra güvenli ödeme penceresi açılacaktır.</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* SAĞ TARAF: Sipariş Özeti ve Ödeme Butonu */}
                <div className={styles.rightContainer}>
                    <div className={styles.summaryCard}>
                        <h3>SİPARİŞ ÖZETİ</h3>
                        
                        <div className={styles.summaryRow}>
                            <div>{pkg.title || "Paket"}</div>
                            <div>{pkg.price ? `${Number(pkg.price).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺` : "4.000,00 ₺"}</div>
                        </div>

                        <div className={styles.summaryRow}>
                            <div>KDV (%20)</div>
                            <div>
                                {pkg.price && pkg.tax_included_price 
                                    ? `${Number(parseFloat(pkg.tax_included_price) - parseFloat(pkg.price)).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺` 
                                    : "0,00 ₺"}
                            </div>
                        </div>

                        <hr className={styles.divider} />

                        <div className={styles.totalRow}>
                            <div>Toplam</div>
                            <div>{pkg.tax_included_price ? `${Number(pkg.tax_included_price).toLocaleString('tr-TR', { minimumFractionDigits: 2 })} ₺` : "4.800,00 ₺"}</div>
                        </div>

                        {/* Sözleşme Onay Alanı */}
                        <div className={styles.agreementContainer}>
                            <input 
                                type="checkbox" 
                                className={styles.agreementCheckbox}
                                checked={isChecked}
                                onChange={(e) => setIsChecked(e.target.checked)}
                                autoComplete="off"
                            />
                            <div className={styles.agreementLabel}>
                                <div onClick={handleOpenPreliminaryInfo} className={styles.agreementLink}>Ön Bilgilendirme Formu</div>
                                &apos;nu ve&nbsp;
                                <div onClick={handleOpenDistanceSalesAgreement} className={styles.agreementLink}>Mesafeli Satış Sözleşmesi</div>
                                &apos;ni okudum, onaylıyorum.
                            </div>
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

            {/* PAYTR İFRAME MODAL */}
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
            {errorRes && <ErrorRes errorRes={errorRes} setErrorRes={setErrorRes} />}
        </div>
    );
}