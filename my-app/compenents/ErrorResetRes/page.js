'use client';
import styles from './page.module.css';

export default function ErrorResetRes({ errorRes, setErrorRes }) {
    return (
        <div className={styles.overlay} onClick={() => setErrorRes(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.content}>
                    <div className={styles.warningIcon}>!</div>
                    
                    <h2 className={styles.title}>İşlem Tamamlanamadı</h2>
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