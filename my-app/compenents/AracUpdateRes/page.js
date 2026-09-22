'use client';
import styles from './page.module.css'; // Aynı CSS'i kullanabilirsin

export default function AracUpdateRes({ setDeleteWarning }) {
    return (
        <div className={styles.overlay} onClick={() => setDeleteWarning(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.content}>

                    <div className={styles.successIcon}>✓</div>
                    
                    <h2 className={styles.title}>Güncelleme Tamamlandı</h2>
                    <p className={styles.desc}>
                        Araç güncelleme başarıyla sağlandı.
                    </p>
                    
                    <button 
                        className={styles.buttonClose} 
                        onClick={() => setDeleteWarning(false)}
                    >
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
}