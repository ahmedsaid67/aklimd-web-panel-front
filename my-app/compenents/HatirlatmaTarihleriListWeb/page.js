'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css';
import { durdurHatirlatmaTarihleri } from './actions';
import HatirlatmaTarihleriRes from "../../compenents/HatirlatmaTarihleriRes/page"


export default function HatirlatmaTarihleriListWeb({ hatirlatmaTarihleri }) {
    const router = useRouter();
    const [selected, setSelected] = useState([]);
    const [actionLoading, setActionLoading] = useState(false);

    // Veriyi ve hatayı doğrudan sunucudan gelen prop üzerinden okuyoruz
    const tarihler = hatirlatmaTarihleri?.status === "succes" ? hatirlatmaTarihleri.data : [];
    const error = hatirlatmaTarihleri?.status === "error" ? hatirlatmaTarihleri.message : null;
    const [tarihMessega, setTarihMessega] = useState(null)

    const handleToggleSelect = (item) => {
        if (item.durum !== "Aktif") return;

        setSelected(prev => 
            prev.includes(item.id) ? prev.filter(i => i !== item.id) : [...prev, item.id]
        );
    };

    const handleDurdurSecilenler = async () => {
        if (selected.length === 0) return;
        setActionLoading(true);

        const res = await durdurHatirlatmaTarihleri(selected);

        if (res?.success) {
            setTarihMessega({"title":"İşlem başarılı","explanation":res.message})
            setSelected([]);
            // Server Action içindeki revalidatePath sunucuyu ve prop'ları zaten günceller.
        } else {
            setTarihMessega({"title":"Hata Oluştu","explanation":res.message})
            setSelected([]);
        }
        setActionLoading(false);
    };

    const handleClose = () => {
        router.back();
    };

    const hasSelection = selected.length > 0;

    return (
        <div className={styles.overlay} onClick={handleClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.modalHeader}>
                    <div>
                        <h2 className={styles.title}>Hatırlatma Tarihleri</h2>
                        <p className={styles.desc}>Tüm hatırlatma tarihlerinin listesi ve durumları</p>
                    </div>
                    <button 
                        className={styles.closeIconButton} 
                        onClick={handleClose}
                    >
                        ✕
                    </button>
                </div>

                <div className={styles.listContainer}>
                    {error ? (
                        <div className={styles.errorContainer} style={{ color: 'red', textAlign: 'center', padding: '20px' }}>
                            <p>{error}</p>
                        </div>
                    ) : tarihler.length === 0 ? (
                        <div className={styles.loadingText}>Kayıt bulunamadı.</div>
                    ) : (
                        tarihler.map((item) => {
                            const isActive = item.durum === "Aktif";
                            const isSelected = selected.includes(item.id);

                            const statusClass = item.durum === "Tamamlandı" 
                                ? styles.success 
                                : item.durum === "Durduruldu" 
                                ? styles.danger 
                                : '';

                            return (
                                <div 
                                    key={item.id} 
                                    className={`${styles.tarihCard} ${!isActive ? styles.disabledCard : ''} ${isSelected ? styles.selectedCard : ''}`}
                                    onClick={() => handleToggleSelect(item)}
                                >
                                    <div className={styles.tarihInfo}>
                                        <span className={styles.calendarIcon}>📅</span>
                                        <span className={styles.tarihText}>{new Date(item.tarih).toLocaleDateString('tr-TR')}</span>
                                    </div>

                                    <div className={styles.cardRight}>
                                        {!isActive && (
                                            <span className={`${styles.badge} ${statusClass}`}>
                                                {item.durum}
                                            </span>
                                        )}

                                        {isActive && (
                                            <div className={`${styles.checkboxCustom} ${isSelected ? styles.checked : ''}`}>
                                                {isSelected && <span className={styles.checkIcon}>✓</span>}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            );
                        })
                    )}
                </div>

                <div className={styles.modalFooter}>
                    <button 
                        className={`${styles.btnDurdur} ${!hasSelection ? styles.btnDisabled : ''}`} 
                        onClick={handleDurdurSecilenler}
                        disabled={!hasSelection || actionLoading}
                    >
                        {actionLoading ? "İşleniyor..." : `Seçilenleri Durdur ${hasSelection ? `(${selected.length})` : ''}`}
                    </button>
                    <button 
                        className={styles.buttonClose} 
                        onClick={handleClose}
                    >
                        Kapat
                    </button>
                </div>

                {tarihMessega && <HatirlatmaTarihleriRes setTarihMessega={setTarihMessega} tarihMessega={tarihMessega}/>}
            </div>
        </div>
    );
}