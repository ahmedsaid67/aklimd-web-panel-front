'use client';
import styles from './page.module.css';

export default function SuccessRes({ successRed }) {
    return (
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <div className={styles.content}>
                    
                    {/* Modern Spinner */}
                    <div className={styles.spinner}></div>
                    
                    <h2 className={styles.title}>Başarılı</h2>
                    
                    <p className={styles.desc}>
                        {successRed}
                    </p>
                    
                </div>
            </div>
        </div>
    );
}