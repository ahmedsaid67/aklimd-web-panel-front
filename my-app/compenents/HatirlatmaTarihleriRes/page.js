'use client';
import styles from './page.module.css'; // Aynı CSS'i kullanabilirsin

export default function HatirlatmaTarihleriRes({ setTarihMessega,tarihMessega }) {
    return (
        <div className={styles.overlay} onClick={() => setTarihMessega(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.content}>

                    <div className={tarihMessega.title ==="İşlem başarılı" ? styles.successIcon : styles.warningIcon}>
                        {tarihMessega.title ==="İşlem başarılı" ? "✓" : "!"}
                    </div>
                    
                    <h2 className={styles.title}>{tarihMessega.title}</h2>
                    <p className={styles.desc}>
                        {tarihMessega.explanation}
                    </p>
                    
                    <button 
                        className={styles.buttonClose} 
                        onClick={() => setTarihMessega(null)}
                    >
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
}