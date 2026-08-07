'use client';
import styles from './page.module.css'; // Aynı CSS'i kullanabilirsin

export default function BizeUlasinRes({ setYanit,yanit }) {
    return (
        <div className={styles.overlay} onClick={() => setYanit(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.content}>
                    {/* Uyarı ikonu - İstersen bir SVG icon da koyabilirsin */}
                    <div className={styles.warningIcon}>!</div>
                    
                    <h2 className={styles.title}>{yanit.title}</h2>
                    <p className={styles.desc}>
                        {yanit.explanation}
                    </p>
                    
                    <button 
                        className={styles.buttonClose} 
                        onClick={() => setYanit(null)}
                    >
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
}