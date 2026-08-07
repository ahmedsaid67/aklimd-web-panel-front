'use client';
import styles from './page.module.css'; // Aynı CSS'i kullanabilirsin

export default function HatirlatmaTarihleriRes({ setTarihMessega,tarihMessega }) {
    return (
        <div className={styles.overlay} onClick={() => setTarihMessega(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.content}>
                    {/* Uyarı ikonu - İstersen bir SVG icon da koyabilirsin */}
                    <div className={styles.warningIcon}>!</div>
                    
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