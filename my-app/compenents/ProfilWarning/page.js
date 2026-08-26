'use client';
import styles from './page.module.css';

export default function ErrorRes({ message, setMessage }) {
    return (
        <div className={styles.overlay} onClick={() => setMessage(null)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.content}>
                    
                    {/* Başarılıysa yeşil tik, değilse ünlem ikonu */}
                    <div className={message.status ? styles.successIcon : styles.warningIcon}>
                        {message.status ? '✓' : '!'}
                    </div>
                    
                    <h2 className={styles.title}>{message.title}</h2>
                    <p className={styles.desc}>
                        {message.info}
                    </p>
                    
                    <button 
                        className={styles.buttonClose} 
                        onClick={() => setMessage(null)}
                    >
                        Kapat
                    </button>
                </div>
            </div>
        </div>
    );
}