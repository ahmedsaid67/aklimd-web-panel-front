'use client';
import styles from './page.module.css'; // Aynı CSS'i kullanabilirsin

export default function WarningModal({ setDeleteWarning }) {
    return (
        <div className={styles.overlay} onClick={() => setDeleteWarning(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.content}>
                    {/* Uyarı ikonu - İstersen bir SVG icon da koyabilirsin */}
                    <div className={styles.warningIcon}>!</div>
                    
                    <h2 className={styles.title}>İşlem Kısıtlaması</h2>
                    <p className={styles.desc}>
                        Silme işlemini gerçekleştirebilmeniz için öncelikle listeden en az bir araç seçmeniz gerekmektedir.
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