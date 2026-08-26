'use client';
import styles from './page.module.css'; // Aynı CSS'i kullanabilirsin

export default function ErrorRes({ errorRes,setErrorRes }) {
    return (
        <div className={styles.overlay} onClick={() => setErrorRes(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.content}>
                    {/* Uyarı ikonu - İstersen bir SVG icon da koyabilirsin */}
                    <div className={styles.warningIcon}>!</div>
                    
                    <h2 className={styles.title}>Bir Sorunla Karşılaştık</h2>
                    <p className={styles.desc}>
                        {errorRes}
                    </p>
                    
                    <button 
                        className={styles.buttonClose} 
                        onClick={() => setErrorRes(null)}
                    >
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
}