'use client';
import Link from 'next/link';
import styles from './page.module.css';

export default function NoCreditRes({ setOpenCreditModal }) {
    return (
        <div className={styles.overlay} onClick={() => setOpenCreditModal(false)}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <div className={styles.content}>
                    
                    <div className={styles.warningIcon}>
                        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                            <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                        </svg>
                    </div>
                    
                    <h2 className={styles.title}>Hatırlatıcı Hakkın Bulunmamaktadır</h2>
                    
                    <p className={styles.desc}>
                        Yeni bir hatırlatıcı eklemek için yeterli hakkınız bulunmuyor. İhtiyacınıza uygun bir paket seçerek hatırlatıcı oluşturma hakkı edinebilirsiniz.
                    </p>
                    
                    <div className={styles.buttonContainer}>
                        <button 
                            className={styles.btnCloseModal} 
                            onClick={() => setOpenCreditModal(false)}
                        >
                            Kapat
                        </button>
                        
                        <Link 
                            href="/panel/paketler" 
                            className={styles.btnPackage} 
                        >
                            Paketleri İncele
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}